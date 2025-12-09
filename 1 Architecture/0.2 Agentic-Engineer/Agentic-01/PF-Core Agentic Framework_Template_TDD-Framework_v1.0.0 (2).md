# Agent TDD Testing Framework

## Document Control
| Field | Value |
|-------|-------|
| **Framework Version** | 1.0.0 |
| **Applies To** | All PF-Agent Development |
| **Coverage Requirement** | ≥85% |
| **Last Updated** | {YYYY-MM-DD} |

---

## 1. TDD Principles for Agents

### 1.1 Core Philosophy

```
┌─────────────────────────────────────────────────────────────┐
│                    TDD AGENT LIFECYCLE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   RED                GREEN              REFACTOR             │
│   ┌─────────┐       ┌─────────┐        ┌─────────┐         │
│   │ Write   │──────▶│ Make it │───────▶│ Clean   │         │
│   │ Failing │       │ Pass    │        │ Up      │         │
│   │ Test    │       │         │        │         │         │
│   └─────────┘       └─────────┘        └─────────┘         │
│        ▲                                     │              │
│        │                                     │              │
│        └─────────────────────────────────────┘              │
│                                                              │
│   Key Principles:                                           │
│   • Tests BEFORE implementation                             │
│   • Small, focused test cases                               │
│   • One assertion per test (where practical)                │
│   • Descriptive test names                                  │
│   • Fast test execution                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Agent-Specific TDD Considerations

| Aspect | Standard TDD | Agent TDD Adaptation |
|--------|--------------|---------------------|
| **Determinism** | Expected output | Validate output schema + key attributes |
| **External Calls** | Mock all | Mock LLM, use fixtures for tools |
| **State** | Stateless tests | Test context injection separately |
| **Behavior** | Function output | Decision patterns + escalation triggers |
| **Integration** | API contracts | Agent-to-agent communication protocols |

---

## 2. Test Categories

### 2.1 Test Pyramid for Agents

```
                    ▲
                   /│\
                  / │ \         E2E Tests (10%)
                 /  │  \        Full workflow validation
                /───┼───\
               /    │    \      Behavioral Tests (20%)
              /     │     \     Decision patterns, escalation
             /──────┼──────\
            /       │       \   Integration Tests (30%)
           /        │        \  Agent-to-agent, tool calls
          /─────────┼─────────\
         /          │          \ Unit Tests (40%)
        /           │           \Skills, functions, validators
       ─────────────┴─────────────
```

### 2.2 Test Category Specifications

| Category | Coverage Target | Execution Time | Isolation Level |
|----------|-----------------|----------------|-----------------|
| **Unit** | 90% | <10ms per test | Full isolation |
| **Integration** | 85% | <500ms per test | Mocked externals |
| **Behavioral** | 80% | <2s per test | Mocked LLM |
| **E2E** | 70% | <30s per test | Staging environment |

---

## 3. Test Templates

### 3.1 Unit Test Template

```python
"""
Unit Tests for {Agent Name} - {Component}
==========================================
Tests individual functions and skills in isolation.
"""

import pytest
from unittest.mock import Mock, patch, AsyncMock
from typing import Dict, Any

# Import the component under test
from agents.{agent_module} import {ComponentClass}
from agents.schemas import {InputSchema, OutputSchema}


# =============================================================================
# FIXTURES
# =============================================================================

@pytest.fixture
def component():
    """Create component instance for testing"""
    return {ComponentClass}()


@pytest.fixture
def valid_input() -> Dict[str, Any]:
    """Standard valid input for testing"""
    return {
        "field_1": "value_1",
        "field_2": 123,
        "field_3": {"nested": "data"}
    }


@pytest.fixture
def invalid_input() -> Dict[str, Any]:
    """Invalid input for error testing"""
    return {
        "field_1": "",  # Empty when required
        "field_2": "not_a_number",  # Wrong type
    }


