import { useState, useEffect, useRef } from "react";

const COLORS = {
  ink: "#1E1208",
  terra: "#C4784A",
  terraLight: "#D4956E",
  sand: "#F5EFE6",
  sandDark: "#EDE5D8",
  dust: "#C4B49A",
  sage: "#7A9B8A",
  brown: "#6B5A4A",
  midBrown: "#3D2E22",
  gold: "#B8975A",
};

const NAV_LINKS = ["Home", "About", "Blog", "Shop"];

const BLOG_POSTS = [
  {
    id: 1,
    category: "The Expat Files",
    categoryColor: COLORS.terra,
    title: "Nobody Tells You This Part About Living Abroad",
    excerpt: "Everyone shows you the cobblestone streets and the golden hour. Nobody shows you the Tuesday afternoon when you're sitting in a foreign grocery store crying because you can't find oat milk and you suddenly miss your mum.",
    date: "July 2, 2026",
    location: "Durrës, Albania",
    readTime: "6 min read",
    emoji: "🌍",
  },
  {
    id: 2,
    category: "The Inner Work",
    categoryColor: COLORS.sage,
    title: "I Was a People Pleaser Until I Had No People to Please",
    excerpt: "When you move abroad alone, there's no audience left to perform for. No one to keep happy. No one to shrink for. It's just you — and that's either the most terrifying or the most liberating thing you've ever felt. For me it was both.",
    date: "June 18, 2026",
    location: "Tirana, Albania",
    readTime: "8 min read",
    emoji: "🧠",
  },
  {
    id: 3,
    category: "The Practice",
    categoryColor: COLORS.gold,
    title: "How I Built a Spiritual Morning Ritual While Living Out of a Suitcase",
    excerpt: "You don't need a Pinterest-perfect altar to have a practice. You need intention and about 15 minutes. Here's exactly what I do every morning, whether I'm in a hostel in Tirana or a villa in Corfu.",
    date: "June 5, 2026",
    location: "Corfu, Greece",
    readTime: "5 min read",
    emoji: "🌙",
  },
  {
    id: 4,
    category: "The Expat Files",
    categoryColor: COLORS.terra,
    title: "Albania: The Country That Cracked Me Open",
    excerpt: "I didn't choose Albania. Albania chose me. Or maybe the algorithm did. Either way, landing in a country that most people can't find on a map turned out to be exactly the kind of quiet, unhurried reset my nervous system had been begging for.",
    date: "May 22, 2026",
    location: "Berat, Albania",
    readTime: "10 min read",
    emoji: "🏔️",
  },
];

const CRYSTALS = [
  { name: "Black Tourmaline", emoji: "🖤", price: "$18", desc: "Protection & grounding" },
  { name: "Rose Quartz", emoji: "🩷", price: "$14", desc: "Self-love & heart healing" },
  { name: "Amethyst", emoji: "💜", price: "$22", desc: "Intuition & spiritual clarity" },
  { name: "Citrine", emoji: "💛", price: "$19", desc: "Abundance & manifestation" },
  { name: "Selenite", emoji: "🤍", price: "$16", desc: "Energy cleansing & clarity" },
  { name: "Labradorite", emoji: "🩵", price: "$24", desc: "Transformation & magic" },
];

const JOURNALS = [
  { name: "The Awakening Journal", emoji: "📖", price: "$28", desc: "90-day moon cycle companion" },
  { name: "Ex People Pleaser Workbook", emoji: "✍️", price: "$22", desc: "Reclaim your voice, your time, yourself" },
  { name: "The Expat Soul Journal", emoji: "🌍", price: "$24", desc: "For the woman building a life abroad" },
];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#1E1208;--terra:#C4784A;--terra-l:#D4956E;--sand:#F5EFE6;--sand-d:#EDE5D8;
  --dust:#C4B49A;--sage:#7A9B8A;--brown:#6B5A4A;--mid:#3D2E22;--gold:#B8975A;
}
body{font-family:'Inter',sans-serif;background:var(--sand);color:var(--ink);-webkit-font-smoothing:antialiased}
.site{max-width:680px;margin:0 auto;min-height:100vh}

