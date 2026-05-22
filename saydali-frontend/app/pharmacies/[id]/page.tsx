'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const PHARMACIES: Record<number, {
  id: number; name: string; city: string; address: string; phone: string;
  rating: number; reviews: number; open: boolean; delivery: boolean;
  hours: string; about: string; image: string;
}> = {
  1: { id:1, name:'صيدلية الأمل',     city:'بغداد',      address:'شارع الكرادة، بغداد',        phone:'+964 770 111 2222', rating:4.8, reviews:124, open:true,  delivery:true,  hours:'8:00 ص - 11:00 م', about:'صيدلية الأمل تأسست عام 2010، تتميز بخدمة سريعة وأدوية متوفرة بشكل دائم.', image:'💊' },
  2: { id:2, name:'صيدلية النور',     city:'البصرة',     address:'شارع العشار، البصرة',         phone:'+964 780 222 3333', rating:4.5, reviews:89,  open:true,  delivery:false, hours:'9:00 ص - 10:00 م', about:'متخصصون في أدوية الأطفال والمستلزمات الطبية.',                         image:'🏥' },
  3: { id:3, name:'صيدلية الشفاء',   city:'أربيل',      address:'شارع 60م، أربيل',             phone:'+964 750 333 4444', rating:4.9, reviews:203, open:false, delivery:true,  hours:'8:00 ص - 12:00 م', about:'أكبر صيدلية في أربيل، نوفر أدوية نادرة وصعبة التوفر.',                image:'⚕️' },
  4: { id:4, name:'صيدلية الحياة',   city:'موصل',       address:'حي النور، الموصل',            phone:'+964 771 444 5555', rating:4.3, reviews:67,  open:true,  delivery:true,  hours:'8:00 ص - 10:00 م', about:'متخصصون في أدوية الضغط والسكري والمستلزمات الطبية.',                  image:'💉' },
  5: { id:5, name:'صيدلية بغداد',    city:'بغداد',      address:'شارع المنصور، بغداد',         phone:'+964 772 555 6666', rating:4.6, reviews:156, open:true,  delivery:true,  hours:'7:00 ص - 11:00 م', about:'في قلب المنصور منذ 2005، نخدم مئات الزبائن يومياً.',                   image:'🩺' },
  6: { id:6, name:'صيدلية الرافدين', city:'بغداد',      address:'شارع فلسطين، بغداد',          phone:'+964 773 666 7777', rating:4.7, reviews:98,  open:false, delivery:false, hours:'9:00 ص - 9:00 م',  about:'متخصصون في الأدوية المزمنة وأدوية الضغط والسكري.',                    image:'💊' },
  7: { id:7, name:'صيدلية السلام',   city:'النجف',      address:'شارع الإمام علي، النجف',      phone:'+964 783 777 8888', rating:4.4, reviews:45,  open:true,  delivery:true,  hours:'8:00 ص - 10:00 م', about:'نخدم زوار المدينة المقدسة وسكانها بأسعار مناسبة.',                    image:'🏥' },
  8: { id:8, name:'صيدلية الزهراء',  city:'كربلاء',     address:'قرب الحرم، كربلاء',           phone:'+964 784 888 9999', rating:4.9, reviews:312, open:true,  delivery:true,  hours:'24 ساعة',           about:'صيدلية 24 ساعة في قلب كربلاء المقدسة.',                               image:'⚕️' },
  9: { id:9, name:'صيدلية روژان',    city:'السليمانية', address:'سالم ستريت، السليمانية',      phone:'+964 753 999 0000', rating:4.6, reviews:77,  open:true,  delivery:false, hours:'9:00 ص - 9:00 م',  about:'صيدلية عصرية في قلب السليمانية مع فريق متخصص.',                       image:'💉' },
};

const MEDICINES = [
  { id:1, name:'باراسيتامول 500mg',   category:'مسكنات',       price:1500,  stock:true,  image:'💊' },
  { id:2, name:'أموكسيسيلين 500mg',   category:'مضادات حيوية', price:4500,  stock:true,  image:'💊' },
  { id:3, name:'أوميبرازول 20mg',     category:'هضمي',         price:3200,  stock:false, image:'💊' },
  { id:4, name:'ميترونيدازول 250mg',  category:'مضادات حيوية', price:2800,  stock:true,  image:'💊' },
  { id:5, name:'فيتامين C 1000mg',    category:'فيتامينات',    price:5500,  stock:true,  image:'💊' },
  { id:6, name:'إيبوبروفين 400mg',    category:'مسكنات',       price:2000,  stock:true,  image:'💊' },
  { id:7, name:'لوراتادين 10mg',      category:'حساسية',       price:3500,  stock:false, image:'💊' },
  { id:8, name:'ميتفورمين 500mg',     category:'سكري',         price:4000,  stock:true,  image:'💊' },
];

