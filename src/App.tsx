import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Menu,
  X,
  Award,
  Gift,
  Calendar,
  Trophy,
  Coffee,
  Flame,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Palette,
  GraduationCap,
  Plus,
  AlertTriangle,
  Cpu,
  Brush,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  Check,
  Printer,
  ArrowUp,
  Radio,
  Code,
  Database,
  Moon,
  FileCheck,
  Coins,
  Users,
  MapPin,
  Quote
} from 'lucide-react';

/* =========================================================================
   1. SOUND EFFECTS (Web Audio API - No external dependencies)
   ========================================================================= */
class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCelebration() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch {
      // Audio might fail in silent mode
    }
  }

  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Silent fail
    }
  }

  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      osc2.frequency.setValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.35);
    } catch {
      // Silent fail
    }
  }
}

const sound = new SoundManager();

/* =========================================================================
   2. DATA & STORIES
   ========================================================================= */
interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: 'highlight' | 'together' | 'design' | 'memories';
  caption: string;
  tag?: string;
}

interface TraitItem {
  title: string;
  subtitle: string;
  icon: string;
  level: number;
  maxLevel: number;
  description: string;
  badge: string;
  color: string;
}

interface TimelineEvent {
  id: string;
  phase: string;
  title: string;
  summary: string;
  fullStory: string;
  icon: string;
  tag: string;
  highlightQuote: string;
}

interface DuaaCard {
  id: string;
  text: string;
  sender: string;
  amenCount: number;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "broadcast",
    phase: "المحطة الأولى",
    title: "شرارة البداية في الإذاعة المدرسية والتواضع الأسطوري 🎙️",
    summary: "المدرسة كلها بتتكلم عن عبقرينو النابغة.. وكريم واقف جنبه بكل تواضع يعرفه كـ 'مصطفى'.",
    fullStory: "أول لقاء وشرارة تعارف كانت على منصة الإذاعة المدرسية لما طلعنا سوا. كل الطلبة والمدرسين في المدرسة كانوا بيتكلموا عن 'عبقرينو' وقد إيه هو شخصية نابغة وعبقرية والكل عارفه من أول يوم دخل فيه المدرسة. كريم كان واقف معاه وبيتعامل معاه كـ 'مصطفى' وبهرته كمية التواضع والأخلاق اللي عنده رغم كل الصيت اللي كان حواليه!",
    icon: "Radio",
    tag: "اللقاء الأول",
    highlightQuote: "المدرسة كلها عارفة عبقرينو.. وأنا واقف معاه أعرفه كمصطفى بتواضعه النادر."
  },
  {
    id: "coding-spark",
    phase: "المحطة الثانية",
    title: "ندوة البرمجة وإشعال الشغف والموقع الأول 💻",
    summary: "مصطفى يوري كريم موقعه الخاص، ويحكي له عن تعبه لحد ما كريم دخل عالم البرمجة.",
    fullStory: "بعدها حضرنا سوا ندوة لتعلم البرمجة، وهناك مصطفى فتح موقعه اللي كان برمجّه بإيديه وورهولي. كريم انبهر جداً بدقة الشغل والنتيجة، وأخد رقمه وفضلوا يتكلموا. عبقرينو فضل يحكي لكريم قد إيه تعب عشان يبنيه وكل المميزات اللي فيه، بأسلوب مليان حماس وإيثار لحد ما حبب كريم في البرمجة وخلاه ياخد أول خطوة ويبدأ يبني مشاريعه بنفسه!",
    icon: "Code",
    tag: "ميلاد المبرمج",
    highlightQuote: "حببني في البرمجة وخلاني أخد خطوة التعلم وأبني بإيدي."
  },
  {
    id: "firebase-platform",
    phase: "المحطة الثالثة",
    title: "تحدي المنصة التعليمية واكتشاف الفايربيز (Firebase) 🔥",
    summary: "أول تحدي لبناء منصة تعليمية وقواعد بيانات وميلاد عصر الفايربيز للثنائي.",
    fullStory: "عملنا تحدي قوي مع بعض: مين يبني منصة تعليمية متكاملة؟ ومن هنا كان ميلاد قواعد البيانات والتعامل مع Firebase لأول مرة في حياتنا. التحدي ده فجّر طاقات رهيبة عندنا وخلى كل واحد فينا يطور مهاراته البرمجية لأقصى حد في إدارة البيانات وحسابات المستخدمين.",
    icon: "Database",
    tag: "ثورة التقنية",
    highlightQuote: "التحدي اللي فتح عيوننا على أسرار قواعد البيانات والفايربيز."
  },
  {
    id: "suhoorna",
    phase: "المحطة الرابعة",
    title: "مشروع 'سحورنا' وإبهار مدرسي المدرسة 🌙",
    summary: "أول مشروع مشترك حطينا فيه كل جهودنا.. والمدرسين طلبوا مننا منصات لشرح دروسهم!",
    fullStory: "أول مشاريعنا المشتركة الكبيرة كان موقع 'سحورنا'.. حطينا فيه كل مجهودنا وروحنا وسهرنا الليالي عشان نقدم أفضل حاجة ممكنة. النتيجة كانت مبهرة لدرجة إن المدرسين بتوعنا لما شافوا الموقع اتفاجئوا بجماله واحترافيته، وطلبوا مننا بالاسم نعملهم منصات تعليمية يشرحوا عليها دروسهم! كنا بنقعد سهرانين للصبح نبرمج ونجهّزها ليهم.",
    icon: "Moon",
    tag: "سحورنا الرائد",
    highlightQuote: "حطينا فيه روحنا.. والمدرسين انبهروا وطلبوا مننا منصاتهم الخاصة."
  },
  {
    id: "picsart-to-canva",
    phase: "المحطة الخامسة",
    title: "من بيكسارت إلى عرش كانفا: ثورة التصميم 🎨",
    summary: "كريم متمسك ببيكسارت، وعبقرينو يقنعه تدريجياً بكانفا ليصبحا أقوى ثنائي بصري.",
    fullStory: "كريم كان بيصمم على PicsArt ومصطفى كمان كان بيصمم عليه.. لحد ما عبقرينو بدأ ينقل شغله على Canva. في البداية كريم مكنش حابب كانفا لأنه متعود على بيكسارت، بس عبقرينو بصبره وذوقه فضل وراه ويعلمه كل تريكة لحد ما كريم حبه واتعود عليه وبقوا يصمموا كل حاجة سوا كأقوى ثنائي تصميم!",
    icon: "Palette",
    tag: "شراكة كانفا",
    highlightQuote: "من بيكسارت لكانفا.. لحد ما بقى التصميم لعبتنا المفضلة."
  },
  {
    id: "cheat-sheet",
    phase: "المحطة السادسة",
    title: "عملية ورقة تلخيص المنهج وختم الوزارة 🕵️‍♂️📜",
    summary: "ورقة كانفا واحدة لخصت المنهج كامل بختم الوزارة.. وغششوا المدرسة كلها واتقفشوا!",
    fullStory: "من أجرأ وأطرف المغامرات على الإطلاق! أول حاجة صمموها سوا على كانفا كانت ورقة واحدة فريدة ملخصة المنهج كله باحترافية شديدة. طبعوها ووزعوها على كل الطلاب قبل الامتحان، ومش بس كده.. حطوا عليها ختم الوزارة عشان تبان رسمية ودخلوها اللجنة وغششوا المدرسة كلها منها! وفي الآخر اتقفشوا، لكن ربنا ستر وعدت بسلام وبقت ذكرى لا تُنسى!",
    icon: "FileCheck",
    tag: "مغامرة لا تُنسى",
    highlightQuote: "ختم الوزارة على ورقة كانفا.. وغششنا المدرسة كلها ونجونا!"
  },
  {
    id: "500-pounds",
    phase: "المحطة السابعة",
    title: "تحدي تصميم عملة الـ 500 جنيه الجديدة 💵",
    summary: "منافسة فنية إبداعية شريفة بين الأخوين لإعادة تصور العملة المصرية.",
    fullStory: "بعد ملحمة الامتحان، حبوا يتحدوا بعض في التصميم الجرافيكي الراقي: مين يقدر يصمم ورقة نقدية جديدة لفئة الـ 500 جنيه بأعلى جودة وتفاصيل أمنية ولمسات بصرية مستوحاة من الحضارة والتاريخ. التحدي ده أظهر ذوق عبقرينو العالي ودقته المذهلة.",
    icon: "Coins",
    tag: "تحدي الـ 500 جنيه",
    highlightQuote: "تحدي تصميم العملة.. إبداع وفن على أعلى مستوى."
  },
  {
    id: "empire",
    phase: "المحطة الثامنة",
    title: "إمبراطورية الواتساب: منصة (اتق الله) وشبكة (ND Network) 📱👑",
    summary: "بناء إمبراطورية تعليمية متكاملة، مذكرات، أسئلة، وتعيين وإدارة أدمنز تحت إشرافهم.",
    fullStory: "فكروا سوا في منصة تعليمية سموها 'اتق الله'، وبعدها أطلقوا شبكة 'ND Network'.. وبنوا مع بعض إمبراطورية تعليمية ضخمة على الواتساب! كانوا بينزلوا مذكرات حصرية، ويطرحوا أسئلة ويديروا امتحانات، وشغلوا أدمنز تحت إدارتهم ينسقوا معاهم الجروبات، لحد ما الجروبات اتقفلت بعد ما سابت أثر كبير عند كل الطلاب.",
    icon: "Users",
    tag: "إمبراطورية الواتس",
    highlightQuote: "بنينا إمبراطورية تعليمية.. مذكرات وأدمنز وشغل احترافي."
  },
  {
    id: "fashn-trip",
    phase: "المحطة التاسعة",
    title: "رحلة الفشن: كسر حاجز المسافات للقاء الأخ والصديق 🚗🤝",
    summary: "كريم يقرر ياخد دروس في الفشن بلد مصطفى مخصوص عشان يشوفه ويقضي معاه أوقات لا تُنسى.",
    fullStory: "رغم إن كل علاقتهم كانت على النت لأن كل واحد من بلد مختلفة.. إلا إنه في تانية بكالوريا كريم أصر يكسر المسافة! قرر ياخد دروس خصوصية في 'الفشن' بلد عبقرينو مخصوص عشان يقابله. اتقابلوا مرتين مخصوص بدون مدرسة ولا دروس، وشاف عبقرينو الحقيقي في شوارع الفشن، شافه بجدعنته ولما بيتخانق مع الناس وما بيسكتش لحد لما ييجي على حقه!",
    icon: "MapPin",
    tag: "لقاء الفشن",
    highlightQuote: "رحت الفشن بلدك مخصوص عشان أشوفك وأقف جنبك يا غالي."
  },
  {
    id: "one-soul",
    phase: "المحطة العاشرة",
    title: "روح واحدة في جسدين: 'عبقرينو هو حياتي كلها' ❤️",
    summary: "أدق تفاصيل الحياة بيشاركوها سوا.. ذاكر يا كريم، ذاكر يا مصطفى، وفرح وحزن مشترك.",
    fullStory: "عبقرينو مش مجرد صاحب، ده شريك الروح وسند الأيام. كريم بيحكيله تفاصيل حياته كلها من أصغرها لأكبرها، ومصطفى بيسمع وينصح ويفضفض. لما حد ينجح التاني يطير من الفرحة من قلبه، ولما حد يزعل التاني يحس بيه فوراً. 'ذاكر يا عبقرينو' و'ذاكر يا كريم'.. مفيش بنا فرق، إحنا واحد فعلياً ومبنغلطش على بعض أبداً.",
    icon: "Heart",
    tag: "أخوة أبدية",
    highlightQuote: "مفيش بينا فرق أنا وهو واحد فعلياً.. بنزعل لبعض ونفرح لبعض ونحس ببعض."
  }
];