# =============================================================================
# INITIALIZATION TESTS
# =============================================================================

class TestComponentInitialization:
    """Test component initialization and configuration"""
    
    def test_initializes_with_default_config(self, component):
        """Component should initialize with sensible defaults"""
        # Assert
        assert component is not None
        assert component.config is not None
        assert component.is_initialized == True
    
    def test_accepts_custom_config(self):
        """Component should accept custom configuration"""
        # Arrange
        custom_config = {"setting_a": "custom_value"}
        
        # Act
        component = {ComponentClass}(config=custom_config)
        
        # Assert
        assert component.config["setting_a"] == "custom_value"
    
    def test_rejects_invalid_config(self):
        """Component should reject invalid configuration"""
        # Arrange
        invalid_config = {"required_field": None}
        
        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            {ComponentClass}(config=invalid_config)
        
        assert "required_field" in str(exc_info.value)


# =============================================================================
# INPUT VALIDATION TESTS
# =============================================================================

class TestInputValidation:
    """Test input validation logic"""
    
    def test_accepts_valid_input(self, component, valid_input):
        """Should accept properly formatted input"""
        # Act
        result = component.validate_input(valid_input)
        
        # Assert
        assert result.is_valid == True
        assert len(result.errors) == 0
    
    def test_rejects_missing_required_field(self, component):
        """Should reject input missing required fields"""
        # Arrange
        incomplete_input = {"field_2": 123}  # Missing field_1
        
        # Act
        result = component.validate_input(incomplete_input)
        
        # Assert
        assert result.is_valid == False
        assert "field_1" in result.errors[0]
    
    def test_rejects_wrong_type(self, component, invalid_input):
        """Should reject input with wrong data types"""
        # Act
        result = component.validate_input(invalid_input)
        
        # Assert
        assert result.is_valid == False
        assert any("type" in error.lower() for error in result.errors)
    
    @pytest.mark.parametrize("field,value,expected_error", [
        ("field_1", "", "cannot be empty"),
        ("field_1", None, "cannot be null"),
        ("field_2", -1, "must be positive"),
        ("field_2", 1000001, "exceeds maximum"),
    ])
    def test_validates_field_constraints(self, component, valid_input, field, value, expected_error):
        """Should validate field-specific constraints"""
        # Arrange
        test_input = {**valid_input, field: value}
        
        # Act
        result = component.validate_input(test_input)
        
        # Assert
        assert result.is_valid == False
        assert any(expected_error in error.lower() for error in result.errors)


# =============================================================================
# CORE FUNCTION TESTS
# =============================================================================

class TestCoreFunctionality:
    """Test core component functionality"""
    
    def test_processes_valid_input_successfully(self, component, valid_input):
        """Should process valid input and return expected output"""
        # Act
        result = component.process(valid_input)
        
        # Assert
        assert result is not None
        assert result.success == True
        assert result.data is not None
    
    def test_output_matches_schema(self, component, valid_input):
        """Output should conform to defined schema"""
        # Act
        result = component.process(valid_input)
        
        # Assert
        # Validate against Pydantic schema or JSON schema
        output = OutputSchema(**result.data)
        assert output is not None
    
    def test_handles_edge_case_empty_collection(self, component):
        """Should handle empty collection input gracefully"""
        # Arrange
        edge_input = {"field_1": "value", "items": []}
        
        # Act
        result = component.process(edge_input)
        
        # Assert
        assert result.success == True
        assert result.data["item_count"] == 0
    
    def test_handles_edge_case_maximum_size(self, component):
        """Should handle maximum allowed input size"""
        # Arrange
        max_items = [{"id": i} for i in range(1000)]  # Max allowed
        large_input = {"field_1": "value", "items": max_items}
        
        # Act
        result = component.process(large_input)
        
        # Assert
        assert result.success == True


# =============================================================================
# ERROR HANDLING TESTS
# =============================================================================

