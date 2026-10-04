export function FacebookIcon({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.96.26-1.6 1.65-1.6h1.76V3.56C16.6 3.47 15.6 3.4 14.44 3.4c-2.43 0-4.1 1.48-4.1 4.2v2.7H7.5v3.3h2.84V22h3.16Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12 2.5a9.3 9.3 0 0 0-8 14l-1 4 4.2-1a9.3 9.3 0 1 0 4.8-17Zm0 1.9a7.4 7.4 0 0 1 6.4 11.1 7.4 7.4 0 0 1-9.6 3.1l-.4-.2-2.6.6.6-2.5-.2-.4A7.4 7.4 0 0 1 12 4.4Zm-3.1 3.8c-.2 0-.5.03-.7.3-.2.26-.9.87-.9 2.1 0 1.25.9 2.46 1.03 2.63.13.17 1.76 2.77 4.33 3.78 2.14.84 2.58.68 3.04.63.47-.04 1.5-.6 1.7-1.2.2-.58.2-1.08.14-1.19-.07-.1-.24-.17-.5-.3-.27-.13-1.5-.74-1.74-.83-.23-.08-.4-.13-.57.14-.17.26-.65.83-.8 1-.14.17-.3.19-.55.06-.27-.13-1.13-.42-2.15-1.33-.8-.7-1.33-1.58-1.49-1.84-.15-.27-.02-.42.12-.55.12-.12.27-.3.4-.46.13-.16.17-.27.26-.44.08-.17.04-.33-.02-.46-.07-.13-.57-1.42-.8-1.94-.2-.5-.42-.44-.57-.45Z" />
    </svg>
  );
}

export function MushroomIcon({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11c0-4 4-7 9-7s9 3 9 7c-6 2-12 2-18 0Z" />
      <path d="M12 11v9" />
      <path d="M9 20h6" />
    </svg>
  );
}
