# Quick Start: Figma Make + Claude Agent SDK Integration

## Immediate Implementation Guide

This guide provides working code you can deploy today to start triggering Claude Agent SDK from Figma Make.

---

## Minimal Working Example

### 1. Install Dependencies

```bash
# Create project directory
mkdir figma-claude-integration
cd figma-claude-integration

# Initialize Python project
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn anthropic claude-agent-sdk httpx python-multipart --break-system-packages
```

### 2. Create Simple Orchestrator (app.py)

```python
from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from pydantic import BaseModel
import os
import tempfile
import zipfile
from pathlib import Path
import asyncio

# Claude Agent SDK imports
from claude_agent_sdk import query, ClaudeAgentOptions

app = FastAPI(title="Figma Make → Claude Agent Bridge")

class WebhookPayload(BaseModel):
    event_type: str
    file_key: str
    passcode: str

@app.post("/webhook/figma")
async def receive_figma_webhook(payload: WebhookPayload):
    """Receive Figma webhooks and trigger agents"""
    
    # Validate passcode
    if payload.passcode != os.getenv("FIGMA_WEBHOOK_PASSCODE"):
        return {"error": "Invalid passcode"}, 403
    
    # Trigger agent based on event type
    system_prompt = f"""
You are a design-to-code automation expert. 
A Figma file has been updated: {payload.file_key}
Event type: {payload.event_type}

Analyze what likely changed and recommend next steps for the development team.
"""
    
    result = await query(
        f"Analyze Figma update for file {payload.file_key}",
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt=system_prompt,
            max_tokens=4000
        )
    )
    
    return {
        "status": "processed",
        "analysis": result.get("content", [{}])[0].get("text", "")
    }

@app.post("/process-figma-make-export")
async def process_figma_make_export(
    file: UploadFile = File(...),
    task: str = "enhance"
):
    """
    Process Figma Make ZIP export with Claude Agent
    
    Usage:
    curl -X POST http://localhost:8000/process-figma-make-export \
      -F "file=@my-figma-make-app.zip" \
      -F "task=enhance"
    """
    
    # Save uploaded file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as tmp:
        content = await file.read()
        tmp.write(content)
        zip_path = tmp.name
    
    # Extract ZIP
    extract_dir = tempfile.mkdtemp()
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    
    # Read files
    code_files = {}
    for root, dirs, files in os.walk(extract_dir):
        for filename in files:
            if filename.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                file_path = Path(root) / filename
                relative_path = file_path.relative_to(extract_dir)
                with open(file_path, 'r', encoding='utf-8') as f:
                    code_files[str(relative_path)] = f.read()
    
    # Build context for agent
    files_summary = "\n".join([
        f"- {path} ({len(content)} chars)"
        for path, content in code_files.items()
    ])
    
    system_prompt = f"""
You are an expert full-stack developer enhancing a Figma Make prototype.

The project contains {len(code_files)} files:
{files_summary}

Your task: {task}

Available tasks:
- enhance: Add production features (error handling, loading states, TypeScript types)
- backend: Generate matching backend API
- tests: Create comprehensive test suite
- deploy: Prepare for deployment (Docker, CI/CD)

Analyze the code and provide detailed recommendations and code improvements.
"""
    
    # Call Claude Agent
    result = await query(
        f"Analyze and {task} this Figma Make export:\n\n{files_summary}",
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt=system_prompt,
            max_tokens=16000,
            allowed_tools=["Read", "Write"]
        )
    )
    
    # Cleanup
    os.unlink(zip_path)
    
    return {
        "status": "completed",
        "files_processed": len(code_files),
        "result": result.get("content", [{}])[0].get("text", "")
    }

@app.get("/")
async def root():
    return {
        "service": "Figma Make → Claude Agent Bridge",
        "endpoints": {
            "figma_webhook": "/webhook/figma",
            "process_export": "/process-figma-make-export"
        },
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 3. Create Environment File (.env)

```bash
# .env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
FIGMA_ACCESS_TOKEN=your_figma_personal_access_token
FIGMA_WEBHOOK_PASSCODE=your_secure_passcode
```

### 4. Run the Service

```bash
# Load environment variables
export $(cat .env | xargs)

