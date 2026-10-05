import logoImg from '../assets/logo.png';
import './Logo.css';

function Mark({ size = 56 }) {
  return (
    <img
      className="logo-mark"
      src={logoImg}
      alt="Organic Origin O2 emblem"
      style={{ height: size * 1.5, width: 'auto' }}
    />
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
