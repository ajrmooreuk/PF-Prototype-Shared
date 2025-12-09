import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface ProductFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProductForm({ data, onChange }: ProductFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Product Details
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-1">
              Product Name <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="name"
              value={data.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Product Name"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="description" className="flex items-center gap-1">
              Description <span className="text-[#e84e1c]">*</span>
            </Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Product description..."
              rows={4}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="image" className="flex items-center gap-1">
              Image URL <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="image"
              type="url"
              value={data.image || ''}
              onChange={(e) => updateField('image', e.target.value)}
              placeholder="https://example.com/product.jpg"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="brand" className="flex items-center gap-1">
              Brand <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="brand"
              value={data.brand || ''}
              onChange={(e) => updateField('brand', e.target.value)}
              placeholder="Brand Name"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Pricing & Availability
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="price" className="flex items-center gap-1">
              Price <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={data.price || ''}
              onChange={(e) => updateField('price', parseFloat(e.target.value))}
              placeholder="99.99"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="currency" className="flex items-center gap-1">
              Currency <span className="text-[#e84e1c]">*</span>
            </Label>
            <Select value={data.currency || 'USD'} onValueChange={(v) => updateField('currency', v)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="availability" className="flex items-center gap-1">
              Availability <span className="text-[#e84e1c]">*</span>
            </Label>
            <Select value={data.availability || 'InStock'} onValueChange={(v) => updateField('availability', v)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="InStock">In Stock</SelectItem>
                <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                <SelectItem value="PreOrder">Pre-Order</SelectItem>
                <SelectItem value="Discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
