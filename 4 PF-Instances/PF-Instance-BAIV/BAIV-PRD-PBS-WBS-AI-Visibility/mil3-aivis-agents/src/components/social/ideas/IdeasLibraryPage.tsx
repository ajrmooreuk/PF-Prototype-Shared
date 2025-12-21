import { useState, useEffect } from 'react';
import { Sparkles, Plus, Lightbulb } from 'lucide-react';
import { Button } from '../../ui/button';
import { StatsCards } from './StatsCards';
import { ThemeTabs } from './ThemeTabs';
import { FilterBar } from './FilterBar';
import { IdeaCard } from './IdeaCard';
import { GenerateAIModal } from './GenerateAIModal';
import { IdeaDetailModal } from './IdeaDetailModal';
import { ScheduleIdeaModal } from './ScheduleIdeaModal';
import { NewIdeaModal } from './NewIdeaModal';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';

export function IdeasLibraryPage() {
  const [activeTheme, setActiveTheme] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [ideas, setIdeas] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total_ideas: 0,
    ready_to_schedule: 0,
    ai_generated: 0,
    scheduled: 0,
  });
  const [themeCounts, setThemeCounts] = useState({
    all: 0,
    educate: 0,
    engage: 0,
    entertain: 0,
    empower: 0,
  });
  const [loading, setLoading] = useState(true);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  
  // Modals
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [newIdeaModalOpen, setNewIdeaModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState<any>(null);

  // Mock data
  const mockIdeas = [
    {
      id: '1',
      title: '5 Marketing Metrics Every B2B Should Track',
      description: 'Deep dive into essential KPIs that actually matter for B2B growth and how to track them effectively',
      content_preview: '📊 Are you tracking the RIGHT metrics? Most B2B companies focus on vanity metrics like social followers, but here are 5 KPIs that actually predict revenue growth...',
      category: 'educate',
      themes: ['marketing', 'analytics', 'b2b'],
      platforms: ['linkedin', 'twitter'],
      status: 'ready',
      priority: 4,
      generated_by_ai: true,
      created_at: '2025-11-10T12:00:00Z',
      updated_at: '2025-11-10T14:30:00Z',
    },
    {
      id: '2',
      title: 'Ask Your Audience: What\'s Your Biggest Challenge?',
      description: 'Open-ended question to spark conversation and learn about pain points',
      content_preview: '💬 Quick question for my network: What\'s the #1 challenge you\'re facing with content marketing right now? Drop your answer below - I\'ll compile the insights!',
      category: 'engage',
      themes: ['community', 'conversation', 'questions'],
      platforms: ['linkedin', 'facebook', 'twitter'],
      status: 'draft',
      priority: 3,
      generated_by_ai: false,
      created_at: '2025-11-08T09:15:00Z',
      updated_at: '2025-11-08T09:15:00Z',
    },
    {
      id: '3',
      title: 'The Office Playlist That Actually Boosts Productivity',
      description: 'Fun, relatable content about work-from-home music choices',
      content_preview: '🎵 Here\'s my secret: I code to Taylor Swift and nobody can stop me. What\'s on YOUR work playlist? Spill the tea! 👇',
      category: 'entertain',
      themes: ['humor', 'relatable', 'work-life'],
      platforms: ['twitter', 'instagram'],
      status: 'scheduled',
      priority: 2,
      generated_by_ai: true,
      created_at: '2025-11-05T10:00:00Z',
      updated_at: '2025-11-09T16:00:00Z',
    },
  ];

  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, [activeTheme, statusFilter, platformFilter, searchQuery, sortBy]);

  const fetchIdeas = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockIdeas];

      // Theme filter
      if (activeTheme !== 'all') {
        filtered = filtered.filter(idea => idea.category === activeTheme);
      }

      // Status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(idea => idea.status === statusFilter);
      }

      // Platform filter
      if (platformFilter !== 'all') {
        filtered = filtered.filter(idea => idea.platforms.includes(platformFilter));
      }

      // Priority filter
      if (priorityFilter === 'high') {
        filtered = filtered.filter(idea => idea.priority >= 4);
      } else if (priorityFilter === 'medium') {
        filtered = filtered.filter(idea => idea.priority >= 2 && idea.priority <= 3);
      } else if (priorityFilter === 'low') {
        filtered = filtered.filter(idea => idea.priority <= 1);
      }

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter(idea =>
          idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort
      if (sortBy === 'newest') {
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } else if (sortBy === 'oldest') {
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      } else if (sortBy === 'priority') {
        filtered.sort((a, b) => b.priority - a.priority);
      } else if (sortBy === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      setIdeas(filtered);
      setLoading(false);
    }, 500);
  };

  const fetchStats = async () => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        total_ideas: 42,
        ready_to_schedule: 15,
        ai_generated: 28,
        scheduled: 8,
      });

      setThemeCounts({
        all: 42,
        educate: 12,
        engage: 10,
        entertain: 8,
        empower: 12,
      });
    }, 300);
  };

  const handleGenerateAI = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newIdeas = Array.from({ length: data.count }, (_, i) => ({
      id: `new-${Date.now()}-${i}`,
      title: `AI Generated Idea ${i + 1}: ${data.topic.substring(0, 40)}...`,
      description: `AI-generated description for ${data.topic}`,
      content_preview: `💡 ${data.topic} - This is AI-generated content preview...`,
      category: data.category || 'educate',
      themes: ['ai-generated', 'trending'],
      platforms: data.platforms || ['linkedin', 'twitter'],
      status: 'draft',
      priority: 3,
      generated_by_ai: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    setIdeas([...newIdeas, ...ideas]);
    setHighlightedIds(newIdeas.map(i => i.id));
    
    setTimeout(() => {
      setHighlightedIds([]);
    }, 3000);

    toast.success(`✨ Generated ${data.count} ideas successfully!`);
    fetchStats();
  };

  const handleCreateIdea = (data: any) => {
    const newIdea = {
      id: `new-${Date.now()}`,
      ...data,
      generated_by_ai: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setIdeas([newIdea, ...ideas]);
    toast.success('✓ Idea created');
    fetchStats();
  };

  const handleSaveIdea = (ideaId: string, updates: any) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId
        ? { ...idea, ...updates, updated_at: new Date().toISOString() }
        : idea
    ));
    toast.success('✓ Changes saved');
    fetchStats();
  };

  const handleScheduleIdea = (ideaId: string, scheduleData: any) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId
        ? {
            ...idea,
            status: 'scheduled',
            scheduled_for: scheduleData.scheduled_for,
            updated_at: new Date().toISOString(),
          }
        : idea
    ));
    toast.success(`✓ Scheduled for ${new Date(scheduleData.scheduled_for).toLocaleString()}`);
    fetchStats();
  };

  const handleDuplicateIdea = (idea: any) => {
    const duplicated = {
      ...idea,
      id: `dup-${Date.now()}`,
      title: `[Copy] ${idea.title}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setIdeas([duplicated, ...ideas]);
    toast.success('✓ Idea duplicated');
  };

  const handleDeleteIdea = (idea: any) => {
    setIdeaToDelete(idea);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ideaToDelete) {
      setIdeas(ideas.filter(i => i.id !== ideaToDelete.id));
      toast.success('Idea deleted');
      setDeleteDialogOpen(false);
      setIdeaToDelete(null);
      fetchStats();
    }
  };

  const filteredIdeasCount = ideas.length;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Breadcrumb */}
        <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Dashboard &gt; Social Media &gt; Ideas Library
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              Social Ideas Library
            </h1>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Organize and schedule content ideas using the 4 E's framework
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setGenerateModalOpen(true)}
              className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11 px-6"
              style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate with AI
            </Button>
            <Button
              onClick={() => setNewIdeaModalOpen(true)}
              variant="outline"
              className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0f9fb] h-11 px-5"
              style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Idea
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Theme Tabs */}
        <ThemeTabs
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
          themeCounts={themeCounts}
        />

        {/* Filter Bar */}
        <FilterBar
          statusFilter={statusFilter}
          platformFilter={platformFilter}
          priorityFilter={priorityFilter}
          searchQuery={searchQuery}
          sortBy={sortBy}
          viewMode={viewMode}
          resultsCount={filteredIdeasCount}
          onStatusChange={setStatusFilter}
          onPlatformChange={setPlatformFilter}
          onPriorityChange={setPriorityFilter}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onViewModeChange={setViewMode}
        />

        {/* Ideas Grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
              </div>
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <Lightbulb className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3
              className="text-gray-600 mb-2"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
            >
              No ideas yet
            </h3>
            <p className="text-gray-500 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Start by generating ideas with AI or create manually
            </p>
            <div className="flex flex-col items-center gap-3 max-w-xs mx-auto">
              <Button
                onClick={() => setGenerateModalOpen(true)}
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 w-full"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate with AI
              </Button>
              <Button
                onClick={() => setNewIdeaModalOpen(true)}
                variant="outline"
                className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0f9fb] h-12 w-full"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Manually
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {ideas.map(idea => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isHighlighted={highlightedIds.includes(idea.id)}
                onView={() => {
                  setSelectedIdea(idea);
                  setDetailModalOpen(true);
                }}
                onEdit={() => {
                  setSelectedIdea(idea);
                  setDetailModalOpen(true);
                }}
                onSchedule={() => {
                  setSelectedIdea(idea);
                  setScheduleModalOpen(true);
                }}
                onDuplicate={() => handleDuplicateIdea(idea)}
                onDelete={() => handleDeleteIdea(idea)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <GenerateAIModal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onGenerate={handleGenerateAI}
      />

      {selectedIdea && (
        <>
          <IdeaDetailModal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            idea={selectedIdea}
            onSave={(updates) => handleSaveIdea(selectedIdea.id, updates)}
            onSchedule={() => {
              setDetailModalOpen(false);
              setScheduleModalOpen(true);
            }}
          />

          <ScheduleIdeaModal
            isOpen={scheduleModalOpen}
            onClose={() => setScheduleModalOpen(false)}
            idea={selectedIdea}
            onSchedule={(data) => handleScheduleIdea(selectedIdea.id, data)}
          />
        </>
      )}

      <NewIdeaModal
        isOpen={newIdeaModalOpen}
        onClose={() => setNewIdeaModalOpen(false)}
        onCreate={handleCreateIdea}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this idea?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The idea will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
