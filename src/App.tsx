import { useState, useEffect } from 'react';
import { Waves, Anchor, Users, Sword, Wrench, Map, X, ChevronRight, Sparkles, Skull, Fish, Shell, Navigation, AlertTriangle, Heart, Compass, FlaskConical, ScrollText } from 'lucide-react';
import './index.css';

interface SectionData { id: string; label: string; icon: React.ReactNode; }

const SECTIONS: SectionData[] = [
  { id: 'overview', label: 'Overview', icon: <Waves size={15}/> },
  { id: 'arrival', label: 'Arrival', icon: <Anchor size={15}/> },
  { id: 'location', label: 'The Gnarl', icon: <Sparkles size={15}/> },
  { id: 'npcs', label: 'NPCs', icon: <Users size={15}/> },
  { id: 'encounters', label: 'Encounters', icon: <Sword size={15}/> },
  { id: 'repairs', label: 'Repairs', icon: <Wrench size={15}/> },
  { id: 'hooks', label: 'Hooks', icon: <Compass size={15}/> },
  { id: 'krark', label: "Krark's Obsession", icon: <FlaskConical size={15}/> },
  { id: 'dmresources', label: 'DM Resources', icon: <ScrollText size={15}/> },
  { id: 'departure', label: 'Departure', icon: <Map size={15}/> },
];

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button onClick={onClose} style={{ position:'absolute', top:'1.5rem', right:'1.5rem', color:'var(--text-secondary)', fontSize:'2rem', cursor:'pointer', background:'none', border:'none' }}>
        <X size={36}/>
      </button>
      <img src={src} alt={alt} className="lightbox-img" onClick={e => e.stopPropagation()}/>
    </div>
  );
}