/* NAV */
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:56px;background:var(--ink);position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,120,74,.15)}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;letter-spacing:3px;color:var(--sand);cursor:pointer}
.nav-logo span{color:var(--terra)}
.nav-menu{display:flex;gap:0}
.nav-item{padding:0 10px;height:56px;display:flex;align-items:center;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dust);cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;background:none;border-left:none;border-right:none;border-top:none;font-family:'Inter',sans-serif}
.nav-item:hover{color:var(--terra)}
.nav-item.active{color:var(--terra);border-bottom-color:var(--terra)}

/* PAGE TRANSITIONS */
.page{animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

/* HERO */
.hero{padding:56px 28px 52px;background:var(--ink);position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 75% 25%,rgba(196,120,74,.14) 0%,transparent 65%);pointer-events:none}
.hero-eyebrow{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--terra);margin-bottom:14px}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:54px;font-weight:300;line-height:1.03;color:var(--sand);margin-bottom:20px}
.hero-title em{font-style:italic;color:var(--terra)}
.hero-body{font-size:14px;font-weight:300;line-height:1.75;color:var(--dust);max-width:400px;margin-bottom:28px}
.hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px}
.btn-primary{padding:13px 22px;background:var(--terra);color:var(--sand);border:none;border-radius:3px;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;transition:opacity .2s}
.btn-primary:hover{opacity:.85}
.btn-ghost{padding:12px 22px;background:transparent;color:var(--terra);border:1px solid rgba(196,120,74,.45);border-radius:3px;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.btn-ghost:hover{background:rgba(196,120,74,.08)}
.hero-tags{display:flex;gap:7px;flex-wrap:wrap}
.tag{padding:5px 11px;border:1px solid rgba(196,120,74,.25);border-radius:20px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(196,120,74,.7)}

/* EYEBROW / TITLES */
.eyebrow{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--terra);margin-bottom:8px}
.display{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;line-height:1.15;color:var(--ink);margin-bottom:20px}
.display em{font-style:italic}
.display.light{color:var(--sand)}
.body-text{font-size:13px;line-height:1.8;color:var(--brown)}

/* SECTIONS */
.section{padding:48px 28px}
.section.dark{background:var(--ink)}
.section.mid{background:var(--mid)}
.section.tinted{background:var(--sand-d)}
.divider{height:1px;background:rgba(196,120,74,.15);margin:0 28px}

/* PILLARS */
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:4px}
.pillar{padding:18px 14px;background:var(--sand-d);border-top:2px solid var(--terra);border-radius:2px}
.pillar-icon{font-size:20px;margin-bottom:8px}
.pillar-name{font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--ink);margin-bottom:5px}
.pillar-desc{font-size:11px;line-height:1.6;color:var(--brown)}

/* STORY */
.story-quote{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;font-style:italic;color:var(--sand);line-height:1.5;border-left:2px solid var(--terra);padding-left:18px;margin:20px 0}
.story-sig{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;color:var(--terra)}

/* BLOG CARDS */
.blog-grid{display:flex;flex-direction:column;gap:1px;background:rgba(196,120,74,.12);border:1px solid rgba(196,120,74,.12);border-radius:4px;overflow:hidden}
.blog-card{background:var(--sand);padding:22px 20px;cursor:pointer;transition:background .2s;border-bottom:1px solid rgba(196,120,74,.1)}
.blog-card:last-child{border-bottom:none}
.blog-card:hover{background:var(--sand-d)}
.blog-cat{display:inline-block;font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:10px;font-weight:500}
.blog-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:var(--ink);line-height:1.25;margin-bottom:8px}
.blog-excerpt{font-size:12px;line-height:1.7;color:var(--brown);margin-bottom:12px}
.blog-meta{display:flex;gap:12px;font-size:10px;color:var(--dust);letter-spacing:.5px}
.blog-meta span{display:flex;align-items:center;gap:4px}

/* FULL POST */
.post-hero{padding:40px 28px 32px;background:var(--ink)}
.post-back{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--terra);cursor:pointer;margin-bottom:20px;display:flex;align-items:center;gap:6px}
.post-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;font-style:italic;color:var(--sand);line-height:1.1;margin-bottom:12px}
.post-meta{font-size:10px;letter-spacing:1.5px;color:var(--dust);margin-bottom:0}
.post-body{padding:32px 28px}
.post-body p{font-size:15px;line-height:1.85;color:var(--ink);margin-bottom:20px}
.post-body h3{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:var(--ink);margin:28px 0 12px;font-style:italic}
.post-pullquote{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:var(--terra);border-left:2px solid var(--terra);padding:12px 0 12px 18px;margin:24px 0;line-height:1.5}

