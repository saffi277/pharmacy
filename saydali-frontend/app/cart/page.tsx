'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DEMO_ITEMS = [
  { id:1, name:'باراسيتامول 500mg',  category:'مسكنات',       price:1500, qty:2, pharmacy:'صيدلية الأمل' },
  { id:5, name:'فيتامين C 1000mg',   category:'فيتامينات',    price:5500, qty:1, pharmacy:'صيدلية الأمل' },
  { id:6, name:'إيبوبروفين 400mg',   category:'مسكنات',       price:2000, qty:1, pharmacy:'صيدلية الأمل' },
];

type CartItem = typeof DEMO_ITEMS[0];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems]     = useState<CartItem[]>(DEMO_ITEMS);
  const [address, setAddress] = useState('');
  const [phone, setPhone]     = useState('');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced]   = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery  = 2500;
  const total     = subtotal + delivery;

  async function placeOrder() {
    if (!address || !phone) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1500));
    setPlacing(false);
    setPlaced(true);
  }

  if (placed) return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif', padding:20 }}>
      <div style={{ textAlign:'center', maxWidth:400 }}>
        <div style={{ fontSize:72, marginBottom:16, animation:'bounce 0.6s ease' }}>✅</div>
        <h2 style={{ fontSize:22, fontWeight:700, color:'#81c784', marginBottom:8 }}>تم إرسال الطلب!</h2>
        <p style={{ color:'#888', fontSize:14, marginBottom:24, lineHeight:1.7 }}>
          سيتواصل معك الصيدلاني قريباً لتأكيد طلبك والتنسيق معك.
        </p>
        <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20, marginBottom:24, textAlign:'right' }}>
          <div style={{ fontSize:13, color:'#666', marginBottom:6 }}>رقم الطلب</div>
          <div style={{ fontSize:18, fontWeight:700, color:'#D4AF37' }}>#ORD-{Math.floor(Math.random()*9000+1000)}</div>
        </div>
        <Link href="/pharmacies" style={{ display:'block', padding:'13px', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15 }}>
          تصفح صيدليات أخرى
        </Link>
      </div>
    </div>
  );

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .item-row { background:#161616; border:1px solid #222; border-radius:14px; padding:16px 18px; display:flex; align-items:center; gap:14px; animation:fadeUp 0.3s ease forwards; }
        .qty-btn { width:30px; height:30px; border-radius:8px; border:1px solid #2a2a2a; background:transparent; color:#e8e0d0; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; }
        .qty-btn:hover { border-color:#D4AF37; color:#D4AF37; }
        input[type=text], input[type=tel] { width:100%; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:10px; padding:11px 14px; color:#e8e0d0; font-size:14px; outline:none; transition:border-color 0.2s; box-sizing:border-box; font-family:inherit; }
        input[type=text]:focus, input[type=tel]:focus { border-color:#D4AF37; }
        input::placeholder { color:#555; }
      `}</style>

      {/* Header */}
      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111' }}>
        <button onClick={()=>router.back()} style={{ background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:14 }}>← رجوع</button>
        <h1 style={{ fontSize:17, fontWeight:700, color:'#D4AF37', margin:0 }}>🛒 السلة</h1>
        <span style={{ fontSize:13, color:'#666' }}>{items.length} منتج</span>
      </header>

      {items.length === 0 ? (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', gap:16 }}>
          <div style={{ fontSize:56 }}>🛒</div>
          <p style={{ color:'#666', fontSize:15 }}>السلة فارغة</p>
          <Link href="/pharmacies" style={{ padding:'10px 24px', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', borderRadius:10, textDecoration:'none', fontWeight:700 }}>
            تصفح الصيدليات
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth:720, margin:'0 auto', padding:'24px 16px', display:'flex', flexDirection:'column', gap:20 }}>

          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <h2 style={{ fontSize:14, color:'#888', marginBottom:4 }}>المنتجات — {items[0].pharmacy}</h2>
            {items.map((item, i) => (
              <div key={item.id} className="item-row" style={{ animationDelay:`${i*60}ms`, opacity:0 }}>
                <span style={{ fontSize:28 }}>💊</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:14, fontWeight:600, margin:'0 0 2px' }}>{item.name}</p>
                  <p style={{ fontSize:12, color:'#888', margin:0 }}>{item.category}</p>
                </div>
                {/* Qty */}
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <button className="qty-btn" onClick={()=>updateQty(item.id,-1)}>−</button>
                  <span style={{ fontSize:15, fontWeight:600, minWidth:24, textAlign:'center' }}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>updateQty(item.id,+1)}>+</button>
                </div>
                <div style={{ textAlign:'left', direction:'ltr', minWidth:80 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'#D4AF37' }}>{(item.price*item.qty).toLocaleString()}</div>
                  <div style={{ fontSize:11, color:'#666' }}>د.ع</div>
                </div>
                <button onClick={()=>removeItem(item.id)} style={{ background:'none', border:'none', color:'#e57373', cursor:'pointer', fontSize:18, padding:4 }}>🗑️</button>
              </div>
            ))}
          </div>

          {/* Delivery info */}
          <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20 }}>
            <h2 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>معلومات التوصيل</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div>
                <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:6 }}>العنوان</label>
                <input type="text" placeholder="مثال: حي الكرادة، شارع 14، بناية رقم 7" value={address} onChange={e=>setAddress(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:6 }}>رقم الهاتف</label>
                <input type="tel" placeholder="+964 7XX XXX XXXX" value={phone} onChange={e=>setPhone(e.target.value)} dir="ltr" style={{ textAlign:'right' }} />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:20 }}>
            <h2 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>ملخص الطلب</h2>
            {[
              { label:'المجموع الفرعي', val:`${subtotal.toLocaleString()} د.ع` },
              { label:'رسوم التوصيل',   val:`${delivery.toLocaleString()} د.ع` },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:14, color:'#aaa' }}>
                <span>{row.label}</span><span>{row.val}</span>
              </div>
            ))}
            <div style={{ borderTop:'1px solid #2a2a2a', paddingTop:12, display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:700 }}>
              <span>الإجمالي</span>
              <span style={{ color:'#D4AF37' }}>{total.toLocaleString()} د.ع</span>
            </div>
          </div>

          {/* Place order */}
          <button
            onClick={placeOrder}
            disabled={placing || !address || !phone}
            style={{
              padding:'14px', borderRadius:12, border:'none',
              background: (!address||!phone) ? '#1e1e1e' : 'linear-gradient(135deg,#D4AF37,#8B6914)',
              color: (!address||!phone) ? '#555' : '#111',
              fontSize:16, fontWeight:700, cursor: (!address||!phone) ? 'not-allowed' : 'pointer',
              transition:'all 0.2s',
            }}
          >
            {placing ? 'جاري الإرسال...' : `تأكيد الطلب — ${total.toLocaleString()} د.ع`}
          </button>

          {(!address || !phone) && (
            <p style={{ textAlign:'center', fontSize:12, color:'#555', marginTop:-10 }}>
              أدخل العنوان ورقم الهاتف لتأكيد الطلب
            </p>
          )}
        </div>
      )}
    </div>
  );
}
