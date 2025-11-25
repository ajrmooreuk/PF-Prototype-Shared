import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Save, Download, Upload, Plus, Trash2, Edit2, Check, X, Eye, EyeOff, Shield, AlertCircle, Settings, Palette, FileText, Lock, Unlock, Copy } from 'lucide-react';

// Brand color configurations based on your style guide
const brandConfigurations = {
  'master-001-baiv': {
    id: 'master-001-baiv',
    name: 'BAIV Home Brand',
    mode: 'own',
    colors: {
      primary: '#00a4bf',
      primaryDark: '#005260',
      primaryLight: '#cce8ee',
      accent: '#cec528',
      success: '#019587',
      warning: '#cf057d',
      danger: '#cf057d',
      background: '#f5f3d4',
      text: '#393939',
      textLight: '#6b6b6b',
      border: '#e5e5e5'
    },
    typography: {
      headingFont: 'Titillium Web',
      bodyFont: 'Inter',
      monoFont: 'SF Mono'
    },
    features: {
      glassEffects: true,
      animations: 'full',
      gradients: true,
      shadows: 'full'
    },
    logos: {
      primary: '/images/BAIV_Logo_Master3Color.svg',
      light: '/images/BAIV_Logo_Light.svg',
      dark: '/images/BAIV_Logo_Dark.svg',
      icon: '/images/BAIV_Icon.svg'
    }
  },
  'partner-002-w4m': {
    id: 'partner-002-w4m',
    name: 'W4M Co-Brand',
    mode: 'co-branded',
    colors: {
      primary: '#0a84ff',
      primaryDark: '#0051a3',
      primaryLight: '#cce4ff',
      accent: '#ffa500',
      success: '#34c759',
      warning: '#ff9500',
      danger: '#ff3b30',
      background: '#f8f9fa',
      text: '#1c1c1e',
      textLight: '#8e8e93',
      border: '#d1d1d6'
    },
    features: {
      glassEffects: false,
      animations: 'minimal',
      gradients: false,
      shadows: 'minimal'
    }
  },
  'partner-003-thinktank': {
    id: 'partner-003-thinktank',
    name: 'Think Tank Co-Brand',
    mode: 'co-branded',
    colors: {
      primary: '#6b46c1',
      primaryDark: '#4c1d95',
      primaryLight: '#ede9fe',
      accent: '#10b981',
      success: '#059669',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#fafafa',
      text: '#111827',
      textLight: '#6b7280',
      border: '#e5e7eb'
    },
    features: {
      glassEffects: true,
      animations: 'subtle',
      gradients: true,
      shadows: 'subtle'
    }
  }
};

// Compliance framework configurations
const complianceFrameworks = {
  gdpr: {
    id: 'gdpr',
    name: 'GDPR (EU)',
    category: 'data_privacy',
    enabled: true,
    requirements: ['lawful_basis', 'data_subject_rights', 'privacy_by_design', 'dpo', 'impact_assessment', 'breach_notification'],
    tier: 'critical'
  },
  ccpa: {
    id: 'ccpa',
    name: 'CCPA',
    category: 'data_privacy',
    enabled: true,
    requirements: ['consumer_rights', 'disclosure_requirements', 'sale_opt_out'],
    tier: 'high'
  },
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001',
    category: 'information_security',
    enabled: true,
    requirements: ['isms', 'risk_assessment', 'controls', 'audit', 'improvement'],
    tier: 'critical'
  },
  nist: {
    id: 'nist',
    name: 'NIST 800-53',
    category: 'information_security',
    enabled: false,
    requirements: ['access_control', 'audit', 'configuration', 'incident_response'],
    tier: 'high'
  },
  owasp: {
    id: 'owasp',
    name: 'OWASP Top 10',
    category: 'application_security',
    enabled: true,
    requirements: ['access_control', 'cryptography', 'injection', 'security_misconfiguration'],
    tier: 'critical'
  },
  eu_ai_act: {
    id: 'eu_ai_act',
    name: 'EU AI Act',
    category: 'ai_governance',
    enabled: true,
    requirements: ['risk_categories', 'transparency', 'human_oversight', 'documentation'],
    tier: 'critical'
  }
};

