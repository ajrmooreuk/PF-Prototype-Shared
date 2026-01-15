/**
 * BAIV Design Token Extraction Validator
 * 
 * Validates completeness and accuracy of Figma-to-JSON token extraction
 * by comparing source data with output JSON structure
 * 
 * @context https://schema.org
 * @type SoftwareSourceCode
 */

const fs = require('fs');
const path = require('path');

// Source data from Figma MCP extraction
const FIGMA_SOURCE_TOKENS = {
  "var(--sds-size-radius-400)": "16",
  "var(--sds-size-stroke-border)": "1",
  "var(--sds-color-border-utilities-swatch)": "#0000003d",
  "var(--sds-size-depth-0)": "0",
  "var(--sds-color-black-100)": "#0c0c0d0d",
  "var(--sds-size-depth-100)": "4",
  "var(--sds-color-black-200)": "#0c0c0d1a",
  "var(--sds-size-depth-025)": "1",
  "Drop Shadow/200": "Effect(type: DROP_SHADOW, color: var(--sds-color-black-100), offset: (var(--sds-size-depth-0), var(--sds-size-depth-025)), radius: var(--sds-size-depth-100), spread: var(--sds-size-depth-0)); Effect(type: DROP_SHADOW, color: var(--sds-color-black-200), offset: (var(--sds-size-depth-0), var(--sds-size-depth-025)), radius: var(--sds-size-depth-100), spread: var(--sds-size-depth-0))",
  "var(--sds-color-border-default-default)": "#d9d9d9",
  "Text/Neutral/Primary": "#1d1a22",
  "var(--sds-typography-scale-03)": "16",
  "var(--sds-size-space-200)": "8",
  "var(--sds-size-space-100)": "4",
  "var(--sds-size-radius-200)": "8",
  "Background/Neutral/Secondary": "#f7f6f8",
  "Border/Neutral/Inverse/Primary": "#3a3445",
  "Background/Neutral/Inverse/Teriary": "#574d69",
  "Background/Neutral/Primary": "#ffffff",
  "Radius/XL": "24"
};

class TokenExtractionValidator {
  constructor(sourcePath, outputPath, auditPath) {
    this.sourcePath = sourcePath;
    this.outputPath = outputPath;
    this.auditPath = auditPath;
    this.results = {
      timestamp: new Date().toISOString(),
      totalSourceTokens: 0,
      totalOutputTokens: 0,
      matched: [],
      missing: [],
      extraTokens: [],
      valueDiscrepancies: [],
      structureValidation: {
        schemaOrgCompliant: false,
        propertyValuesValid: false,
        categoriesComplete: false
      }
    };
  }

  /**
   * Load and parse JSON files
   */
  loadFiles() {
    try {
      this.outputData = JSON.parse(fs.readFileSync(this.outputPath, 'utf8'));
      this.auditData = JSON.parse(fs.readFileSync(this.auditPath, 'utf8'));
      return true;
    } catch (error) {
      console.error('Error loading files:', error.message);
      return false;
    }
  }

  /**
   * Extract all PropertyValue tokens from JSON-LD output
   */
  extractOutputTokens() {
    const tokens = {};
    
    if (!this.outputData?.about?.hasDefinedTerm) {
      return tokens;
    }

    this.outputData.about.hasDefinedTerm.forEach(term => {
      if (term.additionalProperty) {
        term.additionalProperty.forEach(prop => {
          if (prop.propertyID && prop.value) {
            tokens[prop.propertyID] = prop.value;
          }
        });
      }
    });

    return tokens;
  }

  /**
   * Validate schema.org compliance
   */
  validateSchemaCompliance() {
    const required = ['@context', '@type', 'about'];
    const hasRequired = required.every(key => this.outputData[key]);
    
    this.results.structureValidation.schemaOrgCompliant = 
      hasRequired && 
      this.outputData['@context'] === 'https://schema.org' &&
      this.outputData['@type'] === 'CreativeWork';
    
    return this.results.structureValidation.schemaOrgCompliant;
  }