const TRAITS: TraitItem[] = [
  {
    title: "الجدعنة والإيثار النادر",
    subtitle: "صاحب صاحبه وسند وقت الشدة",
    icon: "HeartHandshake",
    level: 100,
    maxLevel: 100,
    description: "راجل محترم جداً، عارف معنى الإيثار وبيفضّل غيره على نفسه.. علّم كريم البرمجة وكانفا بكل حب وحماس.",
    badge: "جدع أصيل 👑",
    color: "from-amber-500 to-yellow-600"
  },
  {
    title: "الشراسة وقت اللزوم (الفشن)",
    subtitle: "اللي ييجي عليه يقرقشو بأسنانه وما بيسكتش لحد",
    icon: "Flame",
    level: 100,
    maxLevel: 100,
    description: "أطيب قلب مع حبايبه، بس إياك تفكر تغلط فيه أو تيجي على حقه.. هيقرقشك بأسنانه بدون تردد وما يسكتش لأي حد!",
    badge: "شرس مابيرحمش 🦁",
    color: "from-red-500 to-rose-600"
  },
  {
    title: "إدمان النسكافيه وسهر الليالي",
    subtitle: "الوقود الرسمي لإمبراطورية سحورنا والمواقع",
    icon: "Coffee",
    level: 98,
    maxLevel: 100,
    description: "كوباية النسكافيه في إيده دايماً.. سر التركيز وسهر الليالي في برمجة منصات المدرسين وتظبيط كانفا.",
    badge: "مدمن نسكافيه ☕",
    color: "from-amber-700 to-yellow-800"
  },
  {
    title: "فن المراكمة واللم في الآخر",
    subtitle: "سيد تأجيل المنهج ومفاجأة الجميع بالتفوق",
    icon: "Clock",
    level: 95,
    maxLevel: 100,
    description: "يراكم الدروس لحد آخر ثانية.. ومع ورقة ملخص المنهج وقدراته الفطرية يلم الدنيا ويطلع من الأوائل!",
    badge: "بروفيسور المراكمة ⏳",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "معلم كانفا وبطل الفايربيز",
    subtitle: "الفنان والمبرمج اللي علّم صاحبه وبنوا سوا",
    icon: "Palette",
    level: 100,
    maxLevel: 100,
    description: "مصمم جامد جداً، نقل كريم من بيكسارت لكانفا، واكتشفوا الفايربيز سوا وبنوا ND Network وموقع سحورنا.",
    badge: "فنان كانفا 🎨",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "الأول على البكالوريا بإذن الله",
    subtitle: "نابغة المدرسة وذكي وشاطر من أول يوم",
    icon: "GraduationCap",
    level: 99,
    maxLevel: 100,
    description: "نابغة الإذاعة المدرسية اللي المدرسة كلها كانت بتتكلم عنه.. ودعواتنا ليه دايماً بالمركز الأول في البكالوريا!",
    badge: "الأول على الدفعة 🎓",
    color: "from-emerald-500 to-teal-600"
  }
];

