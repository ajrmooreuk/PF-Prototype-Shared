import { useState } from 'react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { SchemaTypeSelector } from './SchemaTypeSelector';
import { DynamicForm } from './DynamicForm';
import { JSONPreview } from './JSONPreview';
import { SCHEMA_TYPES } from './schemaTypes';
import type { ICPContext } from '../../lib/icpAPI';

interface GenerateTabProps {
  onSave: () => void;
  tenantId: string;
  jwtToken: string;
  icpEnabled: boolean;
  icpContext: ICPContext | null;
}

export function GenerateTab({ onSave, tenantId, jwtToken, icpEnabled, icpContext }: GenerateTabProps) {
  const [selectedType, setSelectedType] = useState(SCHEMA_TYPES[0].id);
  const [formData, setFormData] = useState<any>({});
  const [generatedSchema, setGeneratedSchema] = useState<any>(null);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'pending' | 'not-generated'>('not-generated');

  const handleFormChange = (data: any) => {
    setFormData(data);
    // Update preview in real-time with debounce
    updatePreview(data);
  };

  const updatePreview = (data: any) => {
    // Build JSON-LD preview locally
    if (Object.keys(data).length > 0) {
      const preview = buildJSONLD(selectedType, data);
      setGeneratedSchema(preview);
      setValidationStatus('pending');
    }
  };

  const buildJSONLD = (type: string, data: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };
  };

  const handleGenerate = async () => {
    setValidationStatus('pending');
    
    try {
      const result = await callEccoAPI('/content-studio/schema', 'POST', {
        content_type: selectedType,
        data: formData
        // use_discovery_insights: true is auto-added
      });
      
      const schema = result.schema || buildJSONLD(selectedType, formData);
      setGeneratedSchema(schema);
      setValidationStatus(result.validation_status || 'valid');
    } catch (error) {
      console.error('Schema generation error:', error);
      setValidationStatus('invalid');
      // Fallback to local generation
      const schema = buildJSONLD(selectedType, formData);
      setGeneratedSchema(schema);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[25fr_45fr_30fr] gap-5">
      {/* Left Column - Schema Type Selector */}
      <SchemaTypeSelector
        selectedType={selectedType}
        onTypeChange={(type) => {
          setSelectedType(type);
          setFormData({});
          setGeneratedSchema(null);
          setValidationStatus('not-generated');
        }}
      />

      {/* Middle Column - Dynamic Form */}
      <DynamicForm
        schemaType={selectedType}
        formData={formData}
        onChange={handleFormChange}
        onGenerate={handleGenerate}
      />

      {/* Right Column - JSON Preview */}
      <JSONPreview
        schema={generatedSchema}
        validationStatus={validationStatus}
        onSave={onSave}
      />
    </div>
  );
}