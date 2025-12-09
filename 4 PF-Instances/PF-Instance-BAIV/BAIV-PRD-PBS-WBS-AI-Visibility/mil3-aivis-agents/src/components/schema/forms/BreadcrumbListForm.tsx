import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card } from '../../ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface BreadcrumbListFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function BreadcrumbListForm({ data, onChange }: BreadcrumbListFormProps) {
  const [items, setItems] = useState(data.itemListElement || [{ name: '', url: '' }, { name: '', url: '' }]);

  const updateItems = (newItems: any[]) => {
    setItems(newItems);
    onChange({ ...data, itemListElement: newItems });
  };

  const addItem = () => {
    updateItems([...items, { name: '', url: '' }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 2) {
      updateItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateItems(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Breadcrumb Items
        </h4>

        <div className="space-y-3">
          {items.map((item, index) => (
            <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-start gap-3">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-grab mt-3" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Position {index + 1}</span>
                    {items.length > 2 && (
                      <button
                        onClick={() => removeItem(index)}
                        className="text-[#ef4444] hover:text-[#dc2626]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`name-${index}`} className="flex items-center gap-1">
                      Item Name <span className="text-[#e84e1c]">*</span>
                    </Label>
                    <Input
                      id={`name-${index}`}
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      placeholder="Home"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`url-${index}`} className="flex items-center gap-1">
                      Item URL <span className="text-[#e84e1c]">*</span>
                    </Label>
                    <Input
                      id={`url-${index}`}
                      type="url"
                      value={item.url}
                      onChange={(e) => updateItem(index, 'url', e.target.value)}
                      placeholder="https://example.com"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Breadcrumb
          </Button>

          <p className="text-xs text-[#6b7280]">
            {items.length} items • Minimum 2 required
          </p>
        </div>
      </div>
    </div>
  );
}
