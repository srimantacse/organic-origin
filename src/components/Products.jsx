import { Icon } from './icons/iconMap';
import { products } from '../data/content';
import './Products.css';

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
              <div className="product-card__icon">
                <Icon name={p.icon} size={30} />
              </div>
              <span className="product-card__name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
