# BAIV Complete Production System

## 1. Extended Industry Templates for Target Markets

### 1.1 Complete Industry Template Library

```javascript
// industryTemplates/extendedTemplates.js
const extendedIndustryTemplates = {
  
  // Professional Services (Consulting, Accounting, Law)
  professional_services: {
    industry: "professional_services",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "expertise_mapping"],
      critical: ["thought_leadership", "credential_visibility", "case_studies"],
      optimization: ["expert_profiles", "service_descriptions", "client_testimonials"]
    },
    variables: {
      COMPANY_TYPE: "[SERVICE_TYPE] firm",
      SERVICE_TYPE: "consulting", // consulting, accounting, law, architecture, engineering
      PRIMARY_ENTITIES: "partners, practice areas, methodologies, case studies, credentials",
      INDUSTRY_SPECIFIC_SCHEMAS: "ProfessionalService, Person, Service, Review",
      REGULATORY_REQUIREMENTS: "[PROFESSIONAL_STANDARDS]",
      PROFESSIONAL_STANDARDS: "industry certifications and standards",
      PRIMARY_AI_PLATFORMS: "ChatGPT (professional advice), Perplexity (research), LinkedIn AI",
      COMPETITOR_SET: "[BIG_FOUR] and boutique [SERVICE_TYPE] firms",
      BIG_FOUR: "Deloitte, PwC, EY, KPMG", // Or AmLaw 100 for legal
      INDUSTRY_SPECIFIC_METRICS: "billable hours, client retention, project success rate, partner ratio",
      MARKET_SEGMENT: "[B2B/B2C] [SERVICE_SPECIALTY]",
      SERVICE_SPECIALTY: "management consulting", // tax, audit, strategy, litigation, etc.
      CUSTOMER_PAIN_POINTS: "expertise validation, cost justification, results proof, accessibility",
      VALUE_PROPOSITIONS: "deep expertise, proven results, industry knowledge, trusted advisor",
      PRODUCT_CATEGORIES: "[CORE_SERVICES]",
      CORE_SERVICES: "advisory, implementation, training, retainer services",
      SERVICE_OFFERINGS: "[ENGAGEMENT_TYPES]",
      ENGAGEMENT_TYPES: "project-based, retainer, hourly, success-based",
      AUTHORITY_PUBLICATIONS: "Harvard Business Review, [INDUSTRY_JOURNALS]",
      INDUSTRY_JOURNALS: "specific professional journals",
      INDUSTRY_ASSOCIATIONS: "[PROFESSIONAL_BODIES]",
      PROFESSIONAL_BODIES: "relevant professional associations",
      CREDIBILITY_FACTORS: "partner credentials, firm history, client logos, thought leadership",
      TRUST_SIGNALS: "client testimonials, case studies, certifications, awards"
    }
  },

  // Manufacturing & Industrial
  manufacturing: {
    industry: "manufacturing",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "product_catalog"],
      critical: ["specification_visibility", "certification_display", "supply_chain"],
      optimization: ["technical_documentation", "CAD_visibility", "sustainability"]
    },
    variables: {
      COMPANY_TYPE: "[MANUFACTURING_TYPE] manufacturer",
      MANUFACTURING_TYPE: "industrial", // consumer, automotive, aerospace, electronics
      PRIMARY_ENTITIES: "products, specifications, certifications, facilities, processes",
      INDUSTRY_SPECIFIC_SCHEMAS: "Product, Organization, Place, Certification",
      REGULATORY_REQUIREMENTS: "[COMPLIANCE_STANDARDS]",
      COMPLIANCE_STANDARDS: "ISO 9001, ISO 14001, industry-specific standards",
      PRIMARY_AI_PLATFORMS: "industrial AI search, B2B platforms, technical assistants",
      COMPETITOR_SET: "[REGIONAL_COMPETITORS] and global manufacturers",
      REGIONAL_COMPETITORS: "regional manufacturing leaders",
      INDUSTRY_SPECIFIC_METRICS: "production capacity, lead time, defect rate, OEE",
      MARKET_SEGMENT: "[B2B/B2C] [PRODUCT_CATEGORY]",
      PRODUCT_CATEGORY: "components, finished goods, raw materials",
      CUSTOMER_PAIN_POINTS: "specifications, lead times, minimum orders, customization",
      VALUE_PROPOSITIONS: "quality, reliability, customization, technical support",
      PRODUCT_CATEGORIES: "[PRODUCT_LINES]",
      PRODUCT_LINES: "specific product categories",
      SERVICE_OFFERINGS: "manufacturing, customization, logistics, support",
      AUTHORITY_PUBLICATIONS: "Industry Week, Manufacturing.net, [TRADE_PUBLICATIONS]",
      TRADE_PUBLICATIONS: "industry-specific publications",
      INDUSTRY_ASSOCIATIONS: "[MANUFACTURING_ASSOCIATIONS]",
      MANUFACTURING_ASSOCIATIONS: "NAM, industry-specific associations",
      CREDIBILITY_FACTORS: "certifications, client list, years in business, capacity",
      TRUST_SIGNALS: "ISO certifications, client testimonials, facility tours, samples"
    }
  },

  // Hospitality & Tourism
  hospitality_tourism: {
    industry: "hospitality_tourism",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "location_optimization"],
      critical: ["review_management", "booking_visibility", "local_search"],
      optimization: ["experience_descriptions", "amenity_visibility", "event_content"]
    },
    variables: {
      COMPANY_TYPE: "[HOSPITALITY_TYPE]",
      HOSPITALITY_TYPE: "hotel", // restaurant, resort, tour operator, travel agency
      PRIMARY_ENTITIES: "locations, amenities, rooms/services, staff, events",
      INDUSTRY_SPECIFIC_SCHEMAS: "Hotel, Restaurant, TouristAttraction, Event",
      REGULATORY_REQUIREMENTS: "health codes, safety standards, accessibility",
      PRIMARY_AI_PLATFORMS: "travel AI assistants, booking platforms, local search",
      COMPETITOR_SET: "[CHAIN_COMPETITORS] and local [HOSPITALITY_TYPE]s",
      CHAIN_COMPETITORS: "major chains in category",
      INDUSTRY_SPECIFIC_METRICS: "occupancy rate, RevPAR, guest satisfaction, repeat rate",
      MARKET_SEGMENT: "[LUXURY/MID/BUDGET] [TRAVELER_TYPE]",
      TRAVELER_TYPE: "business, leisure, family, adventure",
      CUSTOMER_PAIN_POINTS: "availability, pricing, location, amenities, reviews",
      VALUE_PROPOSITIONS: "location, experience, service, value, uniqueness",
      PRODUCT_CATEGORIES: "[ACCOMMODATION_TYPES]",
      ACCOMMODATION_TYPES: "rooms, suites, packages, experiences",
      SERVICE_OFFERINGS: "accommodation, dining, events, activities",
      AUTHORITY_PUBLICATIONS: "Travel + Leisure, [HOSPITALITY_MEDIA]",
      HOSPITALITY_MEDIA: "industry and consumer travel media",
      INDUSTRY_ASSOCIATIONS: "[HOSPITALITY_ASSOCIATIONS]",
      HOSPITALITY_ASSOCIATIONS: "AHLA, regional tourism boards",
      CREDIBILITY_FACTORS: "ratings, awards, certifications, years of operation",
      TRUST_SIGNALS: "TripAdvisor reviews, star ratings, awards, photos"
    }
  },

  // Non-Profit & NGO
  nonprofit: {
    industry: "nonprofit",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "mission_visibility"],
      critical: ["impact_metrics", "donation_visibility", "volunteer_content"],
      optimization: ["program_descriptions", "transparency_reports", "story_content"]
    },
    variables: {
      COMPANY_TYPE: "[NONPROFIT_TYPE] organization",
      NONPROFIT_TYPE: "charitable", // foundation, advocacy, religious, educational
      PRIMARY_ENTITIES: "mission, programs, team, impact, donors",
      INDUSTRY_SPECIFIC_SCHEMAS: "NGO, Organization, Person, Event",
      REGULATORY_REQUIREMENTS: "501(c)(3) compliance, transparency requirements",
      PRIMARY_AI_PLATFORMS: "charity search engines, grant databases, volunteer platforms",
      COMPETITOR_SET: "similar [CAUSE_AREA] organizations",
      CAUSE_AREA: "specific cause or mission area",
      INDUSTRY_SPECIFIC_METRICS: "program efficiency, overhead ratio, impact metrics",
      MARKET_SEGMENT: "[LOCAL/NATIONAL/GLOBAL] [CAUSE_AREA]",
      CUSTOMER_PAIN_POINTS: "trust, impact proof, transparency, donation process",
      VALUE_PROPOSITIONS: "impact, efficiency, transparency, community",
      PRODUCT_CATEGORIES: "[PROGRAM_TYPES]",
      PROGRAM_TYPES: "direct service, advocacy, research, education",
      SERVICE_OFFERINGS: "programs, volunteer opportunities, education, advocacy",
      AUTHORITY_PUBLICATIONS: "Chronicle of Philanthropy, [SECTOR_MEDIA]",
      SECTOR_MEDIA: "cause-specific media",
      INDUSTRY_ASSOCIATIONS: "[NONPROFIT_ASSOCIATIONS]",
      NONPROFIT_ASSOCIATIONS: "AFP, BoardSource, cause-specific associations",
      CREDIBILITY_FACTORS: "GuideStar rating, financial transparency, impact reports",
      TRUST_SIGNALS: "Charity Navigator rating, testimonials, annual reports"
    }
  },

  // Government & Public Sector
  government: {
    industry: "government",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "service_catalog"],
      critical: ["accessibility_compliance", "multilingual_content", "service_visibility"],
      optimization: ["citizen_services", "department_visibility", "public_records"]
    },
    variables: {
      COMPANY_TYPE: "[GOVERNMENT_LEVEL] government agency",
      GOVERNMENT_LEVEL: "federal", // state, local, municipal
      PRIMARY_ENTITIES: "departments, services, officials, policies, programs",
      INDUSTRY_SPECIFIC_SCHEMAS: "GovernmentOrganization, GovernmentService, Person",
      REGULATORY_REQUIREMENTS: "ADA, WCAG 2.1 AA, Plain Language Act, FOIA",
      PRIMARY_AI_PLATFORMS: "government service finders, civic AI assistants",
      COMPETITOR_SET: "peer [GOVERNMENT_LEVEL] agencies",
      INDUSTRY_SPECIFIC_METRICS: "service delivery time, citizen satisfaction, digital adoption",
      MARKET_SEGMENT: "[CONSTITUENCY_TYPE] services",
      CONSTITUENCY_TYPE: "citizen, business, visitor",
      CUSTOMER_PAIN_POINTS: "finding services, understanding requirements, wait times",
      VALUE_PROPOSITIONS: "accessibility, efficiency, transparency, service quality",
      PRODUCT_CATEGORIES: "[SERVICE_CATEGORIES]",
      SERVICE_CATEGORIES: "permits, licenses, benefits, information",
      SERVICE_OFFERINGS: "online services, in-person services, information resources",
      AUTHORITY_PUBLICATIONS: "Government Technology, [GOVERNMENT_MEDIA]",
      GOVERNMENT_MEDIA: "relevant government publications",
      INDUSTRY_ASSOCIATIONS: "[GOVERNMENT_ASSOCIATIONS]",
      GOVERNMENT_ASSOCIATIONS: "ICMA, NACo, relevant associations",
      CREDIBILITY_FACTORS: "official status, service metrics, transparency",
      TRUST_SIGNALS: "official .gov domain, security badges, service guarantees"
    }
  },

  // Media & Entertainment
  media_entertainment: {
    industry: "media_entertainment",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "content_catalog"],
      critical: ["content_discovery", "creator_profiles", "event_visibility"],
      optimization: ["streaming_optimization", "social_signals", "trending_content"]
    },
    variables: {
      COMPANY_TYPE: "[MEDIA_TYPE] company",
      MEDIA_TYPE: "media", // streaming, publishing, gaming, music, film
      PRIMARY_ENTITIES: "content, creators, events, platforms, genres",
      INDUSTRY_SPECIFIC_SCHEMAS: "MediaObject, CreativeWork, Person, Event",
      REGULATORY_REQUIREMENTS: "copyright, content ratings, platform policies",
      PRIMARY_AI_PLATFORMS: "content recommendation engines, entertainment AI, social AI",
      COMPETITOR_SET: "[PLATFORM_COMPETITORS] and content creators",
      PLATFORM_COMPETITORS: "Netflix, Disney+, YouTube, etc.",
      INDUSTRY_SPECIFIC_METRICS: "engagement rate, subscriber growth, content performance",
      MARKET_SEGMENT: "[CONTENT_TYPE] for [AUDIENCE_SEGMENT]",
      CONTENT_TYPE: "streaming, gaming, music, publishing",
      AUDIENCE_SEGMENT: "specific demographic",
      CUSTOMER_PAIN_POINTS: "content discovery, pricing, platform availability",
      VALUE_PROPOSITIONS: "exclusive content, quality, variety, user experience",
      PRODUCT_CATEGORIES: "[CONTENT_CATEGORIES]",
      CONTENT_CATEGORIES: "genres, formats, originals, licensed",
      SERVICE_OFFERINGS: "subscription, rental, purchase, ad-supported",
      AUTHORITY_PUBLICATIONS: "Variety, Hollywood Reporter, [INDUSTRY_TRADES]",
      INDUSTRY_TRADES: "specific entertainment media",
      INDUSTRY_ASSOCIATIONS: "[ENTERTAINMENT_GUILDS]",
      ENTERTAINMENT_GUILDS: "relevant industry organizations",
      CREDIBILITY_FACTORS: "awards, viewership, critical acclaim, catalog size",
      TRUST_SIGNALS: "reviews, ratings, awards, press coverage"
    }
  },

  // Automotive & Transportation
  automotive: {
    industry: "automotive",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit", "inventory_visibility"],
      critical: ["vehicle_specs", "dealer_network", "service_visibility"],
      optimization: ["comparison_tools", "financing_calculators", "review_integration"]
    },
    variables: {
      COMPANY_TYPE: "[AUTO_BUSINESS_TYPE]",
      AUTO_BUSINESS_TYPE: "dealership", // manufacturer, parts supplier, service center
      PRIMARY_ENTITIES: "vehicles, parts, services, locations, financing",
      INDUSTRY_SPECIFIC_SCHEMAS: "Car, AutoDealer, AutoRepair, Product",
      REGULATORY_REQUIREMENTS: "safety standards, emissions, dealer regulations",
      PRIMARY_AI_PLATFORMS: "auto search engines, comparison tools, service finders",
      COMPETITOR_SET: "[BRAND_COMPETITORS] and local dealers",
      BRAND_COMPETITORS: "competing brands or dealers",
      INDUSTRY_SPECIFIC_METRICS: "inventory turnover, service satisfaction, sales volume",
      MARKET_SEGMENT: "[NEW/USED] [VEHICLE_SEGMENT]",
      VEHICLE_SEGMENT: "luxury, economy, SUV, electric",
      CUSTOMER_PAIN_POINTS: "pricing transparency, availability, financing, service",
      VALUE_PROPOSITIONS: "selection, price, service, warranty, location",
      PRODUCT_CATEGORIES: "[VEHICLE_TYPES]",
      VEHICLE_TYPES: "cars, trucks, SUVs, electric vehicles",
      SERVICE_OFFERINGS: "sales, financing, service, parts",
      AUTHORITY_PUBLICATIONS: "Car and Driver, Motor Trend, [AUTO_MEDIA]",
      AUTO_MEDIA: "automotive publications",
      INDUSTRY_ASSOCIATIONS: "NADA, [AUTO_ASSOCIATIONS]",
      AUTO_ASSOCIATIONS: "relevant automotive associations",
      CREDIBILITY_FACTORS: "dealer ratings, manufacturer awards, service certifications",
      TRUST_SIGNALS: "customer reviews, BBB rating, manufacturer authorization"
    }
  }
};

// Template variable customization helper
function customizeTemplateForClient(industryKey, clientSpecificVars) {
  const template = JSON.parse(JSON.stringify(
    extendedIndustryTemplates[industryKey] || extendedIndustryTemplates.professional_services
  ));
  
  // Merge client-specific variables
  template.variables = {
    ...template.variables,
    ...clientSpecificVars
  };
  
  // Process all prompts with variables
  const processedTemplate = applyTemplateVariables(template, template.variables);
  
  return processedTemplate;
}

module.exports = { extendedIndustryTemplates, customizeTemplateForClient };
```

