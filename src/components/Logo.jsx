import logoImg from '../../assets_small/logo_3_nav.webp';
import './Logo.css';

export default function Logo({ size = 56, light = false }) {
  return (
    <img
      className={`logo-mark ${light ? 'logo-mark--light' : ''}`}
      src={logoImg}
      alt="Organic Origin O2"
      style={{ height: size * 1.5, width: 'auto' }}
    />
  );
}
