import { Sprout } from 'lucide-react';
import { story } from '../data/content';
import './Story.css';

export default function Story() {
  return (
    <section className="story">
      <div className="container story__inner">
        <div className="story__badge">
          <Sprout size={30} />
        </div>
        <ul className="story__lines">
          {story.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="story__quote script-text">{story.quote}</p>
      </div>
    </section>
  );
}
