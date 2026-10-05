import { ArrowRight } from 'lucide-react';
import themeImg from '../../assets/theme.png';
import { brand, hero } from '../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{brand.sub}</p>
          <h1>
            {hero.eyebrow}
            <br />
            <span className="script-text">{hero.title}</span>
          </h1>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <a href={hero.ctaPrimary.href} className="btn btn-primary">
              {hero.ctaPrimary.label} <ArrowRight size={18} />
            </a>
            <a href={hero.ctaSecondary.href} className="btn btn-outline">
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <img className="hero__img" src={themeImg} alt="Kalimpong mountains" />
          <div className="hero__signpost">
            <ul>
              {hero.signpost.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
