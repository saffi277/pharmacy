'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { searchMedicines, CATEGORIES } from '@/lib/medicines';

const PHARM_MAP: Record<number, { names: string[]; ids: number[] }> = {
  1:  { names:['صيدلية الأمل','صيدلية بغداد'],       ids:[1,5] },
  2:  { names:['صيدلية الأمل','صيدلية الحياة'],       ids:[1,4] },
  3:  { names:['صيدلية الشفاء','صيدلية الرافدين'],    ids:[3,6] },
  4:  { names:['صيدلية الزهراء','صيدلية النور'],       ids:[8,2] },
  5:  { names:['صيدلية بغداد','صيدلية روژان'],        ids:[5,9] },
  6:  { names:['صيدلية الأمل','صيدلية السلام','صيدلية الحياة'], ids:[1,7,4] },
  7:  { names:['صيدلية الشفاء','صيدلية الزهراء'],     ids:[3,8] },
  8:  { names:['صيدلية الرافدين','صيدلية الأمل'],     ids:[6,1] },
  9:  { names:['صيدلية بغداد','صيدلية الشفاء'],       ids:[5,3] },
  10: { names:['صيدلية الأمل','صيدلية الزهراء'],      ids:[1,8] },
  11: { names:['صيدلية النور','صيدلية الحياة'],        ids:[2,4] },
  12: { names:['صيدلية النور','صيدلية السلام'],        ids:[2,7] },
  13: { names:['صيدلية الشفاء','صيدلية الزهراء'],     ids:[3,8] },
  14: { names:['صيدلية بغداد','صيدلية الرافدين'],     ids:[5,6] },
  15: { names:['صيدلية الأمل','صيدلية الشفاء'],       ids:[1,3] },
  16: { names:['صيدلية الزهراء','صيدلية بغداد'],      ids:[8,5] },
  17: { names:['صيدلية الأمل','صيدلية الحياة'],       ids:[1,4] },
  18: { names:['صيدلية الرافدين','صيدلية الشفاء'],    ids:[6,3] },
};

export default function SearchPage() {
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('الكل');

  const results = useMemo(() => searchMedicines(query, category), [query, category]);

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
        .search-input { width:100%; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:14px; padding:14px 52px 14px 18px; color:#e8e0d0; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box; font-family:inherit; }
        .search-input:focus { border-color:#D4AF37; }
        .search-input::placeholder { color:#555; }
      `}</style>

      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <Link href="/home" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:20 }}>⚕️</span>
          <span style={{ fontSize:18, fontWeight:700, background:'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>صيدلي</span>
        </Link>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
      </header>

      <div style={{ maxWidth:860, margin:'0 auto', padding:'32px 20px' }}>

        <div style={{ textAlign:'center', marginBottom:32 }}>
          <h1 style={{ fontSize:26, fontWeight:700, marginBottom:8 }}>ابحث عن دواء</h1>
          <p style={{ color:'#666', fontSize:14, marginBottom:24 }}>
            اكتب اسم الدواء بالعربي أو الإنجليزي أو حتى الاسم التجاري
          </p>
          <div style={{ position:'relative', maxWidth:540, margin:'0 auto' }}>
            <span style={{ position:'absolute', right:18, top:'50%', transform:'translateY(-50%)', fontSize:20, color:'#555', pointerEvents:'none' }}>🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="مثال: بنادول، brufen، زيرتك، paracetamol..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button onClick={()=>setQuery('')} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#666', cursor:'pointer', fontSize:18 }}>✕</button>
            )}
          </div>
          {query && results.length === 0 && (
            <p style={{ color:'#D4AF37', fontSize:13, marginTop:10 }}>
              💡 جرب الاسم الإنجليزي أو الاسم التجاري
            </p>
          )}
        </div>

        {/* Categories */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28, justifyContent:'center' }}>
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-btn${category===c?' active':''}`} onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>

        <p style={{ fontSize:13, color:'#555', marginBottom:16 }}>{results.length} دواء</p>

        {results.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'#555' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <p style={{ marginBottom:8 }}>لا توجد نتائج لـ "{query}"</p>
            <p style={{ fontSize:13 }}>جرب: paracetamol، بنادول، brufen</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {results.map((m, i) => {
              const pharmData = PHARM_MAP[m.id];
              return (
                <div key={m.id} className="result-card" style={{ animationDelay:`${i*40}ms`, opacity:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                        <span style={{ fontSize:24 }}>{m.image}</span>
                        <div>
                          <h3 style={{ fontSize:16, fontWeight:700, margin:0 }}>{m.nameAr}</h3>
                          <p style={{ fontSize:12, color:'#666', margin:0, direction:'ltr', textAlign:'right' }}>{m.nameEn}</p>
                        </div>
                      </div>
                      <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
                        <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, background:'rgba(212,175,55,0.12)', color:'#D4AF37' }}>{m.category}</span>
                        <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, background:'rgba(150,150,150,0.1)', color:'#888' }}>{m.categoryEn}</span>
                      </div>
                      <p style={{ fontSize:12, color:'#666', marginTop:6 }}>{m.description}</p>
                    </div>
                    <div style={{ textAlign:'left', direction:'ltr', flexShrink:0 }}>
                      <div style={{ fontSize:18, fontWeight:700, color:'#D4AF37' }}>
                        {m.basePrice.toLocaleString()} <span style={{ fontSize:12, fontWeight:400, color:'#888' }}>د.ع</span>
                      </div>
                      <div style={{ fontSize:12, color:'#81c784', marginTop:2 }}>✓ متوفر</div>
                    </div>
                  </div>

                  {pharmData && (
                    <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid #1e1e1e' }}>
                      <p style={{ fontSize:12, color:'#666', marginBottom:8 }}>متوفر في:</p>
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        {pharmData.names.map((name, idx) => (
                          <Link key={name} href={`/pharmacies/${pharmData.ids[idx]}`} className="pharm-chip">
                            🏥 {name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
