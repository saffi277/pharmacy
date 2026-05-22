export type Medicine = {
  id: number;
  nameAr: string;
  nameEn: string;
  aliases: string[];   // أسماء شائعة أو تهجئات خاطئة
  category: string;
  categoryEn: string;
  basePrice: number;
  image: string;
  description: string;
};

export const MEDICINES: Medicine[] = [
  { id:1,  nameAr:'باراسيتامول 500mg',    nameEn:'Paracetamol 500mg',     aliases:['بنادول','براسيتول','بارستامول','panadol','acetaminophen','tylenol'], category:'مسكنات',        categoryEn:'Painkillers',    basePrice:1500, image:'💊', description:'مسكن للألم وخافض للحرارة' },
  { id:2,  nameAr:'أموكسيسيلين 500mg',    nameEn:'Amoxicillin 500mg',     aliases:['اموكسيل','اموكسيسيلين','amoxil'],                                    category:'مضادات حيوية', categoryEn:'Antibiotics',    basePrice:4500, image:'💊', description:'مضاد حيوي واسع الطيف' },
  { id:3,  nameAr:'أوميبرازول 20mg',      nameEn:'Omeprazole 20mg',       aliases:['لوسك','اوميبرازول','losec','prilosec'],                              category:'هضمي',          categoryEn:'Digestive',      basePrice:3200, image:'💊', description:'لعلاج حموضة المعدة والقرحة' },
  { id:4,  nameAr:'ميترونيدازول 250mg',   nameEn:'Metronidazole 250mg',   aliases:['فلاجيل','مترونيدازول','flagyl'],                                     category:'مضادات حيوية', categoryEn:'Antibiotics',    basePrice:2800, image:'💊', description:'مضاد حيوي وطفيليات' },
  { id:5,  nameAr:'فيتامين C 1000mg',     nameEn:'Vitamin C 1000mg',      aliases:['vitc','فيت سي','ascorbic acid','سي فيتامين'],                       category:'فيتامينات',    categoryEn:'Vitamins',       basePrice:5500, image:'💊', description:'فيتامين سي لتقوية المناعة' },
  { id:6,  nameAr:'إيبوبروفين 400mg',     nameEn:'Ibuprofen 400mg',       aliases:['بروفين','ادفيل','brufen','advil','نيوروفين','nurofen'],              category:'مسكنات',        categoryEn:'Painkillers',    basePrice:2000, image:'💊', description:'مضاد للالتهاب ومسكن للألم' },
  { id:7,  nameAr:'لوراتادين 10mg',       nameEn:'Loratadine 10mg',       aliases:['كلاريتين','لوراتدين','claritin','clarityne'],                       category:'حساسية',        categoryEn:'Allergy',        basePrice:3500, image:'💊', description:'لعلاج الحساسية والرشح' },
  { id:8,  nameAr:'ميتفورمين 500mg',      nameEn:'Metformin 500mg',       aliases:['غلوكوفاج','جلوكوفاج','glucophage','ميتفومين'],                      category:'سكري',          categoryEn:'Diabetes',       basePrice:4000, image:'💊', description:'لعلاج السكري من النوع الثاني' },
  { id:9,  nameAr:'أملوديبين 5mg',        nameEn:'Amlodipine 5mg',        aliases:['نورفاسك','املوديبين','norvasc','امليبين'],                          category:'ضغط',           categoryEn:'Blood Pressure', basePrice:6000, image:'💊', description:'لعلاج ضغط الدم والذبحة الصدرية' },
  { id:10, nameAr:'فيتامين D3 1000 IU',   nameEn:'Vitamin D3 1000 IU',    aliases:['vitd','فيت د','د فيتامين','cholecalciferol'],                       category:'فيتامينات',    categoryEn:'Vitamins',       basePrice:7500, image:'💊', description:'فيتامين د لصحة العظام' },
  { id:11, nameAr:'سيتريزين 10mg',        nameEn:'Cetirizine 10mg',       aliases:['زيرتك','سيتريزن','zyrtec','زيرتيك'],                               category:'حساسية',        categoryEn:'Allergy',        basePrice:2500, image:'💊', description:'لعلاج الحساسية الموسمية' },
  { id:12, nameAr:'بنادول للأطفال شراب',  nameEn:'Panadol Syrup Kids',    aliases:['بنادول اطفال','شراب اطفال','calpol','كالبول'],                     category:'أطفال',         categoryEn:'Children',       basePrice:4500, image:'🍼', description:'خافض حرارة ومسكن للأطفال' },
  { id:13, nameAr:'أزيثروميسين 500mg',    nameEn:'Azithromycin 500mg',    aliases:['زيثروماكس','اريثروميسين','zithromax','زيثروميسين'],                category:'مضادات حيوية', categoryEn:'Antibiotics',    basePrice:8500, image:'💊', description:'مضاد حيوي قصير الأمد' },
  { id:14, nameAr:'أتورفاستاتين 20mg',    nameEn:'Atorvastatin 20mg',     aliases:['ليبيتور','كوليسترول','lipitor','اتورفستاتين'],                     category:'كوليسترول',    categoryEn:'Cholesterol',    basePrice:9000, image:'💊', description:'لتخفيض الكوليسترول' },
  { id:15, nameAr:'إنسولين هيومولين',     nameEn:'Insulin Humulin',       aliases:['انسولين','insulin','هيومولين','humulin'],                          category:'سكري',          categoryEn:'Diabetes',       basePrice:15000,image:'💉', description:'إنسولين لعلاج السكري' },
  { id:16, nameAr:'أوميغا 3 1000mg',      nameEn:'Omega 3 1000mg',        aliases:['اوميجا','fish oil','زيت سمك','omega'],                             category:'فيتامينات',    categoryEn:'Vitamins',       basePrice:12000,image:'💊', description:'أحماض دهنية لصحة القلب' },
  { id:17, nameAr:'ديكلوفيناك 50mg',      nameEn:'Diclofenac 50mg',       aliases:['فولتارين','فولتارن','voltaren','ديكلو'],                           category:'مسكنات',        categoryEn:'Painkillers',    basePrice:3000, image:'💊', description:'مضاد للالتهاب والألم المفصلي' },
  { id:18, nameAr:'راميبريل 5mg',         nameEn:'Ramipril 5mg',          aliases:['ترياسيك','altace','رامبريل'],                                      category:'ضغط',           categoryEn:'Blood Pressure', basePrice:7000, image:'💊', description:'لعلاج ضغط الدم وقصور القلب' },
];

export const CATEGORIES = ['الكل', 'مسكنات', 'مضادات حيوية', 'هضمي', 'فيتامينات', 'حساسية', 'سكري', 'ضغط', 'أطفال', 'كوليسترول'];

// fuzzy search: يرجع true إذا الكلمة قريبة من النص
function normalize(s: string) {
  return s.toLowerCase()
    .replace(/[ً-ٟ]/g, '')  // remove tashkeel
    .replace(/أ|إ|آ/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

function fuzzyMatch(query: string, target: string): boolean {
  const q = normalize(query);
  const t = normalize(target);
  if (t.includes(q)) return true;
  // check if all chars of query appear in order in target
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length && q.length >= 3;
}

export function searchMedicines(query: string, category: string): Medicine[] {
  const q = query.trim();
  return MEDICINES.filter(m => {
    if (category !== 'الكل' && m.category !== category) return false;
    if (!q) return true;
    return (
      fuzzyMatch(q, m.nameAr) ||
      fuzzyMatch(q, m.nameEn) ||
      m.aliases.some(a => fuzzyMatch(q, a))
    );
  });
}
