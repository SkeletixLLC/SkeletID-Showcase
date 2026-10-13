import { Link } from 'react-router-dom';
import { getGetPublicTeamQueryKey, useGetPublicTeam } from '@workspace/api-client-react';
import type { TeamMember } from '@workspace/api-client-react';
import Layout from '../components/Layout';

export default function Team() {
  const query = useGetPublicTeam({ query: {
    queryKey: getGetPublicTeamQueryKey(),
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  } });
  const directory = query.data;
  const orderedMembers = directory?.members.slice().sort((a, b) => Number(b.isFounder) - Number(a.isFounder) || a.sortOrder - b.sortOrder) ?? [];
  const departments = directory?.departments.slice().sort((a, b) => {
    const aHasFounder = orderedMembers.some((member) => member.isFounder && member.departmentId === a.id);
    const bHasFounder = orderedMembers.some((member) => member.isFounder && member.departmentId === b.id);
    return Number(bHasFounder) - Number(aHasFounder) || a.sortOrder - b.sortOrder;
  }) ?? [];
  const membersIn = (departmentId: number) => orderedMembers.filter((member) => member.departmentId === departmentId);
  const founderOutsideDepartment = orderedMembers.find((member) => member.isFounder && !departments.some((department) => department.id === member.departmentId));
  const renderMember = (member: TeamMember) => <article className={`team-member${member.isFounder ? ' is-founder' : ''}`} key={member.id} data-testid={`team-member-${member.id}`}>
    <div className="team-portrait">{member.photoUrl ? <img className={member.grayscale ? 'grayscale' : ''} src={member.photoUrl} alt={`Portrait of ${member.name}`} /> : <div className="team-portrait-empty" role="img" aria-label={`No portrait available for ${member.name}`}>Portrait unavailable</div>}</div>
    <div className="team-bio">
      <span className="team-member-label">{member.isFounder ? 'Founder' : 'Team member'}</span>
      <h3>{member.name}</h3><p className="team-role">{member.role}</p>
      <p className="team-biography">{member.biography}</p>
      {member.email && <a className="team-email" href={`mailto:${member.email}`}>{member.email}</a>}
    </div>
  </article>;

  return <Layout><div className="team-page">
    <header className="team-hero"><div className="container">
      <span className="team-overline">The Skeletix team</span>
      <h1>The team making<br />SkeletID a reality.</h1>
      <p>SkeletID is being developed to connect forensic disciplines in one environment. This is the team helping design, build, and support that work.</p>
      <div className="team-intro-meta">Skeletix / Team directory</div>
    </div></header>
    <div className="container team-directory">
      {query.isLoading && <div className="team-loading" aria-label="Loading team directory"><div className="team-skeleton" /><div className="team-skeleton" style={{ marginTop: 14 }} /></div>}
      {query.isError && <div className="team-error" role="alert"><h2>The team directory is unavailable</h2><p>We could not retrieve the current directory. Please try again.</p><button className="team-admin-button" onClick={() => query.refetch()} type="button">Try again</button></div>}
      {directory && !query.isError && departments.filter((department) => membersIn(department.id).length > 0).map((department, index) => {
        const list = membersIn(department.id);
        return <section className="team-department" key={department.id} data-testid={`team-department-${department.id}`}>
          <div className="team-department-heading"><div><span className="team-index">Department / {String(index + 1).padStart(2, '0')}</span><h2>{department.name}</h2></div><p>{department.description}</p></div>
          <div className="team-member-list">{list.map(renderMember)}</div>
        </section>;
      })}
      {directory && !query.isError && founderOutsideDepartment && <section className="team-department"><div className="team-department-heading"><div><span className="team-index">Skeletix / Founder</span><h2>Leadership</h2></div></div><div className="team-member-list">{renderMember(founderOutsideDepartment)}</div></section>}
      {directory && !query.isError && orderedMembers.length === 0 && <div className="team-empty"><h2>Our directory is taking shape</h2><p>Published team profiles will appear here as the directory develops.</p></div>}
      <div className="team-intro-meta"><Link to="/team/manage">Team editor access</Link></div>
    </div>
  </div></Layout>;
}
