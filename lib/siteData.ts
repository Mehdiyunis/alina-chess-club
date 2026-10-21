export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  photoUrl: string;
}

export interface PieceInfo {
  id: string;
  name: string;
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  value: string;
  summary: string;
  description: string;
  demoPosition: {
    pieceSquare: string;
    validMoves: string[];
  };
}

export interface SocialLink {
  platform: string;
  name: string;
  url: string;
  icon: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at: string;
  email?: string;
  phone?: string;
}

export interface ContactRequest {
  id: string;
  value: string;
  type: 'email' | 'phone';
  status: 'new' | 'contacted';
  created_at: string;
}

export type BookLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  level: BookLevel;
  cover_url: string | null;
  file_url: string;
  file_name: string;
  created_at: string;
}

export const siteConfig = {
  name: 'Şahmat Məktəbi',
  tagline: 'Uşaqlar və yeni başlayanlar üçün əyləncəli və sadə şahmat dərsləri',
  socialLinks: [
    { platform: 'Instagram', name: '@sahmat.mektebi', url: 'https://instagram.com/sahmat.mektebi', icon: 'instagram' },
    { platform: 'Facebook', name: 'Şahmat Məktəbi', url: 'https://facebook.com/sahmatmektebi', icon: 'facebook' },
    { platform: 'YouTube', name: 'Şahmat Dərsləri', url: 'https://youtube.com/@sahmatdersleri', icon: 'youtube' },
    { platform: 'TikTok', name: '@sahmatdersi', url: 'https://tiktok.com/@sahmatdersi', icon: 'tiktok' },
    { platform: 'Telegram', name: 't.me/sahmat_mektebi', url: 'https://t.me/sahmat_mektebi', icon: 'send' },
  ],
};

export const teachersData: Teacher[] = [
  {
    id: 't-1',
    firstName: 'Leyla',
    lastName: 'Əliyeva',
    role: 'Baş Təlimçi & WIM',
    bio: 'Beynəlxalq dərəcəli usta. 7 ildən çoxdur ki, uşaqlara şahmatın sirlərini sevgi və səbirlə öyrədir.',
    photoUrl: '/images/teacher_leyla_alieva_1792527781686.jpg',
  },
  {
    id: 't-2',
    firstName: 'Fərid',
    lastName: 'Məmmədov',
    role: 'Qrossmeyster & Məşqçi',
    bio: 'Respublika çempionatlarının qalibi. Uşaqlarda strateji düşünmə və dərin analiz qabiliyyətini inkişaf etdirir.',
    photoUrl: '/images/teacher_farid_mammadov_1792527794770.jpg',
  },
  {
    id: 't-3',
    firstName: 'Nigar',
    lastName: 'Quliyeva',
    role: 'İbtidai Qruplar Üzrə Müəllim',
    bio: 'Məktəbəqədər və kiçik yaşlı uşaqlar üçün nağılvari və interaktiv oyun metodikasının müəllifidir.',
    photoUrl: '/images/teacher_nigar_guliyeva_1792527795069.jpg',
  },
  {
    id: 't-4',
    firstName: 'Rəşad',
    lastName: 'Həsənov',
    role: 'Taktika və Turnir Mentoru',
    bio: '20 illik pedaqoji təcrübəyə malik məşqçi. Onlarla Respublika dərəcəli gənc istedad yetişdirmişdir.',
    photoUrl: '/images/teacher_rashad_hasanov_1792527796101.jpg',
  },
];

