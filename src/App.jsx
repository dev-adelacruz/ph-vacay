import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calendar, Palmtree, Coffee, ChevronRight, Info, CheckCircle2,
  AlertCircle, PlaneTakeoff, Sun, X, Clock, Banknote, CalendarDays,
  ArrowRight, History, Eye, EyeOff, Sparkles, Coins, Map,
  Construction, Copy, Check, Share2, Star, Bookmark, ChevronDown,
  MessageSquareQuote, Trash2, ChevronUp, Loader2, Timer, Ghost, Briefcase,
  MapPin, Wand2, ChevronLeft, LayoutList
} from 'lucide-react';

const HOLIDAYS_2026 = [
  { date: '2026-01-01', name: 'New Year\'s Day', type: 'Regular', description: 'Start the year right. Usually followed by a quiet day of recovery.' },
  { date: '2026-02-17', name: 'Chinese New Year', type: 'Special', description: 'The Year of the Horse begins! Celebrate with family and tikoy.' },
  { date: '2026-02-25', name: 'EDSA Revolution Anniversary', type: 'Special', description: 'Commemorating the bloodless revolution that restored democracy.' },
  { date: '2026-03-20', name: "Eid'l Fitr (Feast of Ramadhan)", type: 'Regular', description: 'Marks the end of Ramadhan. Proclaimed via Proclamation No. 1189, s. 2026.' },
  { date: '2026-04-02', name: 'Maundy Thursday', type: 'Regular', description: 'Part of the Holy Week observance. Most businesses are closed.' },
  { date: '2026-04-03', name: 'Good Friday', type: 'Regular', description: 'A solemn day of reflection. Expect minimal public transport.' },
  { date: '2026-04-04', name: 'Black Saturday', type: 'Special', description: 'The day between Good Friday and Easter Sunday.' },
  { date: '2026-04-09', name: 'Araw ng Kagitingan', type: 'Regular', description: 'Day of Valor, honoring the fall of Bataan during WWII.' },
  { date: '2026-05-01', name: 'Labor Day', type: 'Regular', description: 'Honoring the contributions of Filipino workers worldwide.' },
  { date: '2026-06-12', name: 'Independence Day', type: 'Regular', description: 'Commemorating the Philippine Declaration of Independence.' },
  { date: '2026-08-21', name: 'Ninoy Aquino Day', type: 'Special', description: 'Honoring the martyrdom of Benigno "Ninoy" Aquino Jr.' },
  { date: '2026-08-31', name: 'National Heroes Day', type: 'Regular', description: 'Honoring all heroes of the Philippine revolution.' },
  { date: '2026-11-01', name: 'All Saints\' Day', type: 'Special', description: 'Undas tradition. Visiting departed loved ones at cemeteries.' },
  { date: '2026-11-02', name: 'All Souls\' Day', type: 'Special', description: 'Additional day for Undas observances.' },
  { date: '2026-11-30', name: 'Bonifacio Day', type: 'Regular', description: 'Honoring Andres Bonifacio, the Father of the Philippine Revolution.' },
  { date: '2026-12-08', name: 'Feast of the Immaculate Conception', type: 'Special', description: 'A significant religious holiday in the Catholic calendar.' },
  { date: '2026-12-24', name: 'Christmas Eve', type: 'Special', description: 'Noche Buena with the family.' },
  { date: '2026-12-25', name: 'Christmas Day', type: 'Regular', description: 'The biggest holiday celebration in the Philippines.' },
  { date: '2026-12-30', name: 'Rizal Day', type: 'Regular', description: 'Honoring the life and works of Dr. Jose Rizal.' },
  { date: '2026-12-31', name: 'Last Day of the Year', type: 'Special', description: 'Preparing for the Media Noche and New Year festivities.' },
];

const HOLIDAYS_JP_2026 = [
  { date: '2026-01-01', name: '元日', type: '祝日', description: '正月だ。寝ていい。誰も文句言わない。' },
  { date: '2026-01-12', name: '成人の日', type: '祝日', description: '新成人が晴れ着で街を歩く日。自分は二度寝決定。' },
  { date: '2026-02-11', name: '建国記念の日', type: '祝日', description: '日本が日本になった日。布団の中でゆっくり感謝しよう。' },
  { date: '2026-02-23', name: '天皇誕生日', type: '祝日', description: '陛下のお誕生日。国民全員が休む正当な理由ができた。' },
  { date: '2026-03-20', name: '春分の日', type: '祝日', description: '昼と夜が同じ長さ。仕事も休みも五分五分でいきたい。' },
  { date: '2026-04-29', name: '昭和の日', type: '祝日', description: 'ゴールデンウィーク突入。ここからが本番。' },
  { date: '2026-05-03', name: '憲法記念日', type: '祝日', description: 'GW真っ只中。新幹線はもう満席。お疲れ様です。' },
  { date: '2026-05-04', name: 'みどりの日', type: '祝日', description: '緑を愛でる日。公園で寝そべるのが正しい過ごし方。' },
  { date: '2026-05-05', name: 'こどもの日', type: '祝日', description: 'GW最終日。明日から現実に戻る前の最後の抵抗。' },
  { date: '2026-07-20', name: '海の日', type: '祝日', description: '夏本番。海に行くか、クーラーの中で海の動画を見るかの二択。' },
  { date: '2026-08-11', name: '山の日', type: '祝日', description: 'お盆前の祝日。帰省ラッシュがもう始まっている。' },
  { date: '2026-09-21', name: '敬老の日', type: '祝日', description: '祖父母に感謝する日。自分も早く隠居したい。' },
  { date: '2026-09-23', name: '秋分の日', type: '祝日', description: '秋が来た。食欲・睡眠・休暇、全部いただきます。' },
  { date: '2026-10-12', name: 'スポーツの日', type: '祝日', description: '体を動かす日…らしい。ソファで観戦も立派なスポーツ観戦。' },
  { date: '2026-11-03', name: '文化の日', type: '祝日', description: '文化を楽しむ日。読書でも映画でも。昼寝も文化だ。' },
  { date: '2026-11-23', name: '勤労感謝の日', type: '祝日', description: '働く人すべてに感謝。特に今年の自分、本当によく頑張った。' },
];

