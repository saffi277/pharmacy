'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MEDICINES } from '@/lib/medicines';

const PHARM_MAP: Record<number, { name: string; id: number; city: string; price: number; stock: boolean }[]> = {
  1:  [{ name:'صيدلية الأمل', id:1, city:'بغداد', price:1500, stock:true }, { name:'صيدلية بغداد', id:5, city:'بغداد', price:1600, stock:true }],
  2:  [{ name:'صيدلية الأمل', id:1, city:'بغداد', price:4500, stock:true }, { name:'صيدلية الحياة', id:4, city:'موصل', price:4200, stock:true }],
  3:  [{ name:'صيدلية الشفاء', id:3, city:'أربيل', price:3200, stock:false }, { name:'صيدلية الرافدين', id:6, city:'بغداد', price:3000, stock:true }],
  4:  [{ name:'صيدلية الزهراء', id:8, city:'كربلاء', price:2800, stock:true }, { name:'صيدلية النور', id:2, city:'البصرة', price:2900, stock:true }],
  5:  [{ name:'صيدلية بغداد', id:5, city:'بغداد', price:5500, stock:true }, { name:'صيدلية روژان', id:9, city:'السليمانية', price:5800, stock:true }],
  6:  [{ name:'صيدلية الأمل', id:1, city:'بغداد', price:2000, stock:true }, { name:'صيدلية السلام', id:7, city:'النجف', price:2100, stock:true }, { name:'صيدلية الحياة', id:4, city:'موصل', price:1900, stock:true }],
  7:  [{ name:'صيدلية الشفاء', id:3, city:'أربيل', price:3500, stock:false }, { name:'صيدلية الزهراء', id:8, city:'كربلاء', price:3400, stock:true }],
  8:  [{ name:'صيدلية الرافدين', id:6, city:'بغداد', price:4000, stock:true }, { name:'صيدلية الأمل', id:1, city:'بغداد', price:4200, stock:true }],
  9:  [{ name:'صيدلية بغداد', id:5, city:'بغداد', price:6000, stock:true }, { name:'صيدلية الشفاء', id:3, city:'أربيل', price:5800, stock:true }],
  10: [{ name:'صيدلية الأمل', id:1, city:'بغداد', price:7500, stock:true }, { name:'صيدلية الزهراء', id:8, city:'كربلاء', price:7200, stock:true }],
};

