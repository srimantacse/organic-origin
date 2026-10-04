import { ChevronRight } from 'lucide-react';
import { Icon } from './icons/iconMap';
import { process } from '../data/content';
import './Process.css';

export default function Process() {
  return (
    <section id="process" className="process section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{process.heading}</p>
          <h2>{process.sub}</h2>
        </div>

        <div className="process__row">
          {process.steps.map((step, i) => (
            <div className="process__step-wrap" key={step.label}>
              <div className="process__step">
                <div className="process__icon">
                  <Icon name={step.icon} size={26} />
                </div>
                <span>{step.label}</span>
              </div>
              {i < process.steps.length - 1 && (
                <ChevronRight className="process__arrow" size={22} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
