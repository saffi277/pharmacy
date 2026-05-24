'use client';
import { useState } from 'react';
import Link from 'next/link';

type FavPharmacy = {
  id: number; name: string; city: string; rating: number;
  open: boolean; delivery: boolean; image: string;
};

const INIT_FAVS: FavPharmacy[] = [
  { id:1, name:'صيدلية الأمل',   city:'بغداد',  rating:4.8, open:true,  delivery:true,  image:'💊' },
  { id:3, name:'صيدلية الشفاء', city:'أربيل',  rating:4.9, open:false, delivery:true,  image:'⚕️' },
  { id:8, name:'صيدلية الزهراء', city:'كربلاء', rating:4.9, open:true,  delivery:true,  image:'⚕️' },
];

export default function FavoritesPage() {
  const [favs, setFavs] = useState<FavPharmacy[]>(INIT_FAVS);

  const remove = (id: number) => setFavs(prev => prev.filter(f => f.id !== id));

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .card { background:#161616; border:1px solid #222; border-radius:16px; overflow:hidden; transition:transform 0.2s,border-color 0.2s; animation:fadeUp 0.35s ease forwards; }
        .card:hover { transform:translateY(-2px); border-color:#D4AF3744; }
      `}</style>

      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <Link href="/home" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:20 }}>⚕️</span>
          <span style={{ fontSize:18, fontWeight:700, background:'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>صيدلي</span>
        </Link>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
      </header>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'28px 20px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>❤️ المفضلة</h1>
            <p style={{ fontSize:13, color:'#666' }}>{favs.length} صيدلية محفوظة</p>
          </div>
          <Link href="/pharmacies" style={{ padding:'9px 18px', border:'1px solid #D4AF3766', color:'#D4AF37', borderRadius:10, textDecoration:'none', fontSize:13 }}>
            + إضافة صيدلية
          </Link>
        </div>

        {favs.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'#555' }}>
            <div style={{ fontSize:56, marginBottom:16 }}>❤️</div>
            <p style={{ fontSize:16, marginBottom:8 }}>ما عندك صيدليات مفضلة بعد</p>
            <p style={{ fontSize:13, marginBottom:24, color:'#444' }}>تصفح الصيدليات واضغط ❤️ لحفظها هنا</p>
            <Link href="/pharmacies" style={{ padding:'12px 28px', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', borderRadius:12, textDecoration:'none', fontWeight:700 }}>
              تصفح الصيدليات
            </Link>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
            {favs.map((p, i) => (
              <div key={p.id} className="card" style={{ animationDelay:`${i*60}ms`, opacity:0 }}>
                <div style={{ padding:'18px 18px 14px', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:50, height:50, borderRadius:12, background:'linear-gradient(135deg,#1e1e1e,#2a2a2a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
                    {p.image}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <h3 style={{ fontSize:15, fontWeight:700, margin:'0 0 4px' }}>{p.name}</h3>
                      <button onClick={()=>remove(p.id)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#e57373', padding:0, lineHeight:1 }} title="إزالة من المفضلة">
                        ❤️
                      </button>
                    </div>
                    <p style={{ fontSize:12, color:'#888', margin:'0 0 8px' }}>📍 {p.city}</p>
                    <div style={{ display:'flex', gap:6 }}>
                      <span style={{ padding:'2px 8px', borderRadius:20, fontSize:11, background: p.open ? 'rgba(129,199,132,0.15)' : 'rgba(229,115,115,0.12)', color: p.open ? '#81c784' : '#e57373' }}>
                        {p.open ? '● مفتوح' : '● مغلق'}
                      </span>
                      {p.delivery && <span style={{ padding:'2px 8px', borderRadius:20, fontSize:11, background:'rgba(79,195,247,0.12)', color:'#4fc3f7' }}>🛵</span>}
                    </div>
                  </div>
                </div>
                <div style={{ padding:'12px 18px', borderTop:'1px solid #1e1e1e', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, color:'#D4AF37' }}>★ {p.rating}</span>
                  <Link href={`/pharmacies/${p.id}`} style={{ padding:'6px 14px', borderRadius:8, background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', textDecoration:'none', fontSize:12, fontWeight:700 }}>
                    عرض الصيدلية
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