# Run the service
python app.py
```

Your service is now running at `http://localhost:8000`

---

## Setting Up Figma Webhook

### Step 1: Create Webhook via API

```bash
# Replace with your values
FIGMA_TOKEN="your_figma_pat"
TEAM_ID="your_team_id"
ENDPOINT="https://your-server.com/webhook/figma"
PASSCODE="your_secure_passcode"

# Create webhook
curl -X POST \
  'https://api.figma.com/v2/webhooks' \
  -H "X-FIGMA-TOKEN: $FIGMA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "FILE_VERSION_UPDATE",
    "team_id": "'$TEAM_ID'",
    "endpoint": "'$ENDPOINT'",
    "passcode": "'$PASSCODE'",
    "status": "ACTIVE"
  }'
```

### Step 2: Verify Webhook

```bash
# List all webhooks for your team
curl -H "X-FIGMA-TOKEN: $FIGMA_TOKEN" \
  "https://api.figma.com/v2/teams/$TEAM_ID/webhooks"
```

---

## Using with Figma Make Exports

### Workflow 1: Manual Upload

1. In Figma Make, click "Download code" to export ZIP
2. Upload to your service:

```bash
curl -X POST http://localhost:8000/process-figma-make-export \
  -F "file=@Downloads/my-app.zip" \
  -F "task=enhance"
```

### Workflow 2: Automated Processing

Create a file watcher script:

```python
# watch_exports.py
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import requests
import os

class FigmaMakeExportHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.src_path.endswith('.zip'):
            print(f"New export detected: {event.src_path}")
            
            # Upload to orchestrator
            with open(event.src_path, 'rb') as f:
                response = requests.post(
                    'http://localhost:8000/process-figma-make-export',
                    files={'file': f},
                    data={'task': 'enhance'}
                )
            
            print(f"Processing result: {response.json()}")

if __name__ == "__main__":
    path = os.path.expanduser("~/Downloads")
    event_handler = FigmaMakeExportHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()
    
    print(f"Watching {path} for Figma Make exports...")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
```

Run the watcher:

```bash
pip install watchdog requests --break-system-packages
python watch_exports.py
```

---

## Advanced Example: Full Production Pipeline

