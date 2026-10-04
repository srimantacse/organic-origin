import './Logo.css';

function Mark({ size = 56 }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Organic Origin O2 emblem"
    >
      <circle cx="50" cy="50" r="46" fill="var(--green-700)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold-500)" strokeWidth="2.5" />
      <circle cx="50" cy="38" r="9" fill="var(--gold-400)" opacity="0.9" />
      <path
        d="M14 66 L34 34 L46 54 L54 42 L86 66 Z"
        fill="var(--green-900)"
        opacity="0.9"
      />
      <path
        d="M14 68 L38 44 L52 60 L62 48 L86 68 Z"
        fill="var(--green-500)"
      />
      <path
        d="M50 4 C62 18 66 30 50 44 C34 30 38 18 50 4 Z"
        fill="var(--green-100)"
        opacity="0.18"
      />
      <path
        d="M8 54 C2 70 10 88 26 92 C18 78 14 64 8 54 Z"
        fill="var(--green-500)"
      />
      <path
        d="M92 54 C98 70 90 88 74 92 C82 78 86 64 92 54 Z"
        fill="var(--green-500)"
      />
    </svg>
  );
}

export default function Logo({ variant = 'full', size = 56, light = false }) {
  if (variant === 'mark') {
    return <Mark size={size} />;
  }

  return (
    <div className={`logo-full ${light ? 'logo-full--light' : ''}`}>
      <Mark size={size} />
      <div className="logo-text">
        <span className="logo-name">
          Organic Origin<sup className="logo-tm">TM</sup>
        </span>
        <span className="logo-tag">Pure by Origin. Organic by Nature.</span>
      </div>
    </div>
  );
}
