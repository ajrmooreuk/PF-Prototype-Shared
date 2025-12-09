import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search } from 'lucide-react';
import { SCHEMA_TYPES, QUICK_TEMPLATES } from './schemaTypes';

interface SchemaTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function SchemaTypeSelector({ selectedType, onTypeChange }: SchemaTypeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = SCHEMA_TYPES.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-5 rounded-2xl shadow-sm h-fit sticky top-20">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Schema Type
        </h3>
        <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          Choose content type
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search schema types..."
          className="pl-10 h-10 rounded-lg"
          style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
        />
      </div>

      {/* Schema Type Cards */}
      <div className="space-y-3 mb-6">
        {filteredTypes.map((type) => {
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#02a4bf] text-white border-[#02a4bf] shadow-md'
                  : 'bg-white text-[#231f20] border-gray-200 hover:bg-[#f0f9fb] hover:border-[#02a4bf]'
              }`}
              style={{
                borderLeftWidth: isSelected ? '3px' : '1px'
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{type.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className={isSelected ? 'text-white' : 'text-[#231f20]'}
                      style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                    >
                      {type.name}
                    </span>
                    <span 
                      className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#6b7280]'}`}
                      style={{ fontFamily: 'Open Sans' }}
                    >
                      ({type.requiredFields} fields)
                    </span>
                  </div>
                  <p 
                    className={`text-xs ${isSelected ? 'text-white/90' : 'text-[#6b7280]'}`}
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Templates */}
      <div className="border-t border-gray-200 pt-4">
        <h4 
          className="text-[#231f20] mb-3"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
        >
          Quick Templates
        </h4>
        <div>
          <Label htmlFor="template" className="text-xs" style={{ fontFamily: 'Open Sans' }}>
            Load Template
          </Label>
          <Select>
            <SelectTrigger className="h-10 mt-2 rounded-lg">
              <SelectValue placeholder="Choose template..." />
            </SelectTrigger>
            <SelectContent>
              {QUICK_TEMPLATES.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
