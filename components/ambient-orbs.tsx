export function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden">
      <div className="ambient-layer ambient-layer-1">
        <div className="ambient-orb ambient-orb-1" />
      </div>
      <div className="ambient-layer ambient-layer-2">
        <div className="ambient-orb ambient-orb-2" />
      </div>
      <div className="ambient-layer ambient-layer-3">
        <div className="ambient-orb ambient-orb-3" />
      </div>
      <div className="ambient-layer ambient-layer-4">
        <div className="ambient-ring" />
      </div>
      <div className="ambient-layer ambient-layer-5">
        <div className="ambient-orb ambient-orb-4" />
      </div>
    </div>
  );
}
