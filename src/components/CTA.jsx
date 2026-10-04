import MountainScene from './MountainScene';
import { cta } from '../data/content';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta">
      <MountainScene className="cta__scene" />
      <div className="container cta__inner">
        <p className="cta__quote script-text">{cta.quote}</p>
        <a href="#contact" className="btn btn-primary">
          Partner With Us
        </a>
      </div>
    </section>
  );
}