export default function PharmacyDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const pharmacy = PHARMACIES[id];
  const [cart, setCart] = useState<number[]>([]);
  const [tab, setTab] = useState<'medicines' | 'info' | 'reviews'>('medicines');

  if (!pharmacy) return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', alignItems:'center', justifyContent:'center', color:'#888', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
        <p>الصيدلية غير موجودة</p>
        <Link href="/pharmacies" style={{ color:'#D4AF37', marginTop:12, display:'block' }}>← العودة للصيدليات</Link>
      </div>
    </div>
  );

  const addToCart = (medicineId: number) => {
    setCart(prev => prev.includes(medicineId) ? prev : [...prev, medicineId]);
  };

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .med-card { background:#161616; border:1px solid #222; border-radius:12px; padding:16px; transition:border-color 0.2s; animation:fadeUp 0.3s ease forwards; }
        .med-card:hover { border-color:#D4AF3744; }
        .tab { padding:10px 20px; border:none; background:transparent; cursor:pointer; font-size:14px; font-family:inherit; border-bottom:2px solid transparent; transition:all 0.2s; color:#888; }
        .tab.active { color:#D4AF37; border-bottom-color:#D4AF37; }
        .add-btn { padding:7px 14px; border-radius:8px; border:none; cursor:pointer; font-size:12px; font-weight:600; font-family:inherit; transition:all 0.2s; }
      `}</style>

      {/* Header */}
      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <Link href="/pharmacies" style={{ textDecoration:'none', color:'#D4AF37', fontSize:14, display:'flex', alignItems:'center', gap:6 }}>
          ← الصيدليات
        </Link>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22, position:'relative' }}>
          🛒
          {cart.length > 0 && (
            <span style={{ position:'absolute', top:-6, left:-6, background:'#D4AF37', color:'#111', borderRadius:'50%', width:18, height:18, fontSize:11, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>
              {cart.length}
            </span>
          )}
        </Link>
      </header>

      {/* Pharmacy hero */}
      <div style={{ background:'linear-gradient(135deg,#141414,#1a1a1a)', borderBottom:'1px solid #1e1e1e', padding:'28px 24px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', display:'flex', gap:20, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:72, height:72, borderRadius:18, background:'linear-gradient(135deg,#1e1e1e,#2a2a2a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, border:'1px solid #2a2a2a', flexShrink:0 }}>
            {pharmacy.image}
          </div>
          <div style={{ flex:1, minWidth:220 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:6 }}>
              <h1 style={{ fontSize:22, fontWeight:700, margin:0 }}>{pharmacy.name}</h1>
              <span style={{ padding:'3px 10px', borderRadius:20, fontSize:12, background: pharmacy.open ? 'rgba(129,199,132,0.15)' : 'rgba(229,115,115,0.12)', color: pharmacy.open ? '#81c784' : '#e57373' }}>
                {pharmacy.open ? '● مفتوح' : '● مغلق'}
              </span>
            </div>
            <p style={{ color:'#888', fontSize:13, margin:'0 0 10px' }}>📍 {pharmacy.address}</p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', fontSize:13 }}>
              <span style={{ color:'#D4AF37' }}>★ {pharmacy.rating} <span style={{ color:'#666' }}>({pharmacy.reviews} تقييم)</span></span>
              <span style={{ color:'#888' }}>🕐 {pharmacy.hours}</span>
              <span style={{ color:'#888' }}>📞 <span dir="ltr">{pharmacy.phone}</span></span>
              {pharmacy.delivery && <span style={{ color:'#4fc3f7' }}>🛵 يوفر توصيل</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:'#111', borderBottom:'1px solid #1a1a1a', padding:'0 24px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', display:'flex' }}>
          <button className={`tab${tab==='medicines'?' active':''}`} onClick={()=>setTab('medicines')}>💊 الأدوية</button>
          <button className={`tab${tab==='reviews'?' active':''}`} onClick={()=>setTab('reviews')}>⭐ التقييمات</button>
          <button className={`tab${tab==='info'?' active':''}`} onClick={()=>setTab('info')}>ℹ️ معلومات</button>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:'0 auto', padding:'24px 20px' }}>

        {/* Medicines tab */}
        {tab === 'medicines' && (
          <div>
            {cart.length > 0 && (
              <div style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:12, padding:'12px 18px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, color:'#D4AF37' }}>🛒 {cart.length} منتج في السلة</span>
                <Link href="/cart" style={{ textDecoration:'none', padding:'7px 16px', borderRadius:8, background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', fontSize:13, fontWeight:700 }}>
                  إتمام الطلب
                </Link>
              </div>
            )}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:14 }}>
              {MEDICINES.map((m, i) => (
                <div key={m.id} className="med-card" style={{ animationDelay:`${i*50}ms`, opacity:0 }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{m.image}</div>
                  <h3 style={{ fontSize:14, fontWeight:600, margin:'0 0 4px', color:'#e8e0d0' }}>{m.name}</h3>
                  <p style={{ fontSize:11, color:'#888', margin:'0 0 12px' }}>{m.category}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:15, fontWeight:700, color:'#D4AF37' }}>{m.price.toLocaleString()} د.ع</span>
                    {m.stock ? (
                      <button
                        className="add-btn"
                        onClick={() => addToCart(m.id)}
                        style={{ background: cart.includes(m.id) ? 'rgba(129,199,132,0.15)' : 'linear-gradient(135deg,#D4AF37,#8B6914)', color: cart.includes(m.id) ? '#81c784' : '#111' }}
                      >
                        {cart.includes(m.id) ? '✓ أضيف' : '+ أضف للسلة'}
                      </button>
                    ) : (
                      <span style={{ fontSize:11, color:'#e57373' }}>غير متوفر</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews tab */}
        {tab === 'reviews' && <ReviewsSection pharmacyId={id} rating={pharmacy.rating} reviewCount={pharmacy.reviews} />}

        {/* Info tab */}
        {tab === 'info' && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20 }}>
              <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:10 }}>عن الصيدلية</h3>
              <p style={{ fontSize:14, color:'#aaa', lineHeight:1.7 }}>{pharmacy.about}</p>
            </div>
            <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20 }}>
              <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>معلومات التواصل</h3>
              {[
                { icon:'📍', label:'العنوان', val:pharmacy.address },
                { icon:'📞', label:'الهاتف',  val:pharmacy.phone, ltr:true },
                { icon:'🕐', label:'أوقات العمل', val:pharmacy.hours },
                { icon:'🛵', label:'التوصيل', val:pharmacy.delivery ? 'متوفر' : 'غير متوفر' },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', gap:14, marginBottom:12, alignItems:'flex-start' }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize:12, color:'#666', marginBottom:2 }}>{row.label}</div>
                    <div style={{ fontSize:14, color:'#ccc', direction: row.ltr ? 'ltr' : undefined }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const DEMO_REVIEWS = [
  { id:1, name:'سارة علي',    stars:5, date:'2024-04-18', text:'خدمة ممتازة والأدوية دائماً متوفرة. الصيدلاني محترم ومتعاون.' },
  { id:2, name:'محمد حسين',  stars:4, date:'2024-04-10', text:'سريعين بالتوصيل وأسعار معقولة. أنصح بيهم.' },
  { id:3, name:'علي كريم',   stars:5, date:'2024-03-28', text:'أفضل صيدلية جربتها. دائماً عندهم كل شي.' },
  { id:4, name:'زينب كاظم', stars:3, date:'2024-03-15', text:'الخدمة كويسة بس أحياناً يتأخرون شوية بالرد.' },
];

function ReviewsSection({ pharmacyId, rating, reviewCount }: { pharmacyId:number; rating:number; reviewCount:number }) {
  const [myStars, setMyStars]   = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [myText, setMyText]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews]   = useState(DEMO_REVIEWS);

  const distribution = [5,4,3,2,1].map(s => ({
    stars: s,
    count: reviews.filter(r => r.stars === s).length,
    pct: Math.round((reviews.filter(r => r.stars === s).length / reviews.length) * 100),
  }));

  const handleSubmit = () => {
    if (!myStars || !myText.trim()) return;
    setReviews(prev => [{
      id: Date.now(), name:'أنت', stars:myStars, date:new Date().toISOString().split('T')[0], text:myText,
    }, ...prev]);
    setSubmitted(true);
    setMyStars(0);
    setMyText('');
  };

  return (
    <div>
      {/* Summary */}
      <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20, marginBottom:16, display:'flex', gap:24, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ textAlign:'center', flexShrink:0 }}>
          <div style={{ fontSize:48, fontWeight:700, color:'#D4AF37', lineHeight:1 }}>{rating}</div>
          <div style={{ fontSize:20, color:'#D4AF37', margin:'4px 0' }}>{'★'.repeat(Math.round(rating))}</div>
          <div style={{ fontSize:12, color:'#666' }}>{reviewCount} تقييم</div>
        </div>
        <div style={{ flex:1, minWidth:200 }}>
          {distribution.map(d => (
            <div key={d.stars} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <span style={{ fontSize:12, color:'#888', width:16, flexShrink:0 }}>{d.stars}</span>
              <span style={{ color:'#D4AF37', fontSize:13 }}>★</span>
              <div style={{ flex:1, background:'#2a2a2a', borderRadius:4, height:6, overflow:'hidden' }}>
                <div style={{ width:`${d.pct}%`, height:'100%', background:'linear-gradient(90deg,#D4AF37,#F0D060)', borderRadius:4, transition:'width 0.5s ease' }} />
              </div>
              <span style={{ fontSize:12, color:'#666', width:28 }}>{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write review */}
      {submitted ? (
        <div style={{ background:'rgba(129,199,132,0.1)', border:'1px solid rgba(129,199,132,0.3)', borderRadius:14, padding:16, marginBottom:16, textAlign:'center', color:'#81c784', fontSize:14 }}>
          ✓ شكراً! تم إرسال تقييمك
        </div>
      ) : (
        <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20, marginBottom:16 }}>
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>أضف تقييمك</h3>
          {/* Stars */}
          <div style={{ display:'flex', gap:8, marginBottom:14, fontSize:28 }}>
            {[1,2,3,4,5].map(s => (
              <span
                key={s}
                style={{ cursor:'pointer', color: s <= (hovered || myStars) ? '#D4AF37' : '#333', transition:'color 0.15s' }}
                onMouseEnter={()=>setHovered(s)}
                onMouseLeave={()=>setHovered(0)}
                onClick={()=>setMyStars(s)}
              >★</span>
            ))}
            {myStars > 0 && <span style={{ fontSize:13, color:'#888', alignSelf:'center', marginRight:4 }}>
              {['','سيء','مقبول','جيد','جيد جداً','ممتاز'][myStars]}
            </span>}
          </div>
          <textarea
            value={myText}
            onChange={e=>setMyText(e.target.value)}
            placeholder="شاركنا تجربتك مع هذه الصيدلية..."
            rows={3}
            style={{ width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:10, padding:'11px 14px', color:'#e8e0d0', fontSize:13, resize:'none', outline:'none', boxSizing:'border-box', fontFamily:'inherit', transition:'border-color 0.2s' }}
            onFocus={e=>e.target.style.borderColor='#D4AF37'}
            onBlur={e=>e.target.style.borderColor='#2a2a2a'}
          />
          <button
            onClick={handleSubmit}
            disabled={!myStars || !myText.trim()}
            style={{ marginTop:10, padding:'10px 24px', borderRadius:8, border:'none', background: (!myStars||!myText.trim()) ? '#1e1e1e' : 'linear-gradient(135deg,#D4AF37,#8B6914)', color: (!myStars||!myText.trim()) ? '#555' : '#111', cursor:(!myStars||!myText.trim()) ? 'not-allowed' : 'pointer', fontSize:14, fontWeight:700, fontFamily:'inherit' }}
          >
            إرسال التقييم
          </button>
        </div>
      )}

      {/* Reviews list */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {reviews.map(r => (
          <div key={r.id} style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#2a2a2a,#333)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>👤</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600 }}>{r.name}</div>
                  <div style={{ fontSize:12, color:'#D4AF37' }}>{'★'.repeat(r.stars)}{'☆'.repeat(5-r.stars)}</div>
                </div>
              </div>
              <span style={{ fontSize:12, color:'#555' }}>{r.date}</span>
            </div>
            <p style={{ fontSize:13, color:'#aaa', lineHeight:1.7, margin:0 }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
