export interface SchemaType {
  id: string;
  icon: string;
  name: string;
  description: string;
  requiredFields: number;
  color: string;
}

export const SCHEMA_TYPES: SchemaType[] = [
  {
    id: 'Article',
    icon: '📄',
    name: 'Article',
    description: 'Blog posts, news articles, guides',
    requiredFields: 6,
    color: '#3b82f6'
  },
  {
    id: 'FAQPage',
    icon: '❓',
    name: 'FAQ Page',
    description: 'Frequently asked questions',
    requiredFields: 2,
    color: '#f59e0b'
  },
  {
    id: 'Product',
    icon: '🛍️',
    name: 'Product',
    description: 'E-commerce product listings',
    requiredFields: 5,
    color: '#8b5cf6'
  },
  {
    id: 'Organization',
    icon: '🏢',
    name: 'Organization',
    description: 'Company information',
    requiredFields: 4,
    color: '#231f20'
  },
  {
    id: 'Person',
    icon: '👤',
    name: 'Person',
    description: 'Author or staff profiles',
    requiredFields: 3,
    color: '#02a4bf'
  },
  {
    id: 'LocalBusiness',
    icon: '📍',
    name: 'Local Business',
    description: 'Physical business locations',
    requiredFields: 6,
    color: '#10b981'
  },
  {
    id: 'HowTo',
    icon: '📋',
    name: 'How-To',
    description: 'Step-by-step instructions',
    requiredFields: 4,
    color: '#e84e1c'
  },
  {
    id: 'VideoObject',
    icon: '🎥',
    name: 'Video',
    description: 'Video content markup',
    requiredFields: 5,
    color: '#ef4444'
  },
  {
    id: 'BreadcrumbList',
    icon: '🔗',
    name: 'Breadcrumb',
    description: 'Navigation paths',
    requiredFields: 2,
    color: '#6b7280'
  }
];

export const QUICK_TEMPLATES = [
  {
    id: 'blog-post',
    name: 'Blog Post Standard',
    schemaType: 'Article',
    data: {
      headline: 'The Ultimate Guide to Content Marketing',
      description: 'Learn the essential strategies for successful content marketing in 2025.',
      image: 'https://example.com/images/content-marketing.jpg',
      datePublished: new Date().toISOString().split('T')[0],
      author: {
        name: 'Jane Doe',
        url: 'https://example.com/authors/jane-doe'
      },
      publisher: {
        name: 'Your Company',
        logo: 'https://example.com/logo.png'
      }
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Product',
    schemaType: 'Product',
    data: {
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      image: 'https://example.com/products/headphones.jpg',
      brand: 'AudioTech',
      sku: 'AT-WH-001',
      price: 199.99,
      currency: 'USD',
      availability: 'InStock'
    }
  },
  {
    id: 'local-service',
    name: 'Local Service Business',
    schemaType: 'LocalBusiness',
    data: {
      name: 'Downtown Coffee Shop',
      businessType: 'CafeOrCoffeeShop',
      image: 'https://example.com/coffee-shop.jpg',
      url: 'https://example.com',
      telephone: '+1-555-123-4567',
      address: {
        streetAddress: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
        country: 'US'
      }
    }
  }
];
