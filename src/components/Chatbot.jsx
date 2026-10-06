import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Mic, Send, Volume2, VolumeX, X } from 'lucide-react';
import { chatbot, contact } from '../data/content';
import './Chatbot.css';

const SpeechRecognition =
  typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

const FEMALE_VOICE =
  /female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|aria|jenny|susan|hazel|libby|sonia|catherine|google uk english female|google us english/i;

const pickVoice = () => {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  return voices.find((v) => FEMALE_VOICE.test(v.name)) || null;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: chatbot.greeting }]);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const bodyRef = useRef(null);
  const recRef = useRef(null);
  const voiceOnRef = useRef(voiceOn);

  const speak = (msg) => {
    if (!canSpeak || !voiceOnRef.current) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(msg);
    const voice = pickVoice();
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    if (canSpeak) window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
  }, [voiceOn]);

  useEffect(() => {
    if (!open) {
      recRef.current?.stop();
      if (canSpeak) window.speechSynthesis.cancel();
    }
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendText = (value) => {
    setMessages((m) => [...m, { from: 'user', text: value }]);
    setTimeout(() => {
      const reply = chatbot.reply(contact);
      setMessages((m) => [...m, { from: 'bot', text: reply }]);
      speak(reply);
    }, 600);
  };

  const send = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText('');
    sendText(value);
  };

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    if (canSpeak) window.speechSynthesis.cancel();
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (ev) => {
      const spoken = ev.results[0][0].transcript.trim();
      if (spoken) sendText(spoken);
    };
    recRef.current = rec;
    rec.start();
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__panel" role="dialog" aria-label={chatbot.title}>
          <div className="chatbot__head">
            <span>{chatbot.title}</span>
            <div className="chatbot__head-actions">
              {canSpeak && (
                <button
                  type="button"
                  onClick={() => {
                    if (voiceOn) window.speechSynthesis.cancel();
                    setVoiceOn((v) => !v);
                  }}
                  aria-label={voiceOn ? 'Mute voice replies' : 'Unmute voice replies'}
                >
                  {voiceOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              )}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
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
            {SpeechRecognition && (
              <button
                type="button"
                className={`chatbot__mic${listening ? ' chatbot__mic--on' : ''}`}
                onClick={toggleMic}
                aria-label={listening ? 'Stop listening' : 'Speak your message'}
                aria-pressed={listening}
              >
                <Mic size={18} />
              </button>
            )}
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