  /**
   * Validate PropertyValue structure
   */
  validatePropertyValues() {
    let allValid = true;
    
    if (!this.outputData?.about?.hasDefinedTerm) {
      return false;
    }

    this.outputData.about.hasDefinedTerm.forEach(term => {
      if (!term['@type'] || term['@type'] !== 'DefinedTerm') {
        allValid = false;
      }
      
      if (term.additionalProperty) {
        term.additionalProperty.forEach(prop => {
          if (!prop['@type'] || prop['@type'] !== 'PropertyValue') {
            allValid = false;
          }
          if (!prop.propertyID || !prop.value) {
            allValid = false;
          }
        });
      }
    });

    this.results.structureValidation.propertyValuesValid = allValid;
    return allValid;
  }

  /**
   * Compare source tokens with output tokens
   */
  compareTokens() {
    const outputTokens = this.extractOutputTokens();
    
    this.results.totalSourceTokens = Object.keys(FIGMA_SOURCE_TOKENS).length;
    this.results.totalOutputTokens = Object.keys(outputTokens).length;

    // Check for missing tokens
    for (const [key, value] of Object.entries(FIGMA_SOURCE_TOKENS)) {
      if (!outputTokens[key]) {
        this.results.missing.push({
          token: key,
          expectedValue: value,
          status: 'MISSING_FROM_OUTPUT'
        });
      } else if (outputTokens[key] !== value) {
        this.results.valueDiscrepancies.push({
          token: key,
          expectedValue: value,
          actualValue: outputTokens[key],
          status: 'VALUE_MISMATCH'
        });
      } else {
        this.results.matched.push({
          token: key,
          value: value,
          status: 'VALIDATED'
        });
      }
    }

    // Check for extra tokens
    for (const key of Object.keys(outputTokens)) {
      if (!FIGMA_SOURCE_TOKENS[key]) {
        this.results.extraTokens.push({
          token: key,
          value: outputTokens[key],
          status: 'EXTRA_IN_OUTPUT'
        });
      }
    }
  }

  /**
   * Validate audit trail completeness
   */
  validateAuditTrail() {
    if (!this.auditData?.audit?.mappings) {
      return false;
    }

    const auditMappingCount = this.auditData.audit.mappings.length;
    const sourceTokenCount = Object.keys(FIGMA_SOURCE_TOKENS).length;

    return auditMappingCount === sourceTokenCount;
  }

  /**
   * Calculate completeness metrics
   */
  calculateMetrics() {
    const total = this.results.totalSourceTokens;
    const matched = this.results.matched.length;
    const missing = this.results.missing.length;
    const discrepancies = this.results.valueDiscrepancies.length;

    return {
      completenessPercentage: ((matched / total) * 100).toFixed(2),
      accuracyPercentage: (((matched - discrepancies) / total) * 100).toFixed(2),
      missingPercentage: ((missing / total) * 100).toFixed(2),
      totalValidated: matched,
      totalMissing: missing,
      totalDiscrepancies: discrepancies
    };
  }

  /**
   * Generate validation report
   */
  generateReport() {
    const metrics = this.calculateMetrics();
    
    const report = {
      "@context": "https://schema.org",
      "@type": "Report",
      "name": "BAIV Token Extraction Validation Report",
      "dateCreated": this.results.timestamp,
      "about": {
        "@type": "Dataset",
        "name": "Token Extraction Validation",
        "description": "Automated validation of Figma-to-JSON token extraction"
      },
      "abstract": {
        "totalSourceTokens": this.results.totalSourceTokens,
        "totalOutputTokens": this.results.totalOutputTokens,
        "completeness": `${metrics.completenessPercentage}%`,
        "accuracy": `${metrics.accuracyPercentage}%`,
        "status": metrics.completenessPercentage === "100.00" && 
                  metrics.accuracyPercentage === "100.00" ? 
                  "PASS" : "FAIL"
      },
      "validation": {
        "schemaCompliance": this.results.structureValidation,
        "tokenComparison": {
          "matched": this.results.matched.length,
          "missing": this.results.missing.length,
          "valueDiscrepancies": this.results.valueDiscrepancies.length,
          "extraTokens": this.results.extraTokens.length
        },
        "auditTrailComplete": this.validateAuditTrail()
      },
      "details": {
        "matchedTokens": this.results.matched,
        "missingTokens": this.results.missing,
        "valueDiscrepancies": this.results.valueDiscrepancies,
        "extraTokens": this.results.extraTokens
      },
      "recommendations": this.generateRecommendations(metrics)
    };

    return report;
  }

