'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ORDERS = [
  { id: 'ORD-1001', pharmacy: 'صيدلية الأمل',   items: 'باراسيتامول x2، فيتامين C x1', total: 8500,  status: 'مكتمل',       date: '2024-04-20' },
  { id: 'ORD-1002', pharmacy: 'صيدلية الشفاء',  items: 'إيبوبروفين x1',                total: 2000,  status: 'قيد التنفيذ', date: '2024-04-22' },
  { id: 'ORD-1003', pharmacy: 'صيدلية الزهراء', items: 'أموكسيسيلين x1، أوميبرازول x2', total: 11700, status: 'مكتمل',       date: '2024-04-10' },
  { id: 'ORD-1004', pharmacy: 'صيدلية بغداد',   items: 'فيتامين D3 x1',                total: 7500,  status: 'ملغي',        date: '2024-04-05' },
];

const STATUS_COLOR: Record<string, string> = {
  'مكتمل': '#81c784', 'قيد التنفيذ': '#D4AF37', 'ملغي': '#e57373',
};

type Tab = 'orders' | 'info' | 'addresses';

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab]           = useState<Tab>('orders');
  const [editMode, setEditMode] = useState(false);
  const [name, setName]         = useState('سارة علي');
  const [phone, setPhone]       = useState('+964 780 234 5678');
  const [email, setEmail]       = useState('sara@example.com');

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .tab { padding:10px 20px; border:none; background:transparent; cursor:pointer; font-size:14px; font-family:inherit; border-bottom:2px solid transparent; transition:all 0.2s; color:#888; }
        .tab.active { color:#D4AF37; border-bottom-color:#D4AF37; }
        .order-card { background:#161616; border:1px solid #222; border-radius:14px; padding:18px; transition:border-color 0.2s; animation:fadeUp 0.3s ease forwards; }
        .order-card:hover { border-color:#D4AF3733; }
        .edit-input { width:100%; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:10px; padding:11px 14px; color:#e8e0d0; font-size:14px; outline:none; transition:border-color 0.2s; box-sizing:border-box; font-family:inherit; }
        .edit-input:focus { border-color:#D4AF37; }
      `}</style>

      {/* Header */}
      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <button onClick={()=>router.back()} style={{ background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>← رجوع</button>
        <h1 style={{ fontSize:17, fontWeight:700, color:'#D4AF37', margin:0 }}>حسابي</h1>
        <Link href="/cart" style={{ textDecoration:'none', fontSize:22 }}>🛒</Link>
      </header>

      {/* Avatar section */}
      <div style={{ background:'linear-gradient(135deg,#141414,#1a1a1a)', borderBottom:'1px solid #1e1e1e', padding:'28px 24px', textAlign:'center' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#8B6914)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, margin:'0 auto 12px' }}>
          👤
        </div>
        <h2 style={{ fontSize:20, fontWeight:700, margin:'0 0 4px' }}>{name}</h2>
        <p style={{ fontSize:13, color:'#888', margin:0 }}>{email}</p>
        <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:20 }}>
          {[
            { label:'الطلبات',   val: ORDERS.length },
            { label:'مكتملة',   val: ORDERS.filter(o=>o.status==='مكتمل').length },
            { label:'قيد التنفيذ', val: ORDERS.filter(o=>o.status==='قيد التنفيذ').length },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#D4AF37' }}>{s.val}</div>
              <div style={{ fontSize:12, color:'#888' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:'#111', borderBottom:'1px solid #1a1a1a', padding:'0 24px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', display:'flex' }}>
          <button className={`tab${tab==='orders'?' active':''}`} onClick={()=>setTab('orders')}>📦 طلباتي</button>
          <button className={`tab${tab==='info'?' active':''}`} onClick={()=>setTab('info')}>👤 معلوماتي</button>
          <button className={`tab${tab==='addresses'?' active':''}`} onClick={()=>setTab('addresses')}>📍 عناويني</button>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'24px 16px' }}>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ORDERS.map((o, i) => (
              <Link key={o.id} href={`/orders/${o.id}`} style={{ textDecoration:'none', color:'inherit' }}>
                <div className="order-card" style={{ animationDelay:`${i*50}ms`, opacity:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:'#D4AF37' }}>#{o.id}</span>
                    <span style={{ padding:'3px 10px', borderRadius:20, fontSize:12, background:`${STATUS_COLOR[o.status]}22`, color:STATUS_COLOR[o.status] }}>{o.status}</span>
                  </div>
                  <p style={{ fontSize:13, color:'#aaa', margin:'0 0 6px' }}>🏥 {o.pharmacy}</p>
                  <p style={{ fontSize:12, color:'#666', margin:'0 0 10px' }}>{o.items}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:15, fontWeight:700, color:'#D4AF37' }}>{o.total.toLocaleString()} د.ع</span>
                    <span style={{ fontSize:12, color:'#555' }}>{o.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* INFO TAB */}
        {tab === 'info' && (
          <div style={{ maxWidth:480 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h2 style={{ fontSize:16, fontWeight:700, margin:0 }}>معلوماتي الشخصية</h2>
              <button onClick={()=>setEditMode(v=>!v)} style={{ padding:'7px 16px', borderRadius:8, border:'1px solid #D4AF3766', background:'transparent', color:'#D4AF37', cursor:'pointer', fontSize:13, fontFamily:'inherit' }}>
                {editMode ? 'إلغاء' : '✏️ تعديل'}
              </button>
            </div>
            {[
              { label:'الاسم الكامل', val:name,  setter:setName,  type:'text' },
              { label:'البريد الإلكتروني', val:email, setter:setEmail, type:'email' },
              { label:'رقم الهاتف', val:phone, setter:setPhone, type:'tel' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:6 }}>{f.label}</label>
                {editMode ? (
                  <input className="edit-input" type={f.type} value={f.val} onChange={e=>f.setter(e.target.value)} />
                ) : (
                  <div style={{ padding:'11px 14px', background:'#161616', border:'1px solid #222', borderRadius:10, fontSize:14, color:'#ccc' }}>{f.val}</div>
                )}
              </div>
            ))}
            {editMode && (
              <button onClick={()=>setEditMode(false)} style={{ padding:'12px', width:'100%', borderRadius:10, border:'none', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginTop:8 }}>
                حفظ التغييرات
              </button>
            )}
            <button onClick={()=>router.push('/login')} style={{ padding:'11px', width:'100%', borderRadius:10, border:'1px solid #e5737344', background:'transparent', color:'#e57373', fontSize:13, cursor:'pointer', fontFamily:'inherit', marginTop:12 }}>
              تسجيل الخروج
            </button>
          </div>
        )}

        {/* ADDRESSES TAB */}
        {tab === 'addresses' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h2 style={{ fontSize:16, fontWeight:700, margin:0 }}>عناويني المحفوظة</h2>
              <button style={{ padding:'7px 14px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'inherit' }}>+ إضافة</button>
            </div>
            {[
              { label:'المنزل', addr:'حي الكرادة، شارع 14، بغداد', default:true },
              { label:'العمل',  addr:'شارع المنصور، مجمع الطيبات، بغداد', default:false },
            ].map(a => (
              <div key={a.label} style={{ background:'#161616', border:`1px solid ${a.default?'#D4AF3766':'#222'}`, borderRadius:14, padding:18, marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
                    <span style={{ fontSize:14, fontWeight:600 }}>{a.label}</span>
                    {a.default && <span style={{ padding:'2px 8px', borderRadius:20, fontSize:11, background:'rgba(212,175,55,0.15)', color:'#D4AF37' }}>افتراضي</span>}
                  </div>
                  <p style={{ fontSize:13, color:'#888', margin:0 }}>📍 {a.addr}</p>
                </div>
                <button style={{ background:'none', border:'none', color:'#e57373', cursor:'pointer', fontSize:18 }}>🗑️</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
