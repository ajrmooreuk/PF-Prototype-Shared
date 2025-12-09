import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Sparkles } from 'lucide-react';
import { SCHEMA_TYPES } from './schemaTypes';
import { ArticleForm } from './forms/ArticleForm';
import { FAQPageForm } from './forms/FAQPageForm';
import { ProductForm } from './forms/ProductForm';
import { OrganizationForm } from './forms/OrganizationForm';
import { PersonForm } from './forms/PersonForm';
import { LocalBusinessForm } from './forms/LocalBusinessForm';
import { HowToForm } from './forms/HowToForm';
import { VideoObjectForm } from './forms/VideoObjectForm';
import { BreadcrumbListForm } from './forms/BreadcrumbListForm';

interface DynamicFormProps {
  schemaType: string;
  formData: any;
  onChange: (data: any) => void;
  onGenerate: () => void;
}

export function DynamicForm({ schemaType, formData, onChange, onGenerate }: DynamicFormProps) {
  const schemaConfig = SCHEMA_TYPES.find(t => t.id === schemaType);
  const [clientId, setClientId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock clients
  const clients = [
    { id: 'client-1', name: 'Acme Corp' },
    { id: 'client-2', name: 'TechStart Inc' },
    { id: 'client-3', name: 'Global Solutions' }
  ];

  const handleGenerate = async () => {
    if (!clientId) {
      return;
    }
    setIsGenerating(true);
    await onGenerate();
    setIsGenerating(false);
  };

  const renderForm = () => {
    const formProps = {
      data: formData,
      onChange
    };

    switch (schemaType) {
      case 'Article':
        return <ArticleForm {...formProps} />;
      case 'FAQPage':
        return <FAQPageForm {...formProps} />;
      case 'Product':
        return <ProductForm {...formProps} />;
      case 'Organization':
        return <OrganizationForm {...formProps} />;
      case 'Person':
        return <PersonForm {...formProps} />;
      case 'LocalBusiness':
        return <LocalBusinessForm {...formProps} />;
      case 'HowTo':
        return <HowToForm {...formProps} />;
      case 'VideoObject':
        return <VideoObjectForm {...formProps} />;
      case 'BreadcrumbList':
        return <BreadcrumbListForm {...formProps} />;
      default:
        return <div>Select a schema type</div>;
    }
  };

  const isValid = clientId && Object.keys(formData).length > 0;

  return (
    <Card className="p-6 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{schemaConfig?.icon}</span>
          <Badge 
            className="text-white"
            style={{ 
              backgroundColor: schemaConfig?.color,
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '18px',
              padding: '6px 16px'
            }}
          >
            {schemaConfig?.name}
          </Badge>
        </div>

        {/* Client Selector */}
        <div className="flex items-center gap-2">
          <Label htmlFor="client" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            Client:
          </Label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger className="w-[200px] h-10 rounded-lg">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-[#e84e1c]">*</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {renderForm()}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="text-[#6b7280]"
          onClick={() => onChange({})}
        >
          Reset Form
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#02a4bf] text-[#02a4bf] h-11"
            disabled={!isValid}
          >
            Validate Only
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!isValid || isGenerating}
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11 px-6"
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Schema
              </>
            )}
          </Button>
        </div>
      </div>

      {isGenerating && (
        <p className="text-center text-[#6b7280] text-xs mt-2">
          ~2-5 seconds
        </p>
      )}
    </Card>
  );
}
