import { useEffect, useRef } from 'react';
import { cx } from '../../lib/format';

/**
 * Blob-uri difuze animate — fundalul decorativ al secțiunilor.
 * Animația e oprită cât timp secțiunea nu e pe ecran: sunt suprafețe mari
 * cu blur, iar redesenarea lor continuă încetinea scroll-ul pe toată pagina.
 */
export function MeshBackground({ soft, grid }: { soft?: boolean; grid?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('mesh--idle', !entry?.isIntersecting),
      { rootMargin: '15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={ref} className={cx('mesh', soft && 'mesh--soft')} aria-hidden>
        <span className="mesh__blob mesh__blob--1" />
        <span className="mesh__blob mesh__blob--2" />
        <span className="mesh__blob mesh__blob--3" />
      </div>
      {grid ? <div className="grid-lines" aria-hidden /> : null}
    </>
  );
}