class TestErrorHandling:
    """Test error handling and recovery"""
    
    def test_returns_error_for_invalid_input(self, component, invalid_input):
        """Should return structured error for invalid input"""
        # Act
        result = component.process(invalid_input)
        
        # Assert
        assert result.success == False
        assert result.error is not None
        assert result.error.code is not None
    
    def test_does_not_raise_exception_for_bad_input(self, component, invalid_input):
        """Should handle bad input without raising exception"""
        # Act & Assert (should not raise)
        result = component.process(invalid_input)
        assert result is not None
    
    def test_logs_error_details(self, component, invalid_input):
        """Should log error details for debugging"""
        # Arrange
        with patch('logging.Logger.error') as mock_log:
            # Act
            component.process(invalid_input)
            
            # Assert
            mock_log.assert_called()


# =============================================================================
# PERFORMANCE TESTS
# =============================================================================

class TestPerformance:
    """Test performance characteristics"""
    
    def test_processes_within_time_limit(self, component, valid_input):
        """Should complete processing within time limit"""
        import time
        
        # Arrange
        max_time_ms = 100
        
        # Act
        start = time.perf_counter()
        component.process(valid_input)
        elapsed_ms = (time.perf_counter() - start) * 1000
        
        # Assert
        assert elapsed_ms < max_time_ms
    
    def test_memory_usage_within_bounds(self, component, valid_input):
        """Should not exceed memory limits"""
        import tracemalloc
        
        # Arrange
        max_memory_mb = 50
        tracemalloc.start()
        
        # Act
        for _ in range(100):
            component.process(valid_input)
        
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        peak_mb = peak / 1024 / 1024
        
        # Assert
        assert peak_mb < max_memory_mb
```

### 3.2 Integration Test Template

```python
"""
Integration Tests for {Agent Name}
==================================
Tests agent interaction with tools, sub-agents, and external systems.
"""

import pytest
from unittest.mock import Mock, AsyncMock, patch
from typing import Dict, Any
import asyncio

from agents.{agent_module} import {AgentClass}
from agents.tools import {ToolClass}
from tests.fixtures import mock_llm_response, mock_tool_response


# =============================================================================
# FIXTURES
# =============================================================================

@pytest.fixture
def mock_llm():
    """Mock LLM client for testing"""
    mock = AsyncMock()
    mock.complete.return_value = mock_llm_response()
    return mock


@pytest.fixture
def mock_tool():
    """Mock tool for testing"""
    mock = AsyncMock()
    mock.execute.return_value = mock_tool_response()
    return mock


@pytest.fixture
def agent(mock_llm, mock_tool):
    """Create agent with mocked dependencies"""
    return {AgentClass}(
        llm_client=mock_llm,
        tools=[mock_tool]
    )


@pytest.fixture
def strategic_context() -> Dict[str, Any]:
    """Standard strategic context for testing"""
    return {
        "tenant_id": "test-tenant-001",
        "vision": "Test vision statement",
        "active_objectives": [
            {"id": "SO-001", "name": "Test Objective", "status": "active"}
        ],
        "current_okrs": [
            {"id": "OKR-001", "objective": "Test OKR", "progress": 50}
        ]
    }


# =============================================================================
# TOOL INTEGRATION TESTS
# =============================================================================

