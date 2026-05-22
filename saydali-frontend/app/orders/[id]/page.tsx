'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const ORDERS: Record<string, {
  id:string; pharmacy:string; pharmacyId:number; items:{name:string;qty:number;price:number}[];
  total:number; delivery:number; status:string; date:string; address:string; phone:string;
  steps:{label:string;done:boolean;time:string}[];
}> = {
  'ORD-1001': {
    id:'ORD-1001', pharmacy:'صيدلية الأمل', pharmacyId:1,
    items:[{name:'باراسيتامول 500mg',qty:2,price:1500},{name:'فيتامين C 1000mg',qty:1,price:5500}],
    total:8500, delivery:2500, status:'مكتمل', date:'2024-04-20', address:'حي الكرادة، شارع 14، بغداد', phone:'+964 780 234 5678',
    steps:[
      {label:'تم استلام الطلب',  done:true,  time:'10:32 ص'},
      {label:'قبل الصيدلاني',    done:true,  time:'10:45 ص'},
      {label:'جاري التجهيز',     done:true,  time:'11:00 ص'},
      {label:'خرج للتوصيل',      done:true,  time:'11:30 ص'},
      {label:'تم التسليم',        done:true,  time:'12:05 م'},
    ],
  },
  'ORD-1002': {
    id:'ORD-1002', pharmacy:'صيدلية الشفاء', pharmacyId:3,
    items:[{name:'إيبوبروفين 400mg',qty:1,price:2000}],
    total:4500, delivery:2500, status:'قيد التنفيذ', date:'2024-04-22', address:'شارع المنصور، بغداد', phone:'+964 780 234 5678',
    steps:[
      {label:'تم استلام الطلب',  done:true,  time:'2:10 م'},
      {label:'قبل الصيدلاني',    done:true,  time:'2:20 م'},
      {label:'جاري التجهيز',     done:true,  time:'2:35 م'},
      {label:'خرج للتوصيل',      done:false, time:''},
      {label:'تم التسليم',        done:false, time:''},
    ],
  },
};

const STATUS_COLOR: Record<string,string> = {
  'مكتمل':'#81c784','قيد التنفيذ':'#D4AF37','ملغي':'#e57373',
};

export default function OrderDetailPage() {
  const { id } = useParams<{id:string}>();
  const router  = useRouter();
  const order   = ORDERS[id as string];

  if (!order) return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', alignItems:'center', justifyContent:'center', color:'#888', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
        <p>الطلب غير موجود</p>
        <Link href="/profile" style={{ color:'#D4AF37', marginTop:12, display:'block' }}>← حساباتي</Link>
      </div>
    </div>
  );

  const currentStep = order.steps.filter(s=>s.done).length - 1;

  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', color:'#e8e0d0', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .section { background:#161616; border:1px solid #222; border-radius:14px; padding:20px; animation:fadeUp 0.3s ease forwards; }
      `}</style>

      <header style={{ padding:'16px 24px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#111', position:'sticky', top:0, zIndex:10 }}>
        <button onClick={()=>router.back()} style={{ background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>← رجوع</button>
        <h1 style={{ fontSize:16, fontWeight:700, color:'#D4AF37', margin:0 }}>تفاصيل الطلب</h1>
        <span style={{ fontSize:13, color:'#666' }}>#{order.id}</span>
      </header>

      <div style={{ maxWidth:640, margin:'0 auto', padding:'24px 16px', display:'flex', flexDirection:'column', gap:16 }}>

        {/* Status banner */}
        <div style={{ background: `${STATUS_COLOR[order.status]}11`, border:`1px solid ${STATUS_COLOR[order.status]}44`, borderRadius:14, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:13, color:'#888', marginBottom:4 }}>حالة الطلب</div>
            <div style={{ fontSize:18, fontWeight:700, color:STATUS_COLOR[order.status] }}>{order.status}</div>
          </div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:13, color:'#888', marginBottom:4 }}>التاريخ</div>
            <div style={{ fontSize:14, color:'#ccc' }}>{order.date}</div>
          </div>
        </div>

        {/* Tracking steps */}
        <div className="section">
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:20 }}>تتبع الطلب</h3>
          <div style={{ position:'relative' }}>
            {/* vertical line */}
            <div style={{ position:'absolute', right:11, top:12, bottom:12, width:2, background:'#2a2a2a' }} />
            <div style={{ position:'absolute', right:11, top:12, width:2, background:'#D4AF37', height:`${(currentStep/(order.steps.length-1))*100}%`, transition:'height 0.5s ease' }} />

            {order.steps.map((step, i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom: i < order.steps.length-1 ? 24 : 0, alignItems:'flex-start', position:'relative' }}>
                <div style={{
                  width:24, height:24, borderRadius:'50%', flexShrink:0,
                  background: step.done ? '#D4AF37' : '#1a1a1a',
                  border: `2px solid ${step.done ? '#D4AF37' : '#333'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, color:'#111',
                  animation: i === currentStep && order.status !== 'مكتمل' ? 'pulse 1.5s ease infinite' : 'none',
                }}>
                  {step.done ? '✓' : ''}
                </div>
                <div style={{ flex:1, paddingTop:2 }}>
                  <div style={{ fontSize:14, color: step.done ? '#e8e0d0' : '#555', fontWeight: i === currentStep ? 600 : 400 }}>{step.label}</div>
                  {step.time && <div style={{ fontSize:12, color:'#666', marginTop:2 }}>{step.time}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="section">
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>المنتجات</h3>
          {order.items.map((item, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom: i < order.items.length-1 ? '1px solid #1e1e1e' : 'none' }}>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <span style={{ fontSize:20 }}>💊</span>
                <div>
                  <div style={{ fontSize:14 }}>{item.name}</div>
                  <div style={{ fontSize:12, color:'#666' }}>الكمية: {item.qty}</div>
                </div>
              </div>
              <div style={{ fontWeight:700, color:'#D4AF37' }}>{(item.price*item.qty).toLocaleString()} د.ع</div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid #2a2a2a', marginTop:12, paddingTop:12 }}>
            {[
              {label:'المجموع الفرعي', val:order.total-order.delivery},
              {label:'التوصيل', val:order.delivery},
            ].map(r=>(
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#888', marginBottom:6 }}>
                <span>{r.label}</span><span>{r.val.toLocaleString()} د.ع</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:700, marginTop:4 }}>
              <span>الإجمالي</span>
              <span style={{ color:'#D4AF37' }}>{order.total.toLocaleString()} د.ع</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="section">
          <h3 style={{ fontSize:14, color:'#D4AF37', marginBottom:14 }}>معلومات التوصيل</h3>
          {[
            {icon:'🏥', label:'الصيدلية', val:order.pharmacy},
            {icon:'📍', label:'العنوان',   val:order.address},
            {icon:'📞', label:'الهاتف',    val:order.phone},
          ].map(r=>(
            <div key={r.label} style={{ display:'flex', gap:12, marginBottom:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:18 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize:12, color:'#666', marginBottom:2 }}>{r.label}</div>
                <div style={{ fontSize:14, color:'#ccc' }}>{r.val}</div>
              </div>
            </div>
          ))}
        </div>

        {order.status === 'مكتمل' && (
          <Link href={`/pharmacies/${order.pharmacyId}`} style={{ display:'block', padding:'13px', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15, textAlign:'center' }}>
            ⭐ قيّم الصيدلية
          </Link>
        )}
      </div>
    </div>
  );
}
