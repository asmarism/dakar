
import { Competitor, TripMember, TimelineEvent } from './types';

export const CREW: TripMember[] = [
  { name: 'أسامة', role: 'أمير الرحلة', avatar: 'https://asmari.me/files/1.jpeg', task: 'التوجيه، التنسيق، والقيادة العليا للقروب' },
  { name: 'سلمان', role: 'راعي الموتر', avatar: 'https://asmari.me/files/2.jpeg', task: 'الكابتن، المسؤول عن الـ AT4 وتجهيزات الموتر' },
  { name: 'عبدالله', role: 'عضو الرحلة', avatar: 'https://asmari.me/files/3.jpeg', task: 'مسؤول الرصد، التصوير، وتتبع الإحداثيات' },
  { name: 'يوسف', role: 'عضو الرحلة', avatar: 'https://asmari.me/files/4.jpeg', task: 'خبير الأجواء، الشيف الرئيسي، ومسؤول القهوة' }
];

export const VEHICLE_INFO = {
  name: 'GMC Sierra AT4',
  year: '2020',
  color: 'Carbon Black',
  img: 'https://asmari.me/files/2020%20gmc%20sierra%20at4.png'
};

export const ITINERARY: TimelineEvent[] = [
  {
    id: '1',
    day: 'الثلاثاء',
    date: '6 يناير',
    time: '06:00 م',
    title: '🏁نقطة التجمع والانطلاق',
    description: 'الانطلاق من نقطة حي الياسمين المحددة. لا تتأخر!',
    geo: 'https://www.google.com/maps/search/?api=1&query=24.831587,46.649322',
    type: 'start'
  },
  {
    id: '2',
    day: 'الأربعاء',
    date: '7 يناير',
    time: '01:00ص',
    title: '🛌وصول سكن حائل',
    description: 'نوصل للشقة بالسلامة إن شاء الله ونومة محترمة للقومة بدري من الفجر.',
    geo: 'https://www.google.com/maps/search/?api=1&query=27.411556,41.576972',
    type: 'sleep'
  },
  {
    id: '3',
    day: 'الأربعاء',
    date: '7 يناير',
    time: '06:30 ص',
    title: '☀️فجرية داكار',
    description: 'قومة بدري .. نصلي الفجر .. نفطر وننطلق للرالي بين العلا وحائل في المواقع الساحرة.',
    type: 'wake'
  },
  {
    id: '4',
    day: 'الأربعاء',
    date: '7يناير',
    time: '1:00م',
    title: '🍲كبسة وسط غبار داكار',
    description: 'نوقف في موقع حلو نطبخ غدانا.',
    type: 'cook'
  },
  {
    id: '5',
    day: 'الأربعاء',
    date: '7يناير',
    time: '5:00م',
    title: 'العودة للسكن',
    description: 'نوجه للسكن لغيبوبة سريعة ونقوم متى ما نقوم',
    type: 'city'
  },
  {
    id: '6',
    day: 'الأربعاء',
    date: '7 يناير',
    time: '10:00م',
    title: '🌆عشاء حائلي',
    description: 'نطلق رجيلاتنا في حائل ونشوف لنا عشوة حلوه لو باقي فيه مطعم فاتح',
    type: 'city'
  },
  {
    id: '7',
    day: 'الخميس',
    date: '8 يناير',
    time: '10:00 ص',
    title: '🌆نقوم نرحب بيوسف',
    description: 'نقوم مروقين نفطر ونحرك نستقبل وفود الرالي القادمة لحايل.',
    type: 'city'
  },
  {
    id: '8',
    day: 'الخميس',
    date: '8 يناير',
    time: '07:00 م',
    title: 'تمشية مسائية في حائل',
    description: 'نستكشف حائل قبل ما نرجع ننام بدري.',
    type: 'city'
  },
  {
    id: '9',
    day: 'الجمعة',
    date: '9 يناير',
    time: '8:00 ص',
    title: 'مشاهدة خط البداية',
    description: 'نطلع من السكن ونشوف انطلاقة السيارات من حائل ونحرك للقصيم',
    type: 'start'
  },
  {
    id: '10',
    day: 'الجمعة',
    date: '09 يناير',
    time: '01:00 م',
    title: '🍲غداء في وسط النفود',
    description: 'نقفل الرحلة بغدوة حلوة ونشوف الفعاليات',
    type: 'cook'
  },
  {
    id: '11',
    day: 'الجمعة',
    date: '09 يناير',
    time: '6:00م',
    title: '🚗العودة للرياض',
    description: 'الوصول بسلامة الله للرياض.',
    type: 'drive'
  }
];

