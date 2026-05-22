'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const CATEGORIES = ['الكل', 'مسكنات', 'مضادات حيوية', 'هضمي', 'فيتامينات', 'حساسية', 'سكري', 'ضغط', 'أطفال'];

const MEDICINES = [
  { id:1,  name:'باراسيتامول 500mg',    category:'مسكنات',       price:1500, pharmacies:['صيدلية الأمل','صيدلية بغداد','صيدلية الشفاء'], pharmId:[1,5,3] },
  { id:2,  name:'أموكسيسيلين 500mg',    category:'مضادات حيوية', price:4500, pharmacies:['صيدلية الأمل','صيدلية الحياة'],                  pharmId:[1,4] },
  { id:3,  name:'أوميبرازول 20mg',      category:'هضمي',         price:3200, pharmacies:['صيدلية الشفاء','صيدلية الرافدين'],               pharmId:[3,6] },
  { id:4,  name:'ميترونيدازول 250mg',   category:'مضادات حيوية', price:2800, pharmacies:['صيدلية الزهراء','صيدلية النور'],                  pharmId:[8,2] },
  { id:5,  name:'فيتامين C 1000mg',     category:'فيتامينات',    price:5500, pharmacies:['صيدلية بغداد','صيدلية روژان'],                   pharmId:[5,9] },
  { id:6,  name:'إيبوبروفين 400mg',     category:'مسكنات',       price:2000, pharmacies:['صيدلية الأمل','صيدلية السلام','صيدلية الحياة'],  pharmId:[1,7,4] },
  { id:7,  name:'لوراتادين 10mg',       category:'حساسية',       price:3500, pharmacies:['صيدلية الشفاء','صيدلية الزهراء'],               pharmId:[3,8] },
  { id:8,  name:'ميتفورمين 500mg',      category:'سكري',         price:4000, pharmacies:['صيدلية الرافدين','صيدلية الأمل'],               pharmId:[6,1] },
  { id:9,  name:'أملوديبين 5mg',        category:'ضغط',          price:6000, pharmacies:['صيدلية بغداد','صيدلية الشفاء'],                 pharmId:[5,3] },
  { id:10, name:'فيتامين D3 1000 IU',   category:'فيتامينات',    price:7500, pharmacies:['صيدلية الأمل','صيدلية الزهراء'],               pharmId:[1,8] },
  { id:11, name:'سيتريزين 10mg',        category:'حساسية',       price:2500, pharmacies:['صيدلية النور','صيدلية الحياة'],                 pharmId:[2,4] },
  { id:12, name:'بنادول للأطفال شراب',  category:'أطفال',        price:4500, pharmacies:['صيدلية النور','صيدلية السلام'],                 pharmId:[2,7] },
];

export default function SearchPage() {
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('الكل');

  const results = useMemo(() => MEDICINES.filter(m => {
    if (query && !m.name.includes(query)) return false;
    if (category !== 'الكل' && m.category !== category) return false;
    return true;
  }), [query, category]);

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .result-card { background:#161616; border:1px solid #222; border-radius:14px; padding:18px; animation:fadeUp 0.35s ease forwards; transition:border-color 0.2s; }
        .result-card:hover { border-color:#D4AF3744; }
        .cat-btn { padding:7px 16px; border-radius:20px; border:1px solid #2a2a2a; background:transparent; color:#888; cursor:pointer; font-size:13px; transition:all 0.2s; font-family:inherit; white-space:nowrap; }
        .cat-btn.active { background:rgba(212,175,55,0.15); border-color:#D4AF37; color:#D4AF37; }
        .pharm-chip { padding:4px 10px; background:#1e1e1e; border:1px solid #2a2a2a; border-radius:8px; font-size:12px; color:#aaa; text-decoration:none; transition:all 0.2s; display:inline-block; }
        .pharm-chip:hover { border-color:#D4AF37; color:#D4AF37; }
        input[type=text] { width:100%; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:14px; padding:14px 52px 14px 18px; color:#e8e0d0; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box; font-family:inherit; }
        input[type=text]:focus { border-color:#D4AF37; }
        input[type=text]::placeholder { color:#555; }
      `}</style>

      {/* Header */}
      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <Link href="/home" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:20 }}>⚕️</span>
          <span style={{ fontSize:18, fontWeight:700, background:'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>صيدلي</span>
        </Link>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
      </header>

      <div style={{ maxWidth:860, margin:'0 auto', padding:'32px 20px' }}>

        {/* Search hero */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <h1 style={{ fontSize:26, fontWeight:700, marginBottom:8 }}>ابحث عن دواء</h1>
          <p style={{ color:'#666', fontSize:14, marginBottom:24 }}>اعرف أي صيدلية تتوفر فيها الأدوية التي تحتاجها</p>
          <div style={{ position:'relative', maxWidth:540, margin:'0 auto' }}>
            <span style={{ position:'absolute', right:18, top:'50%', transform:'translateY(-50%)', fontSize:20, color:'#555', pointerEvents:'none' }}>🔍</span>
            <input
              type="text"
              placeholder="مثال: باراسيتامول، أموكسيسيلين..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Categories */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28, justifyContent:'center' }}>
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-btn${category===c?' active':''}`} onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>

        {/* Results */}
        <p style={{ fontSize:13, color:'#555', marginBottom:16 }}>{results.length} دواء</p>

        {results.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'#555' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <p style={{ marginBottom:8 }}>لا توجد نتائج لـ "{query}"</p>
            <p style={{ fontSize:13 }}>تأكد من الكتابة أو جرب اسم آخر</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {results.map((m, i) => (
              <div key={m.id} className="result-card" style={{ animationDelay:`${i*40}ms`, opacity:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                      <span style={{ fontSize:24 }}>💊</span>
                      <h3 style={{ fontSize:16, fontWeight:700, margin:0 }}>{m.name}</h3>
                    </div>
                    <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, background:'rgba(212,175,55,0.12)', color:'#D4AF37' }}>
                      {m.category}
                    </span>
                  </div>
                  <div style={{ textAlign:'left', direction:'ltr' }}>
                    <div style={{ fontSize:18, fontWeight:700, color:'#D4AF37', marginBottom:2 }}>
                      {m.price.toLocaleString()} <span style={{ fontSize:12, fontWeight:400, color:'#888' }}>د.ع</span>
                    </div>
                    <div style={{ fontSize:12, color:'#81c784' }}>✓ متوفر</div>
                  </div>
                </div>

                {/* Available pharmacies */}
                <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid #1e1e1e' }}>
                  <p style={{ fontSize:12, color:'#666', marginBottom:8 }}>متوفر في:</p>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {m.pharmacies.map((name, idx) => (
                      <Link key={name} href={`/pharmacies/${m.pharmId[idx]}`} className="pharm-chip">
                        🏥 {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