```python
# production_pipeline.py

from claude_agent_sdk import query, stream, ClaudeAgentOptions
import asyncio
import os

async def full_stack_pipeline(figma_make_export_path: str):
    """
    Complete pipeline: Figma Make → Production Ready Application
    """
    
    print("🚀 Starting Full-Stack Pipeline")
    print("=" * 50)
    
    # Step 1: Analyze Export
    print("\n📊 Step 1: Analyzing Figma Make Export...")
    
    analysis_prompt = f"""
Analyze the Figma Make export at: {figma_make_export_path}

Identify:
1. Component structure
2. State management patterns
3. API requirements
4. Missing production features
5. Test coverage needs

Provide a structured analysis.
"""
    
    analysis = await query(
        analysis_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are a senior software architect.",
            allowed_tools=["Read", "Bash"],
            max_tokens=8000
        )
    )
    
    print("✅ Analysis complete")
    print(analysis.get("content", [{}])[0].get("text", "")[:500] + "...")
    
    # Step 2: Enhance Frontend
    print("\n🎨 Step 2: Enhancing Frontend Code...")
    
    enhance_prompt = f"""
Based on the analysis, enhance the Figma Make prototype:

1. Add TypeScript types for all props and state
2. Implement error boundaries
3. Add loading and error states
4. Implement proper form validation
5. Add accessibility attributes
6. Optimize performance (memo, lazy loading)

Work in directory: {figma_make_export_path}
Create enhanced version in: {figma_make_export_path}/enhanced/
"""
    
    # Use streaming for real-time feedback
    print("Streaming agent actions:")
    async for chunk in stream(
        enhance_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are an expert React/TypeScript developer.",
            allowed_tools=["Read", "Write", "Bash"],
            working_directory=figma_make_export_path,
            max_tokens=32000
        )
    ):
        if chunk.get("type") == "tool_use":
            tool = chunk.get("tool", "unknown")
            print(f"  → Using tool: {tool}")
    
    print("✅ Frontend enhanced")
    
    # Step 3: Generate Backend
    print("\n⚙️ Step 3: Generating Backend API...")
    
    backend_prompt = """
Based on the frontend code, generate a matching backend:

1. Analyze frontend API calls and data structures
2. Create Express.js + TypeScript backend
3. Implement RESTful endpoints
4. Add authentication middleware
5. Create Prisma schema for database
6. Add input validation with Zod
7. Include error handling

Create backend in: backend/
"""
    
    await query(
        backend_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are an expert backend developer specializing in Node.js.",
            allowed_tools=["Read", "Write", "Bash"],
            working_directory=figma_make_export_path,
            max_tokens=32000
        )
    )
    
    print("✅ Backend generated")
    
    # Step 4: Generate Tests
    print("\n🧪 Step 4: Generating Tests...")
    
    test_prompt = """
Create comprehensive test suite:

1. Frontend unit tests (Jest + React Testing Library)
2. Frontend integration tests
3. Backend API tests (Supertest)
4. E2E tests (Playwright)

Cover all critical paths and edge cases.
Create tests in appropriate directories.
"""
    
    await query(
        test_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are a test automation expert.",
            allowed_tools=["Read", "Write", "Bash"],
            working_directory=figma_make_export_path,
            max_tokens=32000
        )
    )
    
    print("✅ Tests generated")
    
    # Step 5: Create Deployment Configuration
    print("\n🚢 Step 5: Creating Deployment Configuration...")
    
    deploy_prompt = """
Prepare for deployment:

1. Create Dockerfile for frontend (Next.js)
2. Create Dockerfile for backend
3. Create docker-compose.yml
4. Create GitHub Actions CI/CD workflow
5. Create README with deployment instructions
6. Add environment variable templates

Target platforms: Vercel (frontend), Railway (backend)
"""
    
    await query(
        deploy_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are a DevOps engineer.",
            allowed_tools=["Read", "Write"],
            working_directory=figma_make_export_path,
            max_tokens=16000
        )
    )
    
    print("✅ Deployment configuration created")
    
    # Step 6: Generate Documentation
    print("\n📚 Step 6: Generating Documentation...")
    
    docs_prompt = """
Create comprehensive documentation:

1. Technical architecture diagram (Mermaid)
2. API documentation (OpenAPI spec)
3. Component documentation (Storybook)
4. Setup and deployment guide
5. Contributing guidelines
6. Security best practices

Create in: docs/
"""
    
    await query(
        docs_prompt,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt="You are a technical writer.",
            allowed_tools=["Read", "Write"],
            working_directory=figma_make_export_path,
            max_tokens=16000
        )
    )
    
    print("✅ Documentation generated")
    
    print("\n" + "=" * 50)
    print("🎉 Full-Stack Pipeline Complete!")
    print(f"📁 Output directory: {figma_make_export_path}")
    print("\nNext steps:")
    print("1. Review generated code")
    print("2. Run tests: cd enhanced && npm test")
    print("3. Start dev servers: docker-compose up")
    print("4. Deploy: git push origin main (triggers CI/CD)")

# Run pipeline
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python production_pipeline.py <path-to-figma-make-export>")
        sys.exit(1)
    
    export_path = sys.argv[1]
    asyncio.run(full_stack_pipeline(export_path))
```

