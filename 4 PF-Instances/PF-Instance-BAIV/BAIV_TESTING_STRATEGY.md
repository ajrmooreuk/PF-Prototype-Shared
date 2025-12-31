# BAIV Testing Strategy v1.0.0

**Minimal Testing Approach for MVP**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 1.0.0 |
| **Date** | December 31, 2025 |
| **Purpose** | Testing strategy for BAIV MVP |
| **Status** | 🟢 Active |
| **Target Coverage** | 70%+ (focus on critical paths) |

---

## Executive Summary

BAIV MVP testing follows a **pragmatic, minimal approach** focused on critical functionality. We prioritize integration tests over unit tests for faster MVP delivery.

**Testing Philosophy:**
- ✅ Test critical paths only
- ✅ Integration tests > Unit tests
- ✅ Manual testing is OK for MVP
- ✅ Automate only what breaks frequently
- ❌ Don't aim for 100% coverage

**Test Pyramid (Inverted for MVP):**
```
    Manual Testing (30%)
  ─────────────────────────
  Integration Tests (50%)
  ─────────────────────────
    Unit Tests (20%)
```

---

## Table of Contents

1. [Critical Test Areas](#critical-test-areas)
2. [Integration Tests](#integration-tests)
3. [Unit Tests](#unit-tests)
4. [Manual Testing](#manual-testing)
5. [Test Data](#test-data)
6. [Running Tests](#running-tests)

---

## Critical Test Areas

### Priority 1: Must Test (P0)
- [ ] User authentication (login/logout)
- [ ] Ontology CRUD operations
- [ ] Database connection and RLS
- [ ] Agent execution (at least 1 agent)
- [ ] API health endpoint

### Priority 2: Should Test (P1)
- [ ] Audit creation and results
- [ ] JWT token validation
- [ ] Environment variable handling
- [ ] Error responses (4xx, 5xx)

### Priority 3: Nice to Have (P2)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Edge cases and boundary conditions

---

## Integration Tests

Integration tests verify entire workflows work together. Focus here for MVP.

### Test Framework: Jest (Node.js) or pytest (Python)

**Setup (Node.js):**
```bash
npm install --save-dev jest @types/jest ts-jest supertest
```

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": ["**/*.test.ts"],
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70,
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

### Example: Authentication Tests

**tests/integration/auth.test.ts:**
```typescript
import request from 'supertest';
import app from '../../src/app';
import { pool } from '../../src/db';

describe('Authentication', () => {
  beforeAll(async () => {
    // Setup test database
    await pool.query('BEGIN');
  });

  afterAll(async () => {
    await pool.query('ROLLBACK');
    await pool.end();
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should fail with invalid credentials', async () => {
      const response = await request(app)
        .post('/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /auth/me', () => {
    it('should return user with valid token', async () => {
      // Login first to get token
      const loginResponse = await request(app)
        .post('/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      const token = loginResponse.body.token;

      const response = await request(app)
        .get('/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });
  });
});
```

### Example: Ontology Tests

**tests/integration/ontology.test.ts:**
```typescript
describe('Ontology Operations', () => {
  let authToken: string;

  beforeAll(async () => {
    // Login to get token
    const response = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    authToken = response.body.token;
  });

  describe('POST /ontology', () => {
    it('should create client-context ontology', async () => {
      const response = await request(app)
        .post('/v1/ontology')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ontology_type: 'client-context',
          data: {
            client_name: 'Test Corp',
            client_url: 'https://test.com',
            industry: 'SaaS'
          }
        });

      expect(response.status).toBe(201);
      expect(response.body.ontology_type).toBe('client-context');
      expect(response.body.data.client_name).toBe('Test Corp');
    });
  });

  describe('GET /ontology', () => {
    it('should list ontologies with filtering', async () => {
      const response = await request(app)
        .get('/v1/ontology?ontology_type=client-context')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
```

### Example: Database RLS Tests

**tests/integration/rls.test.ts:**
```typescript
describe('Row-Level Security', () => {
  it('should isolate data between tenants', async () => {
    // Login as tenant1 user
    const tenant1Token = await loginAsTenant('tenant1@example.com');
    
    // Create ontology for tenant1
    await request(app)
      .post('/v1/ontology')
      .set('Authorization', `Bearer ${tenant1Token}`)
      .send({
        ontology_type: 'client-context',
        data: { client_name: 'Tenant 1 Client' }
      });

    // Login as tenant2 user
    const tenant2Token = await loginAsTenant('tenant2@example.com');
    
    // Try to list ontologies as tenant2
    const response = await request(app)
      .get('/v1/ontology')
      .set('Authorization', `Bearer ${tenant2Token}`);

    // Should not see tenant1's data
    const tenant1Data = response.body.data.find(
      (item: any) => item.data.client_name === 'Tenant 1 Client'
    );
    expect(tenant1Data).toBeUndefined();
  });
});
```

---

## Unit Tests

Unit tests for critical business logic only. Keep minimal for MVP.

### Example: JWT Utilities

**tests/unit/jwt.test.ts:**
```typescript
import { generateToken, verifyToken } from '../../src/utils/jwt';

describe('JWT Utilities', () => {
  const testPayload = {
    userId: '123',
    tenantId: '456',
    role: 'admin'
  };

  it('should generate valid token', () => {
    const token = generateToken(testPayload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // JWT format
  });

  it('should verify valid token', () => {
    const token = generateToken(testPayload);
    const decoded = verifyToken(token);
    expect(decoded.userId).toBe(testPayload.userId);
  });

  it('should reject invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow();
  });
});
```

### Example: Validation Functions

**tests/unit/validation.test.ts:**
```typescript
import { validateOntologyType, validateEmail } from '../../src/utils/validation';

describe('Validation Utilities', () => {
  describe('validateOntologyType', () => {
    it('should accept valid ontology types', () => {
      expect(validateOntologyType('client-context')).toBe(true);
      expect(validateOntologyType('gap-analysis')).toBe(true);
    });

    it('should reject invalid ontology types', () => {
      expect(validateOntologyType('invalid-type')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});
```

---

## Manual Testing

Manual testing checklist for MVP features. Run before each release.

### Pre-Release Checklist

**Authentication:**
- [ ] User can register new account
- [ ] User can login with email/password
- [ ] Invalid credentials show error
- [ ] JWT token expires after 24 hours
- [ ] Logout clears token

**Ontology Operations:**
- [ ] Create client-context ontology
- [ ] Create gap-analysis ontology
- [ ] Create blog-post ontology
- [ ] List ontologies with filtering
- [ ] Update ontology data
- [ ] Delete ontology

**Agent Execution:**
- [ ] List available agents
- [ ] Execute Discovery Agent
- [ ] Check execution status
- [ ] View execution results
- [ ] Handle agent failures gracefully

**Audits:**
- [ ] Create new audit
- [ ] List audits with status filter
- [ ] View audit results (JSONB data)
- [ ] Delete audit

**Cross-Cutting:**
- [ ] CORS allows frontend domain
- [ ] Rate limiting blocks excessive requests
- [ ] Health endpoint returns 200
- [ ] Database connection works
- [ ] Environment variables loaded

### Testing Scenarios

**Scenario 1: New Client Onboarding**
```
1. Register new user account
2. Login and get JWT token
3. Create client-context ontology
4. Create ICP profile ontology
5. Run Discovery Agent
6. Verify results stored in ontology_data table
```

**Scenario 2: Citation Testing Workflow**
```
1. Login as existing user
2. Create audit (type: citation)
3. Execute Citation Tester Agent
4. Poll execution status until complete
5. View audit results (citations in JSONB)
6. Create gap-analysis ontology from results
```

**Scenario 3: Content Creation**
```
1. View gap-analysis ontologies
2. Select high-priority gap
3. Execute Blog Creator Agent with gap context
4. Retrieve blog-post ontology
5. Verify content meets requirements (2500+ words)
```

---

## Test Data

### Test Users

Create test users for each role:

```sql
-- Insert test tenant
INSERT INTO tenants (id, name, slug, tier) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Test Tenant', 'test-tenant', 'professional');

-- Insert test users
INSERT INTO users (id, email, name, password_hash) VALUES
  ('00000000-0000-0000-0000-000000000010', 'admin@test.com', 'Test Admin', '$2a$10$...'),
  ('00000000-0000-0000-0000-000000000020', 'manager@test.com', 'Test Manager', '$2a$10$...'),
  ('00000000-0000-0000-0000-000000000030', 'analyst@test.com', 'Test Analyst', '$2a$10$...'),
  ('00000000-0000-0000-0000-000000000040', 'viewer@test.com', 'Test Viewer', '$2a$10$...');

-- Assign roles
INSERT INTO user_tenant_roles (user_id, tenant_id, role_id) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 
   (SELECT id FROM roles WHERE name = 'admin')),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 
   (SELECT id FROM roles WHERE name = 'manager'));
```

### Test Ontology Data

**Client Context:**
```json
{
  "client_name": "Test SaaS Company",
  "client_url": "https://testsaas.com",
  "industry": "Project Management Software",
  "competitor_urls": [
    "https://competitor1.com",
    "https://competitor2.com"
  ],
  "content_themes": ["productivity", "collaboration", "project tracking"],
  "key_products": ["Task Manager Pro", "Team Workspace"]
}
```

**Gap Analysis:**
```json
{
  "gap_type": "citation_opportunity",
  "topic": "best project management software",
  "keywords": ["project management", "task tracking", "team collaboration"],
  "competitor_citations": 15,
  "client_citations": 0,
  "priority": "P0",
  "recommendation": "Create comprehensive guide comparing features"
}
```

---

## Running Tests

### Local Testing

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/integration/auth.test.ts
```

### CI/CD Testing (GitHub Actions)

**.github/workflows/test.yml:**
```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: baiv_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: psql -h localhost -U postgres -d baiv_test -f BAIV_DATABASE_SCHEMA.sql
        env:
          PGPASSWORD: postgres
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/baiv_test
          JWT_SECRET: test-secret
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
```

### Test Database Setup

```bash
# Create test database
createdb baiv_test

# Run schema
psql baiv_test -f BAIV_DATABASE_SCHEMA.sql

# Add test data
psql baiv_test -f tests/fixtures/test_data.sql
```

---

## Summary

**BAIV MVP Testing = Pragmatic & Focused:**
- ✅ 70% coverage target (not 100%)
- ✅ Integration tests prioritized
- ✅ Manual testing checklist
- ✅ Critical paths covered
- ✅ Fast feedback loop

**Test Execution:**
- Local: `npm test` (< 1 minute)
- CI/CD: Automated on PR
- Manual: Pre-release checklist

**Coverage Goals:**
- Integration tests: 50% of effort
- Unit tests: 20% of effort  
- Manual tests: 30% of effort

---

**Document Version:** 1.0.0  
**Status:** 🟢 Active  
**Framework:** Jest (Node.js) or pytest (Python)  
**Related Documents:** BAIV_DATABASE_SCHEMA.sql, BAIV_API_SPECIFICATION.yaml
