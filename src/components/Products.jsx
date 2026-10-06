import { useEffect, useState } from 'react';
import catalog from '../data/products.json';
import './Products.css';

const images = import.meta.glob('../../assets/*.png', { eager: true, import: 'default' });
const imageFor = (name) => images[`../../assets/${name}.png`];

const DETAILS = [
  ['Origin', 'origin'],
  ['Best time to buy', 'bestSeason'],
  ['Uses', 'uses'],
];

const Mrp = ({ p }) => (
  <span className="product-card__mrp">
    MRP {catalog.currency}
    {p.mrp} <small>{p.unit}</small>
  </span>
);

function PriceChart({ history, unit }) {
  const W = 320;
  const H = 150;
  const pad = { l: 40, r: 12, t: 12, b: 24 };
  const prices = history.map((h) => h.price);
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
        {history.map((h, i) => (
          <g key={h.year}>
            <circle cx={x(i)} cy={y(h.price)} r="3.5" className="price-chart__dot">
              <title>{`${h.year}: ${catalog.currency}${h.price}`}</title>
            </circle>
            <text x={x(i)} y={H - 6} textAnchor="middle" className="price-chart__label">
              {h.year}
            </text>
          </g>
        ))}
      </svg>
      <small className="price-chart__note">
        {meta.sample ? 'Sample data: ' : 'Source: '}
        {meta.source}
      </small>
    </figure>
  );
}

export default function Products() {
  const [selected, setSelected] = useState(null);

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
            <img className="product-modal__img" src={imageFor(selected.image)} alt={selected.name} />
            <div className="product-modal__body">
              <h3>{selected.name}</h3>
              <em className="product-card__sci">{selected.scientificName}</em>
              <p>{selected.summary}</p>
              <dl className="product-card__details">
                {DETAILS.map(([label, key]) => (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{selected[key]}</dd>
                  </div>
                ))}
              </dl>
              <PriceChart history={selected.priceHistory} unit={selected.unit} />
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