export default function MedicineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const medicine = MEDICINES.find(m => m.id === Number(id));

  if (!medicine) return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', alignItems:'center', justifyContent:'center', color:'#888', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:12 }}>💊</div>
        <p>الدواء غير موجود</p>
        <Link href="/search" style={{ color:'#D4AF37', marginTop:12, display:'block' }}>← العودة للبحث</Link>
      </div>
    </div>
  );

  const pharmacies = PHARM_MAP[medicine.id] || [];
  const minPrice   = pharmacies.length ? Math.min(...pharmacies.map(p => p.price)) : medicine.basePrice;

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fade { animation: fadeUp 0.35s ease forwards; }
        .card { background:#161616; border:1px solid #222; border-radius:14px; padding:20px; }
        .pharm-row { display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid #1e1e1e; transition:background 0.2s; }
        .pharm-row:last-child { border-bottom:none; }
      `}</style>

      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <button onClick={()=>router.back()} style={{ background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>← رجوع</button>
        <h1 style={{ fontSize:15, fontWeight:700, color:'#D4AF37', margin:0 }}>تفاصيل الدواء</h1>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
      </header>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'28px 16px', display:'flex', flexDirection:'column', gap:18 }}>

        {/* Medicine card */}
        <div className="card fade">
          <div style={{ display:'flex', gap:18, alignItems:'flex-start' }}>
            <div style={{ width:72, height:72, borderRadius:16, background:'linear-gradient(135deg,#1e1e1e,#2a2a2a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, flexShrink:0, border:'1px solid #2a2a2a' }}>
              {medicine.image}
            </div>
            <div style={{ flex:1 }}>
              <h2 style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>{medicine.nameAr}</h2>
              <p style={{ fontSize:13, color:'#888', marginBottom:10, direction:'ltr', textAlign:'right' }}>{medicine.nameEn}</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <span style={{ padding:'3px 12px', borderRadius:20, fontSize:12, background:'rgba(212,175,55,0.12)', color:'#D4AF37' }}>{medicine.category}</span>
                <span style={{ padding:'3px 12px', borderRadius:20, fontSize:12, background:'rgba(150,150,150,0.08)', color:'#888' }}>{medicine.categoryEn}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid #1e1e1e' }}>
            <p style={{ fontSize:14, color:'#aaa', lineHeight:1.8 }}>{medicine.description}</p>
          </div>

          {/* Price range */}
          <div style={{ marginTop:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:11, color:'#666', marginBottom:2 }}>يبدأ من</div>
              <div style={{ fontSize:22, fontWeight:700, color:'#D4AF37' }}>{minPrice.toLocaleString()} <span style={{ fontSize:13, fontWeight:400, color:'#888' }}>د.ع</span></div>
            </div>
            <div style={{ fontSize:12, color:'#81c784' }}>✓ متوفر في {pharmacies.filter(p=>p.stock).length} صيدلية</div>
          </div>
        </div>

        {/* Aliases */}
        {medicine.aliases.length > 0 && (
          <div className="card fade" style={{ animationDelay:'0.1s', opacity:0 }}>
            <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:12 }}>يُعرف أيضاً بـ</h3>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {medicine.aliases.map(a => (
                <span key={a} style={{ padding:'4px 12px', borderRadius:20, fontSize:12, background:'#1e1e1e', border:'1px solid #2a2a2a', color:'#aaa' }}>{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Available pharmacies */}
        <div className="card fade" style={{ animationDelay:'0.15s', opacity:0 }}>
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:4 }}>متوفر في الصيدليات</h3>
          <p style={{ fontSize:12, color:'#666', marginBottom:14 }}>مرتب من الأرخص للأغلى</p>
          {pharmacies.length === 0 ? (
            <p style={{ fontSize:14, color:'#555', textAlign:'center', padding:'20px 0' }}>غير متوفر حالياً</p>
          ) : (
            [...pharmacies].sort((a,b) => a.price - b.price).map(p => (
              <div key={p.id} className="pharm-row">
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <span style={{ fontSize:20 }}>🏥</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600 }}>{p.name}</div>
                    <div style={{ fontSize:12, color:'#666' }}>📍 {p.city}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ textAlign:'left' }}>
                    <div style={{ fontSize:15, fontWeight:700, color:'#D4AF37' }}>{p.price.toLocaleString()}</div>
                    <div style={{ fontSize:10, color:'#666' }}>د.ع</div>
                  </div>
                  {p.stock ? (
                    <Link href={`/pharmacies/${p.id}`} style={{ padding:'7px 14px', borderRadius:8, background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', textDecoration:'none', fontSize:12, fontWeight:700 }}>
                      اطلب
                    </Link>
                  ) : (
                    <span style={{ padding:'7px 14px', borderRadius:8, background:'rgba(229,115,115,0.1)', color:'#e57373', fontSize:12 }}>نفذ</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Related medicines */}
        <div className="fade" style={{ animationDelay:'0.2s', opacity:0 }}>
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:12 }}>أدوية من نفس الفئة</h3>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {MEDICINES.filter(m => m.category === medicine.category && m.id !== medicine.id).slice(0,4).map(m => (
              <Link key={m.id} href={`/medicines/${m.id}`} style={{ textDecoration:'none', padding:'8px 16px', background:'#161616', border:'1px solid #222', borderRadius:10, fontSize:13, color:'#aaa', transition:'border-color 0.2s' }}>
                {m.image} {m.nameAr}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