const MONTH_DESTINATIONS = {
  'January': { loc: 'Sagada', tip: 'Perfectly chilly for coffee & caves.' },
  'February': { loc: 'Baguio', tip: 'Panagbenga flowers & strawberry taho.' },
  'March': { loc: 'El Nido', tip: 'Summer begins! Beat the April crowd.' },
  'April': { loc: 'Boracay', tip: 'Classic Holy Week white sand vibes.' },
  'May': { loc: 'Siargao', tip: 'Surf\'s up. Catch the Pacific swell.' },
  'June': { loc: 'Batanes', tip: 'Rare window of clear blue skies.' },
  'August': { loc: 'Davao', tip: 'Kadayawan feast & Durian season.' },
  'November': { loc: 'Tagaytay', tip: 'Bulalo weather is officially back.' },
  'December': { loc: 'Elyu', tip: 'The ultimate year-end party & surf.' }
};

const MONTH_DESTINATIONS_JP = {
  '1月':  { loc: '京都',   tip: '観光客が減る真冬。寺が静かで最高。' },
  '2月':  { loc: '北海道', tip: 'さっぽろ雪まつり。体は冷えるが心が溶ける。' },
  '3月':  { loc: '東京',   tip: '桜の開花直前。人混みゼロで先取りできる。' },
  '4月':  { loc: '吉野',   tip: 'GW前の山桜。写真が勝手に映える。' },
  '5月':  { loc: '沖縄',   tip: 'GW明けの海が穏やか。もう夏水着でいい。' },
  '7月':  { loc: '京都',   tip: '祇園祭シーズン。暑いが祭りの熱気はそれ以上。' },
  '8月':  { loc: '青森',   tip: 'ねぶた祭。一度見ると毎年来たくなる。' },
  '9月':  { loc: '軽井沢', tip: '紅葉前の静かな高原。混雑ゼロ、空気最高。' },
  '10月': { loc: '奈良',   tip: '鹿と紅葉と正倉院展。秋の三点セット。' },
  '11月': { loc: '京都',   tip: '紅葉ピーク。混雑覚悟で美しさは本物。' },
};

const STORAGE_KEY_PH   = 'ph_vacay_planned_ids_2026';
const STORAGE_KEY_JP   = 'jp_vacay_planned_ids_2026';
const VIEW_STORAGE_KEY = 'ph_vacay_layout_mode';
const DAILY_RATE_KEY   = 'ph_vacay_daily_rate';
const COUNTRY_KEY      = 'ph_vacay_country';

const HUSTLE_MULTIPLIER    = { Regular: 2.0, Special: 1.3 };
const HUSTLE_MULTIPLIER_JP = { '祝日': 1.35 };

const STRINGS = {
  ph: {
    logoPrefix: 'PH',
    pageTitle: 'PH Long Weekend Planner 2026',
    masterCalendar: 'Master Your Calendar',
    strategyGuide: '2026 Strategy Guide',
    strategyBullets: [
      { prefix: 'No-Brainers:', body: 'Natural 3-day breaks. Pure profit.' },
      { prefix: 'Bridge Deals:', body: '1 leave day = 4 days off. High ROI.' },
      { prefix: 'The Hustle:', body: 'Working today? Regular (200%), Special (130%).' },
    ],
    dailyRateLabel: 'Your Daily Rate',
    dailyRatePlaceholder: 'e.g. 2000',
    currencySymbol: '₱',
    multiplierHint: (rate) => `Regular → ₱${(rate * 2).toLocaleString()} · Special → ₱${(rate * 1.3).toLocaleString()}`,
    roadmapTitle: '2026 Roadmap',
    calendarTitle: 'Calendar View',
    filterAll: 'Full Year',
    filterLong: 'No-Brainers',
    badgeLongWeekend: 'Tropical Break',
    badgeBridge: 'Hackable',
    badgeHustleRegular: '200% Jackpot',
    badgeHustleSpecial: '130% Bonus',
    calEscape: '🏝️ Escape',
    calPayday: '₱ Payday',
    quietMonthTitle: 'Quiet month ahead!',
    quietMonthBody: 'No public holidays in this month. Perfect for a productive sprint or a quiet off-peak trip.',
    jumpNext: 'Jump to Next Holiday',
    escapeSequence: 'The Escape Sequence',
    bossWhispererTitle: 'Boss-Whisperer',
    bossWhispererSub: 'Draft leave request',
    tones: { chill: 'Chill', pro: 'Pro', ghost: 'Ghost' },
    rewardLabel: 'The Reward',
    costLabel: 'Day Off Cost',
    daysOff: (n) => `${n} Days Off`,
    paydayLabel: 'The Payday',
    bonusLabel: 'Bonus Tip',
    paydayValue: 'Double Pay! 💸',
    bonusValue: '+30% Bonus ✨',
    addToPlan: 'Add to Plan',
    removeHit: 'Remove Hit',
    gotIt: 'Got it',
    drawerHeading: 'Your Escape Plan',
    hitsPlanned: (n) => `${n} Hits Planned`,
    editPlan: 'Edit Plan',
    managing: 'Managing',
    copyPlan: 'Copy Plan',
    share: 'Share',
    shared: 'Shared!',
    countdown: (n, name) => `${n} days to ${name}`,
    vacayLabel: 'Vacay',
    hustleLabel: 'Hustle',
    sharePlanHeader: 'My 2026 PH Holiday Plan 🌴',
  },
  jp: {
    logoPrefix: 'JP',
    pageTitle: 'JP祝日プランナー 2026',
    masterCalendar: '祝日を制する者、人生を制す',
    strategyGuide: '2026年 有給攻略ガイド',
    strategyBullets: [
      { prefix: '確定連休：', body: '何もしなくても3日休める。神様からの贈り物。' },
      { prefix: '橋渡し作戦：', body: '有給1日で4連休。費用対効果がバグってる。' },
      { prefix: '休日出勤：', body: '今日働くなら135%割増賃金。せめて稼ごう。' },
    ],
    dailyRateLabel: '日給はおいくら？',
    dailyRatePlaceholder: '例：20000',
    currencySymbol: '¥',
    multiplierHint: (rate) => `祝日出勤 → ¥${Math.round(rate * 1.35).toLocaleString()}（135%割増）`,
    roadmapTitle: '2026年 祝日ロードマップ',
    calendarTitle: 'カレンダービュー',
    filterAll: '全祝日',
    filterLong: '連休だけ',
    badgeLongWeekend: '確定連休',
    badgeBridge: '橋渡しチャンス',
    badgeHustleRegular: '135% UP',
    badgeHustleSpecial: '135% UP',
    calEscape: '🗾 逃亡',
    calPayday: '¥ 割増',
    quietMonthTitle: 'この月は祝日なし',
    quietMonthBody: '今月は静かです。計画的に仕事を片付けるか、こっそり有給を取るチャンス。',
    jumpNext: '次の祝日へジャンプ',
    escapeSequence: '連休シーケンス',
    bossWhispererTitle: '上司説得ジェネレーター',
    bossWhispererSub: '休暇申請文を生成',
    tones: { chill: 'ゆるめ', pro: 'ビジネス', ghost: 'ガチ消え' },
    rewardLabel: 'リターン',
    costLabel: '有給コスト',
    daysOff: (n) => `${n}日間オフ`,
    paydayLabel: '割増賃金',
    bonusLabel: 'ボーナス情報',
    paydayValue: '135%割増！💸',
    bonusValue: '+35%ボーナス ✨',
    addToPlan: 'プランに追加',
    removeHit: 'プランから削除',
    gotIt: '了解！',
    drawerHeading: '俺の脱出計画',
    hitsPlanned: (n) => `${n}件の祝日を計画中`,
    editPlan: 'プランを編集',
    managing: '編集中',
    copyPlan: 'コピー',
    share: 'シェア',
    shared: 'シェア済み！',
    countdown: (n, name) => `${name}まであと${n}日`,
    vacayLabel: '休暇',
    hustleLabel: '出勤',
    sharePlanHeader: '俺の2026年 祝日脱出計画 🗾',
  },
};