  /**
   * Generate recommendations based on validation results
   */
  generateRecommendations(metrics) {
    const recommendations = [];

    if (parseFloat(metrics.completenessPercentage) < 100) {
      recommendations.push({
        priority: "HIGH",
        issue: "Incomplete token extraction",
        recommendation: "Re-run Figma MCP extraction to capture all tokens",
        affectedTokens: this.results.missing.map(t => t.token)
      });
    }

    if (this.results.valueDiscrepancies.length > 0) {
      recommendations.push({
        priority: "HIGH",
        issue: "Value mismatches detected",
        recommendation: "Review transformation logic for affected tokens",
        affectedTokens: this.results.valueDiscrepancies.map(t => t.token)
      });
    }

    if (!this.results.structureValidation.schemaOrgCompliant) {
      recommendations.push({
        priority: "MEDIUM",
        issue: "Schema.org structure not fully compliant",
        recommendation: "Ensure @context, @type, and required properties are present"
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: "INFO",
        status: "SUCCESS",
        message: "All tokens successfully extracted and validated",
        nextSteps: [
          "Generate code outputs (CSS, SCSS, JS, Tailwind)",
          "Integrate tokens into design system",
          "Set up continuous validation pipeline"
        ]
      });
    }

    return recommendations;
  }

  /**
   * Run complete validation suite
   */
  async validate() {
    console.log('🔍 Starting BAIV Token Extraction Validation...\n');

    // Load files
    console.log('📂 Loading files...');
    if (!this.loadFiles()) {
      console.error('❌ Failed to load files');
      return null;
    }
    console.log('✅ Files loaded successfully\n');

    // Validate schema compliance
    console.log('🔍 Validating schema.org compliance...');
    this.validateSchemaCompliance();
    console.log(`${this.results.structureValidation.schemaOrgCompliant ? '✅' : '❌'} Schema compliance: ${this.results.structureValidation.schemaOrgCompliant}\n`);

    // Validate PropertyValue structure
    console.log('🔍 Validating PropertyValue structure...');
    this.validatePropertyValues();
    console.log(`${this.results.structureValidation.propertyValuesValid ? '✅' : '❌'} PropertyValue structure: ${this.results.structureValidation.propertyValuesValid}\n`);

    // Compare tokens
    console.log('🔍 Comparing source and output tokens...');
    this.compareTokens();
    
    const metrics = this.calculateMetrics();
    console.log(`📊 Metrics:`);
    console.log(`   Total Source Tokens: ${this.results.totalSourceTokens}`);
    console.log(`   Total Output Tokens: ${this.results.totalOutputTokens}`);
    console.log(`   Matched: ${this.results.matched.length}`);
    console.log(`   Missing: ${this.results.missing.length}`);
    console.log(`   Discrepancies: ${this.results.valueDiscrepancies.length}`);
    console.log(`   Completeness: ${metrics.completenessPercentage}%`);
    console.log(`   Accuracy: ${metrics.accuracyPercentage}%\n`);

    // Generate report
    const report = this.generateReport();
    
    // Save report
    const reportPath = path.join(__dirname, 'baiv-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Validation report saved to: ${reportPath}\n`);

    // Display status
    if (report.abstract.status === 'PASS') {
      console.log('✅ VALIDATION PASSED - All tokens extracted and validated successfully!');
    } else {
      console.log('❌ VALIDATION FAILED - Issues detected. Review recommendations in report.');
    }

    return report;
  }
}

// Main execution
async function main() {
  const validator = new TokenExtractionValidator(
    './baiv-design-tokens.json',      // Source output file
    './baiv-design-tokens.json',      // Output JSON-LD file
    './baiv-token-audit-framework.json' // Audit framework file
  );

  const report = await validator.validate();
  
  if (report && report.abstract.status === 'PASS') {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Export for use as module
module.exports = TokenExtractionValidator;

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}