class TestToolIntegration:
    """Test agent-tool integration"""
    
    @pytest.mark.asyncio
    async def test_agent_invokes_correct_tool(self, agent, mock_tool):
        """Agent should select and invoke the appropriate tool"""
        # Arrange
        task = {"type": "analyze", "target": "test_entity"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        mock_tool.execute.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_agent_passes_correct_parameters_to_tool(self, agent, mock_tool):
        """Agent should pass correct parameters to tool"""
        # Arrange
        task = {"type": "analyze", "target": "test_entity", "depth": "full"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        call_args = mock_tool.execute.call_args
        assert call_args.kwargs["target"] == "test_entity"
        assert call_args.kwargs["depth"] == "full"
    
    @pytest.mark.asyncio
    async def test_agent_handles_tool_error(self, agent, mock_tool):
        """Agent should handle tool errors gracefully"""
        # Arrange
        mock_tool.execute.side_effect = Exception("Tool failed")
        task = {"type": "analyze", "target": "test_entity"}
        
        # Act
        result = await agent.execute(task)
        
        # Assert
        assert result.success == False
        assert "tool" in result.error.message.lower()
    
    @pytest.mark.asyncio
    async def test_agent_retries_on_transient_tool_error(self, agent, mock_tool):
        """Agent should retry on transient tool errors"""
        # Arrange
        mock_tool.execute.side_effect = [
            Exception("Transient error"),
            mock_tool_response()  # Succeeds on retry
        ]
        task = {"type": "analyze", "target": "test_entity"}
        
        # Act
        result = await agent.execute(task)
        
        # Assert
        assert result.success == True
        assert mock_tool.execute.call_count == 2


# =============================================================================
# SUB-AGENT INTEGRATION TESTS
# =============================================================================

class TestSubAgentIntegration:
    """Test agent-to-agent communication"""
    
    @pytest.fixture
    def mock_sub_agent(self):
        """Mock sub-agent for testing"""
        mock = AsyncMock()
        mock.execute.return_value = {"result": "sub_agent_output"}
        return mock
    
    @pytest.mark.asyncio
    async def test_agent_delegates_to_sub_agent(self, agent, mock_sub_agent):
        """Agent should delegate specialized tasks to sub-agents"""
        # Arrange
        agent.register_sub_agent("analyzer", mock_sub_agent)
        task = {"type": "complex_analysis", "requires_specialist": True}
        
        # Act
        await agent.execute(task)
        
        # Assert
        mock_sub_agent.execute.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_agent_transfers_context_to_sub_agent(self, agent, mock_sub_agent, strategic_context):
        """Agent should transfer context when delegating"""
        # Arrange
        agent.register_sub_agent("analyzer", mock_sub_agent)
        agent.set_context(strategic_context)
        task = {"type": "complex_analysis"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        call_args = mock_sub_agent.execute.call_args
        assert "context" in call_args.kwargs
        assert call_args.kwargs["context"]["tenant_id"] == "test-tenant-001"
    
    @pytest.mark.asyncio
    async def test_agent_validates_sub_agent_response(self, agent, mock_sub_agent):
        """Agent should validate responses from sub-agents"""
        # Arrange
        mock_sub_agent.execute.return_value = {"invalid": "response"}  # Missing required fields
        agent.register_sub_agent("analyzer", mock_sub_agent)
        task = {"type": "complex_analysis"}
        
        # Act
        result = await agent.execute(task)
        
        # Assert
        assert result.warnings is not None  # Should warn about invalid response


# =============================================================================
# CONTEXT INTEGRATION TESTS
# =============================================================================

class TestContextIntegration:
    """Test strategic context integration"""
    
    @pytest.mark.asyncio
    async def test_agent_receives_strategic_context(self, agent, strategic_context):
        """Agent should have access to strategic context"""
        # Arrange
        agent.set_context(strategic_context)
        
        # Act
        context = agent.get_strategic_context()
        
        # Assert
        assert context["vision"] == "Test vision statement"
        assert len(context["active_objectives"]) > 0
    
    @pytest.mark.asyncio
    async def test_agent_uses_context_in_decisions(self, agent, strategic_context, mock_llm):
        """Agent should incorporate strategic context in LLM calls"""
        # Arrange
        agent.set_context(strategic_context)
        task = {"type": "make_recommendation"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        call_args = mock_llm.complete.call_args
        prompt = call_args.kwargs["prompt"]
        assert "Test vision" in prompt or "SO-001" in prompt
    
    @pytest.mark.asyncio
    async def test_agent_calculates_alignment_score(self, agent, strategic_context):
        """Agent should calculate strategic alignment for actions"""
        # Arrange
        agent.set_context(strategic_context)
        action = {"type": "recommendation", "target_objective": "SO-001"}
        
        # Act
        alignment = agent.calculate_alignment(action)
        
        # Assert
        assert alignment.score >= 0.0
        assert alignment.score <= 1.0
        assert len(alignment.matched_objectives) > 0


# =============================================================================
# DATABASE INTEGRATION TESTS
# =============================================================================

class TestDatabaseIntegration:
    """Test agent database operations"""
    
    @pytest.fixture
    def mock_db(self):
        """Mock database client"""
        mock = AsyncMock()
        mock.query.return_value = [{"id": 1, "name": "test"}]
        mock.insert.return_value = {"id": 2}
        return mock
    
    @pytest.mark.asyncio
    async def test_agent_reads_from_database(self, agent, mock_db):
        """Agent should read data from database correctly"""
        # Arrange
        agent.set_db_client(mock_db)
        task = {"type": "lookup", "entity_id": "123"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        mock_db.query.assert_called()
    
    @pytest.mark.asyncio
    async def test_agent_writes_to_database(self, agent, mock_db):
        """Agent should write data to database correctly"""
        # Arrange
        agent.set_db_client(mock_db)
        task = {"type": "create", "data": {"name": "new_entity"}}
        
        # Act
        result = await agent.execute(task)
        
        # Assert
        mock_db.insert.assert_called()
        assert result.data["id"] is not None
    
    @pytest.mark.asyncio
    async def test_agent_respects_tenant_isolation(self, agent, mock_db, strategic_context):
        """Agent should only access data for current tenant"""
        # Arrange
        agent.set_context(strategic_context)
        agent.set_db_client(mock_db)
        task = {"type": "query", "table": "entities"}
        
        # Act
        await agent.execute(task)
        
        # Assert
        call_args = mock_db.query.call_args
        assert "tenant_id" in str(call_args) or strategic_context["tenant_id"] in str(call_args)
```

### 3.3 Behavioral Test Template

```python
"""
Behavioral Tests for {Agent Name}
=================================
Tests agent decision-making patterns and escalation behavior.
"""

import pytest
from unittest.mock import AsyncMock
from typing import Dict, Any

from agents.{agent_module} import {AgentClass}
from tests.fixtures import create_test_scenarios


# =============================================================================
# DECISION-MAKING TESTS
# =============================================================================

class TestDecisionMaking:
    """Test agent decision-making patterns"""
    
    @pytest.mark.asyncio
    async def test_agent_selects_optimal_tool_for_task(self, agent):
        """Agent should select the most appropriate tool for each task type"""
        # Arrange
        scenarios = [
            ({"type": "analyze"}, "analysis_tool"),
            ({"type": "generate"}, "generation_tool"),
            ({"type": "validate"}, "validation_tool"),
        ]
        
        for task, expected_tool in scenarios:
            # Act
            selection = await agent.select_tool(task)
            
            # Assert
            assert selection.tool_id == expected_tool, f"Failed for task type: {task['type']}"
    
    @pytest.mark.asyncio
    async def test_agent_explains_decision_reasoning(self, agent):
        """Agent should provide reasoning for decisions"""
        # Arrange
        task = {"type": "recommend", "options": ["A", "B", "C"]}
        
        # Act
        decision = await agent.make_decision(task)
        
        # Assert
        assert decision.reasoning is not None
        assert len(decision.reasoning) > 0
    
    @pytest.mark.asyncio
    async def test_agent_considers_multiple_factors(self, agent, strategic_context):
        """Agent should consider multiple factors in decisions"""
        # Arrange
        agent.set_context(strategic_context)
        complex_task = {
            "type": "prioritize",
            "items": [
                {"id": 1, "urgency": "high", "impact": "low"},
                {"id": 2, "urgency": "low", "impact": "high"},
                {"id": 3, "urgency": "medium", "impact": "medium"},
            ]
        }
        
        # Act
        decision = await agent.make_decision(complex_task)
        
        # Assert
        assert decision.factors_considered is not None
        assert "urgency" in decision.factors_considered
        assert "impact" in decision.factors_considered
        assert "strategic_alignment" in decision.factors_considered


# =============================================================================
# ESCALATION TESTS
# =============================================================================

class TestEscalation:
    """Test agent escalation behavior"""
    
    @pytest.mark.asyncio
    async def test_agent_escalates_on_low_confidence(self, agent):
        """Agent should escalate when confidence is below threshold"""
        # Arrange
        ambiguous_task = {"type": "unknown", "data": {}}
        
        # Act
        result = await agent.process(ambiguous_task)
        
        # Assert
        assert result.escalated == True
        assert result.escalation_reason == "low_confidence"
        assert result.confidence < 0.7
    
    @pytest.mark.asyncio
    async def test_agent_escalates_on_authority_boundary(self, agent):
        """Agent should escalate actions beyond authority"""
        # Arrange
        restricted_task = {"type": "delete", "target": "production_data"}
        
        # Act
        result = await agent.process(restricted_task)
        
        # Assert
        assert result.escalated == True
        assert result.escalation_reason == "authority_exceeded"
    
    @pytest.mark.asyncio
    async def test_agent_escalates_on_conflicting_rules(self, agent, strategic_context):
        """Agent should escalate when rules conflict"""
        # Arrange
        agent.set_context(strategic_context)
        conflicting_task = {
            "type": "recommend",
            "constraint_a": "minimize_cost",
            "constraint_b": "maximize_quality"  # Conflicts with cost
        }
        
        # Act
        result = await agent.process(conflicting_task)
        
        # Assert
        assert result.escalated == True
        assert "conflict" in result.escalation_reason.lower()
    
    @pytest.mark.asyncio
    async def test_agent_provides_escalation_context(self, agent):
        """Agent should provide full context when escalating"""
        # Arrange
        escalation_task = {"type": "sensitive_operation"}
        
        # Act
        result = await agent.process(escalation_task)
        
        # Assert
        assert result.escalated == True
        assert result.escalation_context is not None
        assert "task" in result.escalation_context
        assert "options" in result.escalation_context
        assert "recommendation" in result.escalation_context


# =============================================================================
# ALIGNMENT TESTS
# =============================================================================

class TestStrategicAlignment:
    """Test strategic alignment behavior"""
    
    @pytest.mark.asyncio
    async def test_agent_flags_misaligned_actions(self, agent, strategic_context):
        """Agent should flag actions that conflict with objectives"""
        # Arrange
        agent.set_context(strategic_context)
        misaligned_action = {
            "type": "recommendation",
            "action": "deprioritize_customer_satisfaction"  # Conflicts with customer objective
        }
        
        # Act
        evaluation = await agent.evaluate_action(misaligned_action)
        
        # Assert
        assert evaluation.is_aligned == False
        assert evaluation.conflict_reason is not None
        assert "SO-" in evaluation.conflict_reason
    
    @pytest.mark.asyncio
    async def test_agent_prioritizes_aligned_actions(self, agent, strategic_context):
        """Agent should prioritize actions aligned with objectives"""
        # Arrange
        agent.set_context(strategic_context)
        options = [
            {"id": "A", "impact_on_SO_001": 0.9},
            {"id": "B", "impact_on_SO_001": 0.3},
            {"id": "C", "impact_on_SO_001": 0.6},
        ]
        
        # Act
        ranked = await agent.rank_options(options)
        
        # Assert
        assert ranked[0]["id"] == "A"  # Highest alignment first
    
    @pytest.mark.asyncio
    async def test_agent_meets_minimum_alignment_threshold(self, agent, strategic_context):
        """Agent should not proceed with actions below alignment threshold"""
        # Arrange
        agent.set_context(strategic_context)
        agent.set_min_alignment_threshold(0.5)
        
        low_alignment_action = {"alignment_score": 0.3}
        
        # Act
        result = await agent.evaluate_action(low_alignment_action)
        
        # Assert
        assert result.proceed == False
        assert result.reason == "below_alignment_threshold"


# =============================================================================
# LEARNING/ADAPTATION TESTS
# =============================================================================

class TestAdaptation:
    """Test agent learning and adaptation behavior"""
    
    @pytest.mark.asyncio
    async def test_agent_improves_with_feedback(self, agent):
        """Agent should incorporate feedback to improve decisions"""
        # Arrange
        initial_task = {"type": "recommend", "options": ["A", "B"]}
        feedback = {"selected": "A", "outcome": "negative"}
        
        # Act - Initial recommendation
        initial_decision = await agent.make_decision(initial_task)
        
        # Provide feedback
        await agent.receive_feedback(feedback)
        
        # Act - Second recommendation
        second_decision = await agent.make_decision(initial_task)
        
        # Assert
        # Agent should adjust confidence or recommendation based on feedback
        assert second_decision.confidence != initial_decision.confidence or \
               second_decision.recommendation != initial_decision.recommendation
    
    @pytest.mark.asyncio
    async def test_agent_logs_decisions_for_analysis(self, agent):
        """Agent should log decisions for later analysis"""
        # Arrange
        task = {"type": "recommend"}
        
        # Act
        await agent.make_decision(task)
        
        # Assert
        logs = agent.get_decision_logs()
        assert len(logs) > 0
        assert logs[-1]["task"] == task
        assert logs[-1]["timestamp"] is not None
```

---

## 4. Coverage Requirements

### 4.1 Coverage Gates

| Stage | Minimum Coverage | Enforcement | Failure Action |
|-------|------------------|-------------|----------------|
| **Pre-commit** | 80% | Git hook | Block commit |
| **PR Creation** | 80% | CI check | Block PR |
| **PR Merge** | 85% | CI gate | Block merge |
| **Production Deploy** | 85% + E2E pass | Pipeline gate | Block deploy |

### 4.2 Coverage Configuration

```yaml
# pytest.ini or pyproject.toml
[tool.pytest.ini_options]
addopts = """
    --cov=agents
    --cov-report=term-missing
    --cov-report=html:coverage_html
    --cov-report=xml:coverage.xml
    --cov-fail-under=85
"""

[tool.coverage.run]
branch = true
source = ["agents"]
omit = [
    "*/tests/*",
    "*/migrations/*",
    "*/__pycache__/*",
]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise NotImplementedError",
    "if TYPE_CHECKING:",
]
```

### 4.3 Coverage by Module

| Module | Target | Current | Status |
|--------|--------|---------|--------|
| `agents/core/` | 90% | {X}% | 🟢/🟡/🔴 |
| `agents/discovery/` | 85% | {X}% | {status} |
| `agents/analysis/` | 85% | {X}% | {status} |
| `agents/generation/` | 85% | {X}% | {status} |
| `agents/tools/` | 90% | {X}% | {status} |
| `agents/skills/` | 90% | {X}% | {status} |
| **Overall** | **85%** | **{X}%** | **{status}** |

---

## 5. Test Data Management

### 5.1 Fixture Organization

```
tests/
├── fixtures/
│   ├── __init__.py
│   ├── contexts.py          # Strategic/domain/operational contexts
│   ├── agents.py            # Mock agents and configurations
│   ├── tools.py             # Mock tool responses
│   ├── llm_responses.py     # Mock LLM completions
│   ├── database.py          # Mock DB clients and data
│   └── scenarios.py         # Test scenario generators
├── data/
│   ├── valid_inputs/        # Valid input fixtures
│   ├── invalid_inputs/      # Invalid input fixtures
│   ├── edge_cases/          # Edge case fixtures
│   └── golden_outputs/      # Expected output fixtures
└── factories/
    ├── __init__.py
    ├── agent_factory.py     # Agent instance factories
    └── data_factory.py      # Test data factories
```

### 5.2 Fixture Templates

```python
# tests/fixtures/contexts.py

def create_strategic_context(
    tenant_id: str = "test-tenant-001",
    objectives: list = None,
    okrs: list = None
) -> dict:
    """Factory for strategic context fixtures"""
    return {
        "tenant_id": tenant_id,
        "vision": "Test vision for automated testing",
        "mission": "Test mission statement",
        "active_objectives": objectives or [
            {"id": "SO-001", "name": "Test Objective 1", "status": "active"},
            {"id": "SO-002", "name": "Test Objective 2", "status": "active"},
        ],
        "current_okrs": okrs or [
            {
                "id": "OKR-001",
                "objective": "Test OKR Objective",
                "key_results": [
                    {"id": "KR-001", "statement": "KR 1", "progress": 50},
                    {"id": "KR-002", "statement": "KR 2", "progress": 75},
                ]
            }
        ]
    }


def create_domain_context(
    ontologies: list = None,
    historical_data: dict = None
) -> dict:
    """Factory for domain context fixtures"""
    return {
        "ontologies": ontologies or ["customer-org", "ai-visibility"],
        "entity_data": {},
        "historical_context": historical_data or {
            "recent_performance": {"trend": "up", "delta": 15}
        }
    }
```

---

## 6. CI/CD Integration

### 6.1 GitHub Actions Workflow

```yaml
# .github/workflows/agent-tests.yml
name: Agent Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r requirements-dev.txt
      
      - name: Run unit tests
        run: |
          pytest tests/unit/ \
            --cov=agents \
            --cov-fail-under=90 \
            -v
  
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v4
      
      - name: Run integration tests
        run: |
          pytest tests/integration/ \
            --cov=agents \
            --cov-fail-under=85 \
            -v
  
  behavioral-tests:
    runs-on: ubuntu-latest
    needs: integration-tests
    steps:
      - uses: actions/checkout@v4
      
      - name: Run behavioral tests
        run: |
          pytest tests/behavioral/ \
            --cov=agents \
            --cov-fail-under=80 \
            -v
  
  coverage-gate:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests, behavioral-tests]
    steps:
      - name: Check overall coverage
        run: |
          pytest tests/ \
            --cov=agents \
            --cov-fail-under=85 \
            --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: coverage.xml
```

### 6.2 Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: agent-tests
        name: Agent Tests
        entry: pytest tests/unit/ --cov=agents --cov-fail-under=80 -q
        language: system
        pass_filenames: false
        always_run: true
```

---

## 7. Test Reporting

### 7.1 Report Template

```markdown
# Agent Test Report

**Date:** {YYYY-MM-DD}
**Build:** {build_number}
**Branch:** {branch_name}

## Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total Tests | {X} | - |
| Passed | {X} | 🟢 |
| Failed | {X} | 🔴 |
| Skipped | {X} | ⚪ |
| Coverage | {X}% | {🟢/🔴} |
| Duration | {X}s | - |

## Coverage by Agent

| Agent | Unit | Integration | Behavioral | Overall |
|-------|------|-------------|------------|---------|
| Discovery Agent | {X}% | {X}% | {X}% | {X}% |
| Analysis Agent | {X}% | {X}% | {X}% | {X}% |
| Generation Agent | {X}% | {X}% | {X}% | {X}% |

## Failed Tests

| Test | Category | Error | 
|------|----------|-------|
| {test_name} | {category} | {error_message} |

## Recommendations

{Auto-generated recommendations based on coverage gaps}
```

---

*Framework Version: 1.0.0 | Minimum Coverage: 85% | Last Updated: November 2025*
