import { useState, useEffect, useRef } from "react";

/* ————— Design tokens ————— */
const C = {
  bg: "#1C1420",
  surface: "#2A1E30",
  surfaceHi: "#372842",
  gold: "#D9A45B",
  goldSoft: "#E8C08A",
  rose: "#C98A93",
  text: "#EDE4DA",
  muted: "#A08FA6",
  line: "#3E2F4A",
};

/* ————— Content ————— */
const MODULES = [
  {
    id: "foundations",
    number: "I",
    title: "Foundations",
    subtitle: "What tantra actually is",
    lessons: [
      {
        id: "f1",
        title: "The real meaning of tantra",
        body: [
          "Forget the pop-culture image of tantra as a stamina contest. At its heart, tantra is the practice of total presence — treating intimacy as something sacred, unhurried, and shared, rather than a race toward a finish line.",
          "The single biggest shift: stop performing and start noticing. Most partners can feel the difference instantly between someone who is 'doing techniques' and someone who is genuinely, fully there with them.",
          "Everything in this app builds on that one idea. Breath, eye contact, slow touch — they're all tools for staying present instead of getting lost in your own head.",
        ],
        practice: "Tonight, in any moment of affection — even a hug — pause and notice five things: her breath, her warmth, her scent, the texture of her skin, the sound of the room. That's the whole skill in miniature.",
      },
      {
        id: "f2",
        title: "Dropping the goal",
        body: [
          "Goal-oriented intimacy (getting somewhere, achieving something) creates pressure for both of you. Pressure kills arousal and presence.",
          "Tantric practice reframes intimacy as exploration with no required destination. Paradoxically, when the goal disappears, pleasure and connection usually increase dramatically — for her especially.",
          "This is why tantric sessions often begin with agreements like 'nothing has to happen tonight.' It removes performance anxiety from the room before you even touch.",
        ],
        practice: "Plan one intimate evening this week where intercourse is explicitly off the table. Touch, kiss, explore — but honor the boundary. Notice what changes in how you both relax.",
      },
      {
        id: "f3",
        title: "Her pleasure starts before the bedroom",
        body: [
          "For most women, arousal is deeply contextual. Feeling desired, safe, unhurried, and emotionally connected during the day directly shapes what's possible at night.",
          "Tantric practitioners call this 'tending the fire' — small, consistent acts of presence and affection with no agenda attached. A lingering kiss goodbye. A hand on the lower back. Real eye contact during conversation.",
          "The key phrase is no agenda. Affection that always leads somewhere teaches her body to brace instead of open.",
        ],
        practice: "For seven days, give her one moment of full-presence affection daily — and deliberately let it lead nowhere. Consistency matters more than intensity.",
      },
    ],
  },
  {
    id: "breath",
    number: "II",
    title: "Breath",
    subtitle: "The engine of everything",
    lessons: [
      {
        id: "b1",
        title: "Belly breathing",
        body: [
          "Shallow chest breathing signals stress to your nervous system and speeds everything up — including arousal you may want to pace. Deep belly (diaphragmatic) breathing does the opposite: it calms, grounds, and gives you control.",
          "Place a hand below your navel. Inhale slowly through your nose so your belly — not your chest — rises. Exhale even more slowly through your mouth. Aim for exhales longer than inhales.",
          "This is the foundational skill of tantric stamina. When arousal spikes, a few slow belly breaths bring you back from the edge.",
        ],
        practice: "Use the Practice tab's breath pacer for 5 minutes daily. Do it clothed, calm, alone — you're building a reflex you'll use later under much more interesting conditions.",
      },
      {
        id: "b2",
        title: "Breathing during intimacy",
        body: [
          "Most men unconsciously hold their breath or breathe fast and shallow as excitement builds. This accelerates the arousal curve and pulls you into your head.",
          "The tantric move: keep breathing slow and deep the whole time. When you notice tension in your jaw, shoulders, or breath — soften and exhale long. Slow breath keeps you in your body and extends the experience.",
          "Bonus: audible, relaxed breathing is contagious. When you breathe slow, she often does too, deepening her own experience.",
        ],
        practice: "During your next intimate moment, set one simple intention: never hold your breath. Every time you catch yourself, exhale slowly. That's the entire exercise.",
      },
      {
        id: "b3",
        title: "Synchronized breathing",
        body: [
          "Breathing together is one of the fastest ways two nervous systems attune to each other. It sounds simple; it feels surprisingly profound.",
          "Sit or lie facing each other, close enough to feel each other's breath. Match her rhythm first — inhale when she inhales, exhale when she exhales. After a few minutes, slow the pace gently and let her follow you.",
          "A deeper variation: circular breath. You inhale while she exhales, as if passing breath back and forth between you.",
        ],
        practice: "Try 5 minutes of synchronized breathing before your next intimate evening. Sit facing each other, hands resting on each other's heart. No talking. Let it be a little awkward at first — it passes.",
      },
    ],
  },
  {
    id: "presence",
    number: "III",
    title: "Presence & Connection",
    subtitle: "Being fully there",
    lessons: [
      {
        id: "p1",
        title: "Eye gazing",
        body: [
          "Sustained eye contact is intense — that's the point. It bypasses small talk and creates raw, immediate intimacy. In tantric traditions it's considered one of the most powerful practices there is.",
          "Sit facing each other in soft light. Gaze into her left eye (traditionally the 'receiving' eye) with a soft focus — not staring, just resting your attention. Blink normally. If you laugh, laugh, then return.",
          "Start with 2–3 minutes. Many couples report feeling more seen in five minutes of eye gazing than in months of routine.",
        ],
        practice: "This week, do one 3-minute eye gazing session by candlelight. Set a gentle timer so neither of you has to watch the clock.",
      },
      {
        id: "p2",
        title: "Sensate focus",
        body: [
          "Borrowed by modern sex therapy from practices much like tantra: one partner gives touch, the other only receives, with zero obligation to reciprocate in the moment.",
          "When it's your turn to give, your only job is curiosity — explore her whole body slowly, watching and listening for what makes her breath change. When receiving, your only job is to feel, not to perform enjoyment.",
          "This trains two rare skills at once: giving attention without agenda, and receiving without guilt.",
        ],
        practice: "Take turns: 15 minutes each of slow, non-genital full-body touch. The receiver says only three things as needed: 'softer,' 'slower,' or 'stay there.'",
      },
      {
        id: "p3",
        title: "Where your mind goes",
        body: [
          "The most common intimacy killer isn't technique — it's leaving. Worrying about performance, replaying your day, monitoring yourself from the outside. Her body notices when you're gone.",
          "The tantric anchor: whenever you catch your mind wandering, return to one point of physical contact and feel it completely. Warmth, pressure, texture. Sensation is always in the present tense.",
          "This is meditation, just with much better scenery. And like meditation, catching yourself and returning is the practice — not a failure of it.",
        ],
        practice: "During any intimate contact this week, count how many times you catch your mind wandering and successfully return to sensation. Each return is a rep. Ten returns is a great session.",
      },
    ],
  },
  {
    id: "touch",
    number: "IV",
    title: "The Art of Touch",
    subtitle: "Slow is the technique",
    lessons: [
      {
        id: "t1",
        title: "Half the speed, twice the presence",
        body: [
          "If you take one technique from this entire app: whatever speed you naturally touch at, halve it. Then consider halving it again.",
          "Slow touch does three things: it reads as confidence and savoring rather than urgency, it gives her nervous system time to register and build sensation, and it forces you to actually feel what you're touching.",
          "Fast touch skims the surface. Slow touch lands.",
        ],
        practice: "Spend ten minutes touching only her arms, hands, neck and face — at half your natural speed. Watch her breathing. When it deepens or catches, you've found something. Stay there.",
      },
      {
        id: "t2",
        title: "The whole body is the map",
        body: [
          "Routine intimacy tends to visit the same three or four places. Tantric touch treats the entire body as erogenous — the scalp, the inner arms, the lower back, the backs of the knees, the sacrum.",
          "Approach the obvious places last, and slowly. Anticipation is not a delay to pleasure; it is pleasure. Circling near a sensitive area without touching it can be more arousing than touching it directly.",
          "Vary everything: fingertips, flat palm, nails lightly, breath on skin, the weight of your hand at rest.",
        ],
        practice: "One evening this week: touch everywhere except the most obvious places for a full twenty minutes. Let her be the one to finally guide your hand.",
      },
      {
        id: "t3",
        title: "Reading and asking",
        body: [
          "Great lovers aren't mind readers — they're excellent observers who also ask. Watch for the honest signals: breath rate, hip movement, sounds, hands gripping, skin flushing.",
          "And ask, in ways that keep the mood: 'like this?' … 'softer or deeper?' … 'show me.' The last one is gold — invite her to place her hand over yours and set the pressure and rhythm herself.",
          "Feedback isn't criticism; it's a shortcut. Every answer she gives you is a page of the manual only she has.",
        ],
        practice: "Next intimate session, ask 'show me' at least once — hand over hand. Memorize the exact pressure and pace she demonstrates.",
      },
    ],
  },
  {
    id: "stamina",
    number: "V",
    title: "Energy & Stamina",
    subtitle: "Lasting with presence",
    lessons: [
      {
        id: "s1",
        title: "Know your arousal scale",
        body: [
          "Picture arousal as a scale from 1 (calm) to 10 (point of no return). Most men only notice they're at 9 when it's too late. The skill is learning to feel the difference between 6, 7, and 8.",
          "Tantric stamina isn't suppression — it's awareness. When you can feel yourself at 7, you have options: slow down, change rhythm, breathe deep, shift attention to giving.",
          "Ride the wave between 6 and 8. That zone is where extended, full-body pleasure lives — for both of you.",
        ],
        practice: "In solo practice, pause every couple of minutes and name your number out loud. You're building a sensitivity gauge you can't buy anywhere.",
      },
      {
        id: "s2",
        title: "The edge and the return",
        body: [
          "Edging: approach an 8, then deliberately back off to a 5 or 6 using slow breath, stillness, and relaxed muscles. Repeat. Over weeks, this dramatically extends your range.",
          "The counterintuitive key is relaxation. Most men tense their whole body as arousal climbs, which accelerates it. Practice keeping your belly, thighs and glutes soft while aroused — it changes everything.",
          "During partnered intimacy, the graceful version of backing off is shifting to giving: slow down, kiss her deeply, use your hands. She experiences it as generosity, not interruption.",
        ],
        practice: "Solo, three times a week: approach an 8, back off with slow exhales and full-body relaxation, and repeat three to four cycles before finishing. Track it in the Progress tab.",
      },
      {
        id: "s3",
        title: "Pelvic floor training",
        body: [
          "Your pelvic floor muscles (the ones that stop urine mid-flow) are directly involved in ejaculatory control. Like any muscle, they can be trained — both to contract and, just as importantly, to consciously relax.",
          "Basic training: contract for 3 seconds, release completely for 3 seconds, ten reps, twice a day. Nobody can tell you're doing it — traffic lights and boring meetings work fine.",
          "The advanced skill is the release: at high arousal, a chronically tense pelvic floor pushes you over the edge. Learning to deliberately soften it at a 7 or 8 is a genuine superpower.",
        ],
        practice: "Two sets of ten slow contractions daily. After each contraction, spend equal time consciously relaxing the muscle fully — the relaxation is half the exercise.",
      },
    ],
  },
  {
    id: "communication",
    number: "VI",
    title: "Communication & Ritual",
    subtitle: "Where trust is built",
    lessons: [
      {
        id: "c1",
        title: "Creating the container",
        body: [
          "Tantric traditions treat the space as part of the practice: candlelight, warmth, phones in another room, unhurried time. This isn't decoration — it tells both nervous systems 'we are safe, and we have time.'",
          "A simple opening ritual works wonders: a shared bath, slow music, a few minutes of synchronized breathing, or simply sitting together and saying one thing you appreciate about each other.",
          "Rituals also solve the transition problem — the awkward jump from dishes-and-email mode to intimacy. The ritual is the bridge.",
        ],
        practice: "Design a 10-minute opening ritual together: light, music, breath, and one appreciation each. Use it before your next intimate evening.",
      },
      {
        id: "c2",
        title: "Talking about what she wants",
        body: [
          "The highest-leverage conversation you can have happens outside the bedroom, fully clothed, with zero pressure: 'I want to be a better lover for you. What do you wish I did more of? Less of? What have you never told me?'",
          "Then the hard part — just listen. No defending, no explaining, no fixing in the moment. Thank her. Many women have never been asked this sincerely.",
          "Revisit it monthly. Desire changes; the conversation keeps you current.",
        ],
        practice: "Have this conversation once this week — over a walk or a glass of wine, never mid-intimacy. Ask, listen, thank her. Act on one thing she says.",
      },
      {
        id: "c3",
        title: "Afterglow is part of it",
        body: [
          "What happens in the minutes after intimacy shapes how she remembers the whole experience — and how open she feels next time. Rolling over or reaching for your phone undoes an hour of good work.",
          "Tantric closing: stay in contact. Hold her, breathe together, keep a hand on her heart or belly. If words come, keep them soft and appreciative.",
          "A gentle debrief later — 'what did you love tonight?' — turns every experience into learning without pressure.",
        ],
        practice: "After your next intimate experience, stay in skin contact for at least ten unhurried minutes. No screens, no rushing. Just presence.",
      },
    ],
  },
];