export const piecesData: PieceInfo[] = [
  {
    id: 'king',
    name: 'Şah',
    type: 'k',
    value: 'Qiymətsiz (Oyunu təyin edir)',
    summary: 'İstənilən tərəfə yalnız 1 xana hərəkət edir.',
    description: 'Şah şahmat ordusunun ən vacib fiqurudur. Əgər şah tələyə düşərsə və qurtula bilməzsə (mat olarsa), oyun bitir. Şah istənilən istiqamətə (şaquli, üfüqi və ya diaqonal) yalnız 1 addım ata bilər, lakin təhlükəli xanaya gedə bilməz.',
    demoPosition: {
      pieceSquare: 'e4',
      validMoves: ['d5', 'e5', 'f5', 'd4', 'f4', 'd3', 'e3', 'f3'],
    },
  },
  {
    id: 'queen',
    name: 'Vəzir',
    type: 'q',
    value: '9 xal',
    summary: 'İstənilən istiqamətə istədiyi qədər xana gedir.',
    description: 'Vəzir şahmatın ən güclü və çevik fiqurudur! O, həm Top kimi düz (üfüqi və şaquli), həm də Fil kimi çəpinə (diaqonal) istədiyi qədər boş xana irəliləyə bilir.',
    demoPosition: {
      pieceSquare: 'd4',
      validMoves: [
        'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8',
        'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
        'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8',
        'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
      ],
    },
  },
  {
    id: 'rook',
    name: 'Top',
    type: 'r',
    value: '5 xal',
    summary: 'Düz xətt üzrə (şaquli və üfüqi) irəliləyir.',
    description: 'Top uzaq məsafəli ağır fiqurdur. Yalnız düz xətlərlə — yuxarı, aşağı, sağa və sola istədiyi qədər boş xanaya gedə bilər. Digər fiqurların üstündən tullana bilməz.',
    demoPosition: {
      pieceSquare: 'd4',
      validMoves: [
        'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8',
        'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
      ],
    },
  },
  {
    id: 'bishop',
    name: 'Fil',
    type: 'b',
    value: '3 xal',
    summary: 'Yalnız diaqonal (çəpinə) xətlərlə irəliləyir.',
    description: 'Hər oyunçunun iki Fili var: biri həmişə açıq xanalarda, digəri isə tünd xanalarda gəzir. Fil heç vaxt öz rəngini dəyişmir və diaqonal boyunca istədiyi qədər boş xana gedir.',
    demoPosition: {
      pieceSquare: 'd4',
      validMoves: [
        'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8',
        'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
      ],
    },
  },
  {
    id: 'knight',
    name: 'At',
    type: 'n',
    value: '3 xal',
    summary: '«L» hərfi şəklində gəzir və fiqurların üstündən tullanır.',
    description: 'At şahmatın ən hiyləgər və sevimli fiqurudur! Yalnız o, digər fiqurların üstündən tullana bilir. At iki xana bir tərəfə, sonra bir xana yana gedərək "L" hərfi yaradır və hər gedişdə rəngini dəyişir.',
    demoPosition: {
      pieceSquare: 'e4',
      validMoves: ['d6', 'f6', 'c5', 'g5', 'c3', 'g3', 'd2', 'f2'],
    },
  },
  {
    id: 'pawn',
    name: 'Piyada',
    type: 'p',
    value: '1 xal',
    summary: 'İrəli 1 xana gedir, rəqibi isə 1 xana çəpinə vurur.',
    description: 'Piyadalar ordunun cəsur əsgərləridir. Yalnız irəli doğru addımlayırlar və geriyə gedə bilməzlər. İlk gedişində piyada istəsə 2 xana birdən ata bilər. Rəqib fiquru isə bir xana diaqonal üzrə vurur. Əgər piyada lövhənin sonuna çatarsa, Vəzirə çevrilir!',
    demoPosition: {
      pieceSquare: 'e2',
      validMoves: ['e3', 'e4'],
    },
  },
];

