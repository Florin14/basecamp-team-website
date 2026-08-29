import { cx } from '../../lib/format';

/** Blob-uri difuze animate — fundalul decorativ al secțiunilor. */
export function MeshBackground({ soft, grid }: { soft?: boolean; grid?: boolean }) {
  return (
    <>
      <div className={cx('mesh', soft && 'mesh--soft')} aria-hidden>
        <span className="mesh__blob mesh__blob--1" />
        <span className="mesh__blob mesh__blob--2" />
        <span className="mesh__blob mesh__blob--3" />
      </div>
      {grid ? <div className="grid-lines" aria-hidden /> : null}
    </>
  );
}
