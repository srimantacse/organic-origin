import { MapPin, Phone, Mail } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsappIcon } from './icons/CustomIcons';
import Logo from './Logo';
import { contact } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo size={48} light />
        </div>

        <ul className="site-footer__contact">
          <li>
            <MapPin size={18} />
            <span>
              {contact.companyLine}
              <br />
              {contact.address}
            </span>
          </li>
          <li>
            <Phone size={18} />
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          </li>
          <li>
            <Mail size={18} />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>

        <div className="site-footer__social">
          <p>Follow Our Journey {contact.social.handle}</p>
          <div className="site-footer__social-icons">
            <span className="is-disabled" aria-label="Facebook (coming soon)" title="Coming soon">
              <FacebookIcon size={18} />
            </span>
            <span className="is-disabled" aria-label="Instagram (coming soon)" title="Coming soon">
              <InstagramIcon size={18} />
            </span>
            <a href={contact.social.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsappIcon size={18} />
            </a>
          </div>
        </div>

        <p className="site-footer__closing script-text">{contact.closing}</p>
      </div>

      <div className="site-footer__bar">
        <p>© {new Date().getFullYear()} Organic Origin – O2. All rights reserved.</p>
      </div>
    </footer>
  );
}
