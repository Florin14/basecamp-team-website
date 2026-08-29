import { useState } from 'react';
import type { FormEvent } from 'react';
import { club } from '../data';
import { cx } from '../lib/format';
import { Button } from '../components/ui/Button';
import { ArrowRight, Mail, Phone, Pin, Trophy, Users } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SplitText } from '../components/ui/SplitText';
import styles from './Contact.module.css';

type Status = { kind: 'idle' | 'ok' | 'error'; message: string };

/** Cele trei motive pentru care cineva ne scrie. */
const channels = [
  {
    id: 'jucatori',
    icon: Users,
    title: 'Vrei să joci la noi',
    body: 'Antrenamente deschise în fiecare joi, de la 20:00. Peste 18 ani, cu sau fără experiență în minifotbal.',
    email: club.contact.join,
    cta: 'Scrie-ne pentru selecție',
  },
  {
    id: 'parteneri',
    icon: Trophy,
    title: 'Vrei să ne susții',
    body: 'Pachete de sponsorizare pentru echipament, deplasări și taxe de înscriere, cu vizibilitate în toate cele patru competiții.',
    email: club.contact.email,
    cta: 'Cere pachetul de sponsorizare',
  },
  {
    id: 'presa',
    icon: Mail,
    title: 'Scrii despre noi',
    body: 'Acreditări, declarații, fotografii de presă și date despre club, la cerere.',
    email: club.contact.press,
    cta: 'Contact presă',
  },
];

export function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus({ kind: 'error', message: 'Te rugăm să îți completezi numele.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus({ kind: 'error', message: 'Adresa de e-mail nu pare validă.' });
      return;
    }
    // Fără backend deocamdată: se confirmă local înscrierea.
    setStatus({
      kind: 'ok',
      message: `Mulțumim, ${name.split(' ')[0]}! Te-am adăugat la newsletter.`,
    });
    setName('');
    setEmail('');
  };

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <span className={styles.orb} aria-hidden />

      <div className={`shell ${styles.inner}`}>
        <Reveal className={styles.intro}>
          <p className="eyebrow eyebrow--light">Contact</p>
          <SplitText
            as="h2"
            id="contact-title"
            text="Jucători, sponsori, presă"
            highlight="sponsori,"
            className={cx('h2', styles.title)}
          />
          <p className={styles.lead}>
            Suntem un club de minifotbal care se autofinanțează. Ne poți scrie ca jucător, ca
            partener sau ca jurnalist — răspundem în maximum două zile lucrătoare.
          </p>
        </Reveal>

        <Reveal className={styles.channels} stagger={110}>
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <article key={channel.id} className={styles.channel}>
                <span className={styles.channelIcon} aria-hidden>
                  <Icon size={20} />
                </span>
                <h3 className={styles.channelTitle}>{channel.title}</h3>
                <p className={styles.channelBody}>{channel.body}</p>
                <a className={styles.channelLink} href={`mailto:${channel.email}`}>
                  {channel.cta} <ArrowRight size={15} />
                </a>
                <p className={styles.channelMail}>{channel.email}</p>
              </article>
            );
          })}
        </Reveal>

        <div className={styles.bottom}>
          <Reveal variant="fade-right" delay={80}>
            <ul className={styles.list}>
              <li>
                <Pin size={17} /> {club.contact.address}
              </li>
              <li>
                <Phone size={17} />
                <a href={`tel:${club.contact.phone.replace(/\s/g, '')}`}>{club.contact.phone}</a>
              </li>
              <li>
                <Mail size={17} />
                <a href={`mailto:${club.contact.email}`}>{club.contact.email}</a>
              </li>
            </ul>

            <ul className={styles.socials}>
              {club.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="fade-left" delay={140}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <h3 className={styles.formTitle}>Newsletter-ul clubului</h3>
              <p className={styles.formSub}>
                Programul săptămânii din toate competițiile și rezultatele echipei, o dată pe
                săptămână.
              </p>

              <div className={styles.field}>
                <input
                  id="nl-name"
                  type="text"
                  value={name}
                  placeholder=" "
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="nl-name">Nume</label>
                <span className={styles.line} />
              </div>

              <div className={styles.field}>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  placeholder=" "
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="nl-email">Adresă de e-mail</label>
                <span className={styles.line} />
              </div>

              <Button type="submit" variant="light" block>
                Abonează-mă
              </Button>

              <p
                className={cx(styles.status, status.kind === 'error' && styles.statusError)}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