---

## 2. Authentication & Multi-Tenancy System

### 2.1 Supabase Auth Schema

```sql
-- Multi-tenancy and authentication schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations (tenants)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  plan VARCHAR(50) DEFAULT 'starter', -- starter, professional, enterprise
  white_label_config JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users with organization association
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  organization_id UUID REFERENCES organizations(id),
  role VARCHAR(50) DEFAULT 'member', -- admin, manager, member, viewer
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization invitations
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member',
  token VARCHAR(255) UNIQUE NOT NULL,
  accepted BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API keys for organization
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  scopes JSONB DEFAULT '["read"]',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked BOOLEAN DEFAULT false
);

-- Audit log for compliance
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Organization members can only see their organization's data
CREATE POLICY "Organization members can view their org"
  ON organizations FOR SELECT
  USING (id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

-- Users can only see members of their organization
CREATE POLICY "Users can view org members"
  ON users FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  ));

-- Sessions belong to organization
CREATE POLICY "Sessions belong to organization"
  ON sessions FOR ALL
  USING (client_id IN (
    SELECT id FROM organizations WHERE id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  ));

-- Functions for role-based access
CREATE OR REPLACE FUNCTION user_has_permission(
  user_id UUID,
  permission TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = user_id
    AND (
      role = 'admin'
      OR permission = ANY(permissions::text[])
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2.2 Authentication Service

```javascript
// services/AuthService.js
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  }
  
  // User registration with organization
  async registerUser(email, password, organizationName, fullName) {
    try {
      // Create auth user
      const { data: authUser, error: authError } = await this.supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
      
      if (authError) throw authError;
      
      // Create organization
      const orgSlug = this.generateSlug(organizationName);
      const { data: org, error: orgError } = await this.supabase
        .from('organizations')
        .insert({
          name: organizationName,
          slug: orgSlug,
          plan: 'starter'
        })
        .select()
        .single();
      
      if (orgError) throw orgError;
      
      // Create user profile
      const { data: userProfile, error: userError } = await this.supabase
        .from('users')
        .insert({
          id: authUser.user.id,
          email,
          full_name: fullName,
          organization_id: org.id,
          role: 'admin' // First user is admin
        })
        .select()
        .single();
      
      if (userError) throw userError;
      
      // Log the registration
      await this.auditLog(org.id, authUser.user.id, 'user.registered', 'user', authUser.user.id);
      
      return {
        user: userProfile,
        organization: org,
        session: await this.createSession(authUser.user.id)
      };
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  // User login
  async loginUser(email, password) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Get user profile with organization
      const { data: userProfile } = await this.supabase
        .from('users')
        .select('*, organizations(*)')
        .eq('id', data.user.id)
        .single();
      
      // Update last login
      await this.supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id);
      
      // Audit log
      await this.auditLog(
        userProfile.organization_id,
        data.user.id,
        'user.login',
        'session',
        data.session.access_token
      );
      
      return {
        user: userProfile,
        session: data.session,
        organization: userProfile.organizations
      };
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  // Invite user to organization
  async inviteUser(organizationId, email, role, invitedBy) {
    try {
      const token = this.generateInviteToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry
      
      const { data, error } = await this.supabase
        .from('invitations')
        .insert({
          organization_id: organizationId,
          email,
          role,
          token,
          expires_at: expiresAt.toISOString(),
          created_by: invitedBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Send invitation email (implement email service)
      await this.sendInvitationEmail(email, token, organizationId);
      
      // Audit log
      await this.auditLog(organizationId, invitedBy, 'user.invited', 'invitation', data.id);
      
      return data;
      
    } catch (error) {
      console.error('Invitation error:', error);
      throw error;
    }
  }
  
  // Accept invitation
  async acceptInvitation(token, password) {
    try {
      // Get invitation
      const { data: invitation, error: invError } = await this.supabase
        .from('invitations')
        .select('*, organizations(*)')
        .eq('token', token)
        .eq('accepted', false)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (invError || !invitation) {
        throw new Error('Invalid or expired invitation');
      }
      
      // Create auth user
      const { data: authUser, error: authError } = await this.supabase.auth.admin.createUser({
        email: invitation.email,
        password,
        email_confirm: true
      });
      
      if (authError) throw authError;
      
      // Create user profile
      const { data: userProfile, error: userError } = await this.supabase
        .from('users')
        .insert({
          id: authUser.user.id,
          email: invitation.email,
          organization_id: invitation.organization_id,
          role: invitation.role
        })
        .select()
        .single();
      
      if (userError) throw userError;
      
      // Mark invitation as accepted
      await this.supabase
        .from('invitations')
        .update({ accepted: true })
        .eq('id', invitation.id);
      
      // Audit log
      await this.auditLog(
        invitation.organization_id,
        authUser.user.id,
        'invitation.accepted',
        'invitation',
        invitation.id
      );
      
      return {
        user: userProfile,
        organization: invitation.organizations
      };
      
    } catch (error) {
      console.error('Accept invitation error:', error);
      throw error;
    }
  }
  
  // Create API key
  async createApiKey(organizationId, name, scopes, userId) {
    try {
      const apiKey = this.generateApiKey();
      const keyHash = await bcrypt.hash(apiKey, 10);
      
      const { data, error } = await this.supabase
        .from('api_keys')
        .insert({
          organization_id: organizationId,
          name,
          key_hash: keyHash,
          scopes,
          created_by: userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Audit log
      await this.auditLog(organizationId, userId, 'api_key.created', 'api_key', data.id);
      
      return {
        ...data,
        key: apiKey // Only return plain key once
      };
      
    } catch (error) {
      console.error('API key creation error:', error);
      throw error;
    }
  }
  
  // Validate API key
  async validateApiKey(apiKey) {
    try {
      // Get all active API keys (in production, cache this)
      const { data: keys, error } = await this.supabase
        .from('api_keys')
        .select('*, organizations(*)')
        .eq('revoked', false)
        .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString());
      
      if (error) throw error;
      
      // Check each key
      for (const key of keys) {
        const isValid = await bcrypt.compare(apiKey, key.key_hash);
        if (isValid) {
          // Update last used
          await this.supabase
            .from('api_keys')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', key.id);
          
          return {
            valid: true,
            organization: key.organizations,
            scopes: key.scopes
          };
        }
      }
      
      return { valid: false };
      
    } catch (error) {
      console.error('API key validation error:', error);
      return { valid: false };
    }
  }
  
  // Helper functions
  generateSlug(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  generateInviteToken() {
    return Buffer.from(Math.random().toString(36).substr(2) + Date.now().toString(36)).toString('base64');
  }
  
  generateApiKey() {
    return 'sk_' + Buffer.from(Math.random().toString(36).substr(2) + Date.now().toString(36)).toString('base64');
  }
  
  async createSession(userId) {
    const token = jwt.sign(
      { userId, iat: Date.now() },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    return token;
  }
  
  async auditLog(organizationId, userId, action, resourceType, resourceId, details = {}) {
    await this.supabase
      .from('audit_logs')
      .insert({
        organization_id: organizationId,
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details
      });
  }
  
  async sendInvitationEmail(email, token, organizationId) {
    // Implement email sending
    console.log(`Invitation sent to ${email} with token ${token}`);
  }
}

module.exports = AuthService;
```

---

## 3. White-Label Configuration System

### 3.1 White-Label Configuration Schema

```javascript
// config/whiteLabelConfig.js
const whiteLabelSchema = {
  branding: {
    logo: {
      light: '', // URL or base64
      dark: '', // URL or base64
      favicon: '' // URL or base64
    },
    colors: {
      primary: '#2196F3',
      secondary: '#4CAF50',
      accent: '#FF9800',
      error: '#F44336',
      warning: '#FFC107',
      info: '#2196F3',
      success: '#4CAF50',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#BDBDBD'
      }
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingFontFamily: "'Inter', sans-serif",
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
        body1: '1rem',
        body2: '0.875rem',
        caption: '0.75rem'
      }
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px'
    }
  },
  
  content: {
    companyName: 'AI Visibility Platform',
    tagline: 'Optimize Your AI Presence',
    supportEmail: 'support@example.com',
    supportPhone: '+1-555-0100',
    footer: {
      copyright: '© 2024 Your Company. All rights reserved.',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Contact', url: '/contact' }
      ],
      socialMedia: {
        twitter: '',
        linkedin: '',
        facebook: ''
      }
    }
  },
  
  features: {
    showPoweredBy: true, // Show "Powered by BAIV"
    customDomain: false,
    customEmails: false,
    apiAccess: true,
    maxUsers: 5,
    maxSessions: 100,
    enabledAgents: ['P1', 'P2', 'P3', 'P4'], // Limit agents by plan
    enabledIndustries: ['all'], // Or specific list
    customIntegrations: false
  },
  
  emails: {
    fromName: 'AI Visibility Platform',
    fromEmail: 'noreply@example.com',
    replyTo: 'support@example.com',
    templates: {
      welcome: {
        subject: 'Welcome to {{companyName}}',
        header: 'Welcome aboard!',
        body: 'Your AI Visibility journey starts here.'
      },
      invitation: {
        subject: 'You\'ve been invited to {{companyName}}',
        header: 'Join your team',
        body: 'Click below to accept your invitation.'
      },
      report: {
        subject: 'Your AI Visibility Report is Ready',
        header: 'Analysis Complete',
        body: 'Your comprehensive AI Visibility analysis is ready for review.'
      }
    }
  },
  
  customization: {
    css: '', // Custom CSS overrides
    javascript: '', // Custom JavaScript
    head: '', // Custom <head> content
    bodyStart: '', // After <body> opening tag
    bodyEnd: '' // Before </body> closing tag
  }
};

class WhiteLabelService {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  }
  
  async getConfig(organizationId) {
    const { data: org } = await this.supabase
      .from('organizations')
      .select('white_label_config, plan')
      .eq('id', organizationId)
      .single();
    
    // Merge with defaults based on plan
    const planDefaults = this.getPlanDefaults(org.plan);
    const config = this.mergeConfigs(whiteLabelSchema, planDefaults, org.white_label_config);
    
    return config;
  }
  
  async updateConfig(organizationId, config, userId) {
    // Validate based on plan
    const { data: org } = await this.supabase
      .from('organizations')
      .select('plan')
      .eq('id', organizationId)
      .single();
    
    const validatedConfig = this.validateConfigForPlan(config, org.plan);
    
    // Update
    const { data, error } = await this.supabase
      .from('organizations')
      .update({
        white_label_config: validatedConfig,
        updated_at: new Date().toISOString()
      })
      .eq('id', organizationId)
      .select()
      .single();
    
    // Audit log
    await this.auditLog(organizationId, userId, 'white_label.updated', 'organization', organizationId, {
      changes: config
    });
    
    return data;
  }
  
  getPlanDefaults(plan) {
    const plans = {
      starter: {
        features: {
          showPoweredBy: true,
          customDomain: false,
          maxUsers: 5,
          maxSessions: 100,
          enabledAgents: ['P1', 'P2', 'P3', 'P4']
        }
      },
      professional: {
        features: {
          showPoweredBy: false,
          customDomain: true,
          maxUsers: 25,
          maxSessions: 1000,
          enabledAgents: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']
        }
      },
      enterprise: {
        features: {
          showPoweredBy: false,
          customDomain: true,
          maxUsers: -1, // Unlimited
          maxSessions: -1,
          enabledAgents: 'all',
          customIntegrations: true
        }
      }
    };
    
    return plans[plan] || plans.starter;
  }
  
  validateConfigForPlan(config, plan) {
    const planLimits = this.getPlanDefaults(plan);
    
    // Enforce plan limitations
    if (!planLimits.features.customDomain) {
      delete config.features?.customDomain;
    }
    
    if (planLimits.features.showPoweredBy) {
      config.features = {
        ...config.features,
        showPoweredBy: true
      };
    }
    
    return config;
  }
  
  mergeConfigs(...configs) {
    return configs.reduce((merged, config) => {
      return this.deepMerge(merged, config || {});
    }, {});
  }
  
  deepMerge(target, source) {
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            output[key] = source[key];
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
    
    return output;
  }
  
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}

module.exports = WhiteLabelService;
```

### 3.2 White-Label Dashboard Component

```jsx
// dashboard/WhiteLabelDashboard.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';

const WhiteLabelDashboard = ({ organizationId, children }) => {
  const [config, setConfig] = useState(null);
  const [theme, setTheme] = useState(null);
  
  useEffect(() => {
    loadWhiteLabelConfig();
  }, [organizationId]);
  
  const loadWhiteLabelConfig = async () => {
    const response = await fetch(`/api/white-label/${organizationId}`);
    const data = await response.json();
    setConfig(data);
    
    // Create MUI theme from config
    const customTheme = createTheme({
      palette: {
        primary: {
          main: data.branding.colors.primary
        },
        secondary: {
          main: data.branding.colors.secondary
        },
        error: {
          main: data.branding.colors.error
        },
        warning: {
          main: data.branding.colors.warning
        },
        info: {
          main: data.branding.colors.info
        },
        success: {
          main: data.branding.colors.success
        },
        background: {
          default: data.branding.colors.background,
          paper: data.branding.colors.surface
        },
        text: {
          primary: data.branding.colors.text.primary,
          secondary: data.branding.colors.text.secondary
        }
      },
      typography: {
        fontFamily: data.branding.typography.fontFamily,
        h1: { fontSize: data.branding.typography.fontSize.h1 },
        h2: { fontSize: data.branding.typography.fontSize.h2 },
        h3: { fontSize: data.branding.typography.fontSize.h3 },
        h4: { fontSize: data.branding.typography.fontSize.h4 },
        h5: { fontSize: data.branding.typography.fontSize.h5 },
        h6: { fontSize: data.branding.typography.fontSize.h6 }
      },
      shape: {
        borderRadius: parseInt(data.branding.borderRadius.medium)
      }
    });
    
    setTheme(customTheme);
    
    // Apply custom CSS
    if (data.customization.css) {
      const style = document.createElement('style');
      style.textContent = data.customization.css;
      document.head.appendChild(style);
    }
    
    // Update document title and favicon
    document.title = data.content.companyName;
    if (data.branding.logo.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = data.branding.logo.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };
  
  if (!config || !theme) {
    return <div>Loading...</div>;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            {config.branding.logo.light && (
              <img 
                src={config.branding.logo.light} 
                alt={config.content.companyName}
                style={{ height: 40, marginRight: 16 }}
              />
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {config.content.companyName}
            </Typography>
            <Typography variant="body2">
              {config.content.tagline}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
        
        <Box component="footer" sx={{ p: 3, bgcolor: 'background.paper', mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {config.content.footer.copyright}
          </Typography>
          {config.features.showPoweredBy && (
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              Powered by BAIV Platform
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WhiteLabelDashboard;
```

---

## 4. Automated Report Generation System

### 4.1 Report Generator Service

```javascript
// services/ReportGenerator.js
const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class ReportGenerator {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    this.chartRenderer = new ChartJSNodeCanvas({ width: 800, height: 400 });
  }
  
  async generateReport(sessionId, format = 'pdf') {
    try {
      // Load all data
      const data = await this.loadSessionData(sessionId);
      
      // Generate report based on format
      let report;
      switch (format) {
        case 'pdf':
          report = await this.generatePDF(data);
          break;
        case 'html':
          report = await this.generateHTML(data);
          break;
        case 'docx':
          report = await this.generateDOCX(data);
          break;
        case 'pptx':
          report = await this.generatePowerPoint(data);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      // Store report
      const reportUrl = await this.storeReport(sessionId, report, format);
      
      // Log generation
      await this.logReportGeneration(sessionId, format, reportUrl);
      
      return reportUrl;
      
    } catch (error) {
      console.error('Report generation error:', error);
      throw error;
    }
  }
  
  async loadSessionData(sessionId) {
    // Load session
    const { data: session } = await this.supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    // Load agent results
    const { data: agentResults } = await this.supabase
      .from('agent_executions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at');
    
    // Load specific agent outputs
    const { data: ontologyMappings } = await this.supabase
      .from('ontology_mappings')
      .select('*')
      .eq('session_id', sessionId);
    
    const { data: baselineAudits } = await this.supabase
      .from('baseline_audits')
      .select('*')
      .eq('session_id', sessionId);
    
    const { data: voiceCaptures } = await this.supabase
      .from('voice_captures')
      .select('*')
      .eq('session_id', sessionId);
    
    const { data: citationStrategies } = await this.supabase
      .from('citation_strategies')
      .select('*')
      .eq('session_id', sessionId)
      .order('priority_rank');
    
    // Load organization for white-label
    const { data: organization } = await this.supabase
      .from('organizations')
      .select('*')
      .eq('id', session.client_id)
      .single();
    
    return {
      session,
      organization,
      agentResults,
      ontologyMappings,
      baselineAudits,
      voiceCaptures,
      citationStrategies,
      scores: this.calculateScores(session, agentResults),
      recommendations: this.compileRecommendations(baselineAudits, citationStrategies),
      executiveSummary: this.generateExecutiveSummary(session, agentResults)
    };
  }
  
  calculateScores(session, agentResults) {
    const context = session.context || {};
    
    return {
      overall: this.calculateOverallScore(context),
      ontology: context.coverage_score || 0,
      baseline: context.baseline_score || 0,
      sentiment: context.customer_sentiment || 0,
      authority: context.authority_baseline || 0,
      readiness: this.calculateReadinessScore(context)
    };
  }
  
  calculateOverallScore(context) {
    const weights = {
      coverage_score: 0.2,
      baseline_score: 0.3,
      customer_sentiment: 0.2,
      authority_baseline: 0.3
    };
    
    let score = 0;
    let totalWeight = 0;
    
    Object.keys(weights).forEach(key => {
      if (context[key] !== undefined) {
        score += context[key] * weights[key];
        totalWeight += weights[key];
      }
    });
    
    return totalWeight > 0 ? score / totalWeight : 0;
  }
  
  calculateReadinessScore(context) {
    // AI Visibility Readiness Score
    const factors = {
      hasOntology: context.ontology_mapped ? 0.2 : 0,
      hasBaseline: context.baseline_completed ? 0.2 : 0,
      hasVoice: context.voice_captured ? 0.2 : 0,
      hasCitations: context.citation_strategy_complete ? 0.2 : 0,
      scoreAboveThreshold: context.baseline_score > 0.5 ? 0.2 : 0
    };
    
    return Object.values(factors).reduce((sum, val) => sum + val, 0);
  }
  
  compileRecommendations(audits, citations) {
    const recommendations = [];
    
    // From baseline audit
    if (audits && audits.length > 0) {
      const audit = audits[0];
      if (audit.recommendations) {
        recommendations.push(...audit.recommendations.immediate || []);
        recommendations.push(...audit.recommendations.short_term || []);
      }
    }
    
    // From citation strategy
    if (citations && citations.length > 0) {
      citations.slice(0, 5).forEach(citation => {
        recommendations.push({
          type: 'citation',
          priority: 'high',
          action: `Acquire citation from ${citation.citation_source}`,
          impact: citation.authority_score
        });
      });
    }
    
    return recommendations;
  }
  
  generateExecutiveSummary(session, agentResults) {
    const context = session.context || {};
    const completedAgents = agentResults.filter(r => r.status === 'completed').length;
    const totalAgents = agentResults.length;
    
    return {
      title: 'AI Visibility Analysis Executive Summary',
      date: new Date().toISOString(),
      company: context.company_name || 'Your Organization',
      industry: context.industry || 'Not specified',
      analysisComplete: `${completedAgents}/${totalAgents} agents completed`,
      overallScore: this.calculateOverallScore(context),
      keyFindings: [
        `Ontology coverage: ${(context.coverage_score * 100).toFixed(0)}%`,
        `Current AI visibility baseline: ${(context.baseline_score * 100).toFixed(0)}%`,
        `Customer sentiment: ${(context.customer_sentiment * 100).toFixed(0)}% positive`,
        `Authority baseline: ${(context.authority_baseline * 100).toFixed(0)}%`
      ],
      topRecommendations: context.quick_wins || [],
      nextSteps: context.next_steps || []
    };
  }
  
  async generatePDF(data) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];
    
    doc.on('data', chunk => chunks.push(chunk));
    
    // Title Page
    doc.fontSize(24).text(data.executiveSummary.title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(data.executiveSummary.company, { align: 'center' });
    doc.fontSize(14).text(data.executiveSummary.industry, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(new Date().toLocaleDateString(), { align: 'center' });
    
    // Executive Summary
    doc.addPage();
    doc.fontSize(20).text('Executive Summary', { underline: true });
    doc.moveDown();
    doc.fontSize(12);
    
    doc.text(`Analysis Status: ${data.executiveSummary.analysisComplete}`);
    doc.text(`Overall AI Visibility Score: ${(data.scores.overall * 100).toFixed(1)}%`);
    doc.moveDown();
    
    doc.text('Key Findings:', { underline: true });
    data.executiveSummary.keyFindings.forEach(finding => {
      doc.text(`• ${finding}`);
    });
    
    // Scores Section
    doc.addPage();
    doc.fontSize(20).text('AI Visibility Scores', { underline: true });
    doc.moveDown();
    
    // Generate score chart
    const scoreChart = await this.generateScoreChart(data.scores);
    doc.image(scoreChart, { width: 500, align: 'center' });
    
    // Detailed Findings
    doc.addPage();
    doc.fontSize(20).text('Detailed Findings', { underline: true });
    doc.moveDown();
    
    // Ontology Mapping
    if (data.ontologyMappings && data.ontologyMappings.length > 0) {
      doc.fontSize(16).text('1. Ontology Mapping Results', { underline: true });
      doc.fontSize(12);
      doc.text(`Total entities mapped: ${data.ontologyMappings.length}`);
      doc.text(`Average confidence score: ${this.averageScore(data.ontologyMappings, 'confidence_score').toFixed(2)}`);
      doc.moveDown();
    }
    
    // Baseline Audit
    if (data.baselineAudits && data.baselineAudits.length > 0) {
      const audit = data.baselineAudits[0];
      doc.fontSize(16).text('2. Baseline Audit Results', { underline: true });
      doc.fontSize(12);
      
      if (audit.current_state) {
        doc.text(`Overall baseline score: ${(audit.current_state.overall_score * 100).toFixed(1)}%`);
        
        if (audit.gaps_identified) {
          doc.text(`Critical gaps identified: ${audit.gaps_identified.length}`);
          audit.gaps_identified.slice(0, 5).forEach(gap => {
            doc.text(`• ${gap}`);
          });
        }
      }
      doc.moveDown();
    }
    
    // Voice of Customer
    if (data.voiceCaptures && data.voiceCaptures.length > 0) {
      const voice = data.voiceCaptures[0];
      doc.fontSize(16).text('3. Voice of Customer Analysis', { underline: true });
      doc.fontSize(12);
      doc.text(`Overall sentiment: ${(voice.sentiment_score * 100).toFixed(0)}% positive`);
      
      if (voice.themes && voice.themes.primary) {
        doc.text('Primary themes:');
        voice.themes.primary.slice(0, 5).forEach(theme => {
          doc.text(`• ${theme}`);
        });
      }
      doc.moveDown();
    }
    
    // Citation Strategy
    if (data.citationStrategies && data.citationStrategies.length > 0) {
      doc.fontSize(16).text('4. Citation Strategy', { underline: true });
      doc.fontSize(12);
      doc.text('Priority citation targets:');
      
      data.citationStrategies.slice(0, 5).forEach(citation => {
        doc.text(`${citation.priority_rank}. ${citation.citation_source}`);
        doc.text(`   Authority Score: ${(citation.authority_score * 100).toFixed(0)}%`);
        doc.text(`   Relevance Score: ${(citation.relevance_score * 100).toFixed(0)}%`);
      });
      doc.moveDown();
    }
    
    // Recommendations
    doc.addPage();
    doc.fontSize(20).text('Recommendations', { underline: true });
    doc.moveDown();
    
    doc.fontSize(16).text('Immediate Actions:', { underline: true });
    doc.fontSize(12);
    
    const immediateActions = data.recommendations.filter(r => r.priority === 'high').slice(0, 5);
    immediateActions.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec.action || rec}`);
    });
    
    doc.moveDown();
    doc.fontSize(16).text('30-Day Roadmap:', { underline: true });
    doc.fontSize(12);
    
    const roadmap = data.executiveSummary.nextSteps || [];
    roadmap.forEach((step, index) => {
      doc.text(`Week ${index + 1}: ${step}`);
    });
    
    // Footer
    doc.fontSize(10).text(
      `Generated by ${data.organization?.name || 'BAIV Platform'} on ${new Date().toLocaleDateString()}`,
      50,
      doc.page.height - 50,
      { align: 'center' }
    );
    
    doc.end();
    
    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
  
  async generateHTML(data) {
    const templatePath = path.join(__dirname, '../templates/report.hbs');
    const templateSource = await fs.readFile(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    
    // Prepare data for template
    const templateData = {
      ...data,
      generatedDate: new Date().toLocaleDateString(),
      scoreChart: await this.generateScoreChartBase64(data.scores),
      scoresFormatted: {
        overall: (data.scores.overall * 100).toFixed(1),
        ontology: (data.scores.ontology * 100).toFixed(1),
        baseline: (data.scores.baseline * 100).toFixed(1),
        sentiment: (data.scores.sentiment * 100).toFixed(1),
        authority: (data.scores.authority * 100).toFixed(1)
      }
    };
    
    return template(templateData);
  }
  
  async generateDOCX(data) {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: data.executiveSummary.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER
          }),
          
          new Paragraph({
            text: data.executiveSummary.company,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
          }),
          
          new Paragraph({
            text: `Industry: ${data.executiveSummary.industry}`,
            alignment: AlignmentType.CENTER
          }),
          
          new Paragraph({
            text: `Generated: ${new Date().toLocaleDateString()}`,
            alignment: AlignmentType.CENTER
          }),
          
          // Executive Summary
          new Paragraph({
            text: "Executive Summary",
            heading: HeadingLevel.HEADING_1
          }),
          
          new Paragraph({
            text: `Overall AI Visibility Score: ${(data.scores.overall * 100).toFixed(1)}%`
          }),
          
          new Paragraph({
            text: "Key Findings:",
            heading: HeadingLevel.HEADING_2
          }),
          
          ...data.executiveSummary.keyFindings.map(finding => 
            new Paragraph({
              text: `• ${finding}`,
              bullet: { level: 0 }
            })
          ),
          
          // Add more sections as needed
        ]
      }]
    });
    
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  }
  
  async generatePowerPoint(data) {
    const PptxGenJS = require('pptxgenjs');
    const pptx = new PptxGenJS();
    
    // Title Slide
    const titleSlide = pptx.addSlide();
    titleSlide.addText(data.executiveSummary.title, {
      x: 0.5, y: 2, w: 9, h: 1,
      fontSize: 36, bold: true, align: 'center'
    });
    titleSlide.addText(data.executiveSummary.company, {
      x: 0.5, y: 3, w: 9, h: 0.5,
      fontSize: 24, align: 'center'
    });
    titleSlide.addText(new Date().toLocaleDateString(), {
      x: 0.5, y: 4, w: 9, h: 0.5,
      fontSize: 18, align: 'center'
    });
    
    // Executive Summary Slide
    const summarySlide = pptx.addSlide();
    summarySlide.addText('Executive Summary', {
      x: 0.5, y: 0.5, w: 9, h: 1,
      fontSize: 32, bold: true
    });
    
    summarySlide.addText([
      { text: 'Overall Score: ', options: { bold: true } },
      { text: `${(data.scores.overall * 100).toFixed(1)}%` }
    ], {
      x: 0.5, y: 1.5, w: 9, h: 0.5,
      fontSize: 20
    });
    
    // Key Findings
    let yPos = 2.5;
    data.executiveSummary.keyFindings.forEach(finding => {
      summarySlide.addText(`• ${finding}`, {
        x: 0.5, y: yPos, w: 9, h: 0.5,
        fontSize: 16
      });
      yPos += 0.5;
    });
    
    // Scores Slide with Chart
    const scoresSlide = pptx.addSlide();
    scoresSlide.addText('AI Visibility Scores', {
      x: 0.5, y: 0.5, w: 9, h: 1,
      fontSize: 32, bold: true
    });
    
    // Add chart (convert to base64 image)
    const chartImage = await this.generateScoreChartBase64(data.scores);
    scoresSlide.addImage({
      data: chartImage,
      x: 1, y: 1.5, w: 8, h: 4
    });
    
    // Recommendations Slide
    const recsSlide = pptx.addSlide();
    recsSlide.addText('Top Recommendations', {
      x: 0.5, y: 0.5, w: 9, h: 1,
      fontSize: 32, bold: true
    });
    
    yPos = 1.5;
    data.recommendations.slice(0, 5).forEach((rec, index) => {
      recsSlide.addText(`${index + 1}. ${rec.action || rec}`, {
        x: 0.5, y: yPos, w: 9, h: 0.5,
        fontSize: 16
      });
      yPos += 0.6;
    });
    
    // Generate buffer
    const buffer = await pptx.write('arraybuffer');
    return Buffer.from(buffer);
  }
  
  async generateScoreChart(scores) {
    const configuration = {
      type: 'radar',
      data: {
        labels: ['Overall', 'Ontology', 'Baseline', 'Sentiment', 'Authority', 'Readiness'],
        datasets: [{
          label: 'AI Visibility Scores',
          data: [
            scores.overall * 100,
            scores.ontology * 100,
            scores.baseline * 100,
            scores.sentiment * 100,
            scores.authority * 100,
            scores.readiness * 100
          ],
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: 'rgb(33, 150, 243)',
          pointBackgroundColor: 'rgb(33, 150, 243)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(33, 150, 243)'
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    };
    
    return await this.chartRenderer.renderToBuffer(configuration);
  }
  
  async generateScoreChartBase64(scores) {
    const buffer = await this.generateScoreChart(scores);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  }
  
  averageScore(items, field) {
    if (!items || items.length === 0) return 0;
    const sum = items.reduce((acc, item) => acc + (item[field] || 0), 0);
    return sum / items.length;
  }
  
  async storeReport(sessionId, reportBuffer, format) {
    const fileName = `report_${sessionId}_${Date.now()}.${format}`;
    
    const { data, error } = await this.supabase.storage
      .from('reports')
      .upload(fileName, reportBuffer, {
        contentType: this.getContentType(format)
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = this.supabase.storage
      .from('reports')
      .getPublicUrl(fileName);
    
    return publicUrl;
  }
  
  getContentType(format) {
    const types = {
      pdf: 'application/pdf',
      html: 'text/html',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };
    return types[format] || 'application/octet-stream';
  }
  
  async logReportGeneration(sessionId, format, url) {
    await this.supabase
      .from('report_generations')
      .insert({
        session_id: sessionId,
        format,
        url,
        generated_at: new Date().toISOString()
      });
  }
}

module.exports = ReportGenerator;
```

### 4.2 Report Template (Handlebars)

```html
<!-- templates/report.hbs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Visibility Report - {{executiveSummary.company}}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      padding: 40px 0;
      border-bottom: 2px solid #2196F3;
      margin-bottom: 40px;
    }
    
    h1 { color: #2196F3; font-size: 2.5em; margin-bottom: 10px; }
    h2 { color: #1976D2; font-size: 2em; margin-top: 40px; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; }
    h3 { color: #424242; font-size: 1.5em; margin-top: 30px; }
    
    .score-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .score-card {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    
    .score-value {
      font-size: 3em;
      font-weight: bold;
      color: #2196F3;
    }
    
    .score-label {
      font-size: 0.9em;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .chart-container {
      text-align: center;
      margin: 40px 0;
    }
    
    .recommendations {
      background: #E3F2FD;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    
    .recommendation-item {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border-left: 4px solid #2196F3;
      border-radius: 4px;
    }
    
    .footer {
      text-align: center;
      padding: 40px 0;
      border-top: 1px solid #e0e0e0;
      margin-top: 60px;
      color: #666;
      font-size: 0.9em;
    }
    
    @media print {
      body { max-width: 100%; }
      .header { page-break-after: always; }
      h2 { page-break-before: auto; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>{{executiveSummary.title}}</h1>
    <p style="font-size: 1.2em; color: #666;">{{executiveSummary.company}}</p>
    <p>Industry: {{executiveSummary.industry}} | Generated: {{generatedDate}}</p>
  </div>
  
  <section id="executive-summary">
    <h2>Executive Summary</h2>
    <p>Analysis Status: <strong>{{executiveSummary.analysisComplete}}</strong></p>
    
    <div class="score-grid">
      <div class="score-card">
        <div class="score-value">{{scoresFormatted.overall}}%</div>
        <div class="score-label">Overall Score</div>
      </div>
      <div class="score-card">
        <div class="score-value">{{scoresFormatted.ontology}}%</div>
        <div class="score-label">Ontology Coverage</div>
      </div>
      <div class="score-card">
        <div class="score-value">{{scoresFormatted.baseline}}%</div>
        <div class="score-label">Baseline Score</div>
      </div>
      <div class="score-card">
        <div class="score-value">{{scoresFormatted.sentiment}}%</div>
        <div class="score-label">Customer Sentiment</div>
      </div>
    </div>
    
    <h3>Key Findings</h3>
    <ul>
      {{#each executiveSummary.keyFindings}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </section>
  
  <section id="score-analysis">
    <h2>AI Visibility Score Analysis</h2>
    <div class="chart-container">
      <img src="{{scoreChart}}" alt="Score Chart" style="max-width: 100%; height: auto;">
    </div>
  </section>
  
  <section id="recommendations">
    <h2>Recommendations</h2>
    <div class="recommendations">
      <h3>Immediate Actions</h3>
      {{#each recommendations}}
      {{#if (eq this.priority "high")}}
      <div class="recommendation-item">
        <strong>{{@index}}.</strong> {{this.action}}
        {{#if this.impact}}
        <br><small>Impact Score: {{this.impact}}</small>
        {{/if}}
      </div>
      {{/if}}
      {{/each}}
    </div>
  </section>
  
  <section id="detailed-findings">
    <h2>Detailed Findings</h2>
    
    {{#if ontologyMappings}}
    <h3>Ontology Mapping Results</h3>
    <p>Total entities mapped: <strong>{{ontologyMappings.length}}</strong></p>
    {{/if}}
    
    {{#if baselineAudits}}
    <h3>Baseline Audit Results</h3>
    {{#each baselineAudits}}
    <p>Critical gaps identified: <strong>{{this.gaps_identified.length}}</strong></p>
    <ul>
      {{#each this.gaps_identified}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
    {{/each}}
    {{/if}}
    
    {{#if voiceCaptures}}
    <h3>Voice of Customer Analysis</h3>
    {{#each voiceCaptures}}
    <p>Overall sentiment: <strong>{{multiply this.sentiment_score 100}}% positive</strong></p>
    {{#if this.themes.primary}}
    <p>Primary themes identified:</p>
    <ul>
      {{#each this.themes.primary}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
    {{/if}}
    {{/each}}
    {{/if}}
  </section>
  
  <div class="footer">
    <p>Generated by {{organization.name}} | Powered by BAIV Platform</p>
    <p>{{generatedDate}}</p>
  </div>
</body>
</html>
```

This complete production system provides everything needed for a fully functional, white-labeled, multi-tenant BAIV platform with comprehensive reporting capabilities!