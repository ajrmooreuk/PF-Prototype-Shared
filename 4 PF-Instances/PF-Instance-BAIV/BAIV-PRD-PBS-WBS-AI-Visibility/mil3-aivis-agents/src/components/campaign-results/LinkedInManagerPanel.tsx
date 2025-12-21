import { useState } from 'react';
import { X, Send, Search, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface LinkedInContact {
  id: string;
  name: string;
  title: string;
  company: string;
  status: 'queued' | 'pending' | 'connected';
  scheduled?: string;
  avatar?: string;
}

interface LinkedInManagerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  queuedContacts: LinkedInContact[];
}

export function LinkedInManagerPanel({
  isOpen,
  onClose,
  queuedContacts,
}: LinkedInManagerPanelProps) {
  const [activeTab, setActiveTab] = useState<'connections' | 'dms'>('connections');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const filteredContacts = queuedContacts.filter(contact => {
    if (statusFilter !== 'all' && contact.status !== statusFilter) return false;
    if (searchQuery && !contact.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const weeklyUsed = queuedContacts.filter(c => c.status === 'pending' || c.status === 'connected').length;
  const weeklyLimit = 15;

  const getStatusBadge = (status: string) => {
    const badges = {
      queued: { bg: 'bg-[#fef3c7]', text: 'text-[#fbbf24]', label: 'Queued' },
      pending: { bg: 'bg-[#e9d5ff]', text: 'text-[#a855f7]', label: 'Pending' },
      connected: { bg: 'bg-[#d1fae5]', text: 'text-[#10b981]', label: 'Connected' },
    };
    return badges[status as keyof typeof badges] || badges.queued;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSelectContact = (id: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#e5e7eb]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                LinkedIn Connection Manager
              </h2>
              <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Manage outreach and DMs
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#6b7280] hover:text-[#1f2937] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'connections'
                  ? 'bg-[#2990C6] text-white'
                  : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Connection Queue ({queuedContacts.length})
            </button>
            <button
              onClick={() => setActiveTab('dms')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dms'
                  ? 'bg-[#2990C6] text-white'
                  : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              DM Queue (5)
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-[#e5e7eb] space-y-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="queued">Queued</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="connected">Connected</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <Send className="w-15 h-15 text-[#9ca3af] mx-auto mb-4" />
              <p className="text-[#6b7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                No connections queued
              </p>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-[#2990C6] text-[#2990C6]"
              >
                Add from this campaign
              </Button>
            </div>
          ) : (
            filteredContacts.map(contact => {
              const statusBadge = getStatusBadge(contact.status);
              return (
                <div
                  key={contact.id}
                  className="bg-white border border-[#e5e7eb] rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedContacts.has(contact.id)}
                      onCheckedChange={() => handleSelectContact(contact.id)}
                      className="mt-1"
                    />

                    <div
                      className="w-10 h-10 rounded-full bg-[#e0f2f7] flex items-center justify-center flex-shrink-0"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px', color: '#2990C6' }}
                    >
                      {getInitials(contact.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-[#1f2937] truncate" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                          {contact.name}
                        </div>
                        <div
                          className={`${statusBadge.bg} ${statusBadge.text} px-2 py-0.5 rounded-full flex-shrink-0`}
                          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
                        >
                          {statusBadge.label}
                        </div>
                      </div>

                      <div className="text-[#6b7280] mb-1" style={{ fontSize: '12px' }}>
                        {contact.title}
                      </div>

                      <div className="text-[#6b7280] mb-2" style={{ fontSize: '12px' }}>
                        {contact.company}
                      </div>

                      {contact.status === 'queued' && contact.scheduled && (
                        <div className="flex items-center gap-1 text-[#6b7280] mb-3" style={{ fontSize: '11px' }}>
                          <Calendar className="w-3 h-3" />
                          Scheduled: {contact.scheduled}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {contact.status === 'queued' && (
                          <Button
                            size="sm"
                            className="bg-[#2990C6] text-white hover:bg-[#2380b0] h-7 text-xs"
                          >
                            Send Request
                          </Button>
                        )}
                        {contact.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#6b7280] text-[#6b7280] h-7 text-xs"
                          >
                            Check Status
                          </Button>
                        )}
                        {contact.status === 'connected' && (
                          <Button
                            size="sm"
                            className="bg-[#10b981] text-white hover:bg-[#059669] h-7 text-xs"
                          >
                            Generate DM
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Stats */}
        <div className="p-4 border-t border-[#e5e7eb]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
              Weekly limit: {weeklyUsed}/{weeklyLimit} used
            </span>
            <span className="text-[#2990C6]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
              {weeklyLimit - weeklyUsed} remaining
            </span>
          </div>
          <div className="w-full bg-[#e5e7eb] rounded-full h-2">
            <div
              className="bg-[#2990C6] h-2 rounded-full transition-all"
              style={{ width: `${(weeklyUsed / weeklyLimit) * 100}%` }}
            />
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full mt-4 border-[#2990C6] text-[#2990C6]"
          >
            View Full Manager
          </Button>
        </div>
      </div>
    </>
  );
}
