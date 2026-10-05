import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { chatbot, contact } from '../data/content';
import './Chatbot.css';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: chatbot.greeting }]);
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { from: 'user', text: value }]);
    setText('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: chatbot.reply(contact) }]);
    }, 600);
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__panel" role="dialog" aria-label={chatbot.title}>
          <div className="chatbot__head">
            <span>{chatbot.title}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="chatbot__body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form className="chatbot__form" onSubmit={send}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              aria-label="Your message"
            />
            <button type="submit" aria-label="Send">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="chatbot__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