export const COMPETITORS_DATA: Record<number, Competitor> = {
  24: { id: 24, name: 'عبدالحليم المغيرة', nationality: '🇸🇦', vehicle: 'KTM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/24/201508/0:0,600:500-600-0-100/05bbb' },
  83: { id: 83, name: 'بدر الحمدان', nationality: '🇸🇦', vehicle: 'KOVE', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/83/201541/0:0,600:500-600-0-100/faa36' },
  201: { id: 201, name: 'يزيد الراجحي', nationality: '🇸🇦', vehicle: 'TOYOTA', img: 'https://yazeedracing.com/wp-content/uploads/2026/01/M11_0660-900x600.jpg' },
  202: { id: 202, name: 'هينك لاتيغان', nationality: '🇿🇦', vehicle: 'TOYOTA', img: 'https://cdn.motor1.com/images/mgl/jlR3r1/s3/2026-toyota-dkr-gr-hilux.jpg' },
  203: { id: 203, name: 'سيث كوينتيرو', nationality: '🇺🇸', vehicle: 'TOYOTA', img: 'https://cdn.motor1.com/images/mgl/jlR3r1/s3/2026-toyota-dkr-gr-hilux.jpg' },
  204: { id: 204, name: 'توبي برايس', nationality: '🇦🇺', vehicle: 'TOYOTA', img: 'https://cdn.motor1.com/images/mgl/jlR3r1/s3/2026-toyota-dkr-gr-hilux.jpg' },
  212: { id: 212, name: 'كريستينا غوتيريز', nationality: '🇪🇸', vehicle: 'DACIA', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/212/202732/0:0,600:500-600-0-100/3d639' },
  219: { id: 219, name: 'سيباستيان لويب', nationality: '🇫🇷', vehicle: 'DACIA', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/219/202744/0:0,600:500-600-0-100/adbeb' },
  223: { id: 223, name: 'لوكاس مورايس', nationality: '🇧🇷', vehicle: 'DACIA', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/223/202736/0:0,600:500-600-0-100/d9e56' },
  225: { id: 225, name: 'كارلوس ساينز', nationality: '🇪🇸', vehicle: 'FORD', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/225/202750/0:0,600:500-600-0-100/0b318' },
  226: { id: 226, name: 'ماتياس ايكستروم', nationality: '🇸🇪', vehicle: 'FORD', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/226/202749/0:0,600:500-600-0-100/c73f9' },
  227: { id: 227, name: 'ناني روما', nationality: '🇪🇸', vehicle: 'FORD', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/227/202756/0:0,600:500-600-0-100/b8a3c' },
  228: { id: 228, name: 'ميتش غوثري', nationality: '🇺🇸', vehicle: 'FORD', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/228/202741/0:0,600:500-600-0-100/7a6ea' },
  299: { id: 299, name: 'ناصر العطية', nationality: '🇶🇦', vehicle: 'DACIA', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/299/202796/0:0,600:500-600-0-100/8ee23' },
  301: { id: 301, name: 'دانيا عقيل', nationality: '🇸🇦', vehicle: 'MCE-5 Taurus', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/301/202779/0:0,600:500-600-0-100/87693' },
  304: { id: 304, name: 'ياسر سعيدان', nationality: '🇸🇦', vehicle: 'MCE-5 Taurus', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/304/201602/0:0,600:500-600-0-100/96304' },
  316: { id: 316, name: 'عبدالعزيز الكواري', nationality: '🇶🇦', vehicle: 'OT3', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/316/201603/0:0,600:500-600-0-100/e9c80' },
  414: { id: 414, name: 'صالح السيف', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/414/201712/0:0,600:500-600-0-100/30064' },
  433: { id: 433, name: 'حسن جميل', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/433/201618/0:0,600:500-600-0-100/71204' },
  434: { id: 434, name: 'عبدالله الشقاوي', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/434/202842/0:0,600:500-600-0-100/3e246' },
  435: { id: 435, name: 'حمزة باخشب', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/435/202826/0:0,600:500-600-0-100/6f7d7' },
  442: { id: 442, name: 'حمد الحربي', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/442/201623/0:0,600:500-600-0-100/04155' },
  443: { id: 443, name: 'عبدالله الفهد', nationality: '🇸🇦', vehicle: 'CAN-AM', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/443/202832/0:0,600:500-600-0-100/8ca80' },
  500: { id: 500, name: 'ستيفان بيترهانسل', nationality: '🇫🇷', vehicle: 'AUDI', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/500/201622/0:0,600:500-600-0-100/b9278' },
  624: { id: 624, name: 'طارق الرماح', nationality: '🇸🇦', vehicle: 'شاحنة', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/624/201702/0:0,600:500-600-0-100/bedeb' },
  650: { id: 650, name: 'بدر البراك', nationality: '🇸🇦', vehicle: 'شاحنة', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/650/202879/0:0,600:500-600-0-100/1c277' },
  905: { id: 905, name: 'إبراهيم المهنا', nationality: '🇸🇦', vehicle: 'كلاسيك', img: 'https://img.aso.fr/core_app/img-motorSports-dak-png/905/202865/0:0,600:500-600-0-100/4f6ae' },
};