export const gameGoalsData = [
  {
    id: 'shah',
    title: 'Şah (Hücum)',
    simpleExplain: 'Şaha birbaşa hücum edildikdə «Şah!» deyilir.',
    detail: 'Rəqibin hər hansı fiquru sizin Şahınızı vurmaqla hədələyirsə, bu Şah elan olunmasıdır. Şahı dərhal xilas etməlisiniz: ya təhlükəsiz yerə qaçmalı, ya araya başqa fiqur qoymalı, ya da hücum edən fiquru vurmalısınız.',
    boardFen: '4k3/8/8/8/8/8/4R3/4K3 b - - 0 1',
    highlightSquare: 'e8',
    attackerSquare: 'e2',
  },
  {
    id: 'mat',
    title: 'Mat (Qələbə)',
    simpleExplain: 'Şaha hücum olunub və onun xilas olmağa heç bir yolu yoxdur.',
    detail: 'Mat şahmat oyununun əsas hədəfidir! Şaha hücum edilib və o: 1) qaça bilmir, 2) araya sipər çəkə bilmir, 3) hücum edən fiquru vura bilmir. Mat edən tərəf dərhal qələbə qazanır!',
    boardFen: '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
    highlightSquare: 'g8',
    attackerSquare: 'b8',
  },
  {
    id: 'pat',
    title: 'Pat (Heç-heçə çıxılmaz vəziyyət)',
    simpleExplain: 'Şah təhlükədə deyil, amma heç bir fiqurun qaydalı gedişi qalmayıb.',
    detail: 'Növbə gələn oyunçunun heç bir qaydalı gedişi yoxdur və Şahı da təhlükədə deyil. Belə halda oyun dərhal Heç-heçə hesab olunur. Qələbəyə gedən oyunçu Pat vəziyyətinə düşməməyə diqqət etməlidir!',
    boardFen: 'k7/2Q5/1K6/8/8/8/8/8 b - - 0 1',
    highlightSquare: 'a8',
    attackerSquare: '',
  },
  {
    id: 'draw',
    title: 'Heç-heçə (Bərabərlik)',
    simpleExplain: 'Hər iki tərəf üçün bərabər nəticə (0.5 – 0.5).',
    detail: 'Oyunda qalib olmadıqda heç-heçə qeydə alınır: qarşılıqlı razılıq, mat etmək üçün fiqurların kifayət etməməsi (məsələn, yalnız iki Şah qaldıqda) və ya eyni vəziyyətin ardıcıl 3 dəfə təkrarlanması.',
    boardFen: '8/8/4k3/8/8/4K3/8/8 w - - 0 1',
    highlightSquare: '',
    attackerSquare: '',
  },
];

export const specialMovesData = [
  {
    id: 'castling',
    title: 'Rokirovka',
    subtitle: 'Şah və Topun unikal birgə gedişi',
    description: 'Şahınızı mərkəzdəki təhlükələrdən küncə qaçırmaq və eyni zamanda Topu oyuna daxil etmək üçün edilən xüsusi gedişdir. Şah iki xana sağa (qısa rokirovka) və ya iki xana sola (uzun rokirovka) gedir, Top isə Şahın üstündən aşaraq dərhal yanına keçir.',
    rules: [
      'Şah və həmin Top oyunda hələ heç bir gediş etməmiş olmalıdır.',
      'Aralarındakı bütün xanalar tamamilə boş olmalıdır.',
      'Şah hücum altında olmamalı və keçdiyi xanalar da vurulmamalıdır.',
    ],
  },
  {
    id: 'promotion',
    title: 'Piyadanın Vəzirə Çevrilməsi',
    subtitle: 'Cəsur piyadanın böyük mükafatı',
    description: 'Piyada bütün çətinlikləri aşaraq qarşı tərəfin sonuncu xəttinə (ağ piyada 8-ci, qara piyada 1-ci xəttə) çatdıqda möcüzə baş verir! O an piyada lövhədən götürülür və yerinə Vəzir, Top, Fil və ya At qoyulur.',
    rules: [
      'Piyada son xanaya çatan kimi dərhal çevrilməlidir.',
      'Lövhədə artıq başqa vəzirin olub-olmaması fərq etmir (bir neçə vəzir ola bilər).',
    ],
  },
  {
    id: 'enpassant',
    title: 'Keçiddə Götürmə (An Passan)',
    subtitle: 'Piyadanın xüsusi vurma qaydası',
    description: 'Rəqibin piyadası başlanğıc yerindən iki xana irəli sıçrayaraq sizin piyadanızın yanına düşdükdə, sizin piyada onu sanki yalnız bir xana getmiş kimi çəpinə vurub lövhədən çıxara bilər. Bu gediş dərhal növbəti gedişdə edilməlidir!',
    rules: [
      'Yalnız piyadalar tərəfindən və yalnız iki xana sıçrayan piyadaya qarşı edilə bilər.',
      'Qərar dərhal verilməlidir — növbəti gedişdə bu hüquq itirilir.',
    ],
  },
];

