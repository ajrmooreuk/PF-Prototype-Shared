import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { UserPlus, Trash2, Edit, MoreVertical } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface TeamSettingsProps {
  userRole: 'owner' | 'admin' | 'member' | 'viewer';
}

export function TeamSettings({ userRole }: TeamSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    full_name: '',
    role: 'member',
    department: '',
    job_title: ''
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setLoading(true);
    try {
      // NOTE: /admin/team/members endpoint doesn't exist in backend yet
      // For now, use default team member data
      // TODO: Backend needs to implement GET /admin/team/members endpoint
      
      // const response = await callEccoAPI('/admin/team/members', 'GET');
      // setMembers(response.members || []);
      
      // Use default team members
      setMembers([
        {
          id: 'member_1',
          full_name: 'Admin User',
          email: 'admin@baiv.com',
          role: 'admin',
          status: 'active',
          job_title: 'Administrator',
          department: 'Operations',
          last_login: new Date().toISOString()
        }
      ]);
    } catch (error: any) {
      console.error('Failed to load team members:', error);
      // Use default team member on error
      setMembers([
        {
          id: 'member_1',
          full_name: 'Admin User',
          email: 'admin@baiv.com',
          role: 'admin',
          status: 'active',
          job_title: 'Administrator',
          department: 'Operations',
          last_login: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await callEccoAPI('/admin/team/members', 'POST', inviteForm);
      toast.success('Invitation sent successfully');
      setShowInviteModal(false);
      setInviteForm({
        email: '',
        full_name: '',
        role: 'member',
        department: '',
        job_title: ''
      });
      loadTeamMembers();
    } catch (error: any) {
      console.error('Failed to invite member:', error);
      toast.error(error.message || 'Failed to send invitation');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    
    setSaving(true);
    try {
      await callEccoAPI(`/admin/team/members/${selectedMember.id}`, 'PATCH', selectedMember);
      toast.success('Member updated successfully');
      setShowEditModal(false);
      setSelectedMember(null);
      loadTeamMembers();
    } catch (error: any) {
      console.error('Failed to update member:', error);
      toast.error(error.message || 'Failed to update member');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (memberId: string, memberName: string) => {
    if (!window.confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
      return;
    }
    
    try {
      await callEccoAPI(`/admin/team/members/${memberId}`, 'DELETE');
      toast.success('Member removed successfully');
      loadTeamMembers();
    } catch (error: any) {
      console.error('Failed to delete member:', error);
      toast.error(error.message || 'Failed to remove member');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-700';
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'member': return 'bg-green-100 text-green-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canEdit = userRole === 'owner' || userRole === 'admin';
  const canDelete = userRole === 'owner';

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
            Team Members
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
            Manage your team and their access levels
          </p>
        </div>
        {canEdit && (
          <Button
            onClick={() => setShowInviteModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Member
              </th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Role
              </th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Department
              </th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Last Login
              </th>
              {canEdit && (
                <th className="text-right px-6 py-3 text-xs uppercase tracking-wider text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                      {member.full_name}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                      {member.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs capitalize ${getRoleBadgeColor(member.role)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {member.department || '—'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    {member.last_login ? new Date(member.last_login).toLocaleDateString() : '—'}
                  </span>
                </td>
                {canEdit && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMember(member);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                        title="Edit member"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {canDelete && member.role !== 'owner' && (
                        <button
                          onClick={() => handleDeleteMember(member.id, member.full_name)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Member Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Invite Team Member
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Open Sans' }}>
              Send an invitation to join your team
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteMember} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="invite_email" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Email Address
              </Label>
              <Input
                id="invite_email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="colleague@company.com"
                required
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            <div>
              <Label htmlFor="invite_name" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Full Name
              </Label>
              <Input
                id="invite_name"
                value={inviteForm.full_name}
                onChange={(e) => setInviteForm({ ...inviteForm, full_name: e.target.value })}
                placeholder="John Smith"
                required
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invite_role" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Role
                </Label>
                <Select value={inviteForm.role} onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userRole === 'owner' && <SelectItem value="admin">Admin</SelectItem>}
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="invite_department" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Department
                </Label>
                <Input
                  id="invite_department"
                  value={inviteForm.department}
                  onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                  placeholder="Marketing"
                  className="mt-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                {saving ? 'Sending...' : 'Send Invitation'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowInviteModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Member Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Edit Team Member
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Open Sans' }}>
              Update member information and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <form onSubmit={handleUpdateMember} className="space-y-4 mt-4">
              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Email Address
                </Label>
                <Input
                  value={selectedMember.email}
                  disabled
                  className="mt-1 bg-gray-50"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
              <div>
                <Label htmlFor="edit_name" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Full Name
                </Label>
                <Input
                  id="edit_name"
                  value={selectedMember.full_name}
                  onChange={(e) => setSelectedMember({ ...selectedMember, full_name: e.target.value })}
                  className="mt-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_role" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Role
                  </Label>
                  <Select
                    value={selectedMember.role}
                    onValueChange={(value) => setSelectedMember({ ...selectedMember, role: value })}
                    disabled={selectedMember.role === 'owner' && userRole !== 'owner'}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === 'owner' && <SelectItem value="admin">Admin</SelectItem>}
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_department" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Department
                  </Label>
                  <Input
                    id="edit_department"
                    value={selectedMember.department || ''}
                    onChange={(e) => setSelectedMember({ ...selectedMember, department: e.target.value })}
                    className="mt-1"
                    style={{ fontFamily: 'Open Sans' }}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}