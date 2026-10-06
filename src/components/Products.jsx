import { useEffect, useState } from 'react';
import catalog from '../data/products.json';
import './Products.css';

const images = import.meta.glob('../../assets/*.png', { eager: true, import: 'default' });
const imageFor = (name) => images[`../../assets/${name}.png`];

const DETAILS = [
  ['Origin', 'origin'],
  ['Best time to buy', 'bestSeason'],
  ['Uses', 'uses'],
  ['Shelf life', 'shelfLife'],
  ['Storage', 'storage'],
  ['Packaging', 'packaging'],
  ['Quality', 'certification'],
];

const Rating = ({ rating, count }) => (
  <span className="product-rating" title={catalog.ratingMeta.sample ? 'Sample rating' : undefined}>
    <span className="product-rating__stars" aria-hidden="true">
      {'★'.repeat(Math.round(rating.score))}
      {'☆'.repeat(5 - Math.round(rating.score))}
    </span>{' '}
    {rating.score.toFixed(1)} <small>({count} reviews{catalog.ratingMeta.sample ? ', sample' : ''})</small>
  </span>
);

const Mrp = ({ p }) => (
  <span className="product-card__mrp">
    MRP {catalog.currency}
    {p.mrp} <small>{p.unit}</small>
  </span>
);

function PriceChart({ history, unit, ourPrice, sources }) {
  const W = 320;
  const H = 150;
  const pad = { l: 40, r: 12, t: 12, b: 24 };
  const prices = [...history.map((h) => h.price), ourPrice];
  const min = Math.min(...prices) * 0.9;
  const max = Math.max(...prices) * 1.05;
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (history.length - 1);
  const y = (v) => pad.t + ((max - v) * (H - pad.t - pad.b)) / (max - min);
  const points = history.map((h, i) => `${x(i)},${y(h.price)}`).join(' ');
  const meta = catalog.priceHistoryMeta;

  return (
    <figure className="price-chart">
      <figcaption>
        {meta.title} <small>({catalog.currency} {unit})</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={meta.title}>
        {[min, (min + max) / 2, max].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} className="price-chart__grid" />
            <text x={pad.l - 6} y={y(v) + 3} textAnchor="end" className="price-chart__label">
              {Math.round(v)}
            </text>
          </g>
        ))}
        <polyline points={points} className="price-chart__line" />
        <circle cx={x(history.length - 1)} cy={y(ourPrice)} r="6" className="price-chart__ours">
          <title>{`Our price: ${catalog.currency}${ourPrice}`}</title>
        </circle>
        {history.map((h, i) => (
          <g key={h.year}>
            <circle cx={x(i)} cy={y(h.price)} r="3.5" className="price-chart__dot">
              <title>{`${h.year}: ${catalog.currency}${h.price}`}</title>
            </circle>
            <text x={x(i)} y={H - 6} textAnchor="middle" className="price-chart__label">
              {`’${String(h.year).slice(-2)}`}
            </text>
          </g>
        ))}
      </svg>
      <div className="price-chart__legend">
        <span><i className="price-chart__key price-chart__key--market" /> Market price</span>
        <span><i className="price-chart__key price-chart__key--ours" /> Our price ({catalog.currency}{ourPrice})</span>
      </div>
      <small className="price-chart__note">
        {meta.sample ? 'Sample data: ' : 'Source: '}
        {meta.source}
      </small>
      <small className="price-chart__note">
        Data sources:{' '}
        {sources.map((l, i) => (
          <span key={l.url}>
            {i > 0 && ', '}
            <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
          </span>
        ))}
      </small>
    </figure>
  );
}

const LIKES_KEY = 'organic-origin-likes';

const loadLikes = () => {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
  } catch {
    return {};
  }
};

function ThumbsUp({ liked, count, onToggle }) {
  return (
    <button
      type="button"
      className={`thumbs-up${liked ? ' thumbs-up--on' : ''}`}
      aria-pressed={liked}
      onClick={onToggle}
    >
      <span aria-hidden="true">👍</span> {liked ? 'Liked' : 'Like'} · {count}
    </button>
  );
}

export default function Products() {
  const [selected, setSelected] = useState(null);
  const [likes, setLikes] = useState(loadLikes);

  const toggleLike = (name) => {
    const next = { ...likes, [name]: !likes[name] };
    setLikes(next);
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable; keep in-memory state */
    }
  };

  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="products" className="products section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{catalog.heading}</p>
          <h2>{catalog.sub}</h2>
        </div>

        <div className="products__grid">
          {catalog.items.map((p, i) => (
            <button
              type="button"
              className="product-card"
              key={p.name}
              style={{ '--i': i }}
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
            >
              <img
                className="product-card__img"
                src={imageFor(p.image)}
                alt={p.name}
                loading="lazy"
              />
              <span className="product-card__name">{p.name}</span>
              <em className="product-card__sci">{p.scientificName}</em>
              <Mrp p={p} />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="product-modal" onClick={() => setSelected(null)}>
          <div
            className="product-modal__box"
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="product-modal__close"
              aria-label="Close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <div className="product-modal__media">
              <img className="product-modal__img" src={imageFor(selected.image)} alt={selected.name} />
              <PriceChart history={selected.priceHistory} unit={selected.unit} ourPrice={selected.mrp} sources={selected.priceSources} />
            </div>
            <div className="product-modal__body">
              <h3>{selected.name}</h3>
              <em className="product-card__sci">{selected.scientificName}</em>
              <Rating rating={selected.rating} count={selected.rating.count + (likes[selected.name] ? 1 : 0)} />
              <ThumbsUp
                liked={Boolean(likes[selected.name])}
                count={selected.rating.count + (likes[selected.name] ? 1 : 0)}
                onToggle={() => toggleLike(selected.name)}
              />
              <p>{selected.summary}</p>
              <dl className="product-card__details">
                {DETAILS.map(([label, key]) => (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{selected[key]}</dd>
                  </div>
                ))}
              </dl>
              <p className="product-modal__links">
                Learn more:{' '}
                {selected.links.map((l, i) => (
                  <span key={l.url}>
                    {i > 0 && ', '}
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} (Wikipedia)
                    </a>
                  </span>
                ))}
              </p>
              <Mrp p={selected} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