Run the full pipeline:

```bash
python production_pipeline.py /path/to/extracted/figma-make-export
```

---

## Creating Custom Agents

### Example: Design System Sync Agent

```python
# agents/design-system-sync.py

from claude_agent_sdk import query, ClaudeAgentOptions
import os

async def sync_design_system(figma_file_key: str, target_repo: str):
    """
    Sync design system from Figma to code repository
    """
    
    system_prompt = """
You are a design system engineer. Your task:

1. Fetch design tokens from Figma API
2. Extract colors, typography, spacing, shadows
3. Generate CSS variables
4. Generate TypeScript tokens
5. Generate Tailwind config
6. Update React component library
7. Create migration guide if changes are breaking
8. Generate changelog

Use consistent naming conventions.
Document all changes.
"""
    
    task = f"""
Sync design system from Figma file: {figma_file_key}
Target repository: {target_repo}

Steps:
1. Call Figma API to get file data
2. Parse design tokens
3. Generate token files in multiple formats
4. Update component library
5. Create PR with changes
6. Run tests to ensure nothing breaks
"""
    
    result = await query(
        task,
        ClaudeAgentOptions(
            model="claude-sonnet-4-5",
            system_prompt=system_prompt,
            allowed_tools=["Read", "Write", "Bash", "WebSearch"],
            max_tokens=64000
        )
    )
    
    return result

# Usage
if __name__ == "__main__":
    import asyncio
    
    result = asyncio.run(
        sync_design_system(
            figma_file_key="abc123xyz",
            target_repo="git@github.com:company/design-system.git"
        )
    )
    
    print(result.get("content", [{}])[0].get("text", ""))
```

---

## Deployment Options

### Option 1: Local Development

```bash
python app.py
# Access at http://localhost:8000
```

### Option 2: Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt --break-system-packages

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t figma-claude-bridge .
docker run -p 8000:8000 --env-file .env figma-claude-bridge
```

### Option 3: Cloud Deployment (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Option 4: Serverless (AWS Lambda)

```python
# lambda_handler.py
from mangum import Mangum
from app import app

handler = Mangum(app)
```

---

## Testing

### Test Figma Webhook

```bash
curl -X POST http://localhost:8000/webhook/figma \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "FILE_VERSION_UPDATE",
    "file_key": "test123",
    "passcode": "your_passcode"
  }'
```

### Test File Upload

```bash
# Create test ZIP
cd /tmp
mkdir test-app
echo "export const App = () => <div>Hello</div>" > test-app/App.tsx
zip -r test-app.zip test-app/

# Upload
curl -X POST http://localhost:8000/process-figma-make-export \
  -F "file=@test-app.zip" \
  -F "task=enhance"
```

---

## Troubleshooting

### Issue: "Module not found"
```bash
pip install -r requirements.txt --break-system-packages
```

### Issue: "Connection refused to Figma API"
```bash
# Check your Figma token
export FIGMA_ACCESS_TOKEN="your_token"
curl -H "X-FIGMA-TOKEN: $FIGMA_ACCESS_TOKEN" \
  https://api.figma.com/v1/me
```

### Issue: "Claude API authentication failed"
```bash
# Verify API key
echo $ANTHROPIC_API_KEY
# Should start with "sk-ant-"
```

---

## Next Steps

1. **Customize agents** for your specific use cases
2. **Add MCP tools** for your internal systems
3. **Implement monitoring** with Prometheus/Grafana
4. **Set up CI/CD** for the orchestrator itself
5. **Create web UI** for non-technical users

---

## Resources

- [Claude Agent SDK Docs](https://docs.claude.com/en/api/agent-sdk/overview)
- [Figma API Docs](https://www.figma.com/developers/api)
- [Figma Make Help](https://help.figma.com/hc/en-us/articles/31722591905559-Figma-Make-FAQs)

---

**Ready to deploy? Start with the minimal example and expand from there!**
