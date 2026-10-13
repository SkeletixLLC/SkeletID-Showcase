import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Check, Edit2, LogOut, Plus, Trash2, Users } from 'lucide-react';
import {
  getGetAdminTeamQueryKey, getGetPublicTeamQueryKey,
  useCreateTeamDepartment, useCreateTeamMember, useDeleteTeamDepartment, useDeleteTeamMember,
  useGetAdminTeam, useGetTeamSession, useRequestTeamPhotoUpload, useUpdateTeamDepartment, useUpdateTeamMember,
} from '@workspace/api-client-react';
import type { TeamDepartment, TeamDepartmentInput, TeamMember, TeamMemberInput } from '@workspace/api-client-react';
import Layout from '../components/Layout';

const blankMember = (): TeamMemberInput => ({ name: '', role: '', biography: '', email: '', departmentId: 0, photoPath: null, grayscale: false, isPublished: false, sortOrder: 0 });
const blankDepartment = (): TeamDepartmentInput => ({ name: '', description: '', sortOrder: 0 });
const homeUrl = import.meta.env.BASE_URL;

function readableError(error: unknown, fallback: string) {
  const data = (error as { data?: { error?: unknown } } | null)?.data;
  if (typeof data?.error === 'string') return data.error;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function TeamManage() {
  const { signOut } = useClerk();
  const queryClient = useQueryClient();
  const session = useGetTeamSession();
  const admin = useGetAdminTeam({ query: { enabled: session.data?.isOwner === true, queryKey: getGetAdminTeamQueryKey() } });
  const createDepartment = useCreateTeamDepartment();
  const updateDepartment = useUpdateTeamDepartment();
  const deleteDepartment = useDeleteTeamDepartment();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();
  const requestPhoto = useRequestTeamPhotoUpload();

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [memberForm, setMemberForm] = useState<TeamMemberInput>(blankMember);
  const [memberError, setMemberError] = useState('');
  const [memberNotice, setMemberNotice] = useState('');
  const [isMemberEditing, setIsMemberEditing] = useState(false);
  const [memberBaseline, setMemberBaseline] = useState('');
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [departmentForm, setDepartmentForm] = useState<TeamDepartmentInput>(blankDepartment);
  const [departmentError, setDepartmentError] = useState('');
  const [departmentNotice, setDepartmentNotice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [portraitPreview, setPortraitPreview] = useState('');

  const directory = admin.data;
  const departments = directory?.departments.slice().sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
  const members = directory?.members.slice().sort((a, b) => Number(b.isFounder) - Number(a.isFounder) || a.sortOrder - b.sortOrder) ?? [];
  const invalidate = async () => Promise.all([
    queryClient.invalidateQueries({ queryKey: getGetAdminTeamQueryKey() }),
    queryClient.invalidateQueries({ queryKey: getGetPublicTeamQueryKey() }),
  ]);

  const startNewMember = () => {
    if (uploading || createMember.isPending || updateMember.isPending) return;
    if (isMemberEditing && JSON.stringify(memberForm) !== memberBaseline && !window.confirm('Discard unsaved profile changes?')) return;
    setSelectedMemberId(null);
    const nextForm = { ...blankMember(), departmentId: departments[0]?.id ?? 0 };
    setMemberForm(nextForm); setMemberBaseline(JSON.stringify(nextForm));
    setMemberError(''); setMemberNotice(''); setUploadError('');
    setPortraitPreview('');
    setIsMemberEditing(true);
  };
  const startEditMember = (member: TeamMember) => {
    if (uploading || createMember.isPending || updateMember.isPending) return;
    if (isMemberEditing && JSON.stringify(memberForm) !== memberBaseline && !window.confirm('Discard unsaved profile changes?')) return;
    setSelectedMemberId(member.id);
    const nextForm = {
      name: member.name, role: member.role, biography: member.biography, email: member.email,
      departmentId: member.departmentId, photoPath: member.photoPath, grayscale: member.grayscale,
      isPublished: member.isPublished, sortOrder: member.sortOrder,
    };
    setMemberForm(nextForm); setMemberBaseline(JSON.stringify(nextForm));
    setMemberError(''); setMemberNotice(''); setUploadError('');
    setPortraitPreview(member.photoUrl ?? '');
    setIsMemberEditing(true);
  };
  const startNewDepartment = () => {
    setDepartmentId(null); setDepartmentForm({ ...blankDepartment(), sortOrder: departments.length });
    setDepartmentError(''); setDepartmentNotice('');
  };
  const startEditDepartment = (department: TeamDepartment) => {
    setDepartmentId(department.id);
    setDepartmentForm({ name: department.name, description: department.description, sortOrder: department.sortOrder });
    setDepartmentError(''); setDepartmentNotice('');
  };

  const saveDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setDepartmentError(''); setDepartmentNotice('');
    if (!departmentForm.name.trim()) { setDepartmentError('Enter a department name.'); return; }
    if (departmentForm.name.trim().length > 100 || departmentForm.description.length > 500 || !Number.isInteger(departmentForm.sortOrder) || departmentForm.sortOrder < 0 || departmentForm.sortOrder > 10000) {
      setDepartmentError('Check the field limits and sort order.'); return;
    }
    const data = { ...departmentForm, name: departmentForm.name.trim(), description: departmentForm.description.trim() };
    try {
      if (departmentId === null) await createDepartment.mutateAsync({ data });
      else await updateDepartment.mutateAsync({ id: departmentId, data });
      await invalidate(); setDepartmentNotice(departmentId === null ? 'Department created.' : 'Department saved.');
      setDepartmentId(null); setDepartmentForm(blankDepartment());
    } catch (error) { setDepartmentError(readableError(error, 'Could not save the department. Your changes are still here.')); }
  };
  const removeDepartment = async (department: TeamDepartment) => {
    if (!window.confirm(`Delete the ${department.name} department? This cannot be undone.`)) return;
    setDepartmentError('');
    try { await deleteDepartment.mutateAsync({ id: department.id }); await invalidate(); if (departmentId === department.id) { setDepartmentId(null); setDepartmentForm(blankDepartment()); } }
    catch { setDepartmentError('This department could not be deleted. Departments with profiles assigned to them cannot be removed.'); }
  };

  const saveMember = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMemberError(''); setMemberNotice('');
    const data = { ...memberForm, name: memberForm.name.trim(), role: memberForm.role.trim(), biography: memberForm.biography.trim(), email: memberForm.email.trim() };
    if (!data.name || !data.role || !data.biography || data.departmentId < 1) { setMemberError('Name, role, biography, and department are required.'); return; }
    if (data.name.length > 120 || data.role.length > 160 || data.biography.length > 4000 || data.email.length > 254 || !Number.isInteger(data.sortOrder) || data.sortOrder < 0 || data.sortOrder > 10000) {
      setMemberError('One or more fields exceed their allowed limits.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setMemberError('Enter a valid email address.'); return; }
    try {
      if (selectedMemberId === null) await createMember.mutateAsync({ data });
      else await updateMember.mutateAsync({ id: selectedMemberId, data });
      await invalidate(); setMemberNotice(selectedMemberId === null ? 'Profile created.' : 'Profile saved.');
      setIsMemberEditing(false); setSelectedMemberId(null);
    } catch (error) { setMemberError(readableError(error, 'Could not save the profile. Your changes are still here.')); }
  };
  const removeMember = async (member: TeamMember) => {
    if (uploading || createMember.isPending || updateMember.isPending) return;
    if (!window.confirm(`Delete ${member.name}'s profile? This cannot be undone.`)) return;
    setMemberError('');
    try { await deleteMember.mutateAsync({ id: member.id }); await invalidate(); if (selectedMemberId === member.id) { setIsMemberEditing(false); setSelectedMemberId(null); } }
    catch (error) { setMemberError(readableError(error, 'Could not delete this profile.')); }
  };
  const uploadPhoto = async (file?: File) => {
    if (!file) return;
    setUploadError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setUploadError('Choose a JPEG, PNG, or WebP image.'); return; }
    if (file.size < 1 || file.size > 8 * 1024 * 1024) { setUploadError('The image must be smaller than 8 MB.'); return; }
    setUploading(true);
    try {
      const upload = await requestPhoto.mutateAsync({ data: { name: file.name, size: file.size, contentType: file.type as 'image/jpeg' | 'image/png' | 'image/webp' } });
      const response = await fetch(upload.uploadURL, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
      if (!response.ok) throw new Error('The image upload did not complete. Please try again.');
      setMemberForm((current) => ({ ...current, photoPath: upload.objectPath }));
      setPortraitPreview(URL.createObjectURL(file));
    } catch (error) { setUploadError(readableError(error, 'The image could not be uploaded. Your profile edits are unchanged.')); }
    finally { setUploading(false); }
  };

  if (session.isLoading) return <Layout><div className="team-page"><main className="container team-manage-shell"><div className="team-skeleton" /></main></div></Layout>;
  if (session.isError) return <Layout><div className="team-page"><main className="container"><section className="team-access"><div className="team-access-mark"><Users /></div><h1>Team tools are unavailable</h1><p>We could not verify access right now. Try again in a moment.</p><button className="team-admin-button" onClick={() => session.refetch()}>Try again</button></section></main></div></Layout>;
  if (!session.data?.signedIn) return <Layout><div className="team-page"><main className="container"><section className="team-access"><div className="team-access-mark"><Users /></div><h1>Owner access required</h1><p>Sign in to check whether your account has permission to manage the Skeletix team directory. Creating an account does not grant editor access.</p><Link className="team-admin-button primary" to="/sign-in">Sign in to continue</Link><p><Link to="/team">Return to the public team page</Link></p></section></main></div></Layout>;
  if (!session.data.isOwner) return <Layout><div className="team-page"><main className="container"><section className="team-access"><div className="team-access-mark"><Users /></div><h1>This area is restricted</h1><p>Your account is signed in, but it does not have permission to manage the team directory. Access is verified privately by Skeletix.</p><div className="team-admin-actions" style={{ justifyContent: 'center' }}><Link className="team-admin-button" to="/team">View public team</Link><button className="team-admin-button" onClick={() => signOut({ redirectUrl: homeUrl })}><LogOut size={15} /> Sign out</button></div></section></main></div></Layout>;
  if (admin.isLoading) return <Layout><div className="team-page"><main className="container team-manage-shell"><div className="team-skeleton" /></main></div></Layout>;
  if (admin.isError || !directory) return <Layout><div className="team-page"><main className="container team-manage-shell"><section className="team-error" role="alert"><h2>Editor data could not be loaded</h2><p>Try again. No saved directory content has been changed.</p><button className="team-admin-button" onClick={() => admin.refetch()}>Retry</button></section></main></div></Layout>;

  return <Layout><div className="team-page">
    <main className="container team-manage-shell">
      <div className="team-manage-heading"><div><span className="team-overline">Private workspace / Owner access</span><h1>Team directory</h1><p>Manage departments, profiles, publication, and order. Changes are reflected on the public directory.</p></div>
        <div className="team-admin-actions"><Link className="team-admin-button" to="/team"><ArrowLeft size={15} /> Public page</Link><button className="team-admin-button" onClick={() => signOut({ redirectUrl: homeUrl })}><LogOut size={15} /> Sign out</button></div>
      </div>
      <div className="team-manage-grid">
        <section className="team-admin-panel">
          <div className="team-admin-panel-head"><h2>Departments</h2><button type="button" className="team-icon-button" aria-label="Add department" onClick={startNewDepartment}><Plus size={17} /></button></div>
          <div className="team-admin-panel-body">
            {departmentError && <div className="team-form-error" role="alert">{departmentError}</div>}
            {departments.length === 0 && <p className="team-form-hint">No departments yet. Create one to organize profiles.</p>}
            {departments.map((department) => <div className="team-admin-dept" key={department.id}>
              <div className="team-admin-dept-copy"><strong>{department.name}</strong><small>Order {department.sortOrder} · {members.filter((member) => member.departmentId === department.id).length} profiles</small></div>
              <div className="team-admin-inline-actions"><button type="button" className="team-icon-button" aria-label={`Edit ${department.name}`} onClick={() => startEditDepartment(department)}><Edit2 size={14} /></button><button type="button" className="team-icon-button" aria-label={`Delete ${department.name}`} onClick={() => void removeDepartment(department)}><Trash2 size={14} /></button></div>
            </div>)}
            <form className="team-admin-form" onSubmit={(event) => void saveDepartment(event)} style={{ marginTop: 22, paddingTop: 20, borderTop: '1px solid #2b4452' }}>
              <strong style={{ color: '#dce9ed', fontSize: 13 }}>{departmentId === null ? 'New department' : 'Edit department'}</strong>
              <div className="team-form-field"><label htmlFor="department-name">Name</label><input id="department-name" data-testid="input-department-name" maxLength={100} required value={departmentForm.name} onChange={(event) => setDepartmentForm({ ...departmentForm, name: event.target.value })} /></div>
              <div className="team-form-field"><label htmlFor="department-description">Description</label><textarea id="department-description" data-testid="input-department-description" maxLength={500} value={departmentForm.description} onChange={(event) => setDepartmentForm({ ...departmentForm, description: event.target.value })} /></div>
              <div className="team-form-field"><label htmlFor="department-order">Display order</label><input id="department-order" data-testid="input-department-order" type="number" step={1} min={0} max={10000} value={departmentForm.sortOrder} onChange={(event) => setDepartmentForm({ ...departmentForm, sortOrder: Number(event.target.value) })} /></div>
              {departmentNotice && <div className="team-form-success" role="status">{departmentNotice}</div>}
              <div className="team-admin-actions"><button className="team-admin-button primary" disabled={createDepartment.isPending || updateDepartment.isPending} type="submit">{departmentId === null ? 'Create department' : 'Save department'}</button>{departmentId !== null && <button className="team-admin-button" type="button" onClick={startNewDepartment}>Cancel edit</button>}</div>
            </form>
          </div>
        </section>
        <section className="team-admin-panel">
          <div className="team-admin-panel-head"><h2>Profiles <span className="team-form-hint">({members.length})</span></h2><button className="team-admin-button primary" type="button" onClick={startNewMember}><Plus size={15} /> Add profile</button></div>
          <div className="team-admin-panel-body">
            {memberError && !isMemberEditing && <div className="team-form-error" role="alert">{memberError}</div>}
            {memberNotice && !isMemberEditing && <div className="team-form-success" role="status">{memberNotice}</div>}
            {members.length === 0 && <p className="team-form-hint">No profiles are available yet. Add the first team profile when ready.</p>}
            {members.map((member) => <div className="team-member-admin" key={member.id}>
              {member.photoUrl ? <img className={`team-admin-avatar${member.grayscale ? ' grayscale' : ''}`} src={member.photoUrl} alt="" /> : <div className="team-admin-avatar" />}
              <div className="team-admin-person"><strong>{member.name}{member.isFounder ? ' · Founder' : ''}</strong><small>{member.role}</small><span className={`team-status${member.isPublished ? ' published' : ''}`}>{member.isPublished ? 'Published' : 'Hidden'}</span></div>
              <div className="team-admin-inline-actions"><button className="team-icon-button" type="button" aria-label={`Edit ${member.name}`} onClick={() => startEditMember(member)}><Edit2 size={14} /></button><button className="team-icon-button" type="button" aria-label={`Delete ${member.name}`} onClick={() => void removeMember(member)}><Trash2 size={14} /></button></div>
            </div>)}
          </div>
        </section>
      </div>
      {isMemberEditing && <section className="team-admin-panel team-editor-card">
        <div className="team-admin-panel-head"><h2>{selectedMemberId === null ? 'New profile' : 'Edit profile'}</h2><span className="team-form-hint">{members.find((member) => member.id === selectedMemberId)?.isFounder ? 'Founder flag is managed by the server.' : 'Profile details'}</span></div>
        <div className="team-admin-panel-body">
          {memberError && <div className="team-form-error" role="alert">{memberError}</div>}
          <form className="team-admin-form" onSubmit={(event) => void saveMember(event)}>
            <div className="team-form-row">
              <div className="team-form-field"><label htmlFor="member-name">Name</label><input id="member-name" data-testid="input-member-name" maxLength={120} required value={memberForm.name} onChange={(event) => setMemberForm({ ...memberForm, name: event.target.value })} /></div>
              <div className="team-form-field"><label htmlFor="member-role">Role</label><input id="member-role" data-testid="input-member-role" maxLength={160} required value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })} /></div>
            </div>
            <div className="team-form-row">
              <div className="team-form-field"><label htmlFor="member-email">Email</label><input id="member-email" data-testid="input-member-email" type="email" maxLength={254} required value={memberForm.email} onChange={(event) => setMemberForm({ ...memberForm, email: event.target.value })} /></div>
              <div className="team-form-field"><label htmlFor="member-department">Department</label><select id="member-department" data-testid="select-member-department" required value={memberForm.departmentId || ''} onChange={(event) => setMemberForm({ ...memberForm, departmentId: Number(event.target.value) })}><option value="" disabled>Choose a department</option>{departments.map((department) => <option value={department.id} key={department.id}>{department.name}</option>)}</select>{departments.length === 0 && <small>Create a department before saving a profile.</small>}</div>
            </div>
            <div className="team-form-field"><label htmlFor="member-biography">Short biography</label><textarea id="member-biography" data-testid="input-member-biography" maxLength={4000} required value={memberForm.biography} onChange={(event) => setMemberForm({ ...memberForm, biography: event.target.value })} /><small>{memberForm.biography.length} / 4000 characters</small></div>
            <div className="team-form-row">
              <div className="team-form-field"><label htmlFor="member-order">Display order</label><input id="member-order" data-testid="input-member-order" type="number" step={1} min={0} max={10000} value={memberForm.sortOrder} onChange={(event) => setMemberForm({ ...memberForm, sortOrder: Number(event.target.value) })} /></div>
              <div className="team-form-field"><label htmlFor="member-photo">Portrait image</label><input id="member-photo" data-testid="input-member-photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => void uploadPhoto(event.target.files?.[0])} /><small>JPEG, PNG, or WebP. Maximum 8 MB.</small></div>
            </div>
            {uploadError && <div className="team-form-error" role="alert">{uploadError}</div>}
            {uploading && <p className="team-form-hint" role="status">Uploading portrait securely…</p>}
            {memberForm.photoPath && <div className="team-photo-preview">{portraitPreview && <img className={memberForm.grayscale ? 'grayscale' : ''} src={portraitPreview} alt="Selected portrait preview" />}Portrait selected for this profile<button type="button" className="team-icon-button" disabled={uploading} onClick={() => { setMemberForm({ ...memberForm, photoPath: null }); setPortraitPreview(''); }}>Remove</button></div>}
            <div className="team-form-row">
              <label className="team-check-row"><input type="checkbox" checked={memberForm.grayscale} onChange={(event) => setMemberForm({ ...memberForm, grayscale: event.target.checked })} />Display the portrait in black and white</label>
              <label className="team-check-row"><input type="checkbox" checked={memberForm.isPublished} onChange={(event) => setMemberForm({ ...memberForm, isPublished: event.target.checked })} />Publish this profile publicly</label>
            </div>
            {memberNotice && <div className="team-form-success" role="status"><Check size={14} /> {memberNotice}</div>}
            <p className="team-form-hint">Publishing makes this person's name, biography, portrait, and email visible to everyone. Confirm their approval first.</p>
            <div className="team-editor-actions"><button type="button" className="team-admin-button" disabled={uploading || createMember.isPending || updateMember.isPending} onClick={() => { if (JSON.stringify(memberForm) !== memberBaseline && !window.confirm('Discard unsaved profile changes?')) return; setIsMemberEditing(false); setMemberError(''); }}>Cancel</button><button type="submit" className="team-admin-button primary" disabled={createMember.isPending || updateMember.isPending || uploading}>Save profile</button></div>
          </form>
        </div>
      </section>}
    </main>
  </div></Layout>;
}
