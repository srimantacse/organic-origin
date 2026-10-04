import { Icon } from './icons/iconMap';
import { about, values } from '../data/content';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{about.heading}</p>
          <h2>Rooted in the mountains of Kalimpong</h2>
        </div>

        <div className="about__grid">
          {about.items.map((item) => (
            <div className="about-card" key={item.title}>
              <div className="about-card__icon">
                <Icon name={item.icon} size={26} />
              </div>
              <h3>{item.title}</h3>
              {item.body && <p>{item.body}</p>}
              {item.list && (
                <ul className="about-card__list">
                  {item.list.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="values">
          <h3 className="values__title">Our Values</h3>
          <div className="values__grid">
            {values.map((v) => (
              <div className="value-chip" key={v.label}>
                <span className="value-chip__icon">
                  <Icon name={v.icon} size={22} />
                </span>
                <span>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="about__quote script-text">{about.quote}</p>
      </div>
    </section>
  );
}