export const beginnerTipsData = [
  {
    number: '01',
    title: 'Mərkəzə Nəzarət Edin',
    text: 'Şahmat lövhəsinin mərkəzindəki d4, e4, d5, e5 xanaları ən həlledici yerlərdir. Mərkəzdə dayanan fiqurlar bütün lövhəyə asanlıqla hökm edə bilər.',
  },
  {
    number: '02',
    title: 'Bütün Fiqurları Oyuna Çıxarın',
    text: 'Oyuna başlayan kimi ilk olaraq yüngül fiqurları — Atları və Filləri oyuna daxil edin. Bir fiqurla dəfələrlə oynamaq yerinə, bütün ordunuzu səfərbər edin.',
  },
  {
    number: '03',
    title: 'Şahınızı Tez Qoruyun',
    text: 'Debütdə tez bir zamanda Rokirovka edin. Şah mərkəzdə qaldıqda rəqibin hücumuna tuş gəlmək riski çox yüksək olur.',
  },
  {
    number: '04',
    title: 'Fiqurları Havayı Verməyin',
    text: 'Hər bir gediş etməzdən əvvəl özünüzdən soruşun: "Gedəcəyim xananı rəqib qoruyurmu? Fiqurum təhlükəsizdirmi?"',
  },
  {
    number: '05',
    title: 'Tələsmədən Düşünün',
    text: 'Şahmat səbir və diqqət oyunudur. Əlinizi dərhal fiqura uzatmayın, əvvəlcə beyninizdə rəqibin cavabını hesablayın.',
  },
  {
    number: '06',
    title: 'Lövhənin Dilini Öyrənin',
    text: 'Xanaların adlarını (a1, e4, h8 və s.) əzbərləyin. Bu sizin şahmat kitablarını oxumağınıza və qrossmeysterlərin oyunlarını anlamağınıza kömək edəcək.',
  },
];

export const faqData = [
  {
    question: 'Uşaqlar neçə yaşından şahmat öyrənməyə başlaya bilər?',
    answer: 'Uşaqlar üçün ən ideal başlanğıc yaşı 4-6 yaş arasıdır. Bu yaşda uşaqlar şahmatı nağıl və əyləncəli obrazlar vasitəsilə çox tez və sevərək mənimsəyirlər.',
  },
  {
    question: 'Dərslər üçün hər hansı ilkin hazırlıq lazımdırmı?',
    answer: 'Xeyr, heç bir ilkin bilik tələb olunmur! Dərslərimiz lövhənin xanalarından və fiqurların adlarından başlayaraq addım-addım ən sadə dillə izah edilir.',
  },
  {
    question: 'Şahmat uşağın məktəb dərslərinə və inkişafına necə təsir edir?',
    answer: 'Şahmat uşaqlarda məntiqi təfəkkürü, riyazi qavrayışı, konsentrasiyanı, səbri və qərar qəbul etmə cəsarətini sürətlə gücləndirir.',
  },
  {
    question: 'Şahmat Məktəbinə qeydiyyat necə həyata keçirilir?',
    answer: 'Yuxarıdakı "Bizə qoşul" düyməsinə klikləyərək və ya əlaqə formasında telefon/email qeyd edərək dərslərimizə asanlıqla yazıla bilərsiniz.',
  },
  {
    question: 'Öyrənmə prosesində rəqiblə oyun oynamaq məcburidirmi?',
    answer: 'Xeyr. Başlanğıcda yalnız qaydaları, fiqurların hərəkətini və maraqlı şahmat tapmacalarını dərindən öyrənmək ən düzgün və stressiz yanaşmadır.',
  },
];

