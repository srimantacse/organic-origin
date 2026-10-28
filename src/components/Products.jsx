import { useEffect, useState } from 'react';
import kalimpong from '../data/product_kalimpong.json';
import manipur from '../data/product_manipur.json';
import mushroom from '../data/product_mushroom.json';
import company from '../data/company.json';
import { Icon } from './icons/iconMap';
import './Products.css';

const catalog = kalimpong;
const TABS = [
  {
    id: 'produce',
    label: 'Mountain Produce',
    items: [
      ...kalimpong.items.map((p) => ({ ...p, catalog: kalimpong })),
      ...manipur.items.map((p) => ({ ...p, catalog: manipur })),
    ],
  },
  { id: 'mushroom', label: 'Mushroom Products', items: mushroom.items.map((p) => ({ ...p, catalog: mushroom })) },
];
const ITEMS = TABS.flatMap((t) => t.items);
const slugOf = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fromHash = () => {
  const m = window.location.hash.match(/^#product=(.+)$/);
  return (m && ITEMS.find((p) => slugOf(p.name) === m[1])) || null;
};

const images = import.meta.glob('../../assets_small/*.webp', { eager: true, import: 'default' });
const imageFor = (name) => images[`../../assets_small/${name}.webp`];

const Thumb = ({ name, alt, className }) => {
  const src = imageFor(name);
  return src ? (
    <img className={className} src={src} alt={alt} loading="lazy" />
  ) : (
    <span className={`${className} product-img-missing`} role="img" aria-label={alt}>🌿</span>
  );
};

const DETAILS = [
  ['Origin', 'origin'],
  ['Best time to buy', 'bestSeason'],
  ['Uses', 'uses'],
  ['Shelf life', 'shelfLife'],
  ['Storage', 'storage'],
  ['Packaging', 'packaging'],
  ['Quality', 'certification'],
];

const label = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

const Nutrition = ({ n }) => {
  const rows = (o) => Object.entries(o).filter(([k]) => !['per', 'reference', 'variety'].includes(k));
  const groups = n.varieties ?? [n];
  return (
    <div className="product-nutrition">
      <strong>Nutrition <small>(per {n.per})</small></strong>
      {groups.map((g, i) => (
        <dl key={g.variety ?? i} className="product-nutrition__list">
          {g.variety && <dt className="product-nutrition__variety">{g.variety}</dt>}
          {rows(g).map(([k, v]) => (
            <div key={k}><dt>{label(k)}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      ))}
      {n.reference && <small className="price-chart__note">Reference: {n.reference}</small>}
    </div>
  );
};

const Rating = ({ catalog, rating, count }) => (
  <span className="product-rating" title={catalog.ratingMeta.sample ? 'Sample rating' : undefined}>
    <span className="product-rating__stars" aria-hidden="true">
      {'★'.repeat(Math.round(rating.score))}
      {'☆'.repeat(5 - Math.round(rating.score))}
    </span>{' '}
    {rating.score.toFixed(1)} <small>({count} reviews{catalog.ratingMeta.sample ? ', sample' : ''})</small>
  </span>
);

const Price = ({ catalog, p }) => (
  <p className="product-price">
    {catalog.currency}{p.mrp}.00
    {p.oldPrice && (
      <>
        <s>{catalog.currency}{p.oldPrice}.00</s>
        <strong>({Math.round((1 - p.mrp / p.oldPrice) * 100)}% OFF)</strong>
      </>
    )}
  </p>
);

const Mrp = ({ catalog, p }) =>
  p.mrp == null ? (
    <span className="product-card__mrp">Price on request</span>
  ) : (
    <span className="product-card__mrp">
      MRP {catalog.currency}
      {p.mrp} <small>{p.unit}</small>
    </span>
  );

function PriceChart({ catalog, history, unit, ourPrice, sources }) {
  if (!history?.length) return null;
  const W = 320;
  const H = 150;
  const pad = { l: 40, r: 12, t: 12, b: 24 };
  const prices = [...history.map((h) => h.price), ...(ourPrice == null ? [] : [ourPrice])];
  const min = Math.min(...prices) * 0.9;
  const max = Math.max(...prices) * 1.05;
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(history.length - 1, 1);
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
        {ourPrice != null && (
          <circle cx={x(history.length - 1)} cy={y(ourPrice)} r="6" className="price-chart__ours">
            <title>{`Our price: ${catalog.currency}${ourPrice}`}</title>
          </circle>
        )}
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
        {ourPrice != null && (
          <span><i className="price-chart__key price-chart__key--ours" /> Our price ({catalog.currency}{ourPrice})</span>
        )}
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
  const [tab, setTab] = useState('produce');
  const [selected, setSelectedState] = useState(fromHash);
  const setSelected = (p) => {
    setSelectedState(p);
    if (p) window.history.pushState(null, '', `#product=${slugOf(p.name)}`);
    else if (window.location.hash.startsWith('#product=')) window.history.pushState(null, '', '#products');
  };
  useEffect(() => {
    const onPop = () => setSelectedState(fromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
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

        <div className="products__tabs" role="tablist">
          {TABS.map((t) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              key={t.id}
              className={`products__tab${tab === t.id ? ' products__tab--on' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="products__grid">
          {TABS.find((t) => t.id === tab).items.map((p, i) => (
            <button
              type="button"
              className="product-card"
              key={p.name}
              style={{ '--i': i }}
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
            >
              <Thumb className="product-card__img" name={p.image} alt={p.name} />
              <span className="product-card__name">{p.name}</span>
              {p.scientificName && <em className="product-card__sci">{p.scientificName}</em>}
              <Mrp catalog={p.catalog} p={p} />
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
              <Thumb className="product-modal__img" name={selected.image} alt={selected.name} />
              {selected.priceHistory && <PriceChart catalog={selected.catalog} history={selected.priceHistory} unit={selected.unit} ourPrice={selected.mrp} sources={selected.priceSources} />}
            </div>
            <div className="product-modal__body">
              <h3>{selected.name}</h3>
              {selected.scientificName && <em className="product-card__sci">{selected.scientificName}</em>}
              {selected.rating && (
                <Rating catalog={selected.catalog} rating={selected.rating} count={selected.rating.count + (likes[selected.name] ? 1 : 0)} />
              )}
              <ThumbsUp
                liked={Boolean(likes[selected.name])}
                count={(selected.rating?.count ?? 0) + (likes[selected.name] ? 1 : 0)}
                onToggle={() => toggleLike(selected.name)}
              />
              {selected.subtitle && <p className="product-subtitle">{selected.subtitle}</p>}
              {selected.oldPrice && <Price catalog={selected.catalog} p={selected} />}
              {selected.description
                ? selected.description.split('\n').map((t) => <p key={t}>{t}</p>)
                : <p>{selected.summary}</p>}
              {selected.catalog === mushroom && (
                <div className="product-assure">
                  {company.assurances.map((a) => (
                    <div key={a.text}>
                      <span><Icon name={a.icon} size={22} /></span>
                      <p>{a.text}</p>
                    </div>
                  ))}
                </div>
              )}
              <dl className="product-card__details">
                {DETAILS.filter(([, key]) => selected[key]).map(([label, key]) => (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{selected[key]}</dd>
                  </div>
                ))}
              </dl>
              {selected.links?.length > 0 && <p className="product-modal__links">
                Learn more:{' '}
                {selected.links.map((l, i) => (
                  <span key={l.url}>
                    {i > 0 && ', '}
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} (Wikipedia)
                    </a>
                  </span>
                ))}
              </p>}
              {selected.giTagged && (
                <span className="product-gi">GI tagged{selected.giNumber ? ` · GI No. ${selected.giNumber}` : ''}</span>
              )}
              {selected.nutrition && <Nutrition n={selected.nutrition} />}
              {selected.variants?.length > 0 && (
                <table className="product-modal__variants">
                  <thead>
                    <tr><th>Pack</th><th>Net wt.</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    {selected.variants.map((v) => (
                      <tr key={`${v.product}-${v.netWeight}`}>
                        <td>{v.product}</td>
                        <td>{v.netWeight}</td>
                        <td>{selected.catalog.currency}{v.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!selected.oldPrice && <Mrp catalog={selected.catalog} p={selected} />}
              {selected.catalog.publisher && (
                <small className="price-chart__note">Source: {selected.catalog.publisher.name}</small>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
