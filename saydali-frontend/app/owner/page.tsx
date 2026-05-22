'use client';
import { useState } from 'react';
import { MEDICINES, CATEGORIES, type Medicine } from '@/lib/medicines';

type MedSetting = { enabled: boolean; price: number };

const initSettings = (): Record<number, MedSetting> => {
  const s: Record<number, MedSetting> = {};
  MEDICINES.forEach(m => { s[m.id] = { enabled: false, price: m.basePrice }; });
  return s;
};

type Tab = 'medicines' | 'profile' | 'orders';

export default function OwnerPage() {
  const [settings, setSettings]     = useState<Record<number, MedSetting>>(initSettings);
  const [activeTab, setActiveTab]   = useState<Tab>('medicines');
  const [filterCat, setFilterCat]   = useState('الكل');
  const [search, setSearch]         = useState('');
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [saved, setSaved]           = useState(false);

  const toggleMed = (id: number) => {
    setSettings(prev => ({ ...prev, [id]: { ...prev[id], enabled: !prev[id].enabled } }));
  };

  const setPrice = (id: number, price: number) => {
    setSettings(prev => ({ ...prev, [id]: { ...prev[id], price } }));
  };

  const enabledCount = Object.values(settings).filter(s => s.enabled).length;

  const filtered = MEDICINES.filter(m => {
    if (filterCat !== 'الكل' && m.category !== filterCat) return false;
    if (search && !m.nameAr.includes(search) && !m.nameEn.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .tab { padding:10px 20px; border:none; background:transparent; cursor:pointer; font-size:14px; font-family:inherit; border-bottom:2px solid transparent; transition:all 0.2s; color:#888; }
        .tab.active { color:#D4AF37; border-bottom-color:#D4AF37; }
        .med-row { display:flex; align-items:center; gap:12px; padding:14px 16px; background:#161616; border:1px solid #222; border-radius:12px; transition:border-color 0.2s; animation:fadeUp 0.3s ease forwards; }
        .med-row.on { border-color:#D4AF3755; background:#1a1800; }
        .toggle-sw { position:relative; width:44px; height:24px; flex-shrink:0; cursor:pointer; }
        .toggle-sw input { opacity:0; width:0; height:0; }
        .sw-track { position:absolute; inset:0; border-radius:12px; background:#2a2a2a; transition:background 0.2s; }
        .toggle-sw input:checked + .sw-track { background:#D4AF37; }
        .sw-thumb { position:absolute; top:3px; right:3px; width:18px; height:18px; border-radius:50%; background:#666; transition:all 0.2s; }
        .toggle-sw input:checked ~ .sw-thumb { right:calc(100% - 21px); background:#111; }
        .price-input { background:#111; border:1px solid #333; border-radius:8px; padding:6px 10px; color:#D4AF37; font-size:13px; font-weight:700; width:100px; outline:none; font-family:inherit; text-align:center; }
        .price-input:focus { border-color:#D4AF37; }
        .save-btn { padding:11px 28px; border:none; border-radius:10px; background:linear-gradient(135deg,#D4AF37,#8B6914); color:#111; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:opacity 0.2s; }
        .save-btn:hover { opacity:0.9; }
        input[type=text] { background:#1a1a1a; border:1px solid #2a2a2a; border-radius:10px; padding:10px 14px; color:#e8e0d0; font-size:13px; outline:none; transition:border-color 0.2s; font-family:inherit; }
        input[type=text]:focus { border-color:#D4AF37; }
        input::placeholder { color:#555; }
      `}</style>

      {/* Header */}
      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:22 }}>⚕️</span>
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:'#D4AF37' }}>صيدلية الأمل</div>
            <div style={{ fontSize:11, color:'#81c784' }}>● نشط — اشتراك مدفوع</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:12, color:'#888', background:'rgba(212,175,55,0.1)', padding:'4px 12px', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)' }}>
            {enabledCount} دواء معروض
          </span>
          <span style={{ fontSize:13, color:'#666' }}>أحمد محمد</span>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ background:'#111', borderBottom:'1px solid #1a1a1a', padding:'0 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex' }}>
          <button className={`tab${activeTab==='medicines'?' active':''}`} onClick={()=>setActiveTab('medicines')}>💊 إدارة الأدوية</button>
          <button className={`tab${activeTab==='orders'?' active':''}`} onClick={()=>setActiveTab('orders')}>📦 الطلبات</button>
          <button className={`tab${activeTab==='profile'?' active':''}`} onClick={()=>setActiveTab('profile')}>🏥 معلومات الصيدلية</button>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 16px' }}>

        {/* ── MEDICINES TAB ── */}
        {activeTab === 'medicines' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:17, fontWeight:700, margin:'0 0 4px' }}>اختر الأدوية المتوفرة في صيدليتك</h2>
                <p style={{ fontSize:13, color:'#666', margin:0 }}>فعّل الأدوية الموجودة عندك وحدد سعرك الخاص لكل دواء</p>
              </div>
              <button className="save-btn" onClick={handleSave}>
                {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
              </button>
            </div>

            {/* Filter bar */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:14 }}>
              <input type="text" placeholder="بحث..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:180 }} />
              {CATEGORIES.map(c => (
                <button key={c} onClick={()=>setFilterCat(c)} style={{
                  padding:'6px 14px', borderRadius:20, border:'1px solid #2a2a2a',
                  background: filterCat===c ? 'rgba(212,175,55,0.15)' : 'transparent',
                  color: filterCat===c ? '#D4AF37' : '#888', cursor:'pointer', fontSize:12, fontFamily:'inherit',
                  borderColor: filterCat===c ? '#D4AF37' : '#2a2a2a',
                }}>{c}</button>
              ))}
            </div>

            {/* Enable all / disable all */}
            <div style={{ display:'flex', gap:10, marginBottom:18 }}>
              <button onClick={()=>{ const s={...settings}; filtered.forEach(m=>{ s[m.id]={...s[m.id],enabled:true}; }); setSettings(s); }} style={{ padding:'6px 14px', borderRadius:8, border:'1px solid #81c78444', background:'rgba(129,199,132,0.08)', color:'#81c784', cursor:'pointer', fontSize:12, fontFamily:'inherit' }}>
                تفعيل الكل
              </button>
              <button onClick={()=>{ const s={...settings}; filtered.forEach(m=>{ s[m.id]={...s[m.id],enabled:false}; }); setSettings(s); }} style={{ padding:'6px 14px', borderRadius:8, border:'1px solid #e5737344', background:'rgba(229,115,115,0.08)', color:'#e57373', cursor:'pointer', fontSize:12, fontFamily:'inherit' }}>
                إيقاف الكل
              </button>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {filtered.map((m, i) => {
                const setting = settings[m.id];
                return (
                  <div key={m.id} className={`med-row${setting.enabled?' on':''}`} style={{ animationDelay:`${i*30}ms`, opacity:0 }}>
                    {/* Toggle */}
                    <label className="toggle-sw">
                      <input type="checkbox" checked={setting.enabled} onChange={()=>toggleMed(m.id)} />
                      <div className="sw-track" />
                      <div className="sw-thumb" style={{ right: setting.enabled ? 'calc(100% - 21px)' : '3px', background: setting.enabled ? '#111' : '#666' }} />
                    </label>

                    {/* Icon + Name */}
                    <span style={{ fontSize:22, flexShrink:0 }}>{m.image}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:600, color: setting.enabled ? '#e8e0d0' : '#666' }}>{m.nameAr}</div>
                      <div style={{ fontSize:11, color:'#555', direction:'ltr', textAlign:'right' }}>{m.nameEn}</div>
                    </div>

                    {/* Category */}
                    <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, background:'rgba(212,175,55,0.08)', color:'#888', flexShrink:0 }}>{m.category}</span>

                    {/* Base price */}
                    <div style={{ fontSize:11, color:'#555', flexShrink:0, textAlign:'center' }}>
                      <div>السعر الأساسي</div>
                      <div style={{ color:'#666' }}>{m.basePrice.toLocaleString()} د.ع</div>
                    </div>

                    {/* My price */}
                    <div style={{ flexShrink:0, textAlign:'center' }}>
                      <div style={{ fontSize:11, color:'#888', marginBottom:4 }}>سعرك</div>
                      {editingPrice === m.id ? (
                        <input
                          className="price-input"
                          type="number"
                          value={setting.price}
                          onChange={e => setPrice(m.id, Number(e.target.value))}
                          onBlur={() => setEditingPrice(null)}
                          autoFocus
                        />
                      ) : (
                        <button onClick={()=>setEditingPrice(m.id)} style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:8, padding:'5px 12px', color:'#D4AF37', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                          {setting.price.toLocaleString()} د.ع ✏️
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
              <button className="save-btn" onClick={handleSave}>
                {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
              </button>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:16 }}>الطلبات الواردة</h2>
            {[
              { id:'#1001', customer:'سارة علي',   items:'باراسيتامول x2، فيتامين C x1', total:'8,500', status:'جديد',     time:'منذ 5 دقائق' },
              { id:'#1002', customer:'محمد حسين',  items:'إيبوبروفين x1',                total:'2,000', status:'قيد التنفيذ', time:'منذ 23 دقيقة' },
              { id:'#1003', customer:'زينب كاظم',  items:'أموكسيسيلين x1، أوميبرازول x2', total:'11,700', status:'مكتمل',  time:'منذ ساعة' },
            ].map(o => (
              <div key={o.id} style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:18, marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:10 }}>
                  <div>
                    <span style={{ fontSize:15, fontWeight:700, color:'#D4AF37' }}>{o.id}</span>
                    <span style={{ fontSize:13, color:'#888', marginRight:10 }}>{o.customer}</span>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <span style={{ fontSize:12, color:'#666' }}>{o.time}</span>
                    <span style={{ padding:'3px 10px', borderRadius:20, fontSize:12, background: o.status==='جديد' ? 'rgba(212,175,55,0.15)' : o.status==='مكتمل' ? 'rgba(129,199,132,0.15)' : 'rgba(79,195,247,0.15)', color: o.status==='جديد' ? '#D4AF37' : o.status==='مكتمل' ? '#81c784' : '#4fc3f7' }}>{o.status}</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:'#aaa', margin:'0 0 10px' }}>{o.items}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontWeight:700, color:'#D4AF37' }}>{o.total} د.ع</span>
                  {o.status === 'جديد' && (
                    <div style={{ display:'flex', gap:8 }}>
                      <button style={{ padding:'6px 16px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'inherit' }}>قبول</button>
                      <button style={{ padding:'6px 16px', borderRadius:8, border:'1px solid #e5737344', background:'transparent', color:'#e57373', cursor:'pointer', fontSize:13, fontFamily:'inherit' }}>رفض</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth:560 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:20 }}>معلومات الصيدلية</h2>
            {[
              { label:'اسم الصيدلية', val:'صيدلية الأمل', type:'text' },
              { label:'العنوان',       val:'شارع الكرادة، بغداد', type:'text' },
              { label:'رقم الهاتف',   val:'+964 770 111 2222', type:'text' },
              { label:'أوقات العمل',  val:'8:00 ص - 11:00 م', type:'text' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom:16 }}>
                <label style={{ fontSize:13, color:'#888', display:'block', marginBottom:6 }}>{f.label}</label>
                <input type="text" defaultValue={f.val} style={{ width:'100%', boxSizing:'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:13, color:'#888', display:'block', marginBottom:6 }}>التوصيل</label>
              <div style={{ display:'flex', gap:12 }}>
                {['متوفر','غير متوفر'].map(opt => (
                  <label key={opt} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, color:'#aaa' }}>
                    <input type="radio" name="delivery" defaultChecked={opt==='متوفر'} /> {opt}
                  </label>
                ))}
              </div>
            </div>
            <button className="save-btn" style={{ marginTop:8 }}>حفظ المعلومات</button>
          </div>
        )}
      </div>
    </div>
  );
}