export const historyData = {
  title: 'Azərbaycanda Şahmat və Zəngin Tarixi',
  lead: 'Şahmat min ildən artıqdır ki, Şərqin ən böyük zəka sənəti kimi sevilir və inkişaf edir.',
  paragraphs: [
    'Şahmat Şərqdə «Şatranj» adı ilə məşhur olmuş, dahi Azərbaycan şairi Nizami Gəncəvinin əsərlərində şahmatın fəlsəfəsi və gözəlliyi vəsf edilmişdir.',
    'Müasir dövrdə Azərbaycan dünyanın ən güclü şahmat ölkələrindən biridir. Azərbaycan Milli Komandası üç dəfə Avropa Çempionu olmuşdur.',
    'Ölkəmiz Şəhriyar Məmmədyarov, Teymur Rəcəbov və unudulmaz Vüqar Həşimov kimi dünya səviyyəli əfsanəvi qrossmeysterlər yetişdirmişdir. İndi isə növbə sizin uşaqlarınızındır!',
  ],
  grandmasters: [
    { name: 'Şəhriyar Məmmədyarov', title: 'Qrossmeyster, Dünya Reytinqində 2-ci pillə, 3 qat Avropa Çempionu' },
    { name: 'Teymur Rəcəbov', title: 'Qrossmeyster, Dünya Kubokunun qalibi, şahmat vunderkindi' },
    { name: 'Vüqar Həşimov', title: 'Unudulmaz Qrossmeyster, dahi taktika ustası və Avropa Çempionu' },
  ],
};

export const initialDemoBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Şahmatın İlk Əlifbası',
    author: 'Teymur Qasımov',
    description: 'Uşaqlar və ən kiçik yaşlı şahmat həvəskarları üçün nağılvari dildə yazılmış şahmat dərslik vəsaiti. Fiqurların hərəkəti, xanaların adları və ilk qələbələr.',
    level: 'beginner',
    cover_url: null,
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'sahmatin_ilk_elifbasi.pdf',
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  {
    id: 'book-2',
    title: 'Gənc Şahmatçının 100 Taktiki Zərbəsi',
    author: 'Fərid Məmmədov',
    description: 'Bir və iki gedişlik mat tapmacaları, fiqurların qəfil çəngəl və bağlama fəndləri ilə rəqibləri təəccübləndirmək üçün zəngin praktiki məşq toplusu.',
    level: 'beginner',
    cover_url: null,
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'genc_sahmatcinin_100_zerbesi.pdf',
    created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
  },
  {
    id: 'book-3',
    title: 'Debütdə Qələbə Sirrləri',
    author: 'Leyla Əliyeva',
    description: 'İtalyan partiyası, İspan partiyası və Şotlandiya müdafiəsi kimi klassik başlanğıcların sirləri. Açılışda tələlərə düşməmək və mərkəzə hökm etmək qaydaları.',
    level: 'intermediate',
    cover_url: null,
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'debutde_qelebe_sirrleri.pdf',
    created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
  },
  {
    id: 'book-4',
    title: 'Müasir Şahmat Strategiyası və Endşpil',
    author: 'Rəşad Həsənov',
    description: 'Piyada sonluqları, top və fil əməkdaşlığı, mövqe üstünlüyünün dəqiq qələbəyə çevrilməsi metodları. Turnir şahmatçıları üçün əvəzolunmaz stolüstü bələdçi.',
    level: 'advanced',
    cover_url: null,
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'muasir_sahmat_strategiyasi.pdf',
    created_at: new Date(Date.now() - 3600000 * 24 * 20).toISOString(),
  },
];
