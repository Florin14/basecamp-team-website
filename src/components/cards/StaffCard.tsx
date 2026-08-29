import type { StaffMember } from '../../data';
import styles from './StaffCard.module.css';

export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className={`panel ${styles.card}`} data-cursor="card">
      <img
        className={styles.photo}
        src={member.photo}
        alt={member.name}
        width={72}
        height={72}
        loading="lazy"
      />
      <div>
        <p className={styles.role}>{member.role}</p>
        <h3 className={styles.name}>{member.name}</h3>
        {member.bio ? <p className={styles.bio}>{member.bio}</p> : null}
        <p className={styles.since}>La club din {member.since}</p>
      </div>
    </article>
  );
}
