'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Play, Settings, Users, Target, BarChart3 } from 'lucide-react';
import type { AnalysisRequest, Entity, Competitor } from '@/types/analysis';

// ============================================================================
// Validation Schema
// ============================================================================

const entitySchema = z.object({
  id: z.string().min(1, 'Entity ID is required'),
  type: z.string().min(1, 'Entity type is required'),
  name: z.string().min(1, 'Entity name is required'),
});

const competitorSchema = z.object({
  id: z.string().min(1, 'Competitor ID is required'),
  name: z.string().min(1, 'Competitor name is required'),
  description: z.string().optional(),
});

const analysisRequestSchema = z.object({
  domainType: z.string().min(1, 'Domain type is required'),
  analysisScope: z.string().min(1, 'Analysis scope is required'),
  analysisType: z.enum(['comparative', 'structural', 'competitive']),
  targetEntities: z.array(entitySchema).min(3, 'At least 3 entities are required'),
  competitors: z.array(competitorSchema).optional(),
  timeframe: z.string().optional(),
  weightImpact: z.number().min(0).max(1),
  weightEffort: z.number().min(0).max(1),
  weightUrgency: z.number().min(0).max(1),
  weightAlignment: z.number().min(0).max(1),
  strategicObjectives: z.array(z.string()).optional(),
  linkedOkrs: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof analysisRequestSchema>;

// ============================================================================
// Props
// ============================================================================

interface AnalysisRequestFormProps {
  onSubmit: (data: AnalysisRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<AnalysisRequest>;
}

// ============================================================================
// Component
// ============================================================================

export function AnalysisRequestForm({
  onSubmit,
  isLoading = false,
  defaultValues,
}: AnalysisRequestFormProps) {
  const [activeTab, setActiveTab] = useState<'entities' | 'competitors' | 'settings'>('entities');

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(analysisRequestSchema),
    defaultValues: {
      domainType: defaultValues?.domainType || 'baiv',
      analysisScope: defaultValues?.analysisScope || 'ai_visibility',
      analysisType: defaultValues?.analysisType || 'comparative',
      targetEntities: defaultValues?.targetEntities || [
        { id: '', type: 'Brand', name: '' },
        { id: '', type: 'AIModel', name: '' },
        { id: '', type: 'Topic', name: '' },
      ],
      competitors: defaultValues?.competitors || [],
      weightImpact: defaultValues?.weightImpact || 0.35,
      weightEffort: defaultValues?.weightEffort || 0.25,
      weightUrgency: defaultValues?.weightUrgency || 0.20,
      weightAlignment: defaultValues?.weightAlignment || 0.20,
      strategicObjectives: defaultValues?.strategicObjectives || [],
      linkedOkrs: defaultValues?.linkedOkrs || [],
    },
  });

  const {
    fields: entityFields,
    append: appendEntity,
    remove: removeEntity,
  } = useFieldArray({
    control,
    name: 'targetEntities',
  });

  const {
    fields: competitorFields,
    append: appendCompetitor,
    remove: removeCompetitor,
  } = useFieldArray({
    control,
    name: 'competitors',
  });

  const weights = watch(['weightImpact', 'weightEffort', 'weightUrgency', 'weightAlignment']);
  const totalWeight = weights.reduce((sum, w) => sum + (w || 0), 0);

  const handleFormSubmit = (data: FormData) => {
    const request: AnalysisRequest = {
      ...data,
      competitors: data.competitors || [],
      strategicObjectives: data.strategicObjectives || [],
      linkedOkrs: data.linkedOkrs || [],
    };
    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Gap Analysis Configuration</h2>
        <p className="mt-2 text-blue-100">
          Configure your analysis parameters to identify strategic gaps and opportunities.
        </p>
      </div>

      {/* Basic Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          Analysis Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain Type
            </label>
            <select
              {...register('domainType')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="baiv">BAIV (AI Visibility)</option>
              <option value="air">AIR (AI Readiness)</option>
              <option value="w4m">W4M (Works 4 Me)</option>
              <option value="pf-core">PF-Core (Platform)</option>
            </select>
            {errors.domainType && (
              <p className="mt-1 text-sm text-red-600">{errors.domainType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Analysis Scope
            </label>
            <input
              type="text"
              {...register('analysisScope')}
              placeholder="e.g., ai_visibility, competitive_analysis"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.analysisScope && (
              <p className="mt-1 text-sm text-red-600">{errors.analysisScope.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Analysis Type
            </label>
            <select
              {...register('analysisType')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="comparative">Comparative</option>
              <option value="structural">Structural</option>
              <option value="competitive">Competitive</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeframe (Optional)
          </label>
          <input
            type="text"
            {...register('timeframe')}
            placeholder="e.g., 2025-Q1, Last 6 months"
            className="w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab('entities')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'entities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Target Entities ({entityFields.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('competitors')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'competitors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Competitors ({competitorFields.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Priority Weights
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Entities Tab */}
          {activeTab === 'entities' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Add at least 3 entities to analyze. Entities can be brands, products, topics, or AI models.
              </p>

              {entityFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`targetEntities.${index}.id`)}
                      placeholder="Entity ID"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      {...register(`targetEntities.${index}.type`)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                      <option value="Brand">Brand</option>
                      <option value="Product">Product</option>
                      <option value="Topic">Topic</option>
                      <option value="AIModel">AI Model</option>
                      <option value="Competitor">Competitor</option>
                      <option value="Market">Market Segment</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`targetEntities.${index}.name`)}
                      placeholder="Entity Name"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEntity(index)}
                    disabled={entityFields.length <= 3}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {errors.targetEntities && (
                <p className="text-sm text-red-600">{errors.targetEntities.message}</p>
              )}

              <button
                type="button"
                onClick={() => appendEntity({ id: '', type: 'Brand', name: '' })}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Plus className="w-4 h-4" />
                Add Entity
              </button>
            </div>
          )}

          {/* Competitors Tab */}
          {activeTab === 'competitors' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Add competitors for comparative analysis. This helps identify competitive gaps and threats.
              </p>

              {competitorFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`competitors.${index}.id`)}
                      placeholder="Competitor ID"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`competitors.${index}.name`)}
                      placeholder="Competitor Name"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`competitors.${index}.description`)}
                      placeholder="Description (optional)"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCompetitor(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => appendCompetitor({ id: '', name: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Plus className="w-4 h-4" />
                Add Competitor
              </button>
            </div>
          )}

          {/* Priority Weights Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Configure how gaps and opportunities are prioritized. Weights should sum to 1.0.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact Weight
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    {...register('weightImpact', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Effort Weight
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    {...register('weightEffort', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Weight
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    {...register('weightUrgency', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alignment Weight
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    {...register('weightAlignment', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className={`text-sm ${Math.abs(totalWeight - 1) < 0.01 ? 'text-green-600' : 'text-amber-600'}`}>
                Total: {totalWeight.toFixed(2)} {Math.abs(totalWeight - 1) < 0.01 ? '✓' : '(should equal 1.0)'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Running Analysis...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Analysis
            </>
          )}
        </button>
      </div>
    </form>
  );
}