/* APP PAGE */
.app-hero{padding:48px 28px;background:var(--ink)}
.features-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}
.feature-card{padding:18px 16px;background:var(--sand-d);border-radius:3px;border-left:2px solid var(--terra)}
.feature-icon{font-size:22px;margin-bottom:8px}
.feature-name{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--ink);margin-bottom:4px}
.feature-desc{font-size:11px;line-height:1.6;color:var(--brown)}
.pricing-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px}
.price-card{padding:22px 18px;border-radius:3px;border:1px solid rgba(196,120,74,.25);background:var(--sand)}
.price-card.featured{background:var(--ink);border-color:var(--terra)}
.price-tier{font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.price-card.featured .price-tier{color:var(--terra)}
.price-card:not(.featured) .price-tier{color:var(--brown)}
.price-amount{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:var(--ink);line-height:1}
.price-card.featured .price-amount{color:var(--sand)}
.price-per{font-size:11px;color:var(--brown);margin-bottom:14px}
.price-card.featured .price-per{color:var(--dust)}
.price-feature{font-size:11px;line-height:1.7;color:var(--brown);padding:3px 0;display:flex;gap:6px}
.price-card.featured .price-feature{color:var(--dust)}
.price-cta{width:100%;padding:12px;margin-top:16px;border-radius:3px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif}
.price-card.featured .price-cta{background:var(--terra);color:var(--sand);border:none}
.price-card:not(.featured) .price-cta{background:transparent;color:var(--terra);border:1px solid rgba(196,120,74,.4)}

/* SHOP */
.shop-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.shop-card{background:white;border-radius:3px;border:1px solid rgba(196,120,74,.15);padding:18px 16px;cursor:pointer;transition:border-color .2s}
.shop-card:hover{border-color:var(--terra)}
.shop-emoji{font-size:28px;margin-bottom:10px}
.shop-name{font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--ink);margin-bottom:4px;line-height:1.2}
.shop-desc{font-size:11px;color:var(--brown);margin-bottom:10px;line-height:1.5}
.shop-price{font-size:13px;font-weight:500;color:var(--terra)}
.shop-section-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;font-style:italic;color:var(--ink);margin-bottom:14px;margin-top:28px}

/* ABOUT */
.about-hero{padding:48px 28px;background:var(--ink)}
.timeline{margin-top:8px}
.timeline-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid rgba(196,120,74,.12)}
.timeline-item:last-child{border-bottom:none}
.timeline-dot{width:10px;height:10px;border-radius:50%;background:var(--terra);flex-shrink:0;margin-top:5px}
.timeline-year{font-size:10px;letter-spacing:2px;color:var(--terra);margin-bottom:4px}
.timeline-text{font-size:13px;line-height:1.65;color:var(--brown)}

/* FOOTER */
.footer{padding:36px 28px;background:var(--ink);text-align:center;border-top:1px solid rgba(196,120,74,.12)}
.footer-logo{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:4px;color:var(--sand);margin-bottom:6px}
.footer-tag{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--brown);margin-bottom:18px}
.footer-links{display:flex;justify-content:center;gap:18px}
.footer-link{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--brown);cursor:pointer;transition:color .2s}
.footer-link:hover{color:var(--terra)}

/* EMAIL */
.email-row{display:flex;gap:8px;margin-top:16px}
.email-input{flex:1;padding:12px 14px;border:1px solid rgba(196,120,74,.3);border-radius:3px;background:rgba(255,255,255,.06);color:var(--sand);font-family:'Inter',sans-serif;font-size:13px;outline:none}
.email-input::placeholder{color:var(--brown)}
.email-input:focus{border-color:var(--terra)}
.email-btn{padding:12px 18px;background:var(--terra);color:var(--sand);border:none;border-radius:3px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap}

