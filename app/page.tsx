"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Search,
  Settings,
  PanelLeftClose,
  ArrowUp,
  Paperclip,
  Sparkles,
  Command,
  X,
} from "lucide-react";

const suggestions = [
  {
    icon: "✦",
    title: "Explore an idea",
    description: "Turn a thought into something meaningful.",
  },
  {
    icon: "◈",
    title: "Understand something",
    description: "Discover complex ideas in simple ways.",
  },
  {
    icon: "⌘",
    title: "Create something",
    description: "Bring your imagination into reality.",
  },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function sendMessage() {
    if (!message.trim()) return;

    setMessages((previous) => [...previous, message.trim()]);
    setMessage("");
  }

  return (
    <main className="app">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <div className="brand">
              <div className="brand-mark">
                <span />
              </div>
              <span>inf</span>
              <span className="brand-light">intelligence</span>
            </div>

            <button className="new-chat" onClick={() => setMessages([])}>
              <Plus size={17} />
              <span>New conversation</span>
            </button>

            <div className="sidebar-label">WORKSPACE</div>

            <button className="side-item active">
              <MessageSquare size={17} />
              <span>Conversations</span>
            </button>

            <button className="side-item">
              <Search size={17} />
              <span>Explore</span>
            </button>

            <div className="sidebar-label recent-label">RECENT</div>

            <div className="recent-empty">
              Your conversations will appear here.
            </div>

            <div className="sidebar-bottom">
              <button className="side-item">
                <Settings size={17} />
                <span>Settings</span>
              </button>

              <div className="profile">
                <div className="avatar">I</div>
                <div>
                  <div className="profile-name">inf User</div>
                  <div className="profile-plan">Personal workspace</div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <section className="main-area">
        <header className="topbar">
          <div className="top-left">
            <button
              className="icon-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <PanelLeftClose size={19} />
            </button>

            <div className="breadcrumb">
              <span>inf</span>
              <span className="slash">/</span>
              <span>Intelligence</span>
            </div>
          </div>

          <div className="top-right">
            <div className="preview-badge">
              <span className="status-dot" />
              Preview
            </div>
            <button className="icon-button" aria-label="Settings">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <div className="content">
          {messages.length === 0 ? (
            <motion.div
              className="welcome"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="orb-container">
                <div className="orb-glow" />
                <div className="orb">
                  <div className="orb-core" />
                  <div className="orb-ring ring-one" />
                  <div className="orb-ring ring-two" />
                  <div className="orb-highlight" />
                </div>
              </div>

              <div className="eyebrow">
                <Sparkles size={13} />
                A NEW ERA OF INTELLIGENCE
              </div>

              <h1>
                Intelligence,
                <br />
                <span className="spectrum">beautifully evolved.</span>
              </h1>

              <p className="subtitle">
                A new way to think, discover, and create.
                <br />
                Intelligence designed around you.
              </p>

              <div className="suggestions">
                {suggestions.map((item, index) => (
                  <motion.button
                    key={item.title}
                    className="suggestion"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => setMessage(item.title)}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <span className="suggestion-title">{item.title}</span>
                    <span className="suggestion-description">
                      {item.description}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="conversation">
              <div className="conversation-label">
                <Sparkles size={15} />
                LOCAL PREVIEW
              </div>

              {messages.map((item, index) => (
                <div className="message-row" key={index}>
                  <div className="message-avatar">Y</div>
                  <div className="message-text">{item}</div>
                </div>
              ))}

              <div className="demo-notice">
                <Sparkles size={17} />
                <div>
                  <strong>Preview mode</strong>
                  <p>
                    Your message is displayed locally. No AI model is
                    connected yet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="composer-area">
          <div className="composer">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask anything. Imagine everything."
              rows={1}
            />

            <div className="composer-bottom">
              <div className="composer-tools">
                <button className="tool-button" aria-label="Attach file">
                  <Paperclip size={17} />
                </button>
                <button className="model-button">
                  <span className="model-dot" />
                  inf Connect
                </button>
              </div>

              <button
                className="send-button"
                onClick={sendMessage}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <ArrowUp size={19} />
              </button>
            </div>
          </div>

          <div className="footer-caption">
            <span>inf Intelligence</span>
            <span>·</span>
            <span>Early Preview · V1.0</span>
          </div>
        </footer>
      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .app {
          display: flex;
          min-height: 100dvh;
          background: #08090d;
          color: #f5f5f7;
        }

        .sidebar {
          flex-shrink: 0;
          width: 260px;
          min-height: 100dvh;
          background: #0d0e13;
          border-right: 1px solid rgba(255,255,255,.07);
          padding: 27px 17px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -1px;
          white-space: nowrap;
          margin: 0 0 37px 5px;
        }

        .brand-light {
          font-size: 13px;
          font-weight: 400;
          color: #858894;
          letter-spacing: -.3px;
        }

        .brand-mark {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: linear-gradient(140deg,#a7b6ff,#d9a9ed,#8be4e9);
          display: grid;
          place-items: center;
        }

        .brand-mark span {
          width: 12px;
          height: 12px;
          border: 1.5px solid #101116;
          border-radius: 50%;
        }

        .new-chat {
          width: 100%;
          height: 43px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 13px;
          background: #f1f1f4;
          color: #17181d;
          border: none;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 35px;
        }

        .sidebar-label {
          color: #656875;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin: 0 0 12px 10px;
          white-space: nowrap;
        }

        .side-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          height: 41px;
          padding: 0 11px;
          border: none;
          background: transparent;
          color: #999ba7;
          border-radius: 8px;
          text-align: left;
          font-size: 13px;
          white-space: nowrap;
        }

        .side-item.active {
          color: white;
          background: rgba(255,255,255,.065);
        }

        .recent-label {
          margin-top: 34px;
        }

        .recent-empty {
          padding: 9px 10px;
          color: #60636e;
          font-size: 12px;
          line-height: 1.6;
        }

        .sidebar-bottom {
          margin-top: auto;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 11px;
          border-top: 1px solid rgba(255,255,255,.07);
          margin-top: 16px;
          padding: 19px 4px 0;
          white-space: nowrap;
        }

        .avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(140deg,#a4b5ff,#d8a6e9);
          color: #171822;
          font-weight: 700;
        }

        .profile-name {
          font-size: 12px;
          font-weight: 600;
        }

        .profile-plan {
          font-size: 10px;
          color: #777985;
          margin-top: 4px;
        }

        .main-area {
          flex: 1;
          min-width: 0;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          height: 68px;
          padding: 0 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,.055);
        }

        .top-left, .top-right {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .icon-button {
          background: transparent;
          border: none;
          color: #9294a0;
          display: grid;
          place-items: center;
          padding: 7px;
        }

        .breadcrumb {
          display: flex;
          gap: 9px;
          font-size: 12px;
          color: #a4a6b0;
        }

        .breadcrumb span:first-child {
          color: white;
          font-weight: 700;
        }

        .slash {
          color: #52545f;
        }

        .preview-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 30px;
          color: #a4a6b0;
          font-size: 11px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #b8a7ff;
          border-radius: 50%;
          box-shadow: 0 0 9px #b8a7ff;
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 35px 24px;
        }

        .welcome {
          width: 100%;
          max-width: 780px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: auto;
        }

        .orb-container {
          width: 145px;
          height: 145px;
          position: relative;
          display: grid;
          place-items: center;
          margin-bottom: 25px;
        }

        .orb-glow {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          background: conic-gradient(#879dff,#c9a3fa,#f2b5df,#8ce5eb,#879dff);
          filter: blur(31px);
          opacity: .35;
          animation: rotate 12s linear infinite;
        }

        .orb {
          width: 112px;
          height: 112px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          background:
            radial-gradient(circle at 34% 28%,rgba(255,255,255,.9),transparent 9%),
            radial-gradient(circle at 37% 35%,rgba(173,191,255,.6),transparent 36%),
            radial-gradient(circle at 65% 70%,rgba(192,140,255,.55),transparent 43%),
            linear-gradient(145deg,#202d56,#161426 55%,#102e39);
          border: 1px solid rgba(255,255,255,.4);
          box-shadow:
            inset -12px -12px 30px rgba(0,0,0,.6),
            inset 8px 8px 22px rgba(255,255,255,.14),
            0 0 40px rgba(145,160,255,.2);
          animation: float 5s ease-in-out infinite;
        }

        .orb-core {
          position: absolute;
          width: 65px;
          height: 65px;
          top: 24px;
          left: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,#f4eaff,#9b9bff 35%,#6a56bb 75%);
          filter: blur(11px);
          opacity: .8;
        }

        .orb-ring {
          position: absolute;
          width: 140px;
          height: 43px;
          left: -15px;
          border: 1px solid rgba(192,210,255,.5);
          border-radius: 50%;
          transform: rotate(-35deg);
        }

        .ring-one {
          top: 32px;
        }

        .ring-two {
          top: 36px;
          transform: rotate(42deg);
          border-color: rgba(225,185,255,.45);
        }

        .orb-highlight {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          border-top: 1px solid rgba(255,255,255,.6);
          opacity: .65;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a9a5d9;
          font-size: 10px;
          letter-spacing: 2.4px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .welcome h1 {
          font-size: clamp(38px,5.3vw,65px);
          line-height: 1.08;
          letter-spacing: -3.5px;
          font-weight: 600;
        }

        .spectrum {
          background: linear-gradient(100deg,#a7b8ff,#d3a8ed 52%,#a2e3e9);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .subtitle {
          color: #858894;
          font-size: 14px;
          line-height: 1.8;
          margin-top: 19px;
        }

        .suggestions {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
          margin-top: 48px;
        }

        .suggestion {
          min-height: 115px;
          text-align: left;
          padding: 17px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.085);
          background: rgba(255,255,255,.025);
          transition: .25s ease;
        }

        .suggestion:hover {
          background: rgba(255,255,255,.065);
          border-color: rgba(190,185,255,.3);
          transform: translateY(-3px);
        }

        .suggestion-icon {
          display: block;
          color: #b8b1fa;
          font-size: 18px;
          margin-bottom: 12px;
        }

        .suggestion-title {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .suggestion-description {
          display: block;
          color: #777a87;
          font-size: 10px;
          line-height: 1.5;
        }

        .composer-area {
          width: min(720px,calc(100% - 48px));
          margin: 0 auto 22px;
        }

        .composer {
          padding: 17px 17px 12px;
          border-radius: 17px;
          border: 1px solid rgba(255,255,255,.13);
          background: rgba(23,24,32,.85);
          box-shadow: 0 12px 50px rgba(0,0,0,.25);
          transition: border-color .2s;
        }

        .composer:focus-within {
          border-color: rgba(175,171,255,.45);
        }

        .composer textarea {
          width: 100%;
          min-height: 39px;
          max-height: 120px;
          resize: vertical;
          border: none;
          outline: none;
          background: transparent;
          color: white;
          font-size: 13px;
          line-height: 1.6;
        }

        .composer textarea::placeholder {
          color: #737682;
        }

        .composer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .composer-tools {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tool-button {
          border: none;
          background: transparent;
          color: #81838f;
          padding: 5px;
        }

        .model-button {
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 20px;
          padding: 6px 10px;
          background: rgba(255,255,255,.035);
          color: #a8a9b4;
          font-size: 10px;
        }

        .model-dot {
          width: 6px;
          height: 6px;
          background: #b4aaff;
          border-radius: 50%;
        }

        .send-button {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: none;
          background: #e9e8f2;
          color: #181923;
          display: grid;
          place-items: center;
          transition: .2s;
        }

        .send-button:disabled {
          opacity: .35;
          cursor: default;
        }

        .footer-caption {
          display: flex;
          justify-content: center;
          gap: 8px;
          color: #626570;
          font-size: 10px;
          margin-top: 14px;
        }

        .conversation {
          width: min(720px,100%);
          align-self: flex-start;
          margin: 30px auto;
        }

        .conversation-label {
          display: flex;
          gap: 8px;
          align-items: center;
          color: #aaa5e9;
          font-size: 10px;
          letter-spacing: 1.5px;
          margin-bottom: 25px;
        }

        .message-row {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 15px 0;
        }

        .message-avatar {
          width: 29px;
          height: 29px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #292a3b;
          border-radius: 50%;
          font-size: 11px;
        }

        .message-text {
          padding-top: 6px;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .demo-notice {
          display: flex;
          gap: 12px;
          margin: 24px 0;
          padding: 17px;
          border: 1px solid rgba(174,166,255,.17);
          background: rgba(150,140,255,.045);
          border-radius: 12px;
          color: #aaa5e9;
        }

        .demo-notice strong {
          font-size: 12px;
        }

        .demo-notice p {
          color: #858894;
          font-size: 11px;
          margin-top: 5px;
          line-height: 1.6;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 700px) {
          .sidebar {
            position: fixed;
            z-index: 10;
            height: 100dvh;
          }

          .topbar {
            padding: 0 15px;
            height: 58px;
          }

          .content {
            padding: 25px 17px;
          }

          .orb-container {
            transform: scale(.85);
            margin-bottom: 12px;
          }

          .welcome h1 {
            font-size: clamp(36px,9vw,52px);
            letter-spacing: -2px;
          }

          .subtitle {
            font-size: 12px;
          }

          .suggestions {
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 30px;
          }

          .suggestion {
            min-height: auto;
            padding: 13px;
          }

          .suggestion-icon {
            margin-bottom: 5px;
          }

          .composer-area {
            width: calc(100% - 28px);
            margin-bottom: 14px;
          }
        }
      `}</style>
    </main>
  );
}
