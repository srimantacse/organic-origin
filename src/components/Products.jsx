import { products } from '../data/content';
import './Products.css';

const images = import.meta.glob('../../assets/*.png', { eager: true, import: 'default' });
const imageFor = (name) => images[`../../assets/${name}.png`];

export default function Products() {
  return (
    <section id="products" className="products section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{products.heading}</p>
          <h2>{products.sub}</h2>
        </div>

        <div className="products__grid">
          {products.items.map((p, i) => (
            <div className="product-card" key={p.name} style={{ '--i': i }}>
              <img
                className="product-card__img"
                src={imageFor(p.image)}
                alt={p.name}
                loading="lazy"
              />
              <span className="product-card__name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