/* ── Bubbles ── */
function BubbleBackground() {
  const [bubbles] = useState(() => Array.from({ length: 22 }, (_, i) => ({
    id: i, left: Math.random() * 100, size: 4 + Math.random() * 14,
    duration: 12 + Math.random() * 22, delay: Math.random() * 16,
  })));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex:0 }}>
      {bubbles.map(b => (
        <div key={b.id} className="bubble" style={{
          left: `${b.left}%`, width: `${b.size}px`, height: `${b.size}px`,
          background: b.id % 3 === 0 ? 'rgba(232,168,56,0.18)' : 'rgba(0,229,255,0.12)',
          animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s`,
        }}/>
      ))}
      {[12, 32, 52, 72, 88].map((l, i) => (
        <div key={i} className="light-ray" style={{ left: `${l}%`, animationDelay: `${i * 1.5}s` }}/>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`p${i}`} className="particle" style={{
          left: `${8 + Math.random() * 84}%`, top: `${8 + Math.random() * 84}%`,
          animationDelay: `${Math.random() * 14}s`, animationDuration: `${10 + Math.random() * 12}s`,
        }}/>
      ))}
    </div>
  );
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Active section hook ── */
function useActiveSection() {
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { threshold: 0.2 });
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ── Image with lightbox ── */
function CampaignImage({ src, alt, caption, className = '' }: { src: string; alt: string; caption?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={className}>
        <img src={src} alt={alt} className="image-hover rounded-xl w-full" onClick={() => setOpen(true)}/>
        {caption && <p className="mt-2 text-sm text-center italic" style={{ color: 'var(--text-muted)' }}>{caption}</p>}
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)}/>}
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/the-gnarl-exterior.jpg" alt="The Gnarl" className="w-full h-full object-cover" style={{ opacity: 0.35 }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,12,20,0.6) 0%, rgba(4,20,34,0.4) 40%, rgba(2,12,20,1) 100%)' }}/>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="reveal visible">
          <p className="text-sm tracking-[0.35em] uppercase mb-5 font-light" style={{ color: 'var(--accent-biolume)' }}>Campaign Location</p>
          <h1 className="text-6xl md:text-8xl font-bold text-white glow-text mb-4" style={{ fontFamily: "'Cinzel Decorative', serif", letterSpacing: '0.06em' }}>The Gnarl</h1>
          <p className="text-xl md:text-2xl italic mb-2" style={{ color: 'var(--text-secondary)' }}>Young Reef Anchorage &middot; Feywild Southern Shelf</p>
          <div className="w-28 h-[1px] mx-auto my-7" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-biolume), transparent)' }}/>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(212,232,240,0.7)' }}>
            An eighty-year-old reef grown around the bones of a Void-Leviathan &mdash;
            a hidden resistance stronghold where coral outlasts capital.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {['Level 8', '1-4 Sessions', 'Underwater', 'Resistance'].map(t => (
              <span key={t} className="glass-card px-5 py-2 text-sm tracking-wide" style={{ color: 'var(--accent-biolume)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════ */
function Overview() {
  return (
    <section id="overview" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>The Situation</h2>
          <div className="w-16 h-[2px] mt-6 mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="reveal space-y-5" style={{ color: 'var(--text-secondary)' }}>
            <p>The <strong style={{ color: 'var(--accent-pearl)' }}>Deeprunner</strong> took damage in the crown engagement. Not crippling &mdash; the living coral hull held, the torpedo tubes fired clean, and the emergency dive bought them distance. But the main cannon took a direct hit from chain-shot. The forward viewport in the Arcane Navigation Chamber is spiderwebbed with stress fractures. The pilot fish, already stressed from neglect, are now frantic from the battle-noise. And the depth anchor &mdash; the keel mechanism that holds the ship steady at depth &mdash; is grinding. Something in the gearing is misaligned.</p>
            <p>Draven can keep them underwater. Mossek can keep them moving. But none of the collective's engineers can perform a full hull-regeneration and keel repair while running. They need a cradle. They need a forge. They need somewhere the crown doesn't know about.</p>
            <p>The Navigator, <strong style={{ color: 'var(--accent-pearl)' }}>Talu Korei</strong>, knows a place. She's never been there, but the pilot fish know it &mdash; a resonance in the craft-song that carries up from the southern reef shelf, a young reef singing in a different key than BlackCoral Reach. The Cecaelia resistance has a word for it: <em>Velmora's Sprout</em>. The smugglers call it <strong style={{ color: 'var(--accent-pearl)' }}>the Gnarl</strong>.</p>

            <div className="read-aloud">
              <p>The craft-song changes three hours into the emergency dive. Where the Deep Forge's song was deep, steady, and old &mdash; a lullaby in bass frequencies &mdash; this new resonance is sharp, bright, and <em>young</em>. It carries an edge of aggression, the sound of coral growing fast and hard and not politely. The pilot fish respond to it before Talu does &mdash; their bioluminescence shifting from stressed orange-red to something almost curious, amber and gold flickering at their fins.</p>
              <p>Through the cracked forward viewport, the darkness below resolves into shape. Not a city. Not a structure. A <em>knot</em> &mdash; a massive tangle of black coral that looks less grown than <em>fought into being</em>, spires twisted around each other in formations that suggest speed rather than patience. The bioluminescence here is not the cool blue-white of BlackCoral Reach. It is warm amber, rust-orange, the color of forge-fire underwater. And threaded through it all: the massive ribcage of something that died here long before the coral arrived, bones the size of ship masts now fused into the reef's architecture, half-consumed, half-honored.</p>
              <p>A single Cecaelia figure waits at the reef's edge, eight arms spread in the formal welcome-posture of the collective. They are small &mdash; young, by Cecaelia standards &mdash; and their skin is cycling through colors you've never seen in the Deep Forge: bright gold, copper, a flush of deep rose-pink that suggests excitement rather than anger.</p>
              <p><em>&ldquo;You're loud,&rdquo;</em> they say, when the Deeprunner's moonpool breaches the surface inside the reef's inner chamber. <em>&ldquo;We heard you coming from the shelf-break. Welcome to the Gnarl. Try not to touch anything that's still growing.&rdquo;</em></p>
            </div>

            <div className="gm-note">
              <p><strong>Getting Here:</strong> After the crown battle, Draven performs Emergency Dive (Recharge 6 &mdash; if it hasn't recharged, he burns a crew inspiration to force it). The Deeprunner submerges to 60 feet and runs south for six hours at stressed speed (30 ft.). The crown vessel cannot follow. Talu navigates by pilot-fish instinct toward the Gnarl's craft-song resonance. DC 13 Survival check (with disadvantage from stressed fish) &mdash; on failure, they arrive but with an extra 2 hours of strain on the hull. The grinding in the keel worsens. Winnow looks at Mossek. Mossek looks at the party. No one says anything, but the meaning is clear: <em>we needed to be here yesterday.</em></p>
            </div>
          </div>
          <div className="reveal space-y-5">
            <CampaignImage src="/images/the-gnarl-exterior.jpg" alt="The Gnarl" caption="The Gnarl — sharp amber spires and leviathan bones"/>
            <CampaignImage src="/images/bone-cathedral.jpg" alt="Bone Cathedral" caption="The Leviathan's Ribcage — Drydock Cathedral"/>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-biolume)' }}>~80</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Years Old</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-gold)' }}>200</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Population</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-violet)' }}>3</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Repair Docks</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-coral)' }}>0</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Crown Knowledge</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-14">
          <h3 className="text-2xl text-white mb-8 flex items-center gap-3">
            <Sparkles size={22} style={{ color: 'var(--accent-biolume)' }}/> At a Glance
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { t: 'What It Is', p: <>A young reef-anchorage grown around the skeleton of a dead <strong style={{color:'var(--accent-pearl)'}}>Void-Leviathan</strong> &mdash; one of the great beasts that once swam the Feywild oceans before the courts divided the sea. The Cecaelia resistance planted the first coral seed here eighty years ago. They've been growing it in secret ever since.</> },
              { t: 'Philosophy', p: <><em>&ldquo;The coral outlasts capital.&rdquo;</em> The Gnarl's architects refuse to build above the waterline. No surface structures. No locks. No Tidal Tongue. The reef is entirely underwater, entirely self-sufficient, and entirely invisible to any surface vessel. The Aethmer don't know it exists. The crown has sailed over it a hundred times.</> },
              { t: 'Population', p: <>Approximately 200 reef-kin: Cecaelia craftworkers (dominant), Coralborn Merfolk historians and mediators, Kelpie Tidecallers who tend the leviathan's bones, and a small Shimmerkin network that reports to Wix. No Aethmer. No surface-dwellers. The party is the first surface-form visitors in three years.</> },
              { t: 'The Bones', p: <>The Void-Leviathan's ribcage forms the reef's central cathedral &mdash; a natural dry-dock chamber where the coral has grown <em>around</em> the bones rather than over them, creating vaulted spaces large enough to hold three vessels the Deeprunner's size. The skull sits at the reef's northern edge, its eye sockets now bioluminescent furnaces that generate heat for the forges. The heart-chamber is sealed. Something grows inside it.</> },
            ].map(b => (
              <div key={b.t} className="glass-card p-5">
                <h4 className="text-xs tracking-[0.15em] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>{b.t}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{b.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-8">
          <div className="secret-box">
            <p><strong style={{ color: 'var(--accent-coral)' }}>The Leviathan Isn't Quite Dead.</strong> The Kelpie Tidecallers know it. The heart still beats &mdash; once every four hours, a slow pulse that vibrates through the entire reef. The Cecaelia architects built the forges around this pulse, using it to accelerate coral growth. But the pulse has been speeding up. Something in the deep water south of the Gnarl is agitating the leviathan's remnant nervous system. The Kelpie call it <em>the Waking</em>. They haven't told the architects yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   ARRIVAL
   ═══════════════════════════════════════════ */
function Arrival() {
  return (
    <section id="arrival" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Arrival & First Impressions</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>The Deeprunner Breaches the Gnarl</p>
          <div className="w-16 h-[2px] mt-4 mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="reveal space-y-6" style={{ color: 'var(--text-secondary)' }}>
            <h3 className="text-lg tracking-wide" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-pearl)' }}>The Craft-Song Here</h3>
            <p>Where the Deep Forge's song was a lullaby, the Gnarl's song is a <em>war-chant</em>. The young coral grows faster and more aggressively, and the frequencies the Cecaelia use to shape it are higher, sharper, more urgent. The sound is physically uncomfortable for non-Cecaelia &mdash; a constant pressure behind the eyes, a vibration in the teeth. After two hours, surface-dwellers develop headaches that persist until they acclimate (or leave). The party's Cecaelia crew (Mossek, Draven, Winnow) visibly relax here in a way they haven't since leaving BlackCoral Reach.</p>

            <h3 className="text-lg tracking-wide pt-2" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-pearl)' }}>The Light</h3>
            <p>Amber, rust, forge-orange. The bioluminescent organisms here were bred for warmth as much as visibility &mdash; the Gnarl runs cold, fed by deep-water currents from the south, and the light is the reef's heating system. Coral Sprites here glow warm gold rather than cool blue-white. The difference is immediately noticeable to anyone who spent time in BlackCoral Reach.</p>

            <h3 className="text-lg tracking-wide pt-2" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-pearl)' }}>The Smell/Taste</h3>
            <p>Sharp mineral. Hot metal. Something like cinnamon from the forge-coral. And underneath it all, the faint organic sweetness of leviathan decay &mdash; not rotting, but <em>transforming</em>, ancient flesh being slowly converted into reef-nutrient. Players with gill potions taste this as a complex, almost meaty undertone at the back of the throat. It's not unpleasant. It's just <em>old</em>.</p>

            <h3 className="text-lg tracking-wide pt-2" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-pearl)' }}>The Social Texture</h3>
            <p>No Tidal Tongue. No house colors. No status competition. The Gnarl operates on collective rules &mdash; surplus shared, labor rotated, decisions made at the Anchor Stone (a natural coral formation in the central plaza). The architects wear their tool-harnesses as identity, not adornment. The most respected person here is whoever is currently working on the most complex project. Right now, that's a young Cecaelia named <strong style={{ color: 'var(--accent-pearl)' }}>Spindle</strong>, who is attempting to grow a navigational instrument directly into living coral &mdash; Veth's prototype, but biological.</p>
          </div>
          <div className="reveal space-y-5">
            <CampaignImage src="/images/deeprunner-repair.jpg" alt="Deeprunner" caption="The Deeprunner — Running Dark"/>
            <CampaignImage src="/images/coral-drydock.jpg" alt="Coral Drydock" caption="Amber Gardens — The Gnarl"/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   LOCATION
   ═══════════════════════════════════════════ */
function Location() {
  const districts = [
    { icon: <Skull size={22}/>, title: 'The Bone Cathedral', sub: 'Central Drydock', img: '/images/bone-cathedral.jpg', desc: "The Void-Leviathan's ribcage forms a natural cathedral large enough to hold three vessels. The bones are fused with living coral, creating vaulted repair bays. The sternum cradle holds the Deeprunner while coral-graft repairs proceed.", detail: 'The ribs rise like a gothic cathedral built by gods. The skull alone is the size of a manor house.', tags: ['reef', 'magic'] },
    { icon: <Sparkles size={22}/>, title: 'The Forge-Heart', sub: 'Bioluminescent Furnaces', img: '/images/coral-drydock.jpg', desc: "The leviathan's skull-eye sockets glow with forge-heat. Cecaelia craft-singers work here around the clock, shaping coral to the pulse of the heart-chamber. Hands glow with bioluminescent energy as they shape the coral.", detail: 'Spindle works here, building a biological navigation instrument into living coral.', tags: ['amber', 'danger'] },
    { icon: <Waves size={22}/>, title: 'The Chaos Garden', sub: 'Non-Euclidean Coral', img: '/images/chaos-garden.jpg', desc: "Coral growing in impossible, non-Euclidean patterns — influenced by residual Void-Leviathan neural energy, or by something else. The Cecaelia avoid it. The coral there is beautiful, useful, and wrong.", detail: 'Hidden Find: A leviathan-bone compass that points south and spins faster near deep anomalies.', tags: ['magic', 'danger'] },
    { icon: <Heart size={22}/>, title: 'The Heart-Chamber', sub: 'Sealed Leviathan Heart', img: '/images/heart-chamber.jpg', desc: "The heart still beats — once every four hours. Something has nested inside. The resin pools here are vital for high-grade coral repair. A Brood-Mother protects her eggs.", detail: 'The Kelpie remember whether you killed her. The heart beats faster each day.', tags: ['danger', 'magic'] },
    { icon: <Anchor size={22}/>, title: 'The Anchor Stone', sub: 'Community Plaza', img: '/images/deeprunner-repair.jpg', desc: "A natural coral formation where the reef-kin gather, debate, and make collective decisions. No Tidal Tongue. No house politics. Just voices. Part dock, part council-hall, part market.", detail: "Click the Sprite has a southern intelligence node here. Ridge runs barter from a coral stall.", tags: ['reef'] },
    { icon: <Fish size={22}/>, title: 'The Shark Run', sub: 'Supply Canyon', img: '/images/shark-alpha.jpg', desc: "A narrow coral canyon used for moving supplies between the Tending Gardens and the Forge. Voidsea shark-folk have moved in. They teleport through shadows and hunt by blood-scent.", detail: 'Combat encounter with flanking teleports and blood-scent mechanics.', tags: ['danger'] },
  ];
  return (
    <section id="location" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>The Location</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>Velmora's Sprout &middot; The Leviathan's Bones</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((d, i) => (
            <div key={d.title} className="reveal glass-card overflow-hidden group" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="relative overflow-hidden">
                <img src={d.img} alt={d.title} className="w-full h-44 object-cover image-hover"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,12,20,0.9) 0%, transparent 60%)' }}/>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span style={{ color: 'var(--accent-biolume)' }}>{d.icon}</span>
                  <div>
                    <h3 className="text-lg text-white font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{d.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--accent-biolume)' }}>{d.sub}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{d.desc}</p>
                <p className="text-xs italic mt-3 pl-3 border-l-2" style={{ color: 'var(--text-muted)', borderColor: 'rgba(0,229,255,0.2)' }}>{d.detail}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {d.tags.map(t => <span key={t} className={`tag tag-${t}`}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NPCs
   ═══════════════════════════════════════════ */
function NPCs() {
  const npcs = [
    { name: 'Spindle', title: 'Master Architect-in-Training — Gnarl Forge Lead', race: 'Cecaelia &middot; 34 years old (very young)', img: '/images/spindle.jpg', oneliner: "\u201cYou're from the Deep Forge? Did you know Thessavane? Is she still building? Tell me everything.\u201d",
      body: <>Small, fast-talking, all eight arms in constant motion. Skin cycles through bright gold (excited), copper (focused), and an alarming violet (frustrated) &mdash; the last one is new, specific to Spindle, and the other Cecaelia find it slightly unsettling. Currently attempting to grow a biological navigational instrument into living coral &mdash; Veth's prototype, but fully organic. Needs the Deeprunner's depth-anchor specs to complete the project. Will trade the replacement gear for a copy of the specs.",
        <p className="mt-3"><strong style={{ color: 'var(--accent-pearl)' }}>What Spindle Knows:</strong> The Gnarl has been receiving Shimmerkin messages from Wix for two years. They know about the Deeprunner seizure. They know about the crown's unsanctioned launches. They don't know the party has the ship until it arrives.</p></> },
    { name: 'Waits-in-Deep-Water', title: 'Senior Tidecaller — Leviathan Keeper', race: 'Kelpie', img: '/images/waits-in-deep-water.jpg', oneliner: '\u201cThe bones remember. We are not keeping them. We are waiting for them to decide.\u201d',
      body: <>Ancient, enormous in natural form &mdash; a horse-shaped mass of dark water and trailing kelp that moves through the reef's larger chambers without sound. In humanoid form: tall, translucent, with kelp-hair that drips even in dry spaces. Speaks in slow, careful sentences that always contain at least one thing the listener doesn't understand. Has known about the Waking for three weeks. Has not told Spindle because Spindle would try to <em>fix</em> it, and some things are not meant to be fixed by Cecaelia hands.",
        <p className="mt-3"><strong style={{ color: 'var(--accent-pearl)' }}>What Waits Knows:</strong> The thing agitating the leviathan's heart is the same thing Veth mapped south of BlackCoral Reach. It is moving north. Slowly. But it is moving. The Kelpie have a name for it in a language older than the Feywild courts. The name translates roughly as <em>the Hunger That Swims in Both Directions</em>.</p></> },
    { name: 'Ridge', title: 'Quartermaster — Supply & Trade', race: 'Coralborn Merfolk', img: '/images/ridge.jpg', oneliner: "\u201cWe don't use money here. But we do keep track of who owes what.\u201d",
      body: <>Broad, practical, mid-forties with scales fading from teal to silver at the temples. Ridge runs the Gnarl's supply network &mdash; which is entirely barter-based and entirely tracked in a coral-glyph ledger that only Coralborn can read efficiently. Will provide food, lodging, and materials for the repairs. Will also quietly assess whether the party is trustworthy enough to receive the Gnarl's real resource: <strong style={{ color: 'var(--accent-pearl)' }}>intelligence</strong>. The Shimmerkin network here has been compiling crown naval movements for months.",
        <p className="mt-3"><strong style={{ color: 'var(--accent-pearl)' }}>Ridge's Test:</strong> On the second day, Ridge asks the party to help move a shipment of reef-honey through the Shark Run &mdash; a passage the Shimmerkin refuse to use. How they handle this determines what information Ridge shares.</p></> },
    { name: 'Click', title: 'Shimmerkin Senior — Network Node', race: 'Coral Sprite', img: '/images/click.jpg', oneliner: '[a rapid series of bioluminescent flashes, then a pause, then a single sustained amber pulse]',
      body: <>Nine inches tall &mdash; large for a Sprite &mdash; with a copper-wire collar similar to Wix's, but older, green with oxidation. Click is the Gnarl's connection to the wider Shimmerkin network. Does not speak in audible words; communicates in bioluminescent flash-patterns that the party cannot read without assistance. Talu Korei can translate. Click has a message for the party from Wix, delivered the moment they arrive: a single flash-pattern that translates as <em>\u201cCrown knows you ran south. They don't know where. Yet.\u201d</em>",
        <p className="mt-3"><strong style={{ color: 'var(--accent-pearl)' }}>Click's Secret:</strong> The Shimmerkin have noticed something in the Chaos Garden &mdash; a section of coral that has begun growing in patterns that match no known craft-song. The Sprites avoid it. They haven't told the Cecaelia yet because they don't have words for what they're seeing.</p></> },
  ];
  return (
    <section id="npcs" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Key NPCs</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>The Reef's Architects & Keepers</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <CampaignImage src="/images/spindle.jpg" alt="Spindle" caption="Spindle"/>
          <CampaignImage src="/images/waits-in-deep-water.jpg" alt="Waits-in-Deep-Water" caption="Waits-in-Deep-Water"/>
          <CampaignImage src="/images/ridge.jpg" alt="Ridge" caption="Ridge"/>
          <CampaignImage src="/images/click.jpg" alt="Click" caption="Click"/>
        </div>
        <div className="space-y-8">
          {npcs.map((npc, i) => (
            <div key={npc.name} className="reveal glass-card overflow-hidden" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                <div className="relative">
                  <img src={npc.img} alt={npc.name} className="w-full h-full object-cover min-h-[340px] image-hover"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(2,12,20,0.95) 0%, transparent)' }}>
                    <h3 className="text-2xl text-white font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{npc.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--accent-biolume)' }}>{npc.title}</p>
                  </div>
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-gold)' }}>{npc.race}</p>
                  <div className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{npc.body}</div>
                  <p className="text-sm italic border-l-2 pl-4" style={{ color: 'var(--text-muted)', borderColor: 'rgba(156,107,255,0.3)' }}>{npc.oneliner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   ENCOUNTERS
   ═══════════════════════════════════════════ */
function Encounters() {
  return (
    <section id="encounters" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Session Encounters</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>One Per Day of Repair</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="reveal">
          <CampaignImage src="/images/shark-alpha.jpg" alt="Shark-Folk" className="mb-4"/>
        </div>

        {/* ENC 01 */}
        <div className="reveal encounter-card">
          <div className="encounter-header">
            <span className="encounter-num">ENC 01</span>
            <span className="encounter-title">The Shark Run</span>
            <span className="encounter-tag tag-combat">Combat &mdash; Moderate</span>
          </div>
          <div className="encounter-body" style={{ color: 'var(--text-secondary)' }}>
            <h4>Setup</h4>
            <p>Ridge needs reef-honey moved from the Tending Gardens to the Forge &mdash; a passage through a narrow coral canyon called the Shark Run. The Shimmerkin refuse to use it. &ldquo;Something moved in last month,&rdquo; is all Click will say. Ridge needs bodies with weapons.</p>
            <h4>The Canyon</h4>
            <p>A winding, forty-foot-deep cut through young coral &mdash; walls sharp and irregular, no room to maneuver. Bioluminescence is sparse here; the canyon runs cold. At the halfway point: a submerged cave mouth, recently excavated, with fresh claw-marks on the coral.</p>
            <h4>What Lives Here</h4>
            <p><strong style={{ color: 'var(--accent-pearl)' }}>Voidsea Shark-Folk</strong> &mdash; a hunting pack of 4&ndash;6 fey-touched shark-humanoids (use sahuagin stats with these modifications: add <em>Fey Step</em> as bonus action 1/day, 30 ft. teleport to unoccupied space; their bites inflict 1d6 cold damage in addition to piercing; they speak broken Sylvan and click at each other in echolocation patterns). They are not native to the Gnarl &mdash; they were driven north by the same deep-water disturbance that is agitating the leviathan. They are hungry, territorial, and deeply confused by the craft-song.</p>
            <h4>Tactical Notes</h4>
            <ul className="styled">
              <li>The canyon walls are living coral &mdash; <strong>sharp</strong>. Any creature pushed or knocked prone against a wall takes 1d6 slashing damage.</li>
              <li>The shark-folk use <strong>Fey Step</strong> to flank immediately. They have advantage on attacks against creatures with open wounds (they can smell blood in the water at 60 ft.).</li>
              <li><strong style={{ color: 'var(--accent-pearl)' }}>Kruster's moment:</strong> The shark-folk leader (use Sahuagin Baron stats, CR 5) will single out the largest, most wounded-looking target. If Kruster has taken damage and is raging, the leader fixates on him &mdash; a primal challenge. Defeating the leader causes the remaining pack to retreat via Fey Step.</li>
              <li><strong style={{ color: 'var(--accent-pearl)' }}>Wind's light</strong> distresses them &mdash; they are creatures of deep cold and darkness. A <em>light</em> spell or Wind's radiant abilities forces DC 13 Wis saves or they lose their next action to recoil.</li>
            </ul>
            <h4>Resolution</h4>
            <p>If the party delivers the reef-honey, Ridge shares his first piece of intelligence: a Shimmerkin report that a crown vessel &mdash; not the one they fought, a second, larger ship &mdash; has been patrolling the shelf-break twenty miles north of the Gnarl for three days. Looking for something. Looking for them.</p>
          </div>
        </div>

        {/* ENC 02 */}
        <div className="reveal mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={20} style={{ color: 'var(--accent-violet)' }}/>
            <h3 className="text-2xl text-white" style={{ fontFamily: "'Cinzel', serif" }}>Day 1&ndash;2 &mdash; The Chaos Garden</h3>
          </div>
          <div className="encounter-card">
            <div className="encounter-header">
              <span className="encounter-num">ENC 02</span>
              <span className="encounter-title">The Chaos Garden</span>
              <span className="encounter-tag tag-explore">Exploration / Puzzle</span>
            </div>
            <div className="encounter-body" style={{ color: 'var(--text-secondary)' }}>
              <h4>Setup</h4>
              <p>Spindle needs a specific coral cutting for the depth-anchor gear &mdash; a rare formation called <em>spiral-knot coral</em>, which only grows in one section of the Gnarl: the Chaos Garden. The Garden is a section of reef where the coral has grown in impossible, non-Euclidean patterns &mdash; influenced by residual Void-Leviathan neural energy, or by something else. The Cecaelia avoid it. The coral there is beautiful, useful, and <em>wrong</em>.</p>
              <h4>Navigating the Garden</h4>
              <p>Three challenges, run as a skill sequence:</p>
              <ul className="styled">
                <li><strong style={{ color: 'var(--accent-pearl)' }}>The Maze:</strong> DC 14 Survival or Investigation. The coral walls shift slowly &mdash; not fast enough to see, but fast enough that a path that was open five minutes ago is now sealed. Success: find the spiral-knot formation in 20 minutes. Failure: 1 hour, and the party is turned around twice. Each failure triggers a <strong>disorientation save</strong> &mdash; DC 12 Wis or gain 1 level of exhaustion from the Garden's spatial wrongness.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>The Choir:</strong> The coral here hums at frequencies that produce auditory hallucinations &mdash; whispers, music, the sound of your own name. DC 13 Wis save or be <em>charmed</em> by the Garden for 1 minute, compelled to walk toward the center. The center is a dead end filled with toxic coral-spore. Hermit's druidic nature sense gives him advantage on this save &mdash; he recognizes the spore as a defense mechanism, not a voice.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>The Cutting:</strong> The spiral-knot coral must be harvested with a specific song &mdash; not the aggressive war-chant of the Gnarl, but the old lullaby of BlackCoral Reach. Spindle knows the first three notes. Winnow knows the rest. If the party includes someone who can reproduce the Deep Forge's craft-song (Hermit via <em>Speak with Animals</em> and the pilot fish can hum the frequency), the coral yields cleanly. Otherwise: DC 15 Performance or the coral shatters, requiring a second search.</li>
              </ul>
              <h4>What They Find</h4>
              <p>Besides the spiral-knot coral, a successful navigation reveals a <strong>small sealed chamber</strong> at the Garden's heart &mdash; a bubble of air trapped in coral, containing a single object: a ship's compass made of leviathan bone, its needle spinning slowly without magnetic north. It points <em>south</em>. Always south. Even when turned. Even when shaken. It is pointing at something. The Kelpie will not touch it. Spindle wants to study it. Waits-in-Deep-Water says, simply: <em>&ldquo;It is not pointing. It is being pulled.&rdquo;</em></p>
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <CampaignImage src="/images/chaos-garden.jpg" alt="Chaos Garden" caption="The Chaos Garden &mdash; Non-Euclidean coral"/>
                <CampaignImage src="/images/bone-compass.jpg" alt="Bone Compass" caption="The Leviathan-Bone Compass"/>
              </div>
            </div>
          </div>
        </div>

        {/* ENC 03 */}
        <div className="reveal mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Heart size={20} style={{ color: 'var(--accent-coral)' }}/>
            <h3 className="text-2xl text-white" style={{ fontFamily: "'Cinzel', serif" }}>Day 2 &mdash; The Heart-Chamber</h3>
          </div>
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="encounter-card m-0">
              <div className="encounter-header">
                <span className="encounter-num">ENC 03</span>
                <span className="encounter-title">The Heart-Chamber</span>
                <span className="encounter-tag tag-combat">Combat / Horror &mdash; Hard</span>
              </div>
              <div className="encounter-body" style={{ color: 'var(--text-secondary)' }}>
                <h4>Setup</h4>
                <p>The leviathan's heart-chamber produces a resin vital for high-grade coral repair &mdash; a thick, amber fluid that accelerates bonding between grafted coral and living hulls. Spindle needs it for the Deeprunner's worst wound-sites. But the heart-chamber has been sealed for six months. Something nested inside.</p>
                <h4>The Chamber</h4>
                <p>A cathedral-sized space inside the leviathan's ribcage &mdash; the heart itself is a mass of coral-encrusted tissue the size of a house, still pulsing slowly. The resin pools in channels carved by the Cecaelia around the heart's base. The air is thick with heat and organic vapor. Bioluminescence is dark red here &mdash; the color of blood in water.</p>
                <h4>The Tenant</h4>
                <p>A <strong style={{ color: 'var(--accent-pearl)' }}>Voidsea Brood-Mother</strong> &mdash; a fey-touched shark-manta hybrid (use Aboleth stats with modifications: replace tentacles with constricting kelp-cords, add <em>Void Gaze</em> &mdash; DC 15 Wis save or be frightened for 1 minute, can repeat save at end of each turn). She did not choose this nest. She was driven here by the deep-water disturbance, same as the Shark Run pack. She is protecting a clutch of eggs &mdash; six embryonic shark-mantas, visible through translucent coral-sacs attached to the heart-tissue. She will not leave. She will not negotiate. She is terrified, which makes her more dangerous.</p>
                <h4>Tactical Environment</h4>
                <ul className="styled">
                  <li>The heart pulses once every four hours &mdash; on pulse, all creatures in the chamber must succeed on DC 12 Con saves or be knocked prone by the vibration. The Brood-Mother is immune. The eggs are immune.</li>
                  <li>The resin channels are slippery &mdash; DC 10 Dex or fall prone when moving at half speed or faster.</li>
                  <li>The Brood-Mother can use her kelp-cords to <strong>grapple and drag</strong> creatures into the resin pools &mdash; submerged creatures begin suffocating after 2 rounds unless they can breathe water.</li>
                  <li><strong style={{ color: 'var(--accent-pearl)' }}>Hermit's moment:</strong> A DC 16 Nature check reveals the Brood-Mother is not naturally hostile &mdash; she is a displaced mother defending young. If the party can demonstrate they are not a threat to the eggs (by backing away, using <em>Speak with Animals</em>, or offering food), she will allow them to collect resin from the far channels without combat. This is difficult but possible. If they kill her, the eggs die within hours without her warmth. The Kelpie will know. The Kelpie will remember.</li>
                </ul>
                <h4>Resin Collection</h4>
                <p>Enough resin for the Deeprunner's repairs plus one additional batch. The extra batch is worth 50 Crown equivalent in barter value. The Brood-Mother's corpse, if they kill her, contains a <strong>void-pearl</strong> &mdash; a black, iridescent sphere the size of a fist that radiates faint transmutation magic. No one at the Gnarl knows what it does. Spindle wants it. Waits-in-Deep-Water does not.</p>
                <CampaignImage src="/images/heart-chamber.jpg" alt="Heart Chamber" caption="The heart-chamber after the encounter"/>
              </div>
            </div>
            <div className="space-y-4">
              <CampaignImage src="/images/brood-mother.jpg" alt="Brood-Mother" caption="The Voidsea Brood-Mother"/>
            </div>
          </div>
        </div>

        {/* ENC 04 */}
        <div className="reveal mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Skull size={20} style={{ color: 'var(--accent-amber)' }}/>
            <h3 className="text-2xl text-white" style={{ fontFamily: "'Cinzel', serif" }}>Day 2&ndash;3 &mdash; The Crown Scout</h3>
          </div>
          <div className="encounter-card">
            <div className="encounter-header">
              <span className="encounter-num">ENC 04</span>
              <span className="encounter-title">The Crown Scout</span>
              <span className="encounter-tag tag-skill">Skill / Tension</span>
            </div>
            <div className="encounter-body" style={{ color: 'var(--text-secondary)' }}>
              <h4>Setup</h4>
              <p>The Shimmerkin warning was correct. A crown vessel &mdash; a fast scout-sloop, not the heavy patrol ship from the north &mdash; has been running search patterns across the reef shelf. It cannot dive. But it carries a <strong>Tessavar-type battle-mage</strong> with Aethmer Water Sense, capable of detecting submerged vessels within 120 feet. The Deeprunner is hidden inside the leviathan's ribcage, but the scout is circling closer.</p>
              <h4>The Situation</h4>
              <p>The scout drops depth-charges &mdash; alchemical explosive canisters &mdash; at irregular intervals. Each charge sends a shockwave through the water. The pilot fish panic. The leviathan's heart pulses irregularly. The Cecaelia craft-singers have to stop work or lose their concentration.</p>
              <h4>Party Options</h4>
              <ul className="styled">
                <li><strong style={{ color: 'var(--accent-pearl)' }}>Wait it out (Stealth):</strong> The party and crew maintain absolute silence for 2 hours. DC 16 group Stealth (average of all rolls, Navigator helps). Success: the scout moves on. Failure: a depth-charge lands close enough to crack a rib-bone &mdash; structural damage to the Gnarl, 1 day added to repairs, and the scout knows something is here.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>Sabotage (Infiltration):</strong> A small team (2&ndash;3 party members) exits through the moonpool, swims to the scout, and disables the depth-charge mechanism or the mage's focus-crystal. DC 15 Sleight of Hand or Athletics (underwater), with advantage if Krark brings artificer tools. Success: scout departs, confused. Failure: underwater combat against 4 sailors (CR 1/8) + the mage (CR 4, but underwater he is significantly less effective &mdash; his fire spells don't work, he relies on cold and force).</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>Decoy (Deception):</strong> The party launches a false signal &mdash; perhaps the void-pearl from the Heart-Chamber, or a bioluminescent lure &mdash; to draw the scout southeast, away from the Gnarl. DC 14 Deception or Nature to craft a convincing signal. Success: scout follows. Failure: scout splits &mdash; half investigates the decoy, half stays. Complication.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>All-Hands Battle Stations (Combat):</strong> Surface the Deeprunner and fight. The scout is faster but lightly armed (2 light ballistae, 8 sailors, 1 mage). The Deeprunner's main cannon is still damaged &mdash; it can fire once at disadvantage before the recoil cracks the temporary viewport repair. This is risky but dramatic. If they win, they gain a second vessel. If they lose, the Gnarl is compromised.</li>
              </ul>
              <h4>Aftermath</h4>
              <p>If the scout is driven off without discovering the Gnarl: repairs complete on schedule, and the party gains Ridge's full trust &mdash; including the Shimmerkin intelligence cache. If the scout discovers the Gnarl: the anchorage must be evacuated within 48 hours. The resistance scatters. Spindle's project is lost. The party has made a powerful enemy and lost a potential ally. This is a meaningful fork.</p>
              <CampaignImage src="/images/crown-scout.jpg" alt="Crown Scout" caption="The Crown Scout-sloop from below &mdash; depth-charges falling"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   REPAIRS
   ═══════════════════════════════════════════ */
function Repairs() {
  return (
    <section id="repairs" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>The Repair Sequence</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>What the Deeprunner Needs</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="reveal">
            <div className="stat-grid">
              <div className="stat-key">Hull Regeneration</div>
              <div className="stat-val" style={{ color: 'var(--text-secondary)' }}>The living black coral hull heals naturally, but the cannon-strike damaged the growth-nodes. Needs <strong style={{ color: 'var(--accent-pearl)' }}>coral-grafting</strong> &mdash; fresh living coral cuttings bonded to the wound-sites and sung into integration. <strong style={{ color: 'var(--accent-pearl)' }}>Time: 2 days.</strong> <strong style={{ color: 'var(--accent-pearl)' }}>Requires:</strong> Cecaelia craft-singer + raw coral from the Chaos Garden.</div>

              <div className="stat-key">Keel / Depth Anchor</div>
              <div className="stat-val" style={{ color: 'var(--text-secondary)' }}>The grinding is a misaligned pressure-bearing in the depth-anchor mechanism. Not fixable by song &mdash; needs physical replacement of a coral-gear grown to precise specifications. <strong style={{ color: 'var(--accent-pearl)' }}>Spindle has the specs.</strong> <strong style={{ color: 'var(--accent-pearl)' }}>Time: 1 day to grow, 4 hours to install.</strong></div>

              <div className="stat-key">Forward Viewport</div>
              <div className="stat-val" style={{ color: 'var(--text-secondary)' }}>The spiderwebbed sea-glass needs replacement. The Gnarl doesn't stock sea-glass &mdash; but the leviathan's skull contains crystalline formations that can be shaped into viewport panels. <strong style={{ color: 'var(--accent-pearl)' }}>Time: 6 hours to extract and shape.</strong> <strong style={{ color: 'var(--accent-pearl)' }}>Requires:</strong> Someone small enough (or a Sprite) to enter the skull-cavity safely.</div>

              <div className="stat-key">Pilot Fish Recovery</div>
              <div className="stat-val" style={{ color: 'var(--text-secondary)' }}>The Gnarl's reef water is clean, warm, and mineral-rich. Given 12 hours of rest in native water, the pilot fish will recover one stress tier automatically. Full recovery to Unstressed in <strong style={{ color: 'var(--accent-pearl)' }}>36 hours</strong> without intervention. Hermit can accelerate this with DC 14 Animal Handling &mdash; success drops an additional tier immediately.</div>

              <div className="stat-key">Tidewalker Suits</div>
              <div className="stat-val" style={{ color: 'var(--text-secondary)' }}>Not urgent for departure, but Mossek, Draven, and Winnow all need replacement sternum pearls. The Gnarl has <strong style={{ color: 'var(--accent-pearl)' }}>one</strong> suitable pearl in reserve. The other two require a dive to the southern reef-shelf &mdash; or a favor from the Kelpie.</div>
            </div>

            <div className="gm-note mt-6">
              <p><strong style={{ color: 'var(--accent-pearl)' }}>Pacing the Repairs:</strong> Don't let the party just wait. Each day of repair, roll or choose an event from the encounter list. The Gnarl is safe, but it is not <em>boring</em>. And the Waking &mdash; the leviathan's accelerating heartbeat &mdash; adds a ticking clock they don't know about yet.</p>
            </div>
          </div>

          <div className="reveal space-y-5">
            <CampaignImage src="/images/deeprunner-repair.jpg" alt="Deeprunner Repair" caption="The Deeprunner in the Bone Cathedral drydock"/>
            <CampaignImage src="/images/coral-drydock.jpg" alt="Coral Drydock" caption="Cecaelia architects performing coral-graft repairs"/>

            <div className="glass-card p-5">
              <h4 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>NPC Repair Interactions</h4>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/><span><strong style={{ color: 'var(--accent-pearl)' }}>Spindle</strong> oversees the coral-graft. She'll trade depth-anchor gear specs for a look at the Deeprunner's engineering.</span></li>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/><span><strong style={{ color: 'var(--accent-pearl)' }}>Waits-in-Deep-Water</strong> tends the pilot fish in the heart-chamber waters. They calm faster near the leviathan's pulse.</span></li>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/><span><strong style={{ color: 'var(--accent-pearl)' }}>Ridge</strong> can source any standard supplies but tests the party with the Shark Run delivery first.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pilot Fish Status */}
        <div className="reveal mt-12">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-2">
            <Fish size={20} style={{ color: 'var(--accent-biolume)' }}/> Pilot Fish Status
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card p-5" style={{ borderLeft: '3px solid var(--accent-kelp)' }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>Unstressed</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Navigation: <strong style={{ color: 'var(--accent-pearl)' }}>Advantage</strong><br/>Speed: <strong style={{ color: 'var(--accent-pearl)' }}>Normal</strong><br/>Trigger: Cared for within 12 hrs</p>
            </div>
            <div className="glass-card p-5" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>Stressed</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Navigation: <strong style={{ color: 'var(--accent-pearl)' }}>Disadvantage</strong><br/>Speed: <strong style={{ color: 'var(--accent-pearl)' }}>&minus;10 ft.</strong><br/>Trigger: 48+ hrs without care<br/><span style={{ color: 'var(--accent-amber)', fontSize: '0.75rem' }}>&#9664; CURRENT (post-battle)</span></p>
            </div>
            <div className="glass-card p-5" style={{ borderLeft: '3px solid var(--accent-coral)' }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>Critical</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Navigation: <strong style={{ color: 'var(--accent-pearl)' }}>Attunement lost</strong><br/>Fish: <strong style={{ color: 'var(--accent-pearl)' }}>1 HP, death saves</strong><br/>Trigger: 96+ hrs without care</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="reveal mt-12">
          <h3 className="text-xl text-white mb-6" style={{ fontFamily: "'Cinzel', serif" }}>Repair Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, var(--accent-biolume), var(--accent-gold), var(--accent-biolume))', opacity: 0.3 }}/>
            <div className="space-y-6 ml-10">
              {[
                { day: 'Arrival', desc: 'Damage assessment, meet Spindle, emergency coral-graft begins on hull cracks' },
                { day: 'Day 1', desc: 'Hull regeneration via coral-grafting. Shark Run encounter for supplies. Forward viewport replacement begins.' },
                { day: 'Day 2', desc: 'Chaos Garden dive for spiral-knot coral (keel repair). Heart-Chamber encounter for Tidewalker pearls.' },
                { day: 'Day 3', desc: 'Depth-anchor gear replacement. Crown Scout encounter. Final repairs and departure prep.' },
              ].map((t, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full" style={{ background: 'var(--accent-biolume)', boxShadow: '0 0 10px rgba(0,229,255,0.5)' }}/>
                  <h4 className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-biolume)' }}>{t.day}</h4>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */
function Hooks() {
  return (
    <section id="hooks" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Threads & Hooks</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>What to Pull Before Leaving</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>
        <div className="reveal">
          <div className="hooks-box">
            <div className="hooks-title flex items-center gap-2">
              <Compass size={16}/> Threads to Pull Before Leaving
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>The Waking:</strong> The leviathan's heart is beating faster. Waits-in-Deep-Water knows what it means. If the party asks directly, she tells them: <em>&ldquo;The Hunger That Swims in Both Directions&rdquo;</em> is moving north. It will reach BlackCoral Reach's southern shelf in approximately three weeks. It is not interested in cities. It is interested in <em>ships that can dive</em>. The Deeprunner's unique capabilities make it a target &mdash; or a lure.
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>Spindle's Project:</strong> If the party shared the depth-anchor specs, Spindle completes her biological navigational instrument. She gives them a prototype &mdash; a palm-sized coral node that, when bonded to the Deeprunner's hull, grants <strong>advantage on all navigation checks in Feywild waters</strong> and can detect the Hunger's proximity by vibration (range: 2 miles). It is alive. It needs reef water contact every 3 days or it goes dormant.
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>The Compass:</strong> The leviathan-bone compass from the Chaos Garden continues to point south. If the party keeps it, it becomes a recurring element &mdash; pulling toward whatever is down there. It reacts visibly when the Deeprunner passes over deep-water anomalies. It spins faster as they approach the ice coast.
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>Ridge's Intelligence:</strong> If the party earned his trust, he provides three Shimmerkin reports: (1) Crown naval movements &mdash; two additional patrol vessels have been assigned to the southern shelf. (2) House Vael has been asking questions about &ldquo;unusual deep-water vessels&rdquo; at the Coral Courts. (3) A foreign agent &mdash; possibly Unseelie &mdash; was seen at the Pearl Exchange three days ago, asking about the Deeprunner's specifications. Someone else wants this ship.
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>The Tidewalker Pearls:</strong> The Gnarl had one replacement sternum pearl. Two more are needed. Waits-in-Deep-Water knows where to find them &mdash; a Kelpie grave-garden two days south, where pearls form in the eye-sockets of ancient Kelpie dead. She will mark the location on the Deeprunner's charts if the party promises to approach with respect. <em>&ldquo;They are not buried. They are listening.&rdquo;</em>
            </div>
            <div className="hook-item" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-pearl)' }}>Click's Warning:</strong> The Shimmerkin network has detected a new signal &mdash; amber flashes in a pattern that doesn't match any known Sprite dialect. It is coming from the deep water south of the Gnarl. It is repeating one word, over and over. The closest translation: <em>&ldquo;Open.&rdquo;</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   KRARK'S OBSESSION
   ═══════════════════════════════════════════ */
function Krark() {
  return (
    <section id="krark" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Krark's Obsession</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>An Artificer at the Gnarl</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-10">
          <div className="space-y-5" style={{ color: 'var(--text-secondary)' }}>
            <p>The Gnarl represents something Krark has never encountered: a living technology that grows. Where he builds machines from metal and magic, the Cecaelia <em>sing things into existence</em>. The question is obvious and unavoidable: <strong style={{ color: 'var(--accent-pearl)' }}>can this be learned?</strong></p>

            <CampaignImage src="/images/krark-spindle.jpg" alt="Krark and Spindle" caption="Spindle explaining accelerated coral-growth to Krark"/>
          </div>
          <div className="space-y-5" style={{ color: 'var(--text-secondary)' }}>
            <p>The short answer is yes. The long answer is that Krark is asking a craft-singer to explain a generational art form to someone who measures time in working days, not working decades. The conversation that follows is one of the most important NPC interactions at the Gnarl — not because it yields a magical item, but because it establishes a relationship that can span the entire campaign.</p>

            <div className="read-aloud">
              <p>Spindle listens to Krark's question with all eight arms stilled for the first time since you arrived. Her skin flushes from excited gold to something more careful — copper, then a considering rust-brown.</p>
              <p><em>&ldquo;You're asking how long it would take you to do this,&rdquo;</em> she says. <em>&ldquo;I started this project when I was twelve. I am thirty-four. The hull you saw in the drydock? My great-aunt laid its first cutting. She died before the keel set. I will not live to see my current project finish — my apprentice will. And I am considered fast here.&rdquo;</em></p>
              <p>She pauses. One arm absently coils around a coral-grafting knife. <em>&ldquo;Do you understand what you are asking?&rdquo;</em></p>
            </div>
          </div>
        </div>

        <div className="reveal mt-14">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3" style={{ fontFamily: "'Cinzel', serif" }}>
            <FlaskConical size={20} style={{ color: 'var(--accent-biolume)' }}/> The Two Schools
          </h3>

          <CampaignImage src="/images/two-schools.jpg" alt="Two Schools of Coral Growth" caption="BlackCoral Reach traditional method (left) versus the Gnarl's pulse-accelerated method (right)"/>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="glass-card p-6" style={{ borderLeft: '3px solid var(--accent-kelp)' }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-kelp)' }}>BlackCoral Reach &mdash; The Traditional Method</h4>
              <p className="text-sm leading-relaxed">The old way. A hull like the Deeprunner took roughly <strong style={{ color: 'var(--accent-pearl)' }}>sixty years</strong> to grow from seed to seaworthy — three Cecaelia generations of patient song, a lineage of craft-singers passing the resonance down. Thessavane's great-grandmother started the Deeprunner. Thessavane finished it. The coral is grown slowly and correctly, every growth-node aligned with the last, the living hull genuinely bonded to its bonded-creatures from infancy. The result is a ship that will outlive everyone who built it. This is the Deep Forge method, and the Cecaelia are quietly proud of it the way a master violin-maker is proud of a fifty-year varnish schedule.</p>
            </div>
            <div className="glass-card p-6" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-amber)' }}>The Gnarl &mdash; The Accelerated Method</h4>
              <p className="text-sm leading-relaxed">Eighty years ago the resistance planted the first coral seed here. They didn't have sixty years to wait — they had an occupied city to run from and no infrastructure. So they <em>cheated</em>. The cheat is the leviathan. The Gnarl grows fast because it's <strong style={{ color: 'var(--accent-pearl)' }}>parasitizing a dead god's nervous system</strong>. The Void-Leviathan's heart still pulses once every four hours, and that pulse carries through the bones into the coral matrix. Cecaelia craft-singers here don't just sing; they sing <em>in time with the pulse</em>, and the coral responds to the combined resonance in a way it cannot respond to song alone. Growth that takes sixty years in BlackCoral Reach takes <strong style={{ color: 'var(--accent-pearl)' }}>fifteen to twenty at the Gnarl</strong>.</p>
            </div>
          </div>

          <div className="gm-note mt-6">
            <p><strong style={{ color: 'var(--accent-pearl)' }}>The Pulse Mechanics:</strong> The Void-Leviathan's heart-beat is the key variable. It's not just a nutrient source — it's a <em>resonance driver</em>. The Cecaelia craft-song provides the pattern (what to grow), the reef-water provides the material (what to grow from), and the leviathan pulse provides the <em>energy</em> (how fast to grow it). Remove any of the three and the method collapses. This is why BlackCoral Reach's traditional method is so slow — they have the song and the water, but no pulse. The Gnarl has all three. Krark, wherever he goes, will have none of them.</p>
          </div>
        </div>

        <div className="reveal mt-14">
          <h3 className="text-2xl text-white mb-6" style={{ fontFamily: "'Cinzel', serif" }}>What Krark Can Learn</h3>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="space-y-5" style={{ color: 'var(--text-secondary)' }}>
              <h4 className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-gold)' }}>In 1&ndash;4 Sessions at the Gnarl</h4>
              <ul className="styled">
                <li><strong style={{ color: 'var(--accent-pearl)' }}>Observational Understanding:</strong> He watches Spindle work. He sees the pulse-sync, hears the song shift, sees the coral respond in real time. A <strong>DC 15 Investigation or Arcana</strong> check lets him identify the three variables in the system: the leviathan pulse, the craft-song resonance, and the mineral composition of the reef-water.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>A Working Theoretical Model:</strong> If he spends downtime with Spindle (she will trade this for Deeprunner depth-anchor specs — she's been dying to talk shop with someone who understands machines), he leaves with a <strong>written theory of how accelerated coral-growth works</strong>. It's correct. It's also completely unusable without the missing components.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>A Seed Sample:</strong> Ridge can be talked into parting with a single viable coral cutting from the Chaos Garden's edge — not the aggressive Gnarl coral proper, but a domesticated variant. <strong>It will grow in captivity. Slowly.</strong></li>
              </ul>

              <h4 className="text-sm tracking-widest uppercase pt-4" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-coral)' }}>What He Cannot Get</h4>
              <ul className="styled">
                <li><strong style={{ color: 'var(--accent-pearl)' }}>A Leviathan:</strong> The method requires the bones and pulse of a dead Void-Leviathan. There is one at the Gnarl and it isn't fully dead. BlackCoral Reach doesn't have one. Most were hunted to extinction before the Courts divided the sea. Finding another skeleton is an <em>entire campaign arc</em>, not a side quest.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>A Cecaelia Craft-Singer:</strong> The song isn't notation — it's a resonance trained into Cecaelia throat pouches from childhood. A non-Cecaelia can approximate it (Hermit can hum the right frequency via Speak with Animals and the pilot fish), but approximating gets you coral that grows slightly faster than traditional, not Gnarl-fast.</li>
                <li><strong style={{ color: 'var(--accent-pearl)' }}>Time Compression:</strong> Even at Gnarl speed, a ship takes fifteen years. A small boat takes three. A single functional hull-section for repair takes <em>months</em>. There's no making this instant.</li>
              </ul>
            </div>
            <div>
              <CampaignImage src="/images/coral-seed.jpg" alt="Coral Seed" caption="The seed cutting — two inches tall, and years from being anything"/>
            </div>
          </div>
        </div>

        <div className="reveal mt-14">
          <h3 className="text-2xl text-white mb-6" style={{ fontFamily: "'Cinzel', serif" }}>The Long-Term Arc</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, var(--accent-kelp), var(--accent-amber), var(--accent-coral))', opacity: 0.3 }}/>
            <div className="space-y-8 ml-10">
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full" style={{ background: 'var(--accent-kelp)', boxShadow: '0 0 10px rgba(76,175,125,0.5)' }}/>
                <h4 className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-kelp)' }}>Now &mdash; Session Timeframe</h4>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Krark leaves the Gnarl with the theoretical framework, the seed cutting, and a standing invitation from Spindle to correspond via Shimmerkin. He is <em>fascinated</em>. The seed goes in a jar. He begins taking notes.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full" style={{ background: 'var(--accent-amber)', boxShadow: '0 0 10px rgba(232,168,56,0.5)' }}/>
                <h4 className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-amber)' }}>Mid-Campaign &mdash; Several Sessions Out</h4>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>The seed has grown two inches. He has sent Spindle three letters. He has identified that the method is fundamentally scalable only if he can <strong>substitute for the leviathan pulse</strong> with something else — a magical item, a constructed resonator, a Dragonmark focus. This becomes a <em>background obsession</em>. Krark asks every NPC with arcane knowledge about large-scale resonant magic.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full" style={{ background: 'var(--accent-coral)', boxShadow: '0 0 10px rgba(255,107,107,0.5)' }}/>
                <h4 className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-coral)' }}>Late Campaign &mdash; Endgame Territory</h4>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>He might — <em>might</em> — have a working small-scale accelerator. Maybe a 10-foot-diameter coral structure grown in a year instead of twenty. This is a <strong>significant magical achievement</strong> and should feel like one. A whole hull is still generations away unless the campaign finds a replacement for the leviathan — which could become a plot thread (rumors of another skeleton, a deep-Shadowfell mirror, etc.).</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full" style={{ background: 'var(--accent-violet)', boxShadow: '0 0 10px rgba(156,107,255,0.5)' }}/>
                <h4 className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-violet)' }}>What It Never Becomes</h4>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}><strong>A factory.</strong> The Feywild does not industrialize. The Cecaelia would find it horrifying. If Krark ever got to the point of mass-producing ships, the Courts themselves would notice, and that's a different kind of story.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-10">
          <div className="secret-box">
            <p><strong style={{ color: 'var(--accent-coral)' }}>The Comedy Undertone:</strong> Spindle thinks of her method as the <em>impatient, reckless, modern way</em>. From her perspective, she's the rushed young engineer cutting corners. From Krark's perspective, she's working on <em>geological timescales</em>. Both of them are right, and neither will convince the other. This is a great ongoing NPC relationship — Spindle can become Krark's long-distance correspondent, sending him Shimmerkin-flash updates on her project, asking technical questions about artifice he can't answer without explaining metallurgy, him asking questions about resonance she can't answer without explaining throat-pouch harmonics. They are both obsessed craftspeople who will never fully understand each other's medium, and that mutual incomprehension is the foundation of real friendship.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DM RESOURCES
   ═══════════════════════════════════════════ */
function DMResources() {
  const battlemaps = [
    { file: '/images/battlemap-shark-run.jpg', title: 'The Shark Run Canyon', enc: 'ENC 01', dims: '~60ft x 40ft', desc: 'Narrow winding coral canyon with three tactical zones: wide entry bay with scattered cover, middle pinch (12ft wide), and cave mouth with fresh claw-marks. Cold blue-white bioluminescence. Picked-clean fish bones near the cave.' },
    { file: '/images/battlemap-chaos-garden.jpg', title: 'The Chaos Garden', enc: 'ENC 02', dims: '~70ft x 70ft', desc: 'Non-Euclidean coral maze with shifting walls, fractal spiral formations in violet/rose/gold. Central clearing with spiral-knot coral on plinth. Toxic spore-pocket dead-end. Sealed bubble-chamber with the bone compass hidden inside.' },
    { file: '/images/battlemap-heart-chamber.jpg', title: 'The Heart-Chamber', enc: 'ENC 03', dims: '~80ft x 60ft', desc: 'Cathedral-sized chamber inside leviathan ribcage. House-sized beating heart at center with six egg-sacs. Amber resin channels (difficult terrain, submersion hazard). Raised walkways along outer edges. Single entry at bottom-left.' },
    { file: '/images/battlemap-drydock.jpg', title: 'The Bone Cathedral Drydock', enc: 'Overview', dims: '~120ft x 80ft', desc: 'Central drydock with Deeprunner in coral cradle. Moonpool entry at near end. Scaffolding platforms at multiple levels. Three side passages: forge (orange glow), storage (dim), heart-chamber (red glow). Work platforms with hull patches drying.' },
    { file: '/images/battlemap-overview.jpg', title: 'The Gnarl Anchorage', enc: 'Full Location', dims: '~300ft x 200ft', desc: 'Complete reef overview. Leviathan skeleton central — ribcage drydock, skull with forge-eyes. Chaos Garden (violet spirals), Tending Gardens (green/gold), Shark Run canyon, forge clusters. Approach lane from south-west. All underwater.' },
  ];
  return (
    <section id="dmresources" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>DM Resources</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>Battle Maps & Quick Reference</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>

        <div className="reveal mb-6">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3" style={{ fontFamily: "'Cinzel', serif" }}>
            <Sword size={20} style={{ color: 'var(--accent-coral)' }}/> Battle Maps
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Gridless VTT-ready maps. Click to enlarge. Dimensions are approximate playable areas.</p>
        </div>

        <div className="space-y-10">
          {battlemaps.map((map, i) => (
            <div key={map.file} className="reveal encounter-card m-0" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="encounter-header">
                <span className="encounter-num">{map.enc}</span>
                <span className="encounter-title">{map.title}</span>
                <span className="encounter-tag tag-combat">{map.dims}</span>
              </div>
              <div className="encounter-body">
                <CampaignImage src={map.file} alt={map.title} caption={map.desc} className="w-full"/>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="reveal mt-14">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3" style={{ fontFamily: "'Cinzel', serif" }}>
            <ScrollText size={20} style={{ color: 'var(--accent-gold)' }}/> Quick Reference
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>Key DCs at a Glance</h4>
              <div className="stat-grid" style={{ margin:0 }}>
                <div className="stat-key">Survival (Navigation)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 13 (disadvantage from stressed fish)</div>
                <div className="stat-key">Survival / Invest. (Garden Maze)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 14</div>
                <div className="stat-key">Wis Save (Hallucinations)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 13 (advantage with Hermit)</div>
                <div className="stat-key">Performance (Coral Cutting)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 15</div>
                <div className="stat-key">Nature (Brood-Mother)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 16 (social solution)</div>
                <div className="stat-key">Stealth (Crown Scout)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 16 (group, 2 hrs)</div>
                <div className="stat-key">Sleight of Hand (Sabotage)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 15 (advantage with Krark)</div>
                <div className="stat-key">Arcana / Invest. (Krark)</div><div className="stat-val" style={{ color: 'var(--text-secondary)' }}>DC 15 (pulse-sync theory)</div>
              </div>
            </div>
            <div className="glass-card p-5">
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>Encounter Scaling</h4>
              <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-start gap-3">
                  <span className="pill-coral shrink-0">Hard</span>
                  <span><strong style={{ color: 'var(--accent-pearl)' }}>Heart-Chamber:</strong> Modified Aboleth + environmental hazards. Can be solved socially.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="pill-amber shrink-0">Moderate</span>
                  <span><strong style={{ color: 'var(--accent-pearl)' }}>Shark Run:</strong> 4-6 Sahuagin + Baron (CR 5). Fey Step flanking.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="tag tag-magic shrink-0">Variable</span>
                  <span><strong style={{ color: 'var(--accent-pearl)' }}>Crown Scout:</strong> Stealth, sabotage, decoy, or surface combat. Meaningful fork.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="tag tag-explore shrink-0">Skill</span>
                  <span><strong style={{ color: 'var(--accent-pearl)' }}>Chaos Garden:</strong> 3-part skill challenge. Disorientation + exhaustion risk.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DEPARTURE
   ═══════════════════════════════════════════ */
function Departure() {
  return (
    <section id="departure" className="relative py-24 px-6" style={{ zIndex:10 }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl text-white mb-2 glow-text" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Getting Back on Course</h2>
          <p className="text-lg italic mb-6" style={{ color: 'var(--text-secondary)' }}>Routes to the Ice Coast</p>
          <div className="w-16 h-[2px] mb-10" style={{ background: 'var(--accent-biolume)' }}/>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-10">
          <div className="reveal space-y-6" style={{ color: 'var(--text-secondary)' }}>
            <p>After 2&ndash;3 days at the Gnarl, the Deeprunner is seaworthy again. The hull is patched, the keel is true, the viewport is replaced with leviathan-crystal (slightly warmer tint, same clarity), and the pilot fish have recovered to Stressed or better. The crew's Tidewalker suits remain partially broken, but functional enough for short surface operations.</p>
            <p>The party now has a choice of routes to the southeastern ice coast:</p>
            <ul className="styled">
              <li><strong style={{ color: 'var(--accent-pearl)' }}>The Direct Route:</strong> Due south, open water. Fastest (4&ndash;5 days). Exposes them to the Hunger's path if it's moving north. No landmarks. No shelter.</li>
              <li><strong style={{ color: 'var(--accent-pearl)' }}>The Reef-Hop Route:</strong> A series of small atolls and dead coral formations that provide cover and resupply. Slower (7&ndash;8 days). Safer from crown patrols. But some of the atolls are showing signs of corruption &mdash; the same shadow-coral the party saw in the wreck. Something is moving through the reef chain.</li>
              <li><strong style={{ color: 'var(--accent-pearl)' }}>The Deep Route:</strong> Submerged entirely, running at 200 feet below the surface where no crown vessel can follow. The Deeprunner's specialty. But the Hunger swims deep. And the compass spins faster the deeper they go.</li>
            </ul>
            <p>Whichever route they choose, the Gnarl remains a potential safe harbor on the return trip &mdash; if it survives. If the crown scout discovered it, the anchorage is already gone. If not, Spindle's project continues, the leviathan's heart still beats, and the resistance has a southern stronghold the surface knows nothing about.</p>

            <div className="gm-note">
              <p><strong style={{ color: 'var(--accent-pearl)' }}>Session Pacing:</strong> The Gnarl is designed as a 1&ndash;2 session repair stop that can expand to 3&ndash;4 if the party engages with the NPCs, explores the Chaos Garden thoroughly, or attempts to befriend the Brood-Mother. The encounters scale: Shark Run (combat), Chaos Garden (exploration/puzzle), Heart-Chamber (combat/horror/morality), Crown Scout (tension/stealth). Mix and match based on table energy. The core deliverable is a repaired ship, new allies (or complications), and the growing sense that something vast is moving in the deep water behind them.</p>
              <p className="mt-3"><strong style={{ color: 'var(--accent-pearl)' }}>Connecting to Main Arc:</strong> The Hunger That Swims in Both Directions is Lumira's corruption reaching up from the deep &mdash; a manifestation of the same shadow-coral that consumed the wreck. It is not yet fully awake. The Gnarl gives the party their first concrete timeline: <em>three weeks</em> before it reaches populated waters. This creates urgency without demanding immediate action. They can still reach the ice coast. But they now know what happens if they take too long getting back.</p>
            </div>
          </div>

          <div className="reveal space-y-5">
            <CampaignImage src="/images/route-map.jpg" alt="Route Map" caption="South route options from The Gnarl"/>

            <div className="glass-card p-5">
              <h4 className="text-sm tracking-widest uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-gold)' }}>GM Notes</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/>Any route choice can lead to the pirate cove encounter (east X on your map).</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/>The Hunger's corruption is the through-line &mdash; whatever route they choose, it escalates.</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} style={{ color: 'var(--accent-biolume)' }} className="mt-1 shrink-0"/>Spindle's nav-node gives advantage on all Feywild navigation checks and detects the Hunger within 2 miles.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What They Leave With */}
        <div className="reveal mt-12">
          <h3 className="text-2xl text-white mb-6" style={{ fontFamily: "'Cinzel', serif" }}>What They Leave With</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Wrench size={20}/>, title: 'Repaired Ship', desc: 'Hull, viewport, keel, depth-anchor all restored. Pilot fish recovered.' },
              { icon: <Navigation size={20}/>, title: 'Bio Nav-Node', desc: "Spindle's gift: advantage on Feywild navigation, detects the Hunger within 2 miles." },
              { icon: <Shell size={20}/>, title: 'Bone Compass', desc: 'Points south. Spins faster near deep anomalies. May have other properties.' },
              { icon: <AlertTriangle size={20}/>, title: 'A Timeline', desc: 'Three weeks before the Hunger reaches populated waters. Evidence to share.' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="mb-3 flex justify-center" style={{ color: 'var(--accent-biolume)' }}>{item.icon}</div>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent-pearl)' }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
function NavBar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      background: scrolled ? 'rgba(2,12,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(130%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,229,255,0.12)' : '1px solid transparent',
    }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-wider" style={{ fontFamily: "'Cinzel Decorative', serif" }}>The Gnarl</span>
        <div className="hidden md:flex items-center gap-6">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`nav-link flex items-center gap-1.5 ${active === s.id ? 'nav-active' : ''}`}>
              {s.icon} <span className="text-[0.65rem]">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="md:hidden text-sm" style={{ fontFamily: "'Cinzel', serif", color: 'var(--accent-biolume)' }}>
          {SECTIONS.find(s => s.id === active)?.label}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-16 px-6" style={{ zIndex:10, borderTop: '1px solid rgba(0,229,255,0.08)' }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm" style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-muted)' }}>The Gnarl &mdash; Young Reef Anchorage</p>
        <p className="text-xs mt-2" style={{ color: 'rgba(74,122,138,0.6)' }}>Built for the Voidsea Campaign &middot; Feywild Ocean Setting</p>
        <div className="w-24 h-[1px] mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }}/>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
function App() {
  useReveal();
  const active = useActiveSection();

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-deep)' }}>
      <BubbleBackground/>
      <NavBar active={active}/>

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero/>
        <div className="section-divider"/>
        <Overview/>
        <div className="section-divider"/>
        <Arrival/>
        <div className="section-divider"/>
        <Location/>
        <div className="section-divider"/>
        <NPCs/>
        <div className="section-divider"/>
        <Encounters/>
        <div className="section-divider"/>
        <Repairs/>
        <div className="section-divider"/>
        <Hooks/>
        <div className="section-divider"/>
        <Krark/>
        <div className="section-divider"/>
        <DMResources/>
        <div className="section-divider"/>
        <Departure/>
      </main>

      <Footer/>
    </div>
  );
}

export default App;