const App = () => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('vacationer');
  const [layoutMode, setLayoutMode] = useState(() => {
    try { return localStorage.getItem(VIEW_STORAGE_KEY) || 'roadmap'; } catch { return 'roadmap'; }
  });
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 0, 1));
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [country, setCountry] = useState(() => {
    try { return localStorage.getItem(COUNTRY_KEY) || 'ph'; } catch { return 'ph'; }
  });
  const [plannedIds, setPlannedIds] = useState(() => {
    try {
      const c = localStorage.getItem(COUNTRY_KEY) || 'ph';
      const key = c === 'jp' ? STORAGE_KEY_JP : STORAGE_KEY_PH;
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch { return []; }
  });
  const [copyStatus, setCopyStatus] = useState(null);
  const [isWhispererExpanded, setIsWhispererExpanded] = useState(true);
  const [whispererTone, setWhispererTone] = useState('chill');
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [dailyRate, setDailyRate] = useState(() => {
    try { return localStorage.getItem(DAILY_RATE_KEY) || ''; } catch { return ''; }
  });

  // Derived aliases
  const S                   = STRINGS[country];
  const isJP                = country === 'jp';
  const HOLIDAYS_ACTIVE     = isJP ? HOLIDAYS_JP_2026 : HOLIDAYS_2026;
  const DESTINATIONS_ACTIVE = isJP ? MONTH_DESTINATIONS_JP : MONTH_DESTINATIONS;
  const STORAGE_KEY_ACTIVE  = isJP ? STORAGE_KEY_JP : STORAGE_KEY_PH;
  const HUSTLE_MULTI_ACTIVE = isJP ? HUSTLE_MULTIPLIER_JP : HUSTLE_MULTIPLIER;
  const DATE_LOCALE         = isJP ? 'ja-JP' : 'en-PH';
  const DAY_LABELS          = isJP
    ? ['日', '月', '火', '水', '木', '金', '土']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTH_ABBREVS       = isJP
    ? ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const handleCountryChange = (next) => {
    setCountry(next);
    try { localStorage.setItem(COUNTRY_KEY, next); } catch {}
    const key = next === 'jp' ? STORAGE_KEY_JP : STORAGE_KEY_PH;
    try { setPlannedIds(JSON.parse(localStorage.getItem(key)) || []); } catch { setPlannedIds([]); }
    setIsPlanDrawerOpen(false);
    setSelectedHoliday(null);
  };

  const computePay = (holiday) => {
    const rate = Number(dailyRate);
    if (!dailyRate || isNaN(rate) || rate <= 0) return null;
    const multiplier = HUSTLE_MULTI_ACTIVE[holiday.type] || 1;
    const currency = isJP ? 'JPY' : 'PHP';
    return (rate * multiplier).toLocaleString(DATE_LOCALE, { style: 'currency', currency, maximumFractionDigits: 0 });
  };

  const handleDailyRateChange = (val) => {
    setDailyRate(val);
    try { localStorage.setItem(DAILY_RATE_KEY, val); } catch {}
  };

  const copyTimeout = useRef(null);

  const isHustler = viewMode === 'hustler';
  const textAccentClass = isHustler ? 'text-orange-600' : (isJP ? 'text-red-600' : 'text-teal-600');
  const bgAccentClass   = isHustler ? 'bg-orange-500'  : (isJP ? 'bg-red-600'   : 'bg-teal-600');
  const ringAccentClass = isHustler ? 'ring-orange-400': (isJP ? 'ring-red-400'  : 'ring-teal-500');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    document.title = S.pageTitle;
  }, [country]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const processedData = useMemo(() => {
    return HOLIDAYS_ACTIVE.map(holiday => {
      const d = new Date(holiday.date);
      const dayOfWeek = d.getDay();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let status = 'Standard';
      let recommendation = '';
      let vacationDates = [];

      const formatDate = (dateObj) => ({
        label: dateObj.toLocaleDateString(DATE_LOCALE, { month: 'short', day: 'numeric' }),
        month: dateObj.toLocaleDateString(DATE_LOCALE, { month: 'long' }),
        fullDate: dateObj.toISOString().split('T')[0],
        dayName: dayNames[dateObj.getDay()]
      });

      if (dayOfWeek === 1) {
        status = 'Long Weekend';
        const sat = new Date(holiday.date); sat.setDate(d.getDate() - 2);
        const sun = new Date(holiday.date); sun.setDate(d.getDate() - 1);
        vacationDates = [formatDate(sat), formatDate(sun), formatDate(d)];
      } else if (dayOfWeek === 5) {
        status = 'Long Weekend';
        const sat = new Date(holiday.date); sat.setDate(d.getDate() + 1);
        const sun = new Date(holiday.date); sun.setDate(d.getDate() + 2);
        vacationDates = [formatDate(d), formatDate(sat), formatDate(sun)];
      } else if (dayOfWeek === 4) {
        status = 'Bridge Opportunity';
        recommendation = 'Take Friday off for 4 days';
        const fri = new Date(holiday.date); fri.setDate(d.getDate() + 1);
        const sat = new Date(holiday.date); sat.setDate(d.getDate() + 2);
        const sun = new Date(holiday.date); sun.setDate(d.getDate() + 3);
        vacationDates = [formatDate(d), formatDate(fri), formatDate(sat), formatDate(sun)];
      } else if (dayOfWeek === 2) {
        status = 'Bridge Opportunity';
        recommendation = 'Take Monday off for 4 days';
        const mon = new Date(holiday.date); mon.setDate(d.getDate() - 1);
        const sat = new Date(holiday.date); sat.setDate(d.getDate() - 3);
        const sun = new Date(holiday.date); sun.setDate(d.getDate() - 2);
        vacationDates = [formatDate(sat), formatDate(sun), formatDate(mon), formatDate(d)];
      } else {
        vacationDates = [formatDate(d)];
      }

      const holidayDate = new Date(holiday.date);
      holidayDate.setHours(0,0,0,0);

      return {
        ...holiday,
        monthName: formatDate(d).month,
        dayName: dayNames[dayOfWeek],
        dayOfWeek,
        status,
        recommendation,
        vacationDates,
        potentialDays: vacationDates.length,
        isPast: holidayDate < today,
        id: holiday.date
      };
    });
  }, [today, country]);

  const stats = useMemo(() => {
    const upcoming = processedData.filter(h => !h.isPast);
    const longWeekends = upcoming.filter(h => h.status === 'Long Weekend').length;
    const bridges = upcoming.filter(h => h.status === 'Bridge Opportunity').length;

    const nextHoliday = upcoming[0];
    let daysUntil = 0;
    if (nextHoliday) {
      const diffTime = Math.abs(new Date(nextHoliday.date) - today);
      daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return { longWeekends, bridges, totalRemaining: upcoming.length, nextHoliday, daysUntil };
  }, [processedData, today]);

  const plannedHolidays = useMemo(() => {
    return processedData.filter(h => plannedIds.includes(h.id));
  }, [processedData, plannedIds]);

  const groupedHolidays = useMemo(() => {
    const filtered = processedData.filter(h => {
      if (!showPast && h.isPast) return false;
      if (filter === 'long') return h.status === 'Long Weekend' || h.status === 'Bridge Opportunity';
      return true;
    });

    return filtered.reduce((groups, holiday) => {
      const month = holiday.monthName;
      if (!groups[month]) groups[month] = [];
      groups[month].push(holiday);
      return groups;
    }, {});
  }, [processedData, filter, showPast]);

  const handlePlannedToggle = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const newIds = plannedIds.includes(id) ? plannedIds.filter(i => i !== id) : [...plannedIds, id];
    setPlannedIds(newIds);
    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(newIds));
    if (newIds.length === 0) setIsPlanDrawerOpen(false);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopyStatus(type);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopyStatus(null), 2000);
  };

  const generateOOOText = (h) => {
    const dates = h.vacationDates.map(d => d.label).join(isJP ? '、' : ', ');
    if (isJP) {
      return {
        chill: `${h.name}なので${dates}はお休みをいただきます。帰ったらちゃんとやります。よろしくお願いします🍵`,
        pro:   `${dates}の期間、${h.name}に伴い休暇を取得いたします。業務の引き継ぎは事前に完了させます。何卒よろしくお願い申し上げます。`,
        ghost: `${dates}は完全オフラインです。${h.name}です。Slackもメールも見ません。緊急の場合は…緊急かどうかもう一度考えてください。🗾`,
      }[whispererTone];
    }
    return {
      chill: `Hi Boss! Just a heads up that I'll be offline from ${dates} to maximize national productivity via deep rest. Will be back fully charged! 🥥`,
      pro:   `I'm writing to request leave for the ${h.name} sequence (${dates}). I will ensure all pending tasks are handed over before my absence. Thank you!`,
      ghost: `Going dark for ${h.name}. Sequence: ${dates}. No Slack, no emails, no "quick questions." If it's an emergency, please reconsider. See you soon! 🏝️`,
    }[whispererTone];
  };

  const handleSharePlan = async () => {
    const summary = plannedHolidays.map(h => `• ${h.name} (${h.vacationDates[0].label} – ${h.vacationDates.slice(-1)[0].label})`).join('\n');
    const text = `${S.sharePlanHeader}\n\n${summary}\n\n👉 Plan yours at https://ph-vacay.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        setCopyStatus('plan');
        if (copyTimeout.current) clearTimeout(copyTimeout.current);
        copyTimeout.current = setTimeout(() => setCopyStatus(null), 2000);
        return;
      } catch { /* user cancelled — fall through to clipboard */ }
    }
    copyToClipboard(text, 'plan');
  };

  const openHolidayModal = (h) => {
    setIsWhispererExpanded(true);
    setSelectedHoliday(h);
  };

  const toggleLayoutMode = () => {
    const nextMode = layoutMode === 'roadmap' ? 'calendar' : 'roadmap';
    setLayoutMode(nextMode);
    localStorage.setItem(VIEW_STORAGE_KEY, nextMode);
  };

  // Calendar Utility Logic
  const calendarData = useMemo(() => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, currentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const holiday = processedData.find(h => h.date === dateStr);
      const sequenceParent = processedData.find(h => h.vacationDates.some(v => v.fullDate === dateStr));

      days.push({
        day: i,
        currentMonth: true,
        dateStr,
        holiday,
        sequenceParent,
        isWeekend: new Date(year, month, i).getDay() === 0 || new Date(year, month, i).getDay() === 6
      });
    }
    const totalSlots = 42;
    const nextPadding = totalSlots - days.length;
    for (let i = 1; i <= nextPadding; i++) {
      days.push({ day: i, currentMonth: false });
    }
    return days;
  }, [currentCalendarDate, processedData]);

  const jumpToNextHoliday = () => {
    const upcoming = processedData.filter(h => new Date(h.date) > currentCalendarDate);
    if (upcoming.length > 0) {
      setCurrentCalendarDate(new Date(upcoming[0].date));
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 selection:${isHustler ? 'bg-orange-100' : 'bg-teal-100'} transition-colors duration-500`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <main className={`max-w-5xl mx-auto space-y-10 transition-all duration-300 ${isPlanDrawerOpen ? 'pb-72' : 'pb-28'}`}>

        {/* HEADER */}
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${bgAccentClass} rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500`}>
                  {isHustler ? <Banknote size={28} /> : <Palmtree size={28} />}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 leading-none">{S.logoPrefix}<span className={textAccentClass}>Vacay</span></h1>
              </div>
              {stats.nextHoliday && !showPast && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all duration-500 ${isHustler ? 'bg-orange-50 border-orange-100' : (isJP ? 'bg-red-50 border-red-100' : 'bg-teal-50 border-teal-100')}`}>
                  <Timer size={14} className={textAccentClass} />
                  <p className={`font-bold text-xs uppercase tracking-tight ${textAccentClass}`}>
                    {S.countdown(stats.daysUntil, stats.nextHoliday.name)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              {/* Country Toggle */}
              <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                <button
                  onClick={() => handleCountryChange('ph')}
                  className={`px-3 py-2 rounded-xl transition-all text-sm font-extrabold active:scale-95 ${country === 'ph' ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-slate-400 hover:bg-slate-50'}`}
                >🇵🇭 PH</button>
                <button
                  onClick={() => handleCountryChange('jp')}
                  className={`px-3 py-2 rounded-xl transition-all text-sm font-extrabold active:scale-95 ${country === 'jp' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'text-slate-400 hover:bg-slate-50'}`}
                >🇯🇵 JP</button>
              </div>

              <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                <button
                  onClick={() => setViewMode('vacationer')}
                  className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${viewMode === 'vacationer' ? (isJP ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-teal-600 text-white shadow-lg shadow-teal-200') : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <Palmtree size={18} />
                  {viewMode === 'vacationer' && <span className="text-[10px] font-extrabold uppercase tracking-widest pr-1">{S.vacayLabel}</span>}
                </button>
                <button
                  onClick={() => setViewMode('hustler')}
                  className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${viewMode === 'hustler' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <Banknote size={18} />
                  {viewMode === 'hustler' && <span className="text-[10px] font-extrabold uppercase tracking-widest pr-1">{S.hustleLabel}</span>}
                </button>
              </div>

              <button
                onClick={() => setShowPast(!showPast)}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all ${showPast ? 'bg-slate-800 border-slate-800 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
                title={showPast ? 'Hiding History' : 'Show History'}
              >
                {showPast ? <Eye size={20} /> : <History size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Strategy Card */}
        <section className={`${isHustler ? 'bg-slate-900' : (isJP ? 'bg-red-900' : 'bg-teal-900')} rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="hidden md:flex p-4 bg-white/10 rounded-3xl shrink-0">
              <Sparkles size={32} className={isHustler ? 'text-orange-400' : (isJP ? 'text-red-200' : 'text-teal-200')} />
            </div>
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-extrabold uppercase tracking-widest ${isHustler ? 'text-orange-400' : (isJP ? 'text-red-200' : 'text-teal-200')}`}>{S.masterCalendar}</h3>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded">{S.strategyGuide}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {S.strategyBullets.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 shadow-lg ${i === 0 ? 'bg-orange-400 shadow-orange-400/50' : i === 1 ? (isJP ? 'bg-red-400 shadow-red-400/50' : 'bg-teal-400 shadow-teal-400/50') : 'bg-slate-400 shadow-slate-400/50'}`} />
                    <p className={`text-xs leading-relaxed font-medium ${isJP ? 'text-red-50' : 'text-teal-50'}`}><strong>{b.prefix}</strong> {b.body}</p>
                  </div>
                ))}
              </div>
              {isHustler && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                    <Banknote size={12} /> {S.dailyRateLabel}
                  </p>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2 w-full max-w-xs">
                    <span className="text-white/60 font-bold text-sm">{S.currencySymbol}</span>
                    <input
                      type="number"
                      min="0"
                      value={dailyRate}
                      onChange={e => handleDailyRateChange(e.target.value)}
                      placeholder={S.dailyRatePlaceholder}
                      className="bg-transparent text-white font-extrabold text-base placeholder:text-white/30 outline-none w-full"
                    />
                  </div>
                  {dailyRate && Number(dailyRate) > 0 && (
                    <p className="text-[10px] text-white/50 font-medium mt-1.5">
                      {S.multiplierHint(Number(dailyRate))}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* View Selection & Roadmap Title */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
                {layoutMode === 'roadmap' ? S.roadmapTitle : S.calendarTitle}
              </h2>
              <div className="flex bg-white/60 p-1 rounded-2xl border border-slate-200 backdrop-blur-sm shadow-sm">
                <button
                  onClick={() => toggleLayoutMode()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${layoutMode === 'roadmap' ? `${bgAccentClass} text-white shadow-md` : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutList size={14} /> List
                </button>
                <button
                  onClick={() => toggleLayoutMode()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${layoutMode === 'calendar' ? `${bgAccentClass} text-white shadow-md` : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Calendar size={14} /> Grid
                </button>
              </div>
            </div>

            {layoutMode === 'roadmap' && (
              <div className="flex bg-white/60 p-1 rounded-2xl border border-slate-200 backdrop-blur-sm shadow-sm w-fit">
                {['all', 'long'].map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-5 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${filter === t ? `${bgAccentClass} text-white shadow-md` : 'text-slate-400 hover:text-slate-600 hover:bg-white'}`}
                  >
                    {t === 'all' ? S.filterAll : S.filterLong}
                  </button>
                ))}
              </div>
            )}
          </div>

          {layoutMode === 'roadmap' ? (
            /* ROADMAP VIEW */
            <div className="space-y-12">
              {Object.entries(groupedHolidays).map(([month, holidays]) => (
                <div key={month} className="space-y-4">
                  <div className="flex items-center justify-between px-2 text-slate-300 text-left">
                    <div className="flex items-center gap-4 flex-1">
                      <h2 className="text-xl font-extrabold text-slate-800 tracking-tight shrink-0">{month}</h2>
                      <div className="h-px bg-current flex-1" />
                    </div>
                    {DESTINATIONS_ACTIVE[month] && (
                      <div className="group/tip relative ml-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-help ${isHustler ? 'bg-orange-50 border-orange-100 text-orange-600' : (isJP ? 'bg-red-50 border-red-100 text-red-600' : 'bg-teal-50 border-teal-100 text-teal-600')}`}>
                          <MapPin size={12} />
                          <span className="text-[10px] font-extrabold uppercase tracking-wider">{DESTINATIONS_ACTIVE[month].loc}</span>
                        </div>
                        <div className="hidden md:block absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-30 shadow-2xl text-left">
                          {DESTINATIONS_ACTIVE[month].tip}
                        </div>
                        <p className="md:hidden text-[10px] text-slate-400 font-medium mt-1 text-right leading-tight max-w-[140px]">
                          {DESTINATIONS_ACTIVE[month].tip}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {holidays.map((holiday, idx) => (
                      <button
                        key={idx}
                        onClick={() => openHolidayModal(holiday)}
                        className={`group w-full text-left bg-white p-5 rounded-[2rem] border transition-all hover:shadow-2xl hover:shadow-teal-200/30 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-between gap-4 relative overflow-hidden
                          ${holiday.isPast ? 'opacity-50 grayscale bg-slate-50' : 'border-slate-100 shadow-sm'}
                          ${!holiday.isPast && plannedIds.includes(holiday.id) ? ringAccentClass + ' ring-2 shadow-lg' : ''}`}
                      >
                        {!holiday.isPast && (
                          <div
                            onClick={(e) => handlePlannedToggle(holiday.id, e)}
                            className={`absolute top-0 left-6 w-10 h-11 transition-all duration-500 z-20 cursor-pointer flex items-center justify-center rounded-b-xl ${plannedIds.includes(holiday.id) ? bgAccentClass + ' text-white shadow-md' : 'bg-slate-50 text-slate-200 hover:bg-slate-100 hover:text-slate-300'}`}
                          >
                            <Bookmark size={14} fill={plannedIds.includes(holiday.id) ? "currentColor" : "none"} />
                          </div>
                        )}

                        <div className="flex items-center gap-4 relative z-10 pt-2 font-medium">
                          <div className={`text-center min-w-[56px] p-2 rounded-2xl border ${holiday.isPast ? 'bg-slate-200 border-slate-300' : 'bg-slate-50 border-slate-100'}`}>
                            <p className="text-[10px] font-extrabold uppercase text-slate-400 leading-none mb-1">{DAY_LABELS[holiday.dayOfWeek]}</p>
                            <p className="text-xl font-extrabold text-slate-700 leading-none">{new Date(holiday.date).getDate()}</p>
                          </div>

                          <div className="space-y-1">
                            <h3 className={`font-extrabold text-base truncate max-w-[140px] md:max-w-[180px] ${holiday.isPast ? 'text-slate-500' : 'text-slate-800'}`}>
                              {holiday.name}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${holiday.isPast ? 'bg-slate-200' : (isHustler ? 'bg-orange-50 text-orange-600' : (isJP ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600'))}`}>
                                {holiday.type}
                              </span>
                              {!holiday.isPast && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${viewMode === 'vacationer' ? (holiday.status === 'Long Weekend' ? (isJP ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600') : holiday.status === 'Bridge Opportunity' ? 'bg-orange-100 text-orange-600' : 'hidden') : 'bg-slate-900 text-white animate-pulse'}`}>
                                  {viewMode === 'vacationer'
                                    ? (holiday.status === 'Long Weekend' ? S.badgeLongWeekend : S.badgeBridge)
                                    : (isJP || holiday.type === 'Regular' ? S.badgeHustleRegular : S.badgeHustleSpecial)}
                                </span>
                              )}
                              {isHustler && !holiday.isPast && computePay(holiday) && (
                                <span className="text-[9px] font-extrabold text-orange-500">
                                  ≈ {computePay(holiday)} 💸
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 transition-all ${isHustler ? 'group-hover:text-orange-500 group-hover:bg-orange-50' : (isJP ? 'group-hover:text-red-600 group-hover:bg-red-50' : 'group-hover:text-teal-600 group-hover:bg-teal-50')}`}>
                          <ChevronRight size={20} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* CALENDAR VIEW */
            <div className="space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 md:p-6">
                  <button
                    onClick={() => setIsMonthPickerOpen(o => !o)}
                    className="flex items-center gap-2 group"
                  >
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 group-hover:text-slate-600 transition-colors">
                      {currentCalendarDate.toLocaleString(DATE_LOCALE, { month: 'long', year: 'numeric' })}
                    </h3>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isMonthPickerOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="flex items-center gap-2">
                    {DESTINATIONS_ACTIVE[currentCalendarDate.toLocaleString(DATE_LOCALE, { month: 'long' })] && (
                      <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${isHustler ? 'bg-orange-50 text-orange-600' : (isJP ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600')}`}>
                        📍 {DESTINATIONS_ACTIVE[currentCalendarDate.toLocaleString(DATE_LOCALE, { month: 'long' })].loc}
                      </span>
                    )}
                    <button
                      onClick={() => { const d = currentCalendarDate; setCurrentCalendarDate(new Date(d.getFullYear(), d.getMonth() - 1, 1)); setIsMonthPickerOpen(false); }}
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95"
                    >
                      <ChevronLeft size={20}/>
                    </button>
                    <button
                      onClick={() => { const d = currentCalendarDate; setCurrentCalendarDate(new Date(d.getFullYear(), d.getMonth() + 1, 1)); setIsMonthPickerOpen(false); }}
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95"
                    >
                      <ChevronRight size={20}/>
                    </button>
                  </div>
                </div>
                {isMonthPickerOpen && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200 border-t border-slate-100 pt-4">
                    {MONTH_ABBREVS.map((m, i) => (
                      <button
                        key={m}
                        onClick={() => { setCurrentCalendarDate(new Date(2026, i, 1)); setIsMonthPickerOpen(false); }}
                        className={`px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 ${currentCalendarDate.getMonth() === i ? `${bgAccentClass} text-white shadow-md` : 'bg-slate-50 border border-slate-100 text-slate-500 hover:border-slate-300'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid Header */}
              <div className="grid grid-cols-7 gap-2 px-2">
                {DAY_LABELS.map(d => (
                  <div key={d} className="text-[10px] font-extrabold uppercase text-slate-400 text-center tracking-widest">{d}</div>
                ))}
              </div>

              {/* Actual Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarData.map((day, idx) => {
                  const isCurrentDay = day.dateStr === today.toISOString().split('T')[0];

                  return (
                    <div
                      key={idx}
                      onClick={() => day.holiday && openHolidayModal(day.holiday)}
                      className={`relative min-h-[90px] md:min-h-[120px] p-2 md:p-3 rounded-3xl border transition-all
                        ${!day.currentMonth ? 'bg-slate-50/30 border-transparent opacity-20 pointer-events-none' : 'bg-white border-slate-100 shadow-sm'}
                        ${day.holiday ? `cursor-pointer hover:shadow-xl hover:-translate-y-1` : ''}
                        ${day.sequenceParent && day.currentMonth ? (isHustler ? 'bg-orange-50/60 border-orange-100' : (isJP ? 'bg-red-50/60 border-red-100' : 'bg-teal-50/60 border-teal-100')) : ''}`}
                    >
                      {day.sequenceParent && day.currentMonth && (
                        <div className={`absolute inset-0 z-0 opacity-40 transition-colors ${isHustler ? 'bg-orange-100/50' : (isJP ? 'bg-red-100/50' : 'bg-teal-100/50')}`} />
                      )}

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs md:text-sm font-extrabold ${day.isWeekend ? 'text-slate-400' : 'text-slate-800'} ${isCurrentDay ? `w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full ${bgAccentClass} text-white shadow-lg` : ''}`}>
                            {day.day}
                          </span>
                          {day.holiday && (
                            <div className={`w-2 h-2 rounded-full ${isHustler ? 'bg-orange-500' : (isJP ? 'bg-red-600' : 'bg-teal-600')} animate-pulse`} />
                          )}
                        </div>

                        {day.holiday && (
                          <div className="space-y-1">
                            <p className={`hidden md:block text-[10px] font-black leading-tight truncate ${isHustler ? 'text-orange-700' : (isJP ? 'text-red-700' : 'text-teal-700')}`}>
                              {day.holiday.name}
                            </p>
                            <p className="hidden md:block text-[9px] font-bold uppercase opacity-60">
                              {isHustler ? S.calPayday : S.calEscape}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Jump to Next Logic */}
              {calendarData.every(d => !d.holiday || !d.currentMonth) && (
                <div className="p-12 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-700">
                   <Construction className="mx-auto text-slate-200 mb-4" size={48} />
                   <h4 className="text-xl font-extrabold text-slate-400">{S.quietMonthTitle}</h4>
                   <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">{S.quietMonthBody}</p>
                   <button
                    onClick={jumpToNextHoliday}
                    className={`mt-6 px-6 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${bgAccentClass} text-white shadow-lg`}
                   >
                     {S.jumpNext}
                   </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Detail Modal */}
      {selectedHoliday && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 text-left">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className={`p-8 pb-12 relative ${selectedHoliday.isPast ? 'bg-slate-600' : selectedHoliday.status === 'Long Weekend' ? 'bg-orange-400' : selectedHoliday.status === 'Bridge Opportunity' ? (isJP ? 'bg-red-600' : 'bg-teal-600') : 'bg-slate-800'}`}>
              <button onClick={() => setSelectedHoliday(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center transition-colors">
                <X size={20} />
              </button>
              <h2 className="text-3xl font-extrabold text-white leading-tight">{selectedHoliday.name}</h2>
              <div className="flex items-center gap-2 text-white/80 font-bold mt-2">
                <CalendarDays size={18} />
                {isJP
                  ? new Date(selectedHoliday.date).toLocaleDateString('ja-JP', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                  : `${selectedHoliday.dayName}, ${new Date(selectedHoliday.date).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}`}
              </div>
            </div>

            <div className="p-8 -mt-8 bg-white rounded-t-[3rem] relative space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
              <div className="space-y-3">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Map size={12} className={textAccentClass} /> {S.escapeSequence}
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {selectedHoliday.vacationDates.map((v, i) => {
                    const isHoliday = v.fullDate === selectedHoliday.date;
                    const isWeekend = v.dayName === 'Saturday' || v.dayName === 'Sunday';
                    const isLeave = !isHoliday && !isWeekend;
                    const seqLen = selectedHoliday.vacationDates.length;
                    const bubbleWidth = seqLen > 3 ? 'w-16' : 'w-20';
                    const dayIdx = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(v.dayName);

                    return (
                      <React.Fragment key={i}>
                        <div className={`flex-shrink-0 ${bubbleWidth} p-3 rounded-2xl border-2 text-center transition-all ${isHoliday ? (bgAccentClass + ' border-transparent text-white shadow-lg scale-105') : isLeave ? 'bg-orange-50 border-orange-200 border-dashed text-orange-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                          <p className="text-[9px] font-black uppercase opacity-70 mb-1">{DAY_LABELS[dayIdx]}</p>
                          <p className={`font-extrabold ${seqLen > 3 ? 'text-sm' : 'text-base'}`}>{v.label.split(' ')[1] || v.label}</p>
                          {isLeave && <p className="text-[7px] font-extrabold mt-1 uppercase text-orange-600">Leave</p>}
                        </div>
                        {i < selectedHoliday.vacationDates.length - 1 && <div className="text-slate-200"><ArrowRight size={14} /></div>}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Boss Whisperer */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-left">
                    <div className={`p-2 rounded-lg ${isHustler ? 'bg-orange-50 text-orange-600' : (isJP ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600')}`}>
                      <MessageSquareQuote size={18} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">{S.bossWhispererTitle}</h4>
                      <p className="text-xs font-bold text-slate-600">{S.bossWhispererSub}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsWhispererExpanded(!isWhispererExpanded)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
                  >
                    {isWhispererExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </button>
                </div>

                {isWhispererExpanded && (
                  <div className="space-y-3 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
                       {[
                         { id: 'chill', icon: Palmtree },
                         { id: 'pro', icon: Briefcase },
                         { id: 'ghost', icon: Ghost }
                       ].map(tone => (
                         <button
                          key={tone.id}
                          onClick={() => setWhispererTone(tone.id)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all active:scale-95 ${whispererTone === tone.id ? bgAccentClass + ' text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                         >
                           <tone.icon size={12} /> {S.tones[tone.id]}
                         </button>
                       ))}
                    </div>
                    <div className="p-5 bg-slate-900 rounded-[2rem] text-teal-50 relative group/ooo">
                      <p className="text-xs font-medium leading-relaxed italic pr-8">
                        "{generateOOOText(selectedHoliday)}"
                      </p>
                      <button
                        onClick={() => copyToClipboard(generateOOOText(selectedHoliday), 'ooo')}
                        className={`absolute bottom-3 right-3 p-3 rounded-xl transition-all active:scale-95 ${copyStatus === 'ooo' ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                      >
                        {copyStatus === 'ooo' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${textAccentClass} flex items-center gap-1`}>
                     <Clock size={10} /> {isHustler ? S.costLabel : S.rewardLabel}
                  </span>
                  <p className="text-xl font-extrabold text-slate-800">{S.daysOff(selectedHoliday.potentialDays)}</p>
                </div>

                <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group/hustle">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/hustle:rotate-12 transition-transform">
                    {(isJP || selectedHoliday.type === 'Regular') ? <Banknote size={40} /> : <Coins size={40} />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${textAccentClass} flex items-center gap-1`}>
                    {(isJP || selectedHoliday.type === 'Regular') ? S.paydayLabel : S.bonusLabel}
                  </span>
                  {isHustler && computePay(selectedHoliday) ? (
                    <p className="text-xl font-extrabold text-orange-500">≈ {computePay(selectedHoliday)} 💸</p>
                  ) : (
                    <p className="text-xl font-extrabold text-slate-800">
                      {(isJP || selectedHoliday.type === 'Regular') ? S.paydayValue : S.bonusValue}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handlePlannedToggle(selectedHoliday.id)}
                  className={`flex-1 py-4 font-extrabold rounded-2xl transition-all border-2 ${plannedIds.includes(selectedHoliday.id) ? (isHustler ? 'bg-orange-50 border-orange-600 text-orange-600' : (isJP ? 'bg-red-50 border-red-600 text-red-600 shadow-lg shadow-red-100' : 'bg-teal-50 border-teal-600 text-teal-600 shadow-lg shadow-teal-100')) : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400'}`}
                >
                  {plannedIds.includes(selectedHoliday.id) ? S.removeHit : S.addToPlan}
                </button>
                <button onClick={() => setSelectedHoliday(null)} className="flex-1 py-4 bg-slate-900 text-white font-extrabold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  {S.gotIt}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Management Drawer */}
      {plannedIds.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-40">
             {isPlanDrawerOpen && <div onClick={() => setIsPlanDrawerOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10" />}
             <div className={`bg-slate-900 text-white rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-md bg-opacity-95 transition-all duration-300 ${isPlanDrawerOpen ? 'p-6' : 'p-4'}`}>
              {isPlanDrawerOpen && (
                <div className="mb-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-extrabold uppercase tracking-widest ${isHustler ? 'text-orange-400' : (isJP ? 'text-red-300' : 'text-teal-300')}`}>{S.drawerHeading}</h4>
                    <button onClick={() => setIsPlanDrawerOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors active:scale-95"><ChevronDown size={16}/></button>
                  </div>
                  <div className="max-h-[45vh] overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                    {plannedHolidays.map((h) => (
                      <div key={h.id} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 group">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${h.status === 'Long Weekend' ? 'bg-orange-400' : (isJP ? 'bg-red-400' : 'bg-teal-500')}`} />
                          <div>
                            <p className="text-xs font-extrabold text-white truncate max-w-[160px]">{h.name}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase">{h.vacationDates[0].label} – {h.vacationDates.slice(-1)[0].label}</p>
                          </div>
                        </div>
                        <button onClick={() => handlePlannedToggle(h.id)} className="p-3 text-white/20 hover:text-red-400 active:scale-95 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => setIsPlanDrawerOpen(!isPlanDrawerOpen)} className="flex items-center gap-3 pl-2 group">
                  <div className={`p-3 rounded-xl transition-colors ${isPlanDrawerOpen ? 'bg-white/10' : bgAccentClass}`}>
                    {isPlanDrawerOpen ? <ChevronDown size={18}/> : <Star size={18} fill="currentColor" />}
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-black uppercase tracking-widest leading-none mb-1 ${isHustler ? 'text-orange-400' : (isJP ? 'text-red-300' : 'text-teal-300')}`}>{S.hitsPlanned(plannedIds.length)}</p>
                    <p className="text-[10px] font-bold text-white/60 leading-none">{isPlanDrawerOpen ? S.managing : S.editPlan}</p>
                  </div>
                </button>
                <button onClick={handleSharePlan} className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-extrabold text-sm transition-all active:scale-95 ${copyStatus === 'plan' ? 'bg-green-600' : bgAccentClass + ' hover:opacity-90'}`}>
                  {copyStatus === 'plan' ? <Check size={16} /> : <Share2 size={16} />}
                  {copyStatus === 'plan' ? S.shared : (typeof navigator !== 'undefined' && navigator.share ? S.share : S.copyPlan)}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
