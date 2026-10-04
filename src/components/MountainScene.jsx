export default function MountainScene({ className = '' }) {
  return (
    <svg
      className={`mountain-scene ${className}`}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Layered mountain range over Kalimpong tea gardens"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe8f2" />
          <stop offset="100%" stopColor="#eef6ec" />
        </linearGradient>
        <linearGradient id="peakFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9d3d8" />
          <stop offset="100%" stopColor="#9bc2c2" />
        </linearGradient>
        <linearGradient id="peakMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5f8f6e" />
          <stop offset="100%" stopColor="#3f7250" />
        </linearGradient>
        <linearGradient id="peakNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--green-600)" />
          <stop offset="100%" stopColor="var(--green-800)" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#sky)" />
      <circle cx="650" cy="90" r="46" fill="var(--gold-400)" opacity="0.85" />

      <g opacity="0.9">
        <path d="M0 260 L120 160 L230 240 L330 150 L460 250 L560 170 L680 240 L800 190 L800 500 L0 500 Z" fill="url(#peakFar)" />
      </g>
      <g>
        <path d="M0 340 L150 220 L260 310 L380 210 L520 330 L640 240 L800 320 L800 500 L0 500 Z" fill="url(#peakMid)" />
      </g>
      <g>
        <path d="M0 420 L100 330 L220 400 L340 310 L480 410 L620 320 L760 400 L800 390 L800 500 L0 500 Z" fill="url(#peakNear)" />
      </g>

      <g opacity="0.85" fill="var(--white)">
        <ellipse cx="160" cy="130" rx="46" ry="14" />
        <ellipse cx="200" cy="124" rx="34" ry="12" />
        <ellipse cx="520" cy="110" rx="38" ry="12" />
      </g>
    </svg>
  );
}
