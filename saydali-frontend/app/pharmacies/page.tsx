'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CITIES = ['الكل', 'بغداد', 'البصرة', 'أربيل', 'موصل', 'النجف', 'كربلاء', 'السليمانية'];

const PHARMACIES = [
  { id: 1, name: 'صيدلية الأمل',     city: 'بغداد',        address: 'شارع الكرادة، بغداد',         rating: 4.8, reviews: 124, open: true,  delivery: true,  image: '💊', specialties: ['أدوية مزمنة', 'مستلزمات طبية'] },
  { id: 2, name: 'صيدلية النور',     city: 'البصرة',       address: 'شارع العشار، البصرة',          rating: 4.5, reviews: 89,  open: true,  delivery: false, image: '🏥', specialties: ['أدوية أطفال', 'فيتامينات'] },
  { id: 3, name: 'صيدلية الشفاء',   city: 'أربيل',        address: 'شارع 60م، أربيل',              rating: 4.9, reviews: 203, open: false, delivery: true,  image: '⚕️', specialties: ['أدوية مزمنة', 'أدوية نادرة'] },
  { id: 4, name: 'صيدلية الحياة',   city: 'موصل',         address: 'حي النور، الموصل',             rating: 4.3, reviews: 67,  open: true,  delivery: true,  image: '💉', specialties: ['مستلزمات طبية', 'ضغط وسكر'] },
  { id: 5, name: 'صيدلية بغداد',    city: 'بغداد',        address: 'شارع المنصور، بغداد',          rating: 4.6, reviews: 156, open: true,  delivery: true,  image: '🩺', specialties: ['فيتامينات', 'أدوية أطفال'] },
  { id: 6, name: 'صيدلية الرافدين', city: 'بغداد',        address: 'شارع فلسطين، بغداد',           rating: 4.7, reviews: 98,  open: false, delivery: false, image: '💊', specialties: ['أدوية مزمنة', 'ضغط وسكر'] },
  { id: 7, name: 'صيدلية السلام',   city: 'النجف',        address: 'شارع الإمام علي، النجف',       rating: 4.4, reviews: 45,  open: true,  delivery: true,  image: '🏥', specialties: ['أدوية أطفال', 'مستلزمات طبية'] },
  { id: 8, name: 'صيدلية الزهراء',  city: 'كربلاء',       address: 'قرب الحرم، كربلاء',            rating: 4.9, reviews: 312, open: true,  delivery: true,  image: '⚕️', specialties: ['فيتامينات', 'أدوية نادرة'] },
  { id: 9, name: 'صيدلية روژان',    city: 'السليمانية',   address: 'سالم ستريت، السليمانية',       rating: 4.6, reviews: 77,  open: true,  delivery: false, image: '💉', specialties: ['أدوية مزمنة', 'مستلزمات طبية'] },
];

export default function PharmaciesPage() {
  const [search, setSearch]   = useState('');
  const [city, setCity]       = useState('الكل');
  const [onlyOpen, setOnlyOpen]         = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [favs, setFavs] = useState<number[]>([1, 3]);

  const toggleFav = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => PHARMACIES.filter(p => {
    if (search && !p.name.includes(search) && !p.address.includes(search)) return false;
    if (city !== 'الكل' && p.city !== city) return false;
    if (onlyOpen && !p.open) return false;
    if (onlyDelivery && !p.delivery) return false;
    return true;
  }), [search, city, onlyOpen, onlyDelivery]);

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e8e0d0', fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .card { animation: fadeUp 0.4s ease forwards; background: #161616; border: 1px solid #222; border-radius: 16px; overflow: hidden; transition: transform 0.2s, border-color 0.2s; }
        .card:hover { transform: translateY(-3px); border-color: #D4AF3744; }
        .chip { padding: 3px 10px; border-radius: 20px; font-size: 11px; background: rgba(212,175,55,0.12); color: #D4AF37; }
        .filter-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid #2a2a2a; background: transparent; color: #888; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit; }
        .filter-btn.active { background: rgba(212,175,55,0.15); border-color: #D4AF37; color: #D4AF37; }
        .toggle { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; color: #888; user-select: none; }
        .toggle.active { color: #D4AF37; }
        input[type=text] { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 12px 48px 12px 16px; color: #e8e0d0; font-size: 14px; width: 100%; box-sizing: border-box; outline: none; transition: border-color 0.2s; font-family: inherit; }
        input[type=text]:focus { border-color: #D4AF37; }
        input[type=text]::placeholder { color: #555; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '20px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111' }}>
        <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚕️</span>
          <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>صيدلي</span>
        </Link>
        <div style={{ display:'flex', gap:14, alignItems:'center' }}>
          <Link href="/favorites" style={{ textDecoration:'none', fontSize:22 }}>❤️</Link>
          <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>

        {/* Page title */}
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>الصيدليات</h1>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>تصفح {PHARMACIES.length} صيدلية في جميع أنحاء العراق</p>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#555' }}>🔍</span>
          <input
            type="text"
            placeholder="ابحث عن صيدلية أو عنوان..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20, alignItems: 'center' }}>
          {/* City filter */}
          {CITIES.map(c => (
            <button key={c} className={`filter-btn${city === c ? ' active' : ''}`} onClick={() => setCity(c)}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          <label className={`toggle${onlyOpen ? ' active' : ''}`} onClick={() => setOnlyOpen(v => !v)}>
            <span style={{ fontSize: 18 }}>{onlyOpen ? '✅' : '⬜'}</span> مفتوح الآن
          </label>
          <label className={`toggle${onlyDelivery ? ' active' : ''}`} onClick={() => setOnlyDelivery(v => !v)}>
            <span style={{ fontSize: 18 }}>{onlyDelivery ? '✅' : '⬜'}</span> يوفر توصيل
          </label>
        </div>

        {/* Results count */}
        <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
          {filtered.length} نتيجة
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>لا توجد نتائج للبحث</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map((p, i) => (
              <Link key={p.id} href={`/pharmacies/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}>
                  {/* Card header */}
                  <div style={{ padding: '20px 20px 14px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 54, height: 54, borderRadius: 14, background: 'linear-gradient(135deg,#1e1e1e,#2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                      {p.image}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px', color: '#e8e0d0' }}>{p.name}</h3>
                        <button onClick={(e)=>toggleFav(p.id,e)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, padding:0, lineHeight:1, flexShrink:0 }}>
                          {favs.includes(p.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                      <p style={{ fontSize: 12, color: '#888', margin: '0 0 8px' }}>📍 {p.address}</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '2px 8px', borderRadius: 20, fontSize: 11,
                          background: p.open ? 'rgba(129,199,132,0.15)' : 'rgba(229,115,115,0.12)',
                          color: p.open ? '#81c784' : '#e57373',
                        }}>{p.open ? '● مفتوح' : '● مغلق'}</span>
                        {p.delivery && <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, background: 'rgba(79,195,247,0.12)', color: '#4fc3f7' }}>🛵 توصيل</span>}
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div style={{ padding: '0 20px 14px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.specialties.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '12px 20px', borderTop: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#D4AF37', fontSize: 14 }}>★</span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{p.rating}</span>
                      <span style={{ fontSize: 12, color: '#666' }}>({p.reviews} تقييم)</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#D4AF37' }}>عرض التفاصيل ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