const BAIVPlatformConfig = () => {
  const [activeTab, setActiveTab] = useState('brand');
  const [selectedBrand, setSelectedBrand] = useState('master-001-baiv');
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    typography: false,
    features: false,
    logos: false,
    compliance: true,
    risk: false,
    governance: false
  });
  const [editMode, setEditMode] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(brandConfigurations[selectedBrand]);
  const [complianceConfig, setComplianceConfig] = useState(complianceFrameworks);
  const [showPreview, setShowPreview] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Apply current configuration styles
  useEffect(() => {
    const root = document.documentElement;
    const config = currentConfig.colors;
    Object.entries(config).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [currentConfig]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleColorChange = (colorKey, value) => {
    setCurrentConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value }
    }));
  };

  const handleComplianceToggle = (frameworkId) => {
    setComplianceConfig(prev => ({
      ...prev,
      [frameworkId]: { ...prev[frameworkId], enabled: !prev[frameworkId].enabled }
    }));
  };

  const saveConfiguration = () => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => {
      const configData = {
        brand: currentConfig,
        compliance: complianceConfig,
        timestamp: new Date().toISOString()
      };
      console.log('Saving configuration:', configData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const exportConfiguration = () => {
    const configData = {
      brand: currentConfig,
      compliance: complianceConfig,
      version: '2.3.0',
      exported: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baiv-config-${currentConfig.id}-${Date.now()}.json`;
    a.click();
  };

  // Main styles
  const styles = `
    :root {
      --primary: ${currentConfig.colors.primary};
      --primary-dark: ${currentConfig.colors.primaryDark};
      --primary-light: ${currentConfig.colors.primaryLight};
      --accent: ${currentConfig.colors.accent};
      --success: ${currentConfig.colors.success};
      --warning: ${currentConfig.colors.warning};
      --danger: ${currentConfig.colors.danger};
      --background: ${currentConfig.colors.background};
      --text: ${currentConfig.colors.text};
      --text-light: ${currentConfig.colors.textLight};
      --border: ${currentConfig.colors.border};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: ${currentConfig.typography?.bodyFont || 'Inter'}, -apple-system, sans-serif;
      background: var(--background);
      color: var(--text);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${currentConfig.typography?.headingFont || 'Titillium Web'}, sans-serif;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">BAIV Platform Config</h1>
                  <p className="text-sm text-gray-600">Brand & Compliance Management System</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {saveStatus === 'saving' && (
                  <span className="text-sm text-blue-600">Saving...</span>
                )}
                {saveStatus === 'saved' && (
                  <span className="text-sm text-green-600 flex items-center">
                    <Check className="w-4 h-4 mr-1" /> Saved
                  </span>
                )}
                <button
                  onClick={saveConfiguration}
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={exportConfiguration}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Brand Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Brand Configuration</label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(brandConfigurations).map(([key, brand]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedBrand(key);
                    setCurrentConfig(brand);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedBrand === key
                      ? 'border-[var(--primary)] bg-[var(--primary-light)] shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Mode: {brand.mode}</p>
                      <div className="flex space-x-1 mt-2">
                        {Object.values(brand.colors).slice(0, 5).map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    {selectedBrand === key && (
                      <Check className="w-5 h-5 text-[var(--primary)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'brand', label: 'Brand Design', icon: Palette },
                { id: 'compliance', label: 'Compliance', icon: Shield },
                { id: 'ontology', label: 'Ontology', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {activeTab === 'brand' && (
                <>
                  {/* Colors Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggleSection('colors')}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h2 className="text-lg font-semibold text-gray-900">Color System</h2>
                      {expandedSections.colors ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                    </button>
                    {expandedSections.colors && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(currentConfig.colors).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={value}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                disabled={!editMode}
                                className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer disabled:cursor-not-allowed"
                              />
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleColorChange(key, e.target.value)}
                                  disabled={!editMode}
                                  className="mt-1 text-sm text-gray-600 bg-transparent border-0 focus:outline-none disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Typography Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggleSection('typography')}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h2 className="text-lg font-semibold text-gray-900">Typography</h2>
                      {expandedSections.typography ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                    </button>
                    {expandedSections.typography && (
                      <div className="px-6 pb-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Heading Font</label>
                          <input
                            type="text"
                            value={currentConfig.typography?.headingFont || 'Titillium Web'}
                            disabled={!editMode}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Body Font</label>
                          <input
                            type="text"
                            value={currentConfig.typography?.bodyFont || 'Inter'}
                            disabled={!editMode}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'compliance' && (
                <div className="space-y-6">
                  {Object.entries(complianceConfig).map(([key, framework]) => (
                    <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              framework.tier === 'critical' ? 'bg-red-100 text-red-700' :
                              framework.tier === 'high' ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {framework.tier}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Category: {framework.category.replace('_', ' ')}</p>
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-700 mb-2">Requirements:</p>
                            <div className="flex flex-wrap gap-2">
                              {framework.requirements.map((req, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                  {req.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleComplianceToggle(key)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            framework.enabled ? 'bg-[var(--success)]' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            framework.enabled ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'ontology' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Governance Ontology</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[var(--primary)] pl-4">
                      <h3 className="font-medium text-gray-900">Legal Compliance</h3>
                      <p className="text-sm text-gray-600 mt-1">GDPR, CCPA, SOX, HIPAA, PCI DSS integration</p>
                    </div>
                    <div className="border-l-4 border-[var(--accent)] pl-4">
                      <h3 className="font-medium text-gray-900">Information Security</h3>
                      <p className="text-sm text-gray-600 mt-1">ISO 27001, NIST 800-53, OWASP controls</p>
                    </div>
                    <div className="border-l-4 border-[var(--success)] pl-4">
                      <h3 className="font-medium text-gray-900">AI Governance</h3>
                      <p className="text-sm text-gray-600 mt-1">EU AI Act, NIST AI RMF, MITRE ATLAS</p>
                    </div>
                    <div className="border-l-4 border-[var(--warning)] pl-4">
                      <h3 className="font-medium text-gray-900">Risk Management</h3>
                      <p className="text-sm text-gray-600 mt-1">Enterprise risk framework, ISO 27005, threat intelligence</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Panel */}
            <div className="col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {showPreview && (
                    <div className="p-4 space-y-4">
                      {/* Preview Components */}
                      <div>
                        <button className="w-full px-4 py-2 text-white rounded-lg transition-colors" style={{ background: `linear-gradient(135deg, ${currentConfig.colors.primary} 0%, ${currentConfig.colors.primaryDark} 100%)` }}>
                          Primary Button
                        </button>
                      </div>
                      <div>
                        <button className="w-full px-4 py-2 border-2 rounded-lg transition-colors" style={{ borderColor: currentConfig.colors.primary, color: currentConfig.colors.primary }}>
                          Secondary Button
                        </button>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: currentConfig.colors.primaryLight }}>
                        <p className="text-sm" style={{ color: currentConfig.colors.text }}>
                          Card with primary light background
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 rounded-full" style={{ backgroundColor: currentConfig.colors.success }}>
                          <div className="h-2 rounded-full w-3/4" style={{ background: `linear-gradient(90deg, ${currentConfig.colors.success} 0%, ${currentConfig.colors.accent} 100%)` }} />
                        </div>
                        <p className="text-xs text-gray-600">Progress: 75%</p>
                      </div>
                      {currentConfig.features?.glassEffects && (
                        <div className="p-4 rounded-lg backdrop-blur-lg bg-white/80 border border-white/20 shadow-lg">
                          <p className="text-sm font-medium text-gray-900">Glass Morphism Effect</p>
                          <p className="text-xs text-gray-600 mt-1">Enabled for this brand</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Configuration Summary */}
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Configuration Summary</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand Mode:</span>
                      <span className="font-medium text-gray-900">{currentConfig.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Glass Effects:</span>
                      <span className="font-medium text-gray-900">{currentConfig.features?.glassEffects ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Animations:</span>
                      <span className="font-medium text-gray-900">{currentConfig.features?.animations || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Compliance:</span>
                      <span className="font-medium text-gray-900">
                        {Object.values(complianceConfig).filter(f => f.enabled).length} / {Object.keys(complianceConfig).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Edit Mode */}
        <button
          onClick={() => setEditMode(!editMode)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: editMode ? currentConfig.colors.success : currentConfig.colors.primary }}
        >
          {editMode ? <Lock className="w-6 h-6 text-white" /> : <Unlock className="w-6 h-6 text-white" />}
        </button>
      </div>
    </>
  );
};

export default BAIVPlatformConfig;