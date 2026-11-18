export interface Teacher {
  id?: string;
  first_name: string;
  last_name: string;
  role_title?: string | null;
  description?: string | null;
  photo_url?: string | null;
  sort_order?: number | null;
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

export interface UserProfile {
  id: string;
  full_name: string;
  created_at?: string;
  email?: string;
  phone?: string;
  language?: string | null;
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
  tagline: 'Uşaqlar və yeni başlayanlar üçün aydın və sadə şahmat dərsləri',
  // TODO: əsl nömrə verildikdə doldurun. WhatsApp üçün yalnız rəqəmlər (ölkə kodu ilə).
  phone: '+994 70 974 19 27',
  phoneHref: '',
  whatsapp: '+994 70 974 19 27',
  socialLinks: [
    { platform: 'Instagram', name: '@sahmat.mektebi', url: 'https://www.instagram.com/alina_chess_club/', icon: 'instagram' },
    { platform: 'Facebook', name: 'Şahmat Məktəbi', url: 'https://facebook.com/sahmatmektebi', icon: 'facebook' },
    { platform: 'YouTube', name: 'Şahmat Dərsləri', url: 'https://youtube.com/@sahmatdersleri', icon: 'youtube' },
    { platform: 'TikTok', name: '@sahmatdersi', url: 'https://tiktok.com/@sahmatdersi', icon: 'tiktok' },
    { platform: 'Telegram', name: 't.me/sahmat_mektebi', url: 'https://t.me/sahmat_mektebi', icon: 'send' },
  ],
};

export const piecesData: PieceInfo[] = [
  {
    id: 'king',
    name: 'Şah',
    type: 'k',
    value: 'Oyunu təyin edir',
    summary: 'İstənilən istiqamətə yalnız 1 xana hərəkət edir.',
    description: 'Şah lövhənin ən vacib fiqurudur. Əgər şah hücumdan qurtula bilmirsə (mat olursa), oyun başa çatır. Şah istənilən istiqamətə bir addım ata bilər, lakin rəqibin vurduğu xanaya gedə bilməz.',
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
    summary: 'Şaquli, üfüqi və diaqonal istiqamətdə istədiyi qədər boş xana gedir.',
    description: 'Vəzir ən güclü fiqurdur. Həm Top kimi düz xətlərlə, həm də Fil kimi diaqonal xətlərlə istədiyi qədər boş xana irəliləyə bilir.',
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
    summary: 'Yalnız düz xətlərlə (şaquli və üfüqi) hərəkət edir.',
    description: 'Top uzaq məsafəli ağır fiqurdur. Yalnız şaquli və üfüqi düz xətlər boyunca istədiyi qədər boş xanaya irəliləyə bilər. Digər fiqurların üstündən atlaya bilməz.',
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
    summary: 'Yalnız diaqonal (çəp) xətlərlə hərəkət edir.',
    description: 'Hər tərəfin iki Fili var: biri ağ xanalarda, digəri qara xanalarda hərəkət edir. Fil öz rəngini heç vaxt dəyişmir və diaqonal boyunca boş xanalarla irəliləyir.',
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
    summary: 'Sıçrayan fiqur: L hərfi şəklində hərəkət edir və fiqurların üstündən tullanır.',
    description: 'At lövhədəki yeganə sıçrayan fiqurdur. Başqa fiqurların üstündən atlaya bilir. İki xana bir tərəfə, sonra bir xana yana gedərək "L" forması cızır və hər gedişdə xananın rəngini dəyişir.',
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
    summary: 'Cəsur piyada: yalnız irəli gedir, rəqibi isə 1 xana çəpinə vurur.',
    description: 'Piyada yalnız irəli doğru addımlayır və geriyə qayıda bilməz. İlk gedişində istəsə 2 xana birdən ata bilər. Rəqib fiquru isə bir xana diaqonal üzrə vurur. Əgər qarşı tərəfin sonuncu xəttinə çatarsa, Vəzirə və ya başqa fiqura çevrilir.',
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
    simpleExplain: 'Şaha birbaşa hücum edildikdə Şah elan olunur.',
    detail: 'Rəqibin hər hansı fiquru sizin Şahınızı vurmaqla hədələyirsə, bu Şah elanıdır. Şahı dərhal xilas etmək lazımdır: təhlükəsiz xanaya qaçmaq, araya başqa fiqur qoymaq və ya hücum edən fiquru vurmaqla.',
    boardFen: '4k3/8/8/8/8/8/4R3/4K3 b - - 0 1',
    highlightSquare: 'e8',
    attackerSquare: 'e2',
  },
  {
    id: 'mat',
    title: 'Mat (Qələbə)',
    simpleExplain: 'Şah hücum altındadır və heç bir xilas yolu yoxdur.',
    detail: 'Mat şahmat oyununun məqsədidir. Şah hücum altındadırsa və qaçacaq xana, araya qoyulacaq fiqur və ya hücum edəni vurmaq imkanı yoxdursa, oyun dərhal bitir və hücum edən tərəf qalib gəlir.',
    boardFen: 'R3k3/8/4K3/8/8/8/8/8 b - - 0 1',
    highlightSquare: 'e8',
    attackerSquare: 'a8',
  },
  {
    id: 'pat',
    title: 'Pat (Heç-heçə)',
    simpleExplain: 'Şaha hücum yoxdur, lakin heç bir qaydalı gediş qalmayıb.',
    detail: 'Növbə kimdədirsə, onun heç bir fiquru ilə qaydalı gediş etmək mümkün deyilsə və Şahı da hücum altında deyilsə, bu Pat adlanır. Pat vəziyyətində oyun heç-heçə (bərabərə) başa çatır.',
    boardFen: 'k7/2Q5/1K6/8/8/8/8/8 b - - 0 1',
    highlightSquare: 'a8',
  },
  {
    id: 'draw',
    title: 'Digər Heç-heçələr',
    simpleExplain: 'Yetərsiz material və ya qarşılıqlı razılıq.',
    detail: 'Lövhədə hər iki tərəfin mat etməyə yetərli fiquru qalmadıqda (məsələn, yalnız Şah Şaha qarşı və ya Şah və Fil Şaha qarşı), oyun avtomatik bərabərə bitir. Eyni mövqe 3 dəfə təkrarlandıqda da heç-heçə elan olunur.',
    boardFen: '4k3/8/8/8/8/8/8/4K3 w - - 0 1',
  },
];

export const specialMovesData = [
  {
    id: 'castling',
    title: 'Rokirovka',
    subtitle: 'Müdafiə və Hücum Hərəkatı',
    description: 'Şahı qorumaq və küncdəki Topu mərkəzə çıxarmaq üçün eyni anda edilən yeganə ikiqat gedişdir.',
    condition: 'Şah və Top arasında fiqur olmamalı və heç biri hələ oynamamış olmalıdır.',
    explain: 'Şah iki xana sağa və ya sola gedir, Top isə onun üstündən keçərək dərhal yanındakı xanada dayanır. Şah hücum altındaykən rokirovka edilə bilməz.',
    rules: [
      'Şah və rokirovka ediləcək Top əvvəl heç vaxt hərəkət etməmiş olmalıdır.',
      'Şah ilə Topun arasında heç bir fiqur olmamalıdır.',
      'Şah təhlükə (şah) altında olmamalı və keçdiyi xanalar rəqib tərəfindən vurulmamalıdır.',
    ],
  },
  {
    id: 'promotion',
    title: 'Piyadanın Çevrilməsi',
    subtitle: 'Piyadanın Zirvəyə Çatması',
    description: 'Piyada lövhənin ən sonuncu xəttinə çatdıqda dərhal daha güclü bir fiqura çevrilmək hüququ qazanır.',
    condition: 'Piyada lövhənin ən sonuncu xəttinə (ağlar üçün 8-ci, qaralar üçün 1-ci xəttə) çatdıqda.',
    explain: 'Son xanaya çatan piyada dərhal oyunçunun istəyi ilə Vəzir, Top, Fil və ya Ata çevrilir (adətən ən güclü fiqur olan Vəzir seçilir). Bir oyunda bir neçə Vəzir ola bilər.',
    rules: [
      'Piyada son xəttə çatan kimi həmin gedişdə çevrilməlidir.',
      'Ən çox Vəzir seçilir, lakin bəzi taktikalarda At çevrilməsi də istifadə olunur.',
      'Vurulan fiqurlardan asılı olmayaraq eyni anda lövhədə birdən çox Vəzir ola bilər.',
    ],
  },
  {
    id: 'enpassant',
    title: 'Keçiddə Götürmə (An Passan)',
    subtitle: 'Xüsusi Piyada Zərbəsi',
    description: 'Rəqib piyada ilk addımında iki xana tullanaraq sizin piyadanızla yanaşı dayandıqda tətbiq olunur.',
    condition: 'Rəqib piyada ilk addımında 2 xana birdən irəliləyib sizin piyadanızın yanına düşdükdə.',
    explain: 'Yalnız dərhal növbəti gedişdə istifadə edilə bilən xüsusi qaydadır. Sizin piyadanız sanki rəqib piyada cəmi 1 xana irəliləmiş kimi onu çəpinə vurub rəqibin keçdiyi xanaya yerləşə bilər.',
    rules: [
      'Yalnız rəqib piyada 2 xana birdən irəliləyərək sizin piyadanın yanına gəldikdə keçərlidir.',
      'Zərbə yalnız dərhal növbəti gedişdə edilməlidir, sonrakı gedişlərdə bu hüquq itir.',
      'Vurulan piyada lövhədən çıxarılır, sizin piyadanız isə onun keçdiyi xanaya yerləşir.',
    ],
  },
];