const PHOTOS: PhotoItem[] = [
  {
    id: "1",
    src: "./1.png",
    title: "عبقرينو الغالي (I Love You)",
    category: "highlight",
    caption: "صورة الغالي مصطفى محمد في السويت شيرت الأبيض مع لمسات المحبة والأخوة.",
    tag: "اللقطة المفضلة ❤️"
  },
  {
    id: "eid",
    src: "./عيد.png",
    title: "كريم ومصطفى في العيد (لقاء الإخوة)",
    category: "together",
    caption: "كتف في كتف.. من الإنترنت لرحلة الفشن وأيام العيد الحلوة.. مفيش مسافات تفرق الإخوات.",
    tag: "إخوات وسند 🤝"
  },
  {
    id: "cyber",
    src: "./Gemini-Generated-Image-uidlzruidlzruidl.png",
    title: "عبقرينو ملك الأتمتة والذكاء الاصطناعي",
    category: "design",
    caption: "عبقرينو مبرمج ومصمم يجمع بين Claude Code و n8n و OpenClaw بأذرع آلية خارقة!",
    tag: "عبقرية المستقبل ⚡"
  },
  {
    id: "military",
    src: "./SmartSelect_٢٠٢٦١٠٢٧_٠٠١٤١٦_WhatsApp.jpg",
    title: "بوستر عبقرينو المقاتل الشرس",
    category: "design",
    caption: "اللي ييجي عليه يقرقشو بأسنانه! تصميم مميز باسم عبقرينو وبرق القوة ومابيسبش حقه لحد.",
    tag: "شرس وجدع 🦁"
  },
  {
    id: "night",
    src: "./641442979_890676857189522_895065081098416178_n.jpg",
    title: "أناقة الشتاء والليل",
    category: "highlight",
    caption: "كشخة الليل والشتاء.. وقفة كلها ثقة وشموخ.",
    tag: "برنس 🌟"
  },
  {
    id: "selfie-day",
    src: "./IMG-20261023-WA0063.jpg",
    title: "نور الشمس والضحكة الصافية",
    category: "highlight",
    caption: "سيلفي رايق من القلب يبرز الروح الطيبة والابتسامة الحلوة والتواضع النادر.",
    tag: "تواضع وأصالة ✨"
  },
  {
    id: "mem1",
    src: "./IMG-20260608-WA0019.jpg",
    title: "ذكريات سهر الليالي والشغل سوا",
    category: "memories",
    caption: "أيام وساعات ممتعة وخروجات بنقضيها سوا بنضحك ونحكي ونتكلم في منصاتنا وتصاميمنا.",
    tag: "ذكريات 📸"
  },
  {
    id: "mem2",
    src: "./IMG-20260608-WA0020.jpg",
    title: "لحظات عفوية وضحك",
    category: "memories",
    caption: "الصور العفوية هي اللي بتعيش وتفكرنا بأحلى الأوقات ومغامرة ورقة تلخيص المنهج.",
    tag: "عفوية 🌟"
  },
  {
    id: "mem3",
    src: "./IMG-20260615-WA0034.jpg",
    title: "أيام الفشن والخروجات الرايقة",
    category: "memories",
    caption: "ضحك ومواقف مش ممكن تتكرر مع أعز الناس في الدنيا.",
    tag: "الفشن 🍃"
  },
  {
    id: "mem4",
    src: "./IMG-20260615-WA0035.jpg",
    title: "لمة الصحاب والجدعان",
    category: "together",
    caption: "الصحبة الصالحة اللي تفرّح القلب وتشد العزم.. روح واحدة بنفرح لبعض ونزعل لبعض.",
    tag: "جدعنة 🤝"
  },
  {
    id: "mem5",
    src: "./IMG-20260615-WA0036.jpg",
    title: "أيام تملأ القلب فرحة",
    category: "memories",
    caption: "كل صورة وراها حكاية وموقف ما بينساش بين كريم ومصطفى.",
    tag: "حكايات 💬"
  },
  {
    id: "mem6",
    src: "./IMG-20260704-WA0018.jpg",
    title: "صيف 2026 وتحديات البرمجة",
    category: "memories",
    caption: "أجواء الصيف وتحدي الـ 500 جنيه وسيرفرات الفايربيز.",
    tag: "صيف ☀️"
  },
  {
    id: "mem7",
    src: "./IMG-20260807-WA0038.jpg",
    title: "لقطة مميزة للغالي",
    category: "highlight",
    caption: "صورة من الصور اللي ليها معزة خاصة في القلب للغالي مصطفى.",
    tag: "مميز 💎"
  },
  {
    id: "mem8",
    src: "./IMG-20260810-WA0026.jpg",
    title: "أخويا وحبيبي وسندي",
    category: "together",
    caption: "الراجل المحترم وصديقي الوفي اللي ربنا يديم وجوده في حياتي.",
    tag: "سند وظهر ❤️"
  },
  {
    id: "mem9",
    src: "./IMG-20260824-WA0021.jpg",
    title: "روقان على أصوله",
    category: "memories",
    caption: "هدوء وتفاؤل وأيام بتجمعنا على الخير والإبداع على كانفا.",
    tag: "روقان 🍃"
  },
  {
    id: "mem10",
    src: "./IMG-20260926-WA0039.jpg",
    title: "أيام سبتمبر وتجهيز النسكافيه",
    category: "memories",
    caption: "قبل بداية الدراسة وجلسات التخطيط للمراكمة وتجهيز النسكافيه والمذكرات!",
    tag: "مراكمة ونسكافيه ☕"
  },
  {
    id: "mem11",
    src: "./IMG-20260926-WA0066.jpg",
    title: "ضحك من القلب ومواقف لا تُنسى",
    category: "memories",
    caption: "مواقف ونهفات متواصلة مبتنتهيش بين الأخوات.. 'ذاكر يا كريم - ذاكر يا عبقرينو'.",
    tag: "ضحك ومرح 😂"
  },
  {
    id: "mem12",
    src: "./IMG-20261022-WA0001.jpg",
    title: "أحدث الذكريات المستمرة",
    category: "memories",
    caption: "مع كل يوم بيعدي الصداقة بتزيد عمق ومحبة وإخلاص.",
    tag: "مستمرين 💪"
  },
  {
    id: "mem13",
    src: "./IMG_٢٠٢٥١٢٢٣_٠٩٣٨٢٥~2.jpg",
    title: "لقطة الشتاء الجميل",
    category: "memories",
    caption: "من ألبوم الذكريات المميزة لشتاء ديسمبر وأيام سحورنا الأولى.",
    tag: "شتاء ❄️"
  },
  {
    id: "mem14",
    src: "./IMG_٢٠٢٦٠٣٠٢_١١٤٤٣٥~2.jpg",
    title: "ربيع الصداقة والأخوة",
    category: "together",
    caption: "الصحوبية رزق وأنت من أحسن الأرزاق يا مصطفى.. مفيش فرق بينا إحنا واحد.",
    tag: "أصيل 🏆"
  },
  {
    id: "mem15",
    src: "./515989224_703636009226942_3960702732033141809_n.jpg",
    title: "أناقة وشياكة",
    category: "highlight",
    caption: "إطلالة شياكة من الطراز الأول لعبقرينو النابغة.",
    tag: "شياكة ✨"
  },
  {
    id: "mem16",
    src: "./558045899_773506938906515_1824601711504160694_n.jpg",
    title: "لحظة للذاكرة",
    category: "memories",
    caption: "توثيق اللحظات عشان تفضل محفورة طول العمر في قلوبنا.",
    tag: "ذكريات 🎞️"
  },
  {
    id: "mem17",
    src: "./594397787_824263013830907_8171227520722412976_n.jpg",
    title: "أيام الأصالة والجدعنة",
    category: "memories",
    caption: "أيام الخير والصحبة الطيبة التي لا تقدر بثمن.",
    tag: "أصالة 🎖️"
  },
  {
    id: "mem18",
    src: "./673742557_932429899680884_3278553830736109598_n.jpg",
    title: "جلسة صفاء وقهوة",
    category: "memories",
    caption: "جلسة نسكافيه وكلام في المستقبل، والتصميم وإمبراطورية ND Network.",
    tag: "جلسات ☕"
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "أين كانت أول شرارة تعارف بين كريم ومصطفى لأول مرة؟",
    options: ["في الإذاعة المدرسية لما طلعوا سوا", "في سايبر ألعاب", "في جيم رياضي", "في مواصلات السفر"],
    correctIndex: 0,
    explanation: "كريم ومصطفى طلعوا سوا في الإذاعة المدرسية، والمدرسة كلها كانت بتتكلم عن عبقرينو النابغة وكريم واقف معاه بتواضعه كـ 'مصطفى'!"
  },
  {
    question: "إيه أول مشروع مشترك كبير حطوا فيه كل جهودهم ومدرسي المدرسة طلبوا زيه؟",
    options: ["موقع سحورنا 🌙", "تطبيق آلة حاسبة", "موقع للمباريات", "لعبة فلاش"],
    correctIndex: 0,
    explanation: "موقع 'سحورنا'.. حطوا فيه كل روحهم وسهروا الليالي، والمدرسين انبهروا وطلبوا منصات خاصة لشرح دروسهم!"
  },
  {
    question: "إيه قاعدة البيانات اللي كانت ولادتها الأولى في تحدي بناء المنصة التعليمية؟",
    options: ["فايربيز (Firebase) 🔥", "أوراكل (Oracle)", "إكسيل (Excel)", "نوتباد (Notepad)"],
    correctIndex: 0,
    explanation: "تحدي المنصة التعليمية كان بداية اكتشافهم لـ Firebase وعالم قواعد البيانات السحابية الحقيقية!"
  },
  {
    question: "كريم كان بيصمم على تطبيق إيه ومكنش حابب كانفا لحد ما عبقرينو علمه وأقنعه؟",
    options: ["بيكسارت (PicsArt)", "فوتوشوب 2005", "الرسام (Paint)", "إنستجرام ستوري"],
    correctIndex: 0,
    explanation: "كريم كان متعود على PicsArt ومكنش حابب كانفا، لحد ما عبقرينو حببه فيه وبقوا ثنائي كانفا الأسطوري!"
  },
  {
    question: "إيه المغامرة الخطيرة اللي عملوها في ورقة تلخيص المنهج قبل الامتحان؟",
    options: ["حطوا عليها ختم الوزارة وغششوا المدرسة كلها!", "حرقوا الورقة في الحوش", "باعوها بعشرة آلاف جنيه", "نسيوها في البيت"],
    correctIndex: 0,
    explanation: "لخصوا المنهج كله في ورقة كانفا واحدة وحطوا ختم الوزارة وغششوا المدرسة كلها واتقفشوا بس عدت على خير!"
  },
  {
    question: "في تانية بكالوريا، كريم راح ياخد دروس في بلد إيه مخصوص عشان يقابل عبقرينو؟",
    options: ["الفشن 🚗", "الإسكندرية", "شرم الشيخ", "المنصورة"],
    correctIndex: 0,
    explanation: "الفشن بلد عبقرينو.. كريم راح ياخد دروس هناك مخصوص عشان يكسر المسافات ويقابل أخوه وصاحبه وجهاً لوجه!"
  },
  {
    question: "مين البنت اللي عبقرينو كان بيحبها ومصطفى بيحكي تفاصيل قلبه لكريم عنها؟",
    options: ["جنى ❤️", "سارة", "مريم", "نور"],
    correctIndex: 0,
    explanation: "جنى.. وعبقرينو بيحكي لكريم كل صغيرة وكبيرة في حياته لأنهم روح واحدة ومفيش بينهم أسرار!"
  }
];