/* TESTIMONIALS */
.tcard{padding:20px;border:1px solid rgba(196,120,74,.18);border-radius:3px;margin-bottom:10px}
.tcard-text{font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:var(--sand);line-height:1.6;margin-bottom:10px}
.tcard-author{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--terra)}
`;

function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("Home")}>
        AWAKE <span>&</span> ABROAD
      </div>
      <div className="nav-menu">
        {NAV_LINKS.map((l) => (
          <button key={l} className={`nav-item ${page === l ? "active" : ""}`} onClick={() => setPage(l)}>
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-logo">AWAKE & ABROAD</div>
      <div className="footer-tag">Expat · Mindset · Travel · Dana</div>
      <div className="footer-links">
        {["Home", "About", "Blog", "Shop"].map((l) => (
          <div key={l} className="footer-link" onClick={() => setPage(l)}>{l}</div>
        ))}
      </div>
    </footer>
  );
}

function HomePage({ setPage, setPost }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-eyebrow">Expat · Mindset · Travel</div>
        <div className="hero-title">
          You didn't leave<br />to stay the <em>same.</em>
        </div>
        <div className="hero-body">
          For the ex people pleaser who packed up, shipped out, and is finally learning to come home to herself — wherever in the world she lands.
        </div>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("Shop")}>Visit the shop</button>
          <button className="btn-ghost" onClick={() => setPage("About")}>My story</button>
        </div>
        <div className="hero-tags">
          {["Solo travel", "Inner work", "Moon cycles", "Expat life", "Spiritual wellness", "Ex people pleaser"].map((t) => (
            <div key={t} className="tag">{t}</div>
          ))}
        </div>
      </div>

      <div className="section tinted">
        <div className="eyebrow">What lives here</div>
        <div className="display">Three worlds.<br /><em>One woman.</em></div>
        <div className="pillars">
          <div className="pillar">
            <div className="pillar-icon">🌍</div>
            <div className="pillar-name">The Expat Life</div>
            <div className="pillar-desc">Navigating solo travel, new cultures, and building a life on your own terms.</div>
          </div>
          <div className="pillar">
            <div className="pillar-icon">🧠</div>
            <div className="pillar-name">The Mindset</div>
            <div className="pillar-desc">Rewiring the people pleaser. Reclaiming your voice. Becoming the author.</div>
          </div>
          <div className="pillar">
            <div className="pillar-icon">🌙</div>
            <div className="pillar-name">The Practice</div>
            <div className="pillar-desc">Daily rituals, moon alignment, crystals, and spiritual tools for the woman becoming whole.</div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section dark">
        <div className="eyebrow">My story</div>
        <div className="display light">The woman who<br /><em>left everything.</em></div>
        <div className="story-quote">"No one was coming to save me. And the day I finally believed that — everything changed."</div>
        <div className="body-text" style={{ color: "rgba(196,120,74,.7)", marginBottom: 20 }}>
          I was a nurse. A people pleaser. A woman who made herself small so others could feel big. Then one day I packed a bag, booked a one-way ticket, and started the longest journey of my life — back to myself.
        </div>
        <div className="story-sig">— Dana</div>
        <button className="btn-ghost" style={{ marginTop: 20 }} onClick={() => setPage("About")}>Read the full story →</button>
      </div>

      <div className="section">
        <div className="eyebrow">From the blog</div>
        <div className="display">Latest<br /><em>dispatches.</em></div>
        <div className="blog-grid">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <div key={post.id} className="blog-card" onClick={() => { setPost(post); setPage("Post"); }}>
              <div className="blog-cat" style={{ background: post.categoryColor + "18", color: post.categoryColor }}>
                {post.category}
              </div>
              <div className="blog-title">{post.title}</div>
              <div className="blog-excerpt">{post.excerpt.substring(0, 100)}...</div>
              <div className="blog-meta">
                <span>📍 {post.location}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-ghost" style={{ marginTop: 16, width: "100%" }} onClick={() => setPage("Blog")}>
          Read all posts →
        </button>
      </div>

      <div className="section mid">
        <div className="eyebrow">They felt it too</div>
        <div className="display light"><em>Real women,</em><br />real shifts.</div>
        <div className="tcard">
          <div className="tcard-text">"Dana is the only person online who makes me feel like leaving is brave, not selfish. She gave me permission I didn't know I needed."</div>
          <div className="tcard-author">— Sarah M., now living in Lisbon</div>
        </div>
        <div className="tcard">
          <div className="tcard-text">"The app knows me better than I know myself some mornings. The moon and natal chart combination is genuinely uncanny."</div>
          <div className="tcard-author">— Kezia T., expat in Bali</div>
        </div>
      </div>

      <div className="section dark">
        <div className="eyebrow">Stay close</div>
        <div className="display light">Join the<br /><em>inner circle.</em></div>
        <div className="body-text" style={{ color: "var(--dust)", marginBottom: 0 }}>
          Weekly letters from wherever I am in the world — real stories, moon updates, spiritual tools, and the things I'm too honest to say anywhere else.
        </div>
        <div className="email-row">
          <input
            className="email-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="email-btn" onClick={() => { if (email) setJoined(true); }}>
            {joined ? "You're in ✓" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div className="page">
      <div className="about-hero">
        <div className="eyebrow">The story</div>
        <div className="display light" style={{ fontSize: 42 }}>Dana.</div>
        <div className="body-text" style={{ color: "var(--dust)", fontSize: 14, lineHeight: 1.8 }}>
          Ex nurse. Ex people pleaser. Currently somewhere beautiful, learning what it means to take up space.
        </div>
      </div>

      <div className="section">
        <div className="eyebrow">How we got here</div>
        <div className="display"><em>The long way</em><br />home.</div>
        <div className="timeline">
          {[
            { year: "Before", text: "Nursing career. Good girl. Said yes to everything and everyone. Built a life that looked right from the outside and felt hollow from the inside." },
            { year: "The breaking point", text: "The moment I realized I had no idea who I was outside of what other people needed me to be. The kind of quiet crisis nobody talks about." },
            { year: "The departure", text: "Packed a bag. Booked a one-way ticket. Left behind the life I'd spent years building and had no idea what came next. Best decision I ever made." },
            { year: "The awakening", text: "Moving abroad stripped away every performance. No audience. No one to please. Just me, in foreign grocery stores, crying and laughing and finally becoming real." },
            { year: "Now", text: "Building Awake & Abroad from wherever I land. Sharing the unglamorous, unfiltered truth of what it actually looks like to start over — and finding yourself in the process." },
          ].map((t) => (
            <div key={t.year} className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-text">{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section dark">
        <div className="eyebrow">What I believe</div>
        <div className="display light"><em>The truth</em><br />I live by.</div>
        {[
          "No one is coming to save you — and that's the most liberating thing you'll ever hear.",
          "Your body knows before your brain does. Trust it.",
          "Leaving isn't running. Sometimes it's the most courageous act of self-authorship available to you.",
          "The wound and the wisdom live in the same place.",
        ].map((b) => (
          <div key={b} style={{ padding: "14px 0", borderBottom: "1px solid rgba(196,120,74,.12)", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ color: "var(--terra)", marginTop: 2, flexShrink: 0 }}>✦</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--dust)", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 17 }}>{b}</div>
          </div>
        ))}
      </div>

      <div className="section tinted">
        <div className="eyebrow">Find me</div>
        <div className="display"><em>Come into</em><br />the world.</div>
        {[
          { label: "TikTok", handle: "@awakeabroad", color: "var(--ink)" },
          { label: "The Shop", handle: "Crystals & journals", color: "var(--sage)" },
          { label: "The Shop", handle: "Crystals & journals", color: "var(--sage)" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "white", borderRadius: 3, marginBottom: 8, border: "1px solid rgba(196,120,74,.15)" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--brown)", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, color: s.color, fontFamily: "'Cormorant Garamond',serif" }}>{s.handle}</div>
            </div>
            <div style={{ color: "var(--terra)", opacity: .5 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPage({ setPage, setPost }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "The Expat Files", "The Inner Work", "The Practice"];
  const filtered = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);

  return (
    <div className="page">
      <div style={{ padding: "40px 28px 32px", background: "var(--ink)" }}>
        <div className="eyebrow">The blog</div>
        <div className="display light" style={{ marginBottom: 8 }}>Stories from<br /><em>the road & within.</em></div>
        <div className="body-text" style={{ color: "var(--dust)", fontSize: 13 }}>
          Raw, personal, and beautifully honest dispatches from expat life, inner work, and the spiritual practice of becoming.
        </div>
      </div>

      <div style={{ padding: "16px 28px", background: "var(--mid)", display: "flex", gap: 8, overflowX: "auto" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 14px", borderRadius: 20, border: "1px solid", whiteSpace: "nowrap",
            fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'Inter',sans-serif",
            background: filter === c ? "var(--terra)" : "transparent",
            color: filter === c ? "var(--sand)" : "var(--dust)",
            borderColor: filter === c ? "var(--terra)" : "rgba(196,120,74,.3)",
          }}>{c}</button>
        ))}
      </div>

      <div className="section" style={{ paddingTop: 28 }}>
        <div className="blog-grid">
          {filtered.map((post) => (
            <div key={post.id} className="blog-card" onClick={() => { setPost(post); setPage("Post"); }}>
              <div className="blog-cat" style={{ background: post.categoryColor + "18", color: post.categoryColor }}>
                {post.category}
              </div>
              <div className="blog-title">{post.title}</div>
              <div className="blog-excerpt">{post.excerpt}</div>
              <div className="blog-meta">
                <span>📍 {post.location}</span>
                <span>🕐 {post.readTime}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostPage({ post, setPage }) {
  if (!post) return null;
  return (
    <div className="page">
      <div className="post-hero">
        <div className="post-back" onClick={() => setPage("Blog")}>← Back to blog</div>
        <div className="blog-cat" style={{ background: post.categoryColor + "22", color: post.categoryColor, display: "inline-block", marginBottom: 14 }}>
          {post.category}
        </div>
        <div className="post-title">{post.title}</div>
        <div className="post-meta">{post.date} · {post.location} · {post.readTime}</div>
      </div>
      <div className="post-body">
        <p>{post.excerpt}</p>
        <p>There's a version of this story that's prettier. The one where I arrived and immediately felt free, where the cobblestones and the coffee and the unfamiliar language all conspired to crack me open in the best possible way. That version exists — but it came later.</p>
        <div className="post-pullquote">The first thing leaving teaches you is how much of yourself you'd outsourced to other people's opinions.</div>
        <p>Before the freedom came the Tuesday afternoons. The moments between the Instagram-worthy views and the actual, unglamorous reality of rebuilding a life from scratch in a country where you don't speak the language and the grocery store layout makes no sense and you genuinely cannot figure out how the washing machine works.</p>
        <h3>What nobody posts about</h3>
        <p>Solo travel has a PR problem — not that it's portrayed badly, but that it's only portrayed in its highlight reel. The sunsets. The spontaneous friendships. The moment of transcendent clarity at the top of some ancient ruin.</p>
        <p>Nobody posts the part where you sit in a café for three hours because going back to your apartment means being alone with your thoughts again, and your thoughts are loud right now. Nobody posts that.</p>
        <p>But that's also the part that changes you.</p>
        <div className="post-pullquote">Solitude is the price of admission to yourself.</div>
        <p>I came abroad to escape. I stayed because I realized I'd actually arrived — at the first honest version of myself I'd met in years. And she was worth getting to know.</p>
      </div>
      <div className="section dark" style={{ paddingTop: 28 }}>
        <div className="eyebrow">Keep reading</div>
        <div className="blog-grid" style={{ marginTop: 8 }}>
          {BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2).map((p) => (
            <div key={p.id} className="blog-card" onClick={() => setPage("Blog")} style={{ background: "rgba(245,239,230,.04)", borderBottom: "none" }}>
              <div className="blog-cat" style={{ background: p.categoryColor + "22", color: p.categoryColor }}>{p.category}</div>
              <div className="blog-title" style={{ color: "var(--sand)", fontSize: 17 }}>{p.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppPage() {
  return (
    <div className="page">
      <div className="app-hero">
        <div className="eyebrow">The app</div>
        <div className="display light" style={{ fontSize: 44 }}>Your daily<br /><em>ascension.</em></div>
        <div className="body-text" style={{ color: "var(--dust)", fontSize: 13 }}>
          Personalized to your natal chart, your moon cycle, and your exact location — every single day. No two days, no two women, the same.
        </div>
      </div>

      <div className="section tinted">
        <div className="eyebrow">What's inside</div>
        <div className="display"><em>Everything</em><br />you need.</div>
        <div className="features-grid">
          {[
            { icon: "✨", name: "Daily affirmations", desc: "Written for your chart, your cycle, your moment." },
            { icon: "🌙", name: "Moon alignment", desc: "Live moon phase + energy guidance for your location." },
            { icon: "💎", name: "Crystal guidance", desc: "Daily crystal pick with the spiritual science behind it." },
            { icon: "🧘", name: "EFT & Qi Gong", desc: "Short practices for morning energy and evening release." },
            { icon: "⭐", name: "Natal chart reads", desc: "Your sun, moon, rising — decoded daily." },
            { icon: "💬", name: "The Boost", desc: "AI-powered motivation when you need a real lift." },
          ].map((f) => (
            <div key={f.name} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="eyebrow">Pricing</div>
        <div className="display"><em>Start free.</em><br />Go deeper.</div>
        <div className="pricing-cards">
          <div className="price-card">
            <div className="price-tier">Free</div>
            <div className="price-amount">$0</div>
            <div className="price-per">forever</div>
            {["Daily affirmation", "Moon phase updates", "Basic practices", "Boost chat (5/month)"].map((f) => (
              <div key={f} className="price-feature"><span style={{ color: "var(--sage)" }}>✓</span>{f}</div>
            ))}
            <button className="price-cta">Get started</button>
          </div>
          <div className="price-card featured">
            <div className="price-tier">Full journey</div>
            <div className="price-amount" style={{ color: "var(--terra)" }}>$9</div>
            <div className="price-per">per month</div>
            {["Everything in Free", "Full natal chart reads", "Crystal guidance daily", "Unlimited Boost chat", "Moon ritual plans", "Journey tracking"].map((f) => (
              <div key={f} className="price-feature"><span style={{ color: "var(--terra)" }}>✦</span>{f}</div>
            ))}
            <button className="price-cta">Start journey</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  return (
    <div className="page">
      <div style={{ padding: "40px 28px 32px", background: "var(--ink)" }}>
        <div className="eyebrow">The shop</div>
        <div className="display light">Stones, journals,<br /><em>sacred tools.</em></div>
        <div className="body-text" style={{ color: "var(--dust)" }}>
          Every crystal recommended in the app. Every journal built for the woman becoming. Curated with intention, shipped with love.
        </div>
      </div>

      <div className="section">
        <div className="eyebrow">Crystals</div>
        <div className="shop-section-title">Your daily stones.</div>
        <div className="shop-grid">
          {CRYSTALS.map((c) => (
            <div key={c.name} className="shop-card">
              <div className="shop-emoji">{c.emoji}</div>
              <div className="shop-name">{c.name}</div>
              <div className="shop-desc">{c.desc}</div>
              <div className="shop-price">{c.price}</div>
            </div>
          ))}
        </div>

        <div className="shop-section-title" style={{ marginTop: 32 }}>Crystal packs.</div>
        <div className="shop-grid">
          {[
            { name: "The Awakening Pack", emoji: "✨", price: "$58", desc: "4 stones for the woman beginning her journey" },
            { name: "The Moon Ritual Pack", emoji: "🌙", price: "$64", desc: "New & full moon ceremony essentials" },
            { name: "The Protection Pack", emoji: "🛡️", price: "$52", desc: "Grounding & energetic boundary stones" },
            { name: "The Abundance Pack", emoji: "💰", price: "$60", desc: "Manifestation & prosperity alignment" },
          ].map((p) => (
            <div key={p.name} className="shop-card">
              <div className="shop-emoji">{p.emoji}</div>
              <div className="shop-name">{p.name}</div>
              <div className="shop-desc">{p.desc}</div>
              <div className="shop-price">{p.price}</div>
            </div>
          ))}
        </div>

        <div className="shop-section-title" style={{ marginTop: 32 }}>Journals & workbooks.</div>
        <div className="shop-grid">
          {JOURNALS.map((j) => (
            <div key={j.name} className="shop-card">
              <div className="shop-emoji">{j.emoji}</div>
              <div className="shop-name">{j.name}</div>
              <div className="shop-desc">{j.desc}</div>
              <div className="shop-price">{j.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [post, setPost] = useState(null);

  return (
    <>
      <style>{S}</style>
      <div className="site">
        <Nav page={page} setPage={setPage} />
        {page === "Home" && <HomePage setPage={setPage} setPost={setPost} />}
        {page === "About" && <AboutPage setPage={setPage} />}
        {page === "Blog" && <BlogPage setPage={setPage} setPost={setPost} />}
        {page === "Post" && <PostPage post={post} setPage={setPage} />}

        {page === "Shop" && <ShopPage />}
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
