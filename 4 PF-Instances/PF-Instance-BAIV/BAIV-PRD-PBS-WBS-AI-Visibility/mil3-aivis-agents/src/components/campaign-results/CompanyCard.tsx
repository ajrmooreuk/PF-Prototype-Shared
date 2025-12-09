import { useState } from 'react';
import { MapPin, ExternalLink, Mail, Linkedin, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string | null;
  has_linkedin: boolean;
  linkedin_url: string | null;
}

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    industry: string;
    location: string;
    website: string;
    icp_score: number;
    icp_category: string;
    icp_auto_assigned: boolean;
    email_synced: boolean;
    synced_list: string | null;
    contacts: Contact[];
  };
  selected: boolean;
  onSelect: (id: string) => void;
  onEnrich: (id: string) => void;
  onViewDetails: (id: string) => void;
  onAddToQueue: (id: string) => void;
}

export function CompanyCard({
  company,
  selected,
  onSelect,
  onEnrich,
  onViewDetails,
  onAddToQueue,
}: CompanyCardProps) {
  const [showAllContacts, setShowAllContacts] = useState(false);

  const getICPBadge = (score: number) => {
    if (score >= 75) {
      return {
        label: `High ${score}`,
        bgColor: 'bg-[#d1fae5]',
        textColor: 'text-[#10b981]',
      };
    } else if (score >= 40) {
      return {
        label: `Med ${score}`,
        bgColor: 'bg-[#fef3c7]',
        textColor: 'text-[#fbbf24]',
      };
    } else {
      return {
        label: `Low ${score}`,
        bgColor: 'bg-[#fee2e2]',
        textColor: 'text-[#ef4444]',
      };
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      orthopedics: { bg: 'bg-[#e0f2f7]', text: 'text-[#2990C6]', label: 'Orthopedics' },
      physical_therapy: { bg: 'bg-[#dbeafe]', text: 'text-[#3b82f6]', label: 'Physical Therapy' },
      chiropractic: { bg: 'bg-[#e9d5ff]', text: 'text-[#a855f7]', label: 'Chiropractic' },
      podiatry: { bg: 'bg-[#d1fae5]', text: 'text-[#10b981]', label: 'Podiatry' },
      uncategorized: { bg: 'bg-[#f3f4f6]', text: 'text-[#6b7280]', label: 'Uncategorized' },
    };
    return badges[category] || badges.uncategorized;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const icpBadge = getICPBadge(company.icp_score);
  const categoryBadge = getCategoryBadge(company.icp_category);
  const visibleContacts = showAllContacts ? company.contacts : company.contacts.slice(0, 2);
  const hasEmail = company.contacts.some(c => c.email);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelect(company.id)}
          className="mt-1"
        />
        
        <div 
          className="w-12 h-12 rounded-full bg-[#e0f2f7] flex items-center justify-center flex-shrink-0"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#2990C6' }}
        >
          {getInitials(company.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 
              className="text-[#1f2937] truncate"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
            >
              {company.name}
            </h3>
            <div 
              className={`${icpBadge.bgColor} ${icpBadge.textColor} px-2 py-1 rounded-full flex-shrink-0`}
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px' }}
            >
              {icpBadge.label}
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-1.5 mb-3">
        <div className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
          {company.industry}
        </div>
        <div className="flex items-center gap-1.5 text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
          <MapPin className="w-3.5 h-3.5" />
          {company.location}
        </div>
        <a 
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#2990C6] hover:underline"
          style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {company.website.replace('https://', '')}
        </a>
      </div>

      {/* ICP Category Badge */}
      <div className="mb-4">
        <div 
          className={`${categoryBadge.bg} ${categoryBadge.text} px-2 py-1.5 rounded-2xl inline-flex items-center gap-1.5`}
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px' }}
        >
          {company.icp_auto_assigned && <Sparkles className="w-3 h-3" />}
          {categoryBadge.label}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e5e7eb] my-4" />

      {/* Contacts Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[#1f2937]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
            Contacts ({company.contacts.length})
          </div>
          {company.contacts.length > 2 && (
            <button
              onClick={() => setShowAllContacts(!showAllContacts)}
              className="text-[#2990C6] hover:underline"
              style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
            >
              {showAllContacts ? 'Show less' : 'Show all'}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {visibleContacts.map(contact => (
            <div key={contact.id} className="flex items-center gap-2 p-2 bg-[#f9fafb] rounded-lg">
              <div 
                className="w-8 h-8 rounded-full bg-[#e0f2f7] flex items-center justify-center flex-shrink-0"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px', color: '#2990C6' }}
              >
                {getInitials(contact.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#1f2937] truncate" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                  {contact.name}
                </div>
                <div className="text-[#6b7280] truncate" style={{ fontSize: '12px' }}>
                  {contact.title}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {contact.email ? (
                  <Mail className="w-3.5 h-3.5 text-[#10b981]" />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
                )}
                {contact.has_linkedin && (
                  <a
                    href={contact.linkedin_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] hover:text-[#2563eb]"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Provider Status */}
      <div className="mb-4 py-2 px-3 bg-[#f9fafb] rounded-lg">
        {company.email_synced ? (
          <div className="flex items-center gap-2 text-[#10b981]" style={{ fontSize: '11px' }}>
            <CheckCircle className="w-3.5 h-3.5" />
            Synced to {company.synced_list || 'Email List'}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#6b7280]" style={{ fontSize: '11px' }}>
            <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full" />
            Not synced
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!hasEmail && (
          <Button
            onClick={() => onEnrich(company.id)}
            variant="outline"
            className="flex-1 border-[#f59e0b] text-[#f59e0b] hover:bg-[#fff7ed] h-8"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px' }}
          >
            Enrich Emails
          </Button>
        )}
        <Button
          onClick={() => onViewDetails(company.id)}
          variant="outline"
          className="flex-1 border-[#d1d5db] text-[#6b7280] hover:bg-[#f9fafb] h-8"
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px' }}
        >
          View Details
        </Button>
        <Button
          onClick={() => onAddToQueue(company.id)}
          variant="outline"
          className="flex-1 border-[#2990C6] text-[#2990C6] hover:bg-[#e0f2f7] h-8"
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px' }}
        >
          Add to Queue
        </Button>
      </div>
    </div>
  );
}