const DUAA_LIST = [
  "اللهم وفقه في البكالوريا واجعله من الأوائل دائماً وأبداً يا رب العالمين 🎓",
  "اللهم أنر بصيرته ويسر أمره وافتح له أبواب الخير والنجاح والتفوق في كل خطوة 🌟",
  "اللهم أدم المحبة والأخوة الصادقة بين كريم وعبقرينو طول العمر واحفظهما لبعضهما 🤝",
  "اللهم بارك في علمه وإبداعه في البرمجة والتصميم واجعله ذخراً لأهله وأحبابه 💻",
  "اللهم يسر له البكالوريا واجعل كل صعب عليه سهلاً وحقق أمانيه وأسعد قلبه 🤲",
  "اللهم اجعل تعبه وسهر الليالي شفيعاً لنجاح باهر يفرح به كريم وأهل الفشن وكل محبيه 🏆"
];

/* =========================================================================
   3. APP COMPONENT (Main Unified Architecture)
   ========================================================================= */
export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [daysToBirthday, setDaysToBirthday] = useState<number>(0);

  // Timeline state
  const [selectedEventId, setSelectedEventId] = useState<string>(TIMELINE_EVENTS[0].id);
  const activeEvent = TIMELINE_EVENTS.find(e => e.id === selectedEventId) || TIMELINE_EVENTS[0];

  // Traits interactive widgets
  const [coffeeCount, setCoffeeCount] = useState<number>(3);
  const [procrastinationLevel, setProcrastinationLevel] = useState<number>(85);
  const [ferocityLevel, setFerocityLevel] = useState<boolean>(false);

  // Canva tab
  const [activeTab, setActiveTab] = useState<'cyber' | 'military'>('cyber');

  // Gallery
  const [filter, setFilter] = useState<'all' | 'highlight' | 'together' | 'design' | 'memories'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Quiz
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [answeredCurrent, setAnsweredCurrent] = useState<boolean>(false);

  // Prayers Wall
  const [prayers, setPrayers] = useState<DuaaCard[]>([]);
  const [newPrayer, setNewPrayer] = useState('');
  const [senderName, setSenderName] = useState('');
  const [submittedPrayer, setSubmittedPrayer] = useState(false);

  // Initial countdown
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let bday = new Date(currentYear, 10, 21);
    if (today > bday) {
      bday = new Date(currentYear + 1, 10, 21);
    }
    const diffTime = bday.getTime() - today.getTime();
    setDaysToBirthday(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Load prayers
    const saved = localStorage.getItem('abqarino_prayers');
    if (saved) {
      try {
        setPrayers(JSON.parse(saved));
        return;
      } catch {
        // Fallback
      }
    }
    const initialPrayers: DuaaCard[] = DUAA_LIST.map((text, idx) => ({
      id: `init-${idx}`,
      text,
      sender: idx === 0 ? 'صاحبك وأخوك كريم (Kemo)' : 'محب لعبقرينو',
      amenCount: 15 + idx * 7,
    }));
    setPrayers(initialPrayers);
  }, []);

  // Helper trigger celebration
  const triggerCelebration = () => {
    sound.playCelebration();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
    });
    setIsGiftModalOpen(true);
  };

  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5 text-amber-400" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Database': return <Database className="w-5 h-5 text-orange-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-yellow-300" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-rose-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredPhotos = filter === 'all' ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    sound.playClick();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    sound.playClick();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  // Quiz handlers
  const q = QUIZ_QUESTIONS[currentQuestion];
  const handleSelectOption = (index: number) => {
    if (answeredCurrent) return;
    setAnsweredCurrent(true);
    setSelectedAnswers(prev => [...prev, index]);
    if (index === q.correctIndex) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
      setAnsweredCurrent(false);
    } else {
      setShowResult(true);
      const score = calculateScore();
      if (score >= 4) {
        sound.playCelebration();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleResetQuiz = () => {
    sound.playClick();
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnsweredCurrent(false);
    setShowResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx]?.correctIndex) score += 1;
    });
    return score;
  };

  // Prayers handlers
  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.trim()) return;
    sound.playCelebration();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });

    const newCard: DuaaCard = {
      id: Date.now().toString(),
      text: newPrayer.trim(),
      sender: senderName.trim() || 'صديق مخلص',
      amenCount: 1,
    };
    const updated = [newCard, ...prayers];
    setPrayers(updated);
    try {
      localStorage.setItem('abqarino_prayers', JSON.stringify(updated));
    } catch {
      // Local storage fallback
    }
    setNewPrayer('');
    setSenderName('');
    setSubmittedPrayer(true);
    setTimeout(() => setSubmittedPrayer(false), 3000);
  };

  const handleAmen = (id: string) => {
    sound.playSuccess();
    const updated = prayers.map(p => p.id === id ? { ...p, amenCount: p.amenCount + 1 } : p);
    setPrayers(updated);
    try {
      localStorage.setItem('abqarino_prayers', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <img src="./1.png" alt="عبقرينو" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -left-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-slate-900"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                  عبقرينو
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  مصطفى محمد
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">إهداء من أخوه وصاحبه كريم (Kemo)</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
            <a href="#timeline" className="hover:text-amber-400 transition-colors">محطات الصداقة</a>
            <a href="#story" className="hover:text-amber-400 transition-colors">قصتنا</a>
            <a href="#traits" className="hover:text-amber-400 transition-colors">شخصية عبقرينو</a>
            <a href="#canva" className="hover:text-amber-400 transition-colors">ثنائي كانفا</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">ألبوم الصور</a>
            <a href="#quiz" className="hover:text-amber-400 transition-colors">التحدي</a>
            <a href="#baccalaureate" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              دعوات البكالوريا
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerCelebration}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-spin text-slate-900" style={{ animationDuration: '4s' }} />
              <span>احتفل بعبقرينو 🎉</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 text-right">
            <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">محطات الصداقة والمغامرات 🚀</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">قصة الصحوبية</a>
            <a href="#traits" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">شخصية عبقرينو</a>
            <a href="#canva" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">ثنائي كانفا والتصميم</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">ألبوم الصور</a>
            <a href="#quiz" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400">تحدي: قد إيه تعرف عبقرينو؟</a>
            <a href="#baccalaureate" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-emerald-400 font-bold hover:bg-slate-800">دعوات النجاح في البكالوريا 🎓</a>
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">

        {/* 1. HERO SECTION */}
        <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 text-center lg:text-right space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
                  <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>إهداء خاص لأعز صديق وأخ | من كريم إلى عبقرينو</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25]">
                  الأسطورة{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 underline decoration-amber-500/40 decoration-wavy">
                    عبقرينو
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-bold block mt-3">
                    مصطفى محمد.. صاحب صاحبه وسند الأيام ❤️
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  &quot;عبقرينو ده بالنسبالي مش مجرد صاحب ده حياتي كلها.. بحكيله تفاصيل حياتي كلها صغيرها بكبيرها وهو بيسمعني وينصحني.. هو يقولي ذاكر وأنا أقوله ذاكر.. بنفرح لبعض ونزعل لبعض ونحس ببعض.. مفيش بينا فرق أنا وهو واحد فعلياً!&quot;
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <Calendar className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-400">تاريخ الميلاد</div>
                    <div className="text-sm font-bold text-slate-100">21 / 11 / 2009</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <ShieldCheck className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-400">البلد والجدعنة</div>
                    <div className="text-sm font-bold text-slate-100">الفشن 🦁</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <Coffee className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-400">الرحلة</div>
                    <div className="text-sm font-bold text-slate-100">إذاعة وكانفا 🎙️🎨</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <Trophy className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-400">الهدف والرجاء</div>
                    <div className="text-sm font-bold text-slate-100">أول بكالوريا 🎓</div>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={triggerCelebration}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Gift className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
                    <span>افتح الإهداء يا عبقرينو 🎁</span>
                    <Sparkles className="w-5 h-5 text-slate-900 animate-spin" style={{ animationDuration: '6s' }} />
                  </button>
                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-base transition-colors"
                  >
                    <span>محطات الصداقة</span>
                    <span>←</span>
                  </a>
                </div>
                <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-400">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>فاضل</span>
                  <span className="font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                    {daysToBirthday} يوم
                  </span>
                  <span>على عيد ميلاد عبقرينو القادم (21 نوفمبر) 🎂</span>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
                  <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-slate-900/90 shadow-2xl max-w-sm sm:max-w-md">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src="./1.png"
                        alt="مصطفى محمد - عبقرينو"
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>الأسطورة عبقرينو 👑</span>
                      </div>
                      <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-right">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-rose-400 font-bold">
                            <Heart className="w-3.5 h-3.5 fill-rose-500" />
                            <span>I Love You</span>
                          </div>
                          <div className="text-amber-400 text-xs font-semibold">
                            مصمم وفنان ومبرمج
                          </div>
                        </div>
                        <div className="text-sm font-bold text-white mt-1">
                          مصطفى محمد (عبقرينو)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FRIENDSHIP TIMELINE */}
        <section id="timeline" className="py-20 bg-slate-900/70 border-b border-slate-800/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>سجل الذكريات والمغامرات المشتركة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                محطات الملحمة: من الإذاعة المدرسية لإمبراطورية الفشن 🚀
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                كل خطوة، كل سهرة، وكل مغامرة صنعت من صداقتنا أسطورة لا تتكرر
              </p>
            </div>
            <div className="mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700">
              <div className="flex items-center gap-3 min-w-max px-2">
                {TIMELINE_EVENTS.map((event, idx) => {
                  const isSelected = event.id === selectedEventId;
                  return (
                    <button
                      key={event.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedEventId(event.id);
                      }}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all text-xs sm:text-sm font-bold cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-105'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/70 hover:border-slate-600'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black ${
                        isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{event.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-amber-500/30 shadow-2xl space-y-5 text-right relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                      {activeEvent.phase}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                        {getTimelineIcon(activeEvent.icon)}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">{activeEvent.tag}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                      {activeEvent.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amber-300/90 font-medium leading-relaxed">
                      {activeEvent.summary}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-slate-200 leading-relaxed text-sm sm:text-base">
                    {activeEvent.fullStory}
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border-r-4 border-amber-500 text-amber-200 italic font-bold text-sm sm:text-base">
                    &quot;{activeEvent.highlightQuote}&quot;
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        const curIdx = TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId);
                        const prevIdx = (curIdx - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length;
                        setSelectedEventId(TIMELINE_EVENTS[prevIdx].id);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                    >
                      ← المحطة السابقة
                    </button>
                    <span className="text-xs text-slate-400">
                      {TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId) + 1} من {TIMELINE_EVENTS.length}
                    </span>
                    <button
                      onClick={() => {
                        const curIdx = TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId);
                        const nextIdx = (curIdx + 1) % TIMELINE_EVENTS.length;
                        setSelectedEventId(TIMELINE_EVENTS[nextIdx].id);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer"
                    >
                      المحطة التالية →
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold text-slate-400 text-right px-2 mb-1">
                  فهرس محطات الصداقة:
                </div>
                {TIMELINE_EVENTS.map((event, idx) => {
                  const isCurrent = event.id === selectedEventId;
                  return (
                    <div
                      key={event.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedEventId(event.id);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all text-right cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-slate-800 border-amber-500/60 shadow-lg'
                          : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-700 flex items-center justify-center shrink-0">
                          {getTimelineIcon(event.icon)}
                        </div>
                        <div>
                          <div className={`text-xs font-bold truncate max-w-[190px] sm:max-w-[220px] ${
                            isCurrent ? 'text-amber-300' : 'text-slate-200'
                          }`}>
                            {event.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {event.phase}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-mono font-bold">
                        #{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. STORY SECTION */}
        <section id="story" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>رسالة وفاء وأخوة حقيقية</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                &quot;عبقرينو ده مش مجرد صاحب.. ده حياتي كلها&quot; ❤️
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                القصة الكاملة لصداقة كريم ومصطفى محمد من الإذاعة المدرسية حتى شوارع الفشن
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition"></div>
                  <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
                    <img
                      src="./عيد.png"
                      alt="كريم ومصطفى في العيد"
                      className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          صورة العيد 🌙
                        </span>
                        <span className="text-xs text-slate-400 font-medium">كريم & مصطفى</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        كتف في كتف.. إخوة جمعتهم الجدعنة والقلوب البيضاء
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-right">
                    <Radio className="w-5 h-5 text-amber-400 mb-2" />
                    <div className="text-xs text-slate-400">نقطة الانطلاق</div>
                    <div className="text-sm font-bold text-white mt-0.5">الإذاعة المدرسية</div>
                    <div className="text-[11px] text-amber-400/90 mt-1">نابغة بتواضع أسطوري!</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-right">
                    <MapPin className="w-5 h-5 text-rose-400 mb-2" />
                    <div className="text-xs text-slate-400">كسر المسافات</div>
                    <div className="text-sm font-bold text-white mt-0.5">سفر إلى الفشن</div>
                    <div className="text-[11px] text-rose-400/90 mt-1">مخصوص عشان أشوفك</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-slate-900/90 border border-amber-500/30 shadow-xl">
                  <Quote className="w-10 h-10 text-amber-500/40 absolute top-4 left-4 rotate-180" />
                  <h3 className="text-xl sm:text-2xl font-black text-amber-400 mb-4 flex items-center gap-2 text-right">
                    <span>شهادة حب وأخوة بقلم كريم</span>
                  </h3>
                  <div className="space-y-4 text-slate-200 leading-relaxed text-sm sm:text-base text-right">
                    <p>
                      &quot;أول معرفتنا ببعض كانت من <strong className="text-amber-300">الإذاعة المدرسية</strong> لما كنت بطلع أنا وهو.. كانت المدرسة كلها عمالة تتكلم عن عبقرينو وقد إيه هو شخصية نابغة والكل عارفه من أول يوم ليه! وأنا ساعتها كنت واقف معاه وأعرفه كـ &quot;مصطفى&quot;، وشوف كمية التواضع اللي فيه.
                    </p>
                    <p>
                      وبعدين روحنا ندوة لتعلم البرمجة، وكان عامل موقع وورهولي، انبهرت بيه جداً وخدت رقمه، وفضل يحكيلي قد إيه تعب عشان يعمله وكل المميزات اللي فيه لحد ما حببني في البرمجة وخلاني أخد خطوة التعلم وبدأت أبني لوحدي.
                    </p>
                    <p>
                      وكان أول مشروع مشترك هو <strong className="text-yellow-400">موقع سحورنا</strong>، حطينا فيه كل جهودنا، ولما المدرسين شافوه انبهروا وطلبوا نعملهم منصات تعليمية يشرحوا عليها دروسهم، وكنا بنقعد سهرانين للصبح نعملها سوا!
                    </p>
                    <p className="p-4 rounded-2xl bg-amber-500/10 border-r-4 border-amber-400 text-amber-200 font-semibold italic text-sm sm:text-base">
                      &quot;عبقرينو ده بالنسبالي مش مجرد صاحب، ده حياتي كلها.. بحكيله تفاصيل حياتي كلها صغيرها بكبيرها وهو بيسمعني وينصحني، هو يقولي ذاكر وأنا أقوله ذاكر.. وبفرح له من قلبي لما ينجح وهو بيفرحلي من قلبه لما أنجح! مفيش بينا فرق، أنا وهو واحد فعلياً، بنزعل لبعض ونفرح لبعض ونحس ببعض ومبنغلطش على بعض.&quot;
                    </p>
                    <p>
                      ورغم إن علاقتنا بدأت على النت وكل واحد من بلد.. إلا إني في تانية بكالوريا بقيت باخد دروس في <strong className="text-rose-400">الفشن بلده</strong> عشان أشوفه وقابلته مخصوص، وشفت عبقرينو الجدع اللي لما بيتخانق مع حد مبيسكتش ومبيسبش حقه!
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                        K
                      </div>
                      <span className="text-sm font-bold text-slate-300">أخوك وصاحبك: كريم (طريم / Kemo)</span>
                    </div>
                    <span className="text-xs text-amber-400 font-bold">21 / 11 / 2009 🎂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRAITS & INTERACTIVE STATIONS */}
        <section id="traits" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>الصفات والقدرات الخاصة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                كتالوج شخصية الأسطورة عبقرينو ⚡
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                خليط فريد من الطيبة والإيثار، والذكاء والمراكمة، وإدمان النسكافيه والشراسة وقت اللزوم!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {TRAITS.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/40 transition-all hover:-translate-y-1 group shadow-lg text-right"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {trait.icon === 'HeartHandshake' && <HeartHandshake className="w-6 h-6 text-amber-400" />}
                      {trait.icon === 'Flame' && <Flame className="w-6 h-6 text-rose-500" />}
                      {trait.icon === 'Coffee' && <Coffee className="w-6 h-6 text-amber-600" />}
                      {trait.icon === 'Clock' && <Clock className="w-6 h-6 text-purple-400" />}
                      {trait.icon === 'Palette' && <Palette className="w-6 h-6 text-cyan-400" />}
                      {trait.icon === 'GraduationCap' && <GraduationCap className="w-6 h-6 text-emerald-400" />}
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-900/80 text-amber-300 border border-slate-700 font-bold">
                      {trait.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{trait.title}</h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-3">{trait.subtitle}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{trait.description}</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">مستوى القوة</span>
                      <span className="text-amber-400">{trait.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${trait.color}`} style={{ width: `${trait.level}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Interactive Fun Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-600/30 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">محطة النسكافيه ☕</span>
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">اصنع نسكافيه لعبقرينو</h4>
                <p className="text-xs text-slate-400 mb-4">اضغط لتجهيز كوباية نسكافيه لرفع طاقة الإبداع والتركيز!</p>
                <div className="text-center py-3 bg-slate-950/60 rounded-2xl border border-amber-500/20 mb-4">
                  <div className="text-3xl font-black text-amber-400">{coffeeCount} كوباية</div>
                  <div className="text-xs text-slate-300 mt-1">التركيز في أعلى مستوياته للبرمجة والمذاكرة! ☕</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setCoffeeCount(c => c + 1);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>جهّز كوباية جديدة ☕</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-600/30 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">مؤشر المراكمة ⏳</span>
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">فن تأجيل الدروس</h4>
                <p className="text-xs text-slate-400 mb-4">تحكّم في نسبة المراكمة وشوف النتيجة في الامتحان!</p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-xs text-slate-300 font-bold">
                    <span>نسبة المراكمة:</span>
                    <span className="text-purple-400 font-black">{procrastinationLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={procrastinationLevel}
                    onChange={(e) => setProcrastinationLevel(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-purple-500/20 text-xs text-purple-200">
                  {procrastinationLevel > 80 ? "مراكم كل المنهج.. بس هيسهر ليلة الامتحان ويطلع الأول كالعادة! 🎯" : "مستوى مراكمة هادئ، كده هيقفل الامتحانات بفرق شاسع! 🏆"}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-600/30 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">جهاز الإنذار 🦁</span>
                  <span className="text-2xl">⚠️</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">تحذير لمن يقترب!</h4>
                <p className="text-xs text-slate-400 mb-4">جرب تضغط الزر وشوف إيه اللي بيحصل للي ييجي عليه في الفشن:</p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setFerocityLevel(!ferocityLevel);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer mb-4 ${
                    ferocityLevel ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>{ferocityLevel ? "الحالة: تم القرقشة بأسنانه 🦷" : "اختبر غضب عبقرينو!"}</span>
                </button>
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-red-500/20 text-xs text-slate-300">
                  {ferocityLevel ? "🚨 تحذير: تم تفعيل الشراسة الكاملة! عبقرينو مبيسيبش حقه ولا بيتهاون مع أي حد ييجي عليه!" : "💡 عبقرينو جدع وأطيب قلب مع الكل، لكن خطوطه الحمراء ممنوع الاقتراب منها!"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CANVA & ARTWORK SECTION */}
        <section id="canva" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
                <Palette className="w-4 h-4 text-cyan-400" />
                <span>ثنائي الإبداع والتصميم والتطوير</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                شراكة كانفا ومغامرات البرمجة 🎨💻
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                من بيكسارت لكانفا.. لورقة ملخص المنهج بختم الوزارة وتحدي عملة الـ 500 جنيه وإمبراطورية ND Network
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="p-4 sm:p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl space-y-4">
                  <div className="flex gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('cyber');
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === 'cyber' ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                      <span>عبقرينو الذكاء الاصطناعي</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('military');
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === 'military' ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>بوستر عبقرينو المقاتل 🦁</span>
                    </button>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                    {activeTab === 'cyber' ? (
                      <img
                        src="./Gemini-Generated-Image-uidlzruidlzruidl.png"
                        alt="عبقرينو ملك الذكاء الاصطناعي"
                        className="w-full h-full object-cover sm:object-contain animate-fadeIn"
                      />
                    ) : (
                      <img
                        src="./SmartSelect_٢٠٢٦١٠٢٧_٠٠١٤١٦_WhatsApp.jpg"
                        alt="بوستر عبقرينو المقاتل"
                        className="w-full h-full object-contain animate-fadeIn"
                      />
                    )}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
                    {activeTab === 'cyber' ? (
                      <div>
                        <div className="text-sm font-bold text-white mb-1">العبقرية في الأتمتة والذكاء الاصطناعي</div>
                        <p className="text-xs text-slate-400 leading-relaxed">تصميم يجسد مهارات عبقرينو المتعددة بين البرمجة، أنظمة الأتمتة (n8n)، وأدوات الذكاء الاصطناعي الحديثة مثل Claude Code و OpenClaw.</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-bold text-white mb-1">الشهامة والقوة والشراسة (الفشن)</div>
                        <p className="text-xs text-slate-400 leading-relaxed">بوستر بالزي العسكري وشعار عبقرينو بالبرق الأحمر، يجسد المعنى الأصيل: &quot;جدع مع كل الناس بس اللي ييجي عليه يقرقشو بأسنانه وما بيسكتش لحد!&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-5 text-right">
                <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Brush className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">التحول من بيكسارت إلى كانفا</h3>
                      <span className="text-xs text-cyan-400">تدريب وإقناع حتى الإتقان</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    كريم كان متعود على PicsArt ومكنش بيحب كانفا، لحد ما عبقرينو بصبره وذوقه فضل وراه وعلمه كل أدواته لحد ما كريم حبه وبقوا ثنائي كانفا الأول!
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">ملخص المنهج وختم الوزارة 🕵️‍♂️</h3>
                      <span className="text-xs text-emerald-400">المغامرة الكبرى داخل اللجان</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    ورقة كانفا واحدة طبعوها بختم الوزارة غششت المدرسة كلها قبل الامتحان! اتقفشوا لكن ربنا سلم وبقت أشهر حكاية مضحكة في تاريخهم المدرسي.
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">تحدي الـ 500 جنيه وإمبراطورية الواتس</h3>
                      <span className="text-xs text-amber-400">منصة اتق الله & ND Network</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    تنافسوا في تصميم العملة الجديدة، وأطلقوا إمبراطورية تعليمية متكاملة على الواتساب بمذكرات وأسئلة وأدمنز تحت إدارتهم لخدمة الطلاب!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GALLERY & MEMORIES */}
        <section id="gallery" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>معرض الصور والذكريات</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                ألبوم الأيام الحلوة واللقطات الخالدة 📸
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                كل صورة بتحكي قصة وكل لقطة شاهدة على الجدعنة والأخوة الصافية
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                onClick={() => { sound.playClick(); setFilter('all'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${filter === 'all' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                كل الصور ({PHOTOS.length})
              </button>
              <button
                onClick={() => { sound.playClick(); setFilter('highlight'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${filter === 'highlight' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                أبرز اللقطات
              </button>
              <button
                onClick={() => { sound.playClick(); setFilter('together'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${filter === 'together' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                أيامنا سوا (كريم ومصطفى) 🤝
              </button>
              <button
                onClick={() => { sound.playClick(); setFilter('design'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${filter === 'design' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                التصاميم والبوسترات 🎨
              </button>
              <button
                onClick={() => { sound.playClick(); setFilter('memories'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${filter === 'memories' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                خروجات وذكريات 🍃
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPhoto(photo);
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-900">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      {photo.tag && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 border border-amber-500/30">
                          {photo.tag}
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-bold text-white mb-0.5">{photo.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 left-0 sm:left-2 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer z-10"
                  aria-label="إغلاق"
                >
                  <X className="w-6 h-6" />
                </button>
                <button
                  onClick={prevPhoto}
                  className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition cursor-pointer z-10"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition cursor-pointer z-10"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 max-h-[70vh] flex items-center justify-center shadow-2xl">
                  <img src={selectedPhoto.src} alt={selectedPhoto.title} className="max-h-[70vh] max-w-full object-contain" />
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-right w-full">
                  <div className="flex items-center justify-between mb-1">
                    {selectedPhoto.tag && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {selectedPhoto.tag}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white">{selectedPhoto.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedPhoto.caption}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 7. QUIZ CHALLENGE */}
        <section id="quiz" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>تحدي أصدقاء عبقرينو</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                قد إيه تعرف الأسطورة عبقرينو؟ 🧠
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                7 أسئلة حصرية لا يجاوبها إلا اللي حافظ مصطفى محمد وعارف كل أسراره وتفاصيله!
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl">
              {!showResult ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                    <span>السؤال {currentQuestion + 1} من {QUIZ_QUESTIONS.length}</span>
                    <span className="text-amber-400 font-bold">{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-6">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-right leading-relaxed">
                    {q.question}
                  </h3>
                  <div className="space-y-3 mb-6">
                    {q.options.map((option, idx) => {
                      const isSelected = selectedAnswers[currentQuestion] === idx;
                      const isCorrect = idx === q.correctIndex;
                      let btnStyle = "bg-slate-900/80 border-slate-700 hover:border-amber-500/60 text-slate-200";
                      if (answeredCurrent) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10";
                        } else if (isSelected) {
                          btnStyle = "bg-red-950/60 border-red-500 text-red-200";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                        }
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={answeredCurrent}
                          className={`w-full p-4 rounded-2xl border text-right font-medium text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span className="flex-1">{option}</span>
                          {answeredCurrent && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mr-2" />}
                          {answeredCurrent && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0 mr-2" />}
                        </button>
                      );
                    })}
                  </div>
                  {answeredCurrent && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-right mb-6 animate-fadeIn">
                      <span className="font-bold">التفسير: </span>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                  {answeredCurrent && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer flex items-center gap-2"
                      >
                        <span>{currentQuestion + 1 < QUIZ_QUESTIONS.length ? "السؤال التالي" : "عرض النتيجة النهائية"}</span>
                        <span>←</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      نتيجتك في اختبار عبقرينو: {calculateScore()} من {QUIZ_QUESTIONS.length} 🎯
                    </h3>
                    <p className="text-base text-slate-300">
                      {calculateScore() >= 6 ? "ما شاء الله! أنت حافظ عبقرينو صم كأنك صاحبه كريم بالظبط! 🏆👑" : "عاش جداً! علاقتك بعبقرينو قوية وفاهم شخصيته ومغامراته كويس! 🤝"}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>إعادة الاختبار من جديد</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. BACCALAUREATE WALL */}
        <section id="baccalaureate" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>حلم التفوق والأوائل</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                حائط الدعوات للتفوق في البكالوريا 🎓
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                &quot;ذكي جداً وشاطر وبيجيب درجات عالية.. وربنا يوفقه ويطلع الأول في البكالوريا!&quot;
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-emerald-500/30 shadow-2xl space-y-5 sticky top-28">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold text-right">
                    <Sparkles className="w-4 h-4" />
                    <span>شارك بدعوة أو كلمة طيبة لمصطفى</span>
                  </div>
                  <form onSubmit={handleAddPrayer} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">اسمك</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="مثال: كريم، صاحبك في كانفا، أخوك..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">الدعوة أو الأمنية للتفوق في البكالوريا</label>
                      <textarea
                        rows={4}
                        value={newPrayer}
                        onChange={(e) => setNewPrayer(e.target.value)}
                        placeholder="اكتب دعوة من قلبك لعبقرينو بالتوفيق والنجاح وأعلى المراتب..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 text-right resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition cursor-pointer"
                    >
                      <Send className="w-4 h-4 rotate-180" />
                      <span>انشر الدعوة على الحائط 🤲</span>
                    </button>
                    {submittedPrayer && (
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>تمت إضافة دعوتك بنجاح! جزاك الله خيراً ✨</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                {prayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all text-right space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleAmen(prayer.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span>قل آمين ({prayer.amenCount})</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400">{prayer.sender}</span>
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">🎓</div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      {prayer.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  عبقرينو (مصطفى محمد)
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  21/11/2009 🎂
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                هدية تذكارية صُممت بكل حب من كريم لصاحبه وأخوه الغالي عبقرينو.. ربنا يديم الصحوبية والجدعنة والتفوق دائماً وأبداً.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
              <Coffee className="w-4 h-4 text-amber-500" />
              <span>مدعوم بكوبايات نسكافيه وسهرات كانفا ☕🎨</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition cursor-pointer"
            >
              <span>الرجوع للأعلى</span>
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-1.5">
              <span>صُنع مع</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>للأخ والسند مصطفى محمد (عبقرينو)</span>
            </div>
            <div>
              <span>جميع الحقوق محفوظة لصداقة كريم وعبقرينو © 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= GIFT MODAL ================= */}
      {isGiftModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsGiftModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/20 text-center my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsGiftModalOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
              <Award className="w-9 h-9" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>وسام الأخوة والجدعنة الأبدي</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              إهداء خاص لأغلى صاحب وأخ 👑
            </h3>
            <div className="text-amber-400 font-bold text-lg mb-6">
              إلى الأسطورة: مصطفى محمد (عبقرينو)
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-amber-500/30 text-right space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed mb-6 relative">
              <p>
                يا عبقرينو.. من أول يوم في <strong className="text-amber-300">الإذاعة المدرسية</strong> لما المدرسة كلها كانت بتتكلم عنك وعن نبوغك، وتواضعك اللي بهرني، لحد ما حببتني في البرمجة وبنينا <strong className="text-yellow-400">سحورنا</strong> والفايربيز وكسرنا الدنيا في كانفا وملخص المنهج وتحدي الـ 500 جنيه!
              </p>
              <p>
                ورغم إننا من بلدين مختلفتين، سافرتلك الفشن مخصوص عشان أشوفك، لأنك بالنسبة لي مش مجرد صاحب.. <strong className="text-rose-400">أنت حياتي كلها</strong>! بنفرح لبعض ونزعل لبعض ونحس ببعض.. مفيش فرق بينا إحنا واحد فعلياً.
              </p>
              <p className="font-bold text-amber-300">
                الموقع ده هدية بسيطة من أخوك وصاحبك كريم عشان يفضل شاهد على قصة أخوة نادرة ومحفورة في القلب طول العمر ❤️
              </p>
              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <span className="block font-bold text-white text-sm">كريم (طريم)</span>
                  <span>أخوك وصاحبك الوفي</span>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-amber-400">21 / 11 / 2009</span>
                  <span>تاريخ ميلاد الأسطورة</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playCelebration();
                  confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>فجّر احتفالات تانية! 🎉</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الشهادة 🖨️</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