const BREATH_PATTERNS = [
  { id: "ground", name: "Grounding breath", desc: "4s in · 6s out — calm & control", phases: [ { label: "Inhale", secs: 4, scale: 1 }, { label: "Exhale", secs: 6, scale: 0.55 } ] },
  { id: "box", name: "Box breath", desc: "4 · 4 · 4 · 4 — steady focus", phases: [ { label: "Inhale", secs: 4, scale: 1 }, { label: "Hold", secs: 4, scale: 1 }, { label: "Exhale", secs: 4, scale: 0.55 }, { label: "Hold", secs: 4, scale: 0.55 } ] },
  { id: "cool", name: "Cooling breath", desc: "4s in · 8s out — back from the edge", phases: [ { label: "Inhale", secs: 4, scale: 1 }, { label: "Exhale", secs: 8, scale: 0.55 } ] },
];

/* ————— Breath pacer (signature element) ————— */
function BreathPacer({ pattern, running }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(pattern.phases[0].secs);

  useEffect(() => {
    setPhaseIdx(0);
    setCount(pattern.phases[0].secs);
  }, [pattern, running]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhaseIdx((i) => (i + 1) % pattern.phases.length);
        return 0; // will be reset below via effect on phaseIdx
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, pattern]);

  useEffect(() => {
    setCount(pattern.phases[phaseIdx].secs);
  }, [phaseIdx, pattern]);

  const phase = pattern.phases[phaseIdx];
  const scale = running ? phase.scale : 0.7;
  const dur = phase.secs;

  const ring = (size, opacity, delayFactor) => ({
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: size,
    height: size,
    borderRadius: "50%",
    border: `1px solid ${C.gold}`,
    opacity,
    transform: `scale(${running ? 0.85 + scale * 0.35 * delayFactor : 0.9})`,
    transition: `transform ${dur}s cubic-bezier(.45,0,.35,1), opacity 1s`,
  });

  return (
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
      <div style={ring(250, 0.15, 1.15)} />
      <div style={ring(210, 0.3, 1.08)} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 40%, ${C.goldSoft}, ${C.gold} 55%, #8a5c2e)`,
          boxShadow: `0 0 60px ${C.gold}44`,
          transform: `scale(${scale})`,
          transition: `transform ${dur}s cubic-bezier(.45,0,.35,1)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#241708" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, letterSpacing: 1 }}>
            {running ? phase.label : "Ready"}
          </div>
          {running && <div style={{ fontSize: 15, opacity: 0.8 }}>{count}</div>}
        </div>
      </div>
    </div>
  );
}

/* ————— Main app ————— */
export default function TantraApp() {
  const [tab, setTab] = useState("learn");
  const [openModule, setOpenModule] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);
  const [done, setDone] = useState({});
  const [pattern, setPattern] = useState(BREATH_PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const [sessionSecs, setSessionSecs] = useState(0);
  const [journal, setJournal] = useState([]);
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load saved progress on first open
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("sadhana-state");
        if (result?.value) {
          const saved = JSON.parse(result.value);
          if (saved.done) setDone(saved.done);
          if (saved.journal) setJournal(saved.journal);
        }
      } catch (e) {
        // No saved state yet — first visit
      }
      setLoaded(true);
    })();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set("sadhana-state", JSON.stringify({ done, journal }));
      } catch (e) {
        console.error("Could not save progress", e);
      }
    })();
  }, [done, journal, loaded]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSessionSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

  const font = document.getElementById("tantra-fonts");
  if (!font) {
    const link = document.createElement("link");
    link.id = "tantra-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }

  const S = {
    app: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Jost', sans-serif", fontWeight: 300, paddingBottom: 84 },
    display: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    card: { background: C.surface, border: `1px solid ${C.line}`, borderRadius: 16, padding: 18, marginBottom: 12 },
    eyebrow: { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.gold },
    btn: (primary) => ({
      background: primary ? C.gold : "transparent",
      color: primary ? "#241708" : C.gold,
      border: `1px solid ${C.gold}`,
      borderRadius: 999,
      padding: "12px 26px",
      fontFamily: "'Jost', sans-serif",
      fontSize: 15,
      cursor: "pointer",
    }),
  };

  const Header = ({ eyebrow, title, sub }) => (
    <div style={{ padding: "28px 20px 12px" }}>
      <div style={S.eyebrow}>{eyebrow}</div>
      <h1 style={{ ...S.display, fontSize: 34, margin: "6px 0 4px", lineHeight: 1.1 }}>{title}</h1>
      {sub && <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>{sub}</p>}
    </div>
  );

  /* ——— Lesson view ——— */
  if (openLesson) {
    const mod = MODULES.find((m) => m.id === openModule);
    const lesson = mod.lessons.find((l) => l.id === openLesson);
    const isDone = !!done[lesson.id];
    return (
      <div style={S.app}>
        <div style={{ padding: "20px 20px 0" }}>
          <button onClick={() => setOpenLesson(null)} style={{ ...S.btn(false), padding: "8px 18px", fontSize: 13 }}>← {mod.title}</button>
        </div>
        <Header eyebrow={`Module ${mod.number}`} title={lesson.title} />
        <div style={{ padding: "0 20px" }}>
          {lesson.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, color: C.text, margin: "0 0 18px" }}>{p}</p>
          ))}
          <div style={{ ...S.card, borderColor: C.gold, background: C.surfaceHi }}>
            <div style={{ ...S.eyebrow, marginBottom: 8 }}>This week's practice</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: 19 }}>{lesson.practice}</p>
          </div>
          <button
            onClick={() => setDone({ ...done, [lesson.id]: !isDone })}
            style={{ ...S.btn(!isDone), width: "100%", marginTop: 16 }}
          >
            {isDone ? "✓ Completed — tap to undo" : "Mark as complete"}
          </button>
        </div>
      </div>
    );
  }

  /* ——— Module view ——— */
  if (openModule) {
    const mod = MODULES.find((m) => m.id === openModule);
    return (
      <div style={S.app}>
        <div style={{ padding: "20px 20px 0" }}>
          <button onClick={() => setOpenModule(null)} style={{ ...S.btn(false), padding: "8px 18px", fontSize: 13 }}>← All modules</button>
        </div>
        <Header eyebrow={`Module ${mod.number}`} title={mod.title} sub={mod.subtitle} />
        <div style={{ padding: "8px 20px" }}>
          {mod.lessons.map((l, i) => (
            <div key={l.id} onClick={() => setOpenLesson(l.id)} style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ ...S.display, fontSize: 22, color: done[l.id] ? C.gold : C.muted, minWidth: 28 }}>
                {done[l.id] ? "✓" : i + 1}
              </div>
              <div>
                <div style={{ fontSize: 16.5 }}>{l.title}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{l.body[0].slice(0, 64)}…</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={S.app}>
      {tab === "learn" && (
        <>
          <Header eyebrow="The Presence Path" title="Sādhana" sub="A course in tantric intimacy — presence, breath, and the art of giving." />
          <div style={{ padding: "10px 20px" }}>
            <div style={{ ...S.card, background: C.surfaceHi, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: C.muted }}>Your journey</div>
                <div style={{ ...S.display, fontSize: 24 }}>{doneCount} of {totalLessons} lessons</div>
              </div>
              <div style={{ width: 54, height: 54, borderRadius: "50%", border: `2px solid ${C.line}`, borderTopColor: C.gold, transform: `rotate(${(doneCount / totalLessons) * 360}deg)`, transition: "transform .6s" }} />
            </div>
            {MODULES.map((m) => {
              const mDone = m.lessons.filter((l) => done[l.id]).length;
              return (
                <div key={m.id} onClick={() => setOpenModule(m.id)} style={{ ...S.card, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ ...S.display, fontSize: 21 }}>
                      <span style={{ color: C.gold, marginRight: 10, fontSize: 15 }}>{m.number}</span>
                      {m.title}
                    </div>
                    <div style={{ fontSize: 12, color: mDone === m.lessons.length ? C.gold : C.muted }}>{mDone}/{m.lessons.length}</div>
                  </div>
                  <div style={{ fontSize: 13.5, color: C.muted, marginTop: 4 }}>{m.subtitle}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "practice" && (
        <>
          <Header eyebrow="Daily practice" title="Breathe" sub="The skill underneath every other skill." />
          <div style={{ padding: "20px 20px 10px", textAlign: "center" }}>
            <BreathPacer pattern={pattern} running={running} />
            <div style={{ marginTop: 22, color: C.muted, fontSize: 14 }}>
              {running ? `Session: ${Math.floor(sessionSecs / 60)}:${String(sessionSecs % 60).padStart(2, "0")}` : "Choose a pattern, then begin."}
            </div>
            <button onClick={() => { setRunning(!running); if (running) setSessionSecs(0); }} style={{ ...S.btn(true), marginTop: 14 }}>
              {running ? "End session" : "Begin"}
            </button>
          </div>
          <div style={{ padding: "10px 20px" }}>
            {BREATH_PATTERNS.map((p) => (
              <div key={p.id} onClick={() => { setPattern(p); setRunning(false); }} style={{ ...S.card, cursor: "pointer", borderColor: pattern.id === p.id ? C.gold : C.line }}>
                <div style={{ fontSize: 16 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "journal" && (
        <>
          <Header eyebrow="Reflection" title="Journal" sub="What you notice, you can grow." />
          <div style={{ padding: "10px 20px" }}>
            <div style={S.card}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What did you notice — in her, in yourself, in the connection?"
                style={{ width: "100%", minHeight: 90, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "'Jost', sans-serif", fontSize: 15, resize: "vertical" }}
              />
              <button
                onClick={() => { if (note.trim()) { setJournal([{ text: note.trim(), when: new Date().toLocaleString() }, ...journal]); setNote(""); } }}
                style={{ ...S.btn(true), padding: "10px 22px", fontSize: 14 }}
              >
                Save reflection
              </button>
            </div>
            <p style={{ fontSize: 12.5, color: C.muted, margin: "4px 4px 14px" }}>
              Your reflections and lesson progress save automatically and stay private to you.
            </p>
            {journal.map((j, i) => (
              <div key={i} style={S.card}>
                <div style={{ fontSize: 12, color: C.gold, marginBottom: 6 }}>{j.when}</div>
                <div style={{ fontSize: 15, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{j.text}</div>
              </div>
            ))}
            {journal.length === 0 && (
              <div style={{ textAlign: "center", color: C.muted, fontSize: 14, marginTop: 30, fontStyle: "italic" }}>
                Your first reflection will appear here.
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: `${C.bg}F2`, backdropFilter: "blur(12px)", borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-around", padding: "12px 0 22px" }}>
        {[
          { id: "learn", label: "Learn", icon: "☾" },
          { id: "practice", label: "Practice", icon: "◉" },
          { id: "journal", label: "Journal", icon: "✎" },
        ].map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setOpenModule(null); setOpenLesson(null); }} style={{ background: "none", border: "none", color: tab === t.id ? C.gold : C.muted, cursor: "pointer", fontFamily: "'Jost', sans-serif" }}>
            <div style={{ fontSize: 20 }}>{t.icon}</div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
