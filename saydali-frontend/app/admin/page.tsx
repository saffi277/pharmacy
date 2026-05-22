'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Section = 'dashboard' | 'pharmacies' | 'users' | 'orders' | 'subscriptions' | 'reports' | 'products';

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard',     label: 'الرئيسية',    icon: '🏠' },
  { id: 'pharmacies',    label: 'الصيدليات',   icon: '🏥' },
  { id: 'users',         label: 'المستخدمين',  icon: '👥' },
  { id: 'orders',        label: 'الطلبات',     icon: '📦' },
  { id: 'subscriptions', label: 'الاشتراكات',  icon: '💳' },
  { id: 'products',      label: 'المنتجات',    icon: '💊' },
  { id: 'reports',       label: 'التقارير',    icon: '📊' },
];

type Pharmacy = { id:number; name:string; owner:string; city:string; status:string; sub:string; joined:string; };

const initPharmacies: Pharmacy[] = [
  { id: 1, name: 'صيدلية الأمل',   owner: 'أحمد محمد',  city: 'بغداد',  status: 'نشط',  sub: 'مدفوع',  joined: '2024-01-15' },
  { id: 2, name: 'صيدلية النور',   owner: 'سالم علي',   city: 'البصرة', status: 'معلق', sub: 'منتهي', joined: '2024-02-20' },
  { id: 3, name: 'صيدلية الشفاء', owner: 'محمد حسن',  city: 'أربيل',  status: 'نشط',  sub: 'مدفوع',  joined: '2024-03-10' },
  { id: 4, name: 'صيدلية الحياة', owner: 'علي كريم',   city: 'موصل',   status: 'نشط',  sub: 'مدفوع',  joined: '2024-03-22' },
  { id: 5, name: 'صيدلية بغداد',  owner: 'كريم جاسم',  city: 'بغداد',  status: 'معلق', sub: 'منتهي', joined: '2024-04-05' },
];

const users = [
  { id: 1, name: 'أحمد محمد',  email: 'ahmed@example.com',  phone: '+964 770 123 4567', role: 'صيدلاني', joined: '2024-01-10' },
  { id: 2, name: 'سارة علي',   email: 'sara@example.com',   phone: '+964 780 234 5678', role: 'زبون',    joined: '2024-01-18' },
  { id: 3, name: 'محمد حسين',  email: 'mhmd@example.com',   phone: '+964 790 345 6789', role: 'زبون',    joined: '2024-02-03' },
  { id: 4, name: 'نور الدين',  email: 'nour@example.com',   phone: '+964 771 456 7890', role: 'صيدلاني', joined: '2024-02-14' },
  { id: 5, name: 'زينب كاظم', email: 'zainab@example.com', phone: '+964 781 567 8901', role: 'زبون',    joined: '2024-03-01' },
];

const orders = [
  { id: '#1001', customer: 'سارة علي',   pharmacy: 'صيدلية الأمل',  total: '12,500 د.ع', status: 'مكتمل',  date: '2024-04-20' },
  { id: '#1002', customer: 'محمد حسين', pharmacy: 'صيدلية الشفاء', total: '8,000 د.ع',  status: 'قيد التنفيذ', date: '2024-04-21' },
  { id: '#1003', customer: 'زينب كاظم', pharmacy: 'صيدلية النور',  total: '21,000 د.ع', status: 'ملغي',   date: '2024-04-21' },
  { id: '#1004', customer: 'أحمد سالم', pharmacy: 'صيدلية الحياة', total: '5,500 د.ع',  status: 'مكتمل',  date: '2024-04-22' },
  { id: '#1005', customer: 'علي كريم',  pharmacy: 'صيدلية الأمل',  total: '14,000 د.ع', status: 'قيد التنفيذ', date: '2024-04-22' },
];

const subscriptions = [
  { id: 1, pharmacy: 'صيدلية الأمل',  plan: 'شهري',   price: '$29',  start: '2024-04-01', end: '2024-05-01', status: 'نشط' },
  { id: 2, pharmacy: 'صيدلية النور',  plan: 'سنوي',   price: '$290', start: '2023-12-01', end: '2024-12-01', status: 'منتهي' },
  { id: 3, pharmacy: 'صيدلية الشفاء', plan: 'شهري',  price: '$29',  start: '2024-04-10', end: '2024-05-10', status: 'نشط' },
  { id: 4, pharmacy: 'صيدلية الحياة', plan: 'ربع سنوي', price: '$79', start: '2024-03-01', end: '2024-06-01', status: 'نشط' },
];

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive]           = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authed, setAuthed]           = useState(false);
  const [pharmacyList, setPharmacyList] = useState<Pharmacy[]>(initPharmacies);

  useEffect(() => {
    // TODO: replace with real session/token check
    const isAdmin = sessionStorage.getItem('admin_authed');
    if (!isAdmin) {
      router.replace('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null;

  return (
    <div dir="rtl" style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f', color: '#e8e0d0', fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 64,
        background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)',
        borderLeft: '1px solid #2a2a2a',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>⚕️</span>
          {sidebarOpen && (
            <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #D4AF37, #F0D060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              صيدلي
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 12px',
                marginBottom: 4,
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                textAlign: 'right',
                fontSize: 14,
                fontWeight: active === item.id ? 700 : 400,
                background: active === item.id
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))'
                  : 'transparent',
                color: active === item.id ? '#D4AF37' : '#aaa',
                borderRight: active === item.id ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => { sessionStorage.removeItem('admin_authed'); router.replace('/admin/login'); }}
          style={{
            margin: '0 12px 8px', padding: '9px 12px', border: '1px solid #3a1a1a', borderRadius: 8,
            background: 'rgba(229,115,115,0.08)', color: '#e57373', cursor: 'pointer',
            fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, width: 'calc(100% - 24px)',
          }}
        >
          <span>🚪</span>{sidebarOpen && <span>تسجيل الخروج</span>}
        </button>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(v => !v)}
          style={{
            margin: '0 12px 12px', padding: '8px', border: '1px solid #2a2a2a', borderRadius: 8,
            background: 'transparent', color: '#666', cursor: 'pointer', fontSize: 16, width: 'calc(100% - 24px)',
          }}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <header style={{
          padding: '16px 24px', borderBottom: '1px solid #1e1e1e',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#111',
        }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37' }}>
            {navItems.find(n => n.id === active)?.label}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#666' }}>مرحباً، المشرف</span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #8B6914)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>👤</div>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {active === 'dashboard'     && <DashboardSection pharmacyList={pharmacyList} />}
          {active === 'pharmacies'   && <PharmaciesSection pharmacyList={pharmacyList} setPharmacyList={setPharmacyList} />}
          {active === 'users'        && <UsersSection />}
          {active === 'orders'       && <OrdersSection />}
          {active === 'subscriptions'&& <SubscriptionsSection />}
          {active === 'products'     && <ProductsSection />}
          {active === 'reports'      && <ReportsSection />}
        </div>
      </main>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function DashboardSection({ pharmacyList }: { pharmacyList: Pharmacy[] }) {
  const stats = [
    { label: 'الصيدليات',   value: pharmacyList.length.toString(), icon: '🏥', color: '#D4AF37' },
    { label: 'المستخدمين',  value: '3,842',                        icon: '👥', color: '#4fc3f7' },
    { label: 'طلبات اليوم', value: '287',                          icon: '📦', color: '#81c784' },
    { label: 'الإيرادات',   value: '$1,240',                       icon: '💰', color: '#ff8a65' },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#161616', border: '1px solid #252525', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <SectionTitle>آخر الصيدليات المسجلة</SectionTitle>
      <PharmacyTable rows={pharmacyList.slice(0, 3)} onToggle={()=>{}} onDelete={()=>{}} />
    </div>
  );
}

/* ─── PHARMACIES ─── */
function PharmaciesSection({ pharmacyList, setPharmacyList }: { pharmacyList: Pharmacy[]; setPharmacyList: React.Dispatch<React.SetStateAction<Pharmacy[]>> }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', owner:'', city:'', phone:'' });

  const toggleStatus = (id: number) => {
    setPharmacyList(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'نشط' ? 'معلق' : 'نشط' } : p
    ));
  };

  const deletePharmacy = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصيدلية؟')) {
      setPharmacyList(prev => prev.filter(p => p.id !== id));
    }
  };

  const addPharmacy = () => {
    if (!form.name || !form.owner || !form.city) return;
    const newP: Pharmacy = {
      id: Date.now(), name: form.name, owner: form.owner, city: form.city,
      status: 'نشط', sub: 'مدفوع', joined: new Date().toISOString().split('T')[0],
    };
    setPharmacyList(prev => [...prev, newP]);
    setForm({ name:'', owner:'', city:'', phone:'' });
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SectionTitle>جميع الصيدليات ({pharmacyList.length})</SectionTitle>
        <button style={addBtn} onClick={()=>setShowModal(true)}>+ إضافة صيدلية</button>
      </div>
      <PharmacyTable rows={pharmacyList} onToggle={toggleStatus} onDelete={deletePharmacy} />

      {/* Add Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 }} onClick={()=>setShowModal(false)}>
          <div dir="rtl" style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:18, padding:28, width:400, maxWidth:'90vw' }} onClick={e=>e.stopPropagation()}>
            <h3 style={{ fontSize:16, fontWeight:700, color:'#D4AF37', marginBottom:20 }}>إضافة صيدلية جديدة</h3>
            {[
              { label:'اسم الصيدلية', key:'name',  placeholder:'صيدلية ...' },
              { label:'اسم المالك',   key:'owner', placeholder:'الاسم الكامل' },
              { label:'المدينة',      key:'city',  placeholder:'بغداد، البصرة...' },
              { label:'رقم الهاتف',   key:'phone', placeholder:'+964 7XX XXX XXXX' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:5 }}>{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  style={{ width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:8, padding:'10px 12px', color:'#e8e0d0', fontSize:13, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                />
              </div>
            ))}
            <div style={{ display:'flex', gap:10, marginTop:8 }}>
              <button onClick={addPharmacy} style={{ ...addBtn, flex:1 }}>إضافة</button>
              <button onClick={()=>setShowModal(false)} style={{ flex:1, padding:'10px', borderRadius:8, border:'1px solid #333', background:'transparent', color:'#888', cursor:'pointer', fontFamily:'inherit' }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PharmacyTable({ rows, onToggle, onDelete }: { rows: Pharmacy[]; onToggle:(id:number)=>void; onDelete:(id:number)=>void }) {
  return (
    <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 14, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#1c1c1c', borderBottom: '1px solid #2a2a2a' }}>
            {['الاسم', 'المالك', 'المدينة', 'الحالة', 'الاشتراك', 'تاريخ الانضمام', 'إجراءات'].map(h => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#888', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr key={p.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.owner}</td>
              <td style={td}>{p.city}</td>
              <td style={td}><StatusBadge status={p.status} /></td>
              <td style={td}><SubBadge sub={p.sub} /></td>
              <td style={{ ...td, color: '#666' }}>{p.joined}</td>
              <td style={td}>
                <button style={viewBtn}>عرض</button>
                <button
                  onClick={() => onToggle(p.id)}
                  style={{ ...viewBtn, color: p.status === 'نشط' ? '#e57373' : '#81c784', borderColor: p.status === 'نشط' ? '#e5737366' : '#81c78466', marginLeft: 4 }}
                >
                  {p.status === 'نشط' ? 'تعليق' : 'تفعيل'}
                </button>
                <button style={delBtn} onClick={() => onDelete(p.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── USERS ─── */
function UsersSection() {
  return (
    <div>
      <SectionTitle>المستخدمون</SectionTitle>
      <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 14, overflow: 'hidden', marginTop: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#1c1c1c', borderBottom: '1px solid #2a2a2a' }}>
              {['الاسم', 'البريد الإلكتروني', 'الهاتف', 'الدور', 'تاريخ التسجيل', 'إجراءات'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#888', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
                <td style={td}>{u.name}</td>
                <td style={{ ...td, color: '#888', direction: 'ltr' }}>{u.email}</td>
                <td style={{ ...td, direction: 'ltr', color: '#888' }}>{u.phone}</td>
                <td style={td}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 20, fontSize: 12,
                    background: u.role === 'صيدلاني' ? 'rgba(212,175,55,0.15)' : 'rgba(79,195,247,0.15)',
                    color: u.role === 'صيدلاني' ? '#D4AF37' : '#4fc3f7',
                  }}>{u.role}</span>
                </td>
                <td style={{ ...td, color: '#666' }}>{u.joined}</td>
                <td style={td}>
                  <button style={viewBtn}>عرض</button>
                  <button style={delBtn}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ORDERS ─── */
function OrdersSection() {
  const statusColor: Record<string, string> = {
    'مكتمل': '#81c784', 'قيد التنفيذ': '#D4AF37', 'ملغي': '#e57373',
  };
  return (
    <div>
      <SectionTitle>الطلبات</SectionTitle>
      <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 14, overflow: 'hidden', marginTop: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#1c1c1c', borderBottom: '1px solid #2a2a2a' }}>
              {['رقم الطلب', 'الزبون', 'الصيدلية', 'المبلغ', 'الحالة', 'التاريخ'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#888', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < orders.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
                <td style={{ ...td, color: '#D4AF37', fontWeight: 600 }}>{o.id}</td>
                <td style={td}>{o.customer}</td>
                <td style={td}>{o.pharmacy}</td>
                <td style={td}>{o.total}</td>
                <td style={td}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 20, fontSize: 12,
                    background: `${statusColor[o.status]}22`,
                    color: statusColor[o.status],
                  }}>{o.status}</span>
                </td>
                <td style={{ ...td, color: '#666' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SUBSCRIPTIONS ─── */
function SubscriptionsSection() {
  return (
    <div>
      <SectionTitle>الاشتراكات</SectionTitle>
      <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 14, overflow: 'hidden', marginTop: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#1c1c1c', borderBottom: '1px solid #2a2a2a' }}>
              {['الصيدلية', 'الخطة', 'السعر', 'بداية الاشتراك', 'نهاية الاشتراك', 'الحالة'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#888', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: i < subscriptions.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
                <td style={td}>{s.pharmacy}</td>
                <td style={td}>{s.plan}</td>
                <td style={{ ...td, color: '#D4AF37', fontWeight: 600 }}>{s.price}</td>
                <td style={{ ...td, color: '#666' }}>{s.start}</td>
                <td style={{ ...td, color: '#666' }}>{s.end}</td>
                <td style={td}><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── PRODUCTS ─── */
type Product = { id:number; nameAr:string; nameEn:string; category:string; basePrice:number; image:string; };

const initProducts: Product[] = [
  { id:1, nameAr:'باراسيتامول 500mg',  nameEn:'Paracetamol 500mg',  category:'مسكنات',       basePrice:1500,  image:'💊' },
  { id:2, nameAr:'أموكسيسيلين 500mg',  nameEn:'Amoxicillin 500mg',  category:'مضادات حيوية', basePrice:4500,  image:'💊' },
  { id:3, nameAr:'فيتامين C 1000mg',   nameEn:'Vitamin C 1000mg',   category:'فيتامينات',    basePrice:5500,  image:'💊' },
  { id:4, nameAr:'إيبوبروفين 400mg',   nameEn:'Ibuprofen 400mg',    category:'مسكنات',       basePrice:2000,  image:'💊' },
  { id:5, nameAr:'ميتفورمين 500mg',    nameEn:'Metformin 500mg',    category:'سكري',         basePrice:4000,  image:'💊' },
];

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>(initProducts);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nameAr:'', nameEn:'', category:'مسكنات', basePrice:'', image:'' });
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const CATS = ['مسكنات','مضادات حيوية','هضمي','فيتامينات','حساسية','سكري','ضغط','أطفال','كوليسترول'];

  const addProduct = () => {
    if (!form.nameAr || !form.nameEn || !form.basePrice) return;
    const p: Product = {
      id: Date.now(),
      nameAr: form.nameAr,
      nameEn: form.nameEn,
      category: form.category,
      basePrice: Number(form.basePrice),
      image: imgPreview || '💊',
    };
    setProducts(prev => [...prev, p]);
    setForm({ nameAr:'', nameEn:'', category:'مسكنات', basePrice:'', image:'' });
    setImgPreview(null);
    setShowModal(false);
  };

  const deleteProduct = (id: number) => {
    if (confirm('حذف هذا المنتج؟')) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImgPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <SectionTitle>المنتجات / الأدوية ({products.length})</SectionTitle>
        <button style={addBtn} onClick={()=>setShowModal(true)}>+ إضافة منتج</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
        {products.map(p => (
          <div key={p.id} style={{ background:'#161616', border:'1px solid #222', borderRadius:14, padding:18, position:'relative' }}>
            <div style={{ fontSize: typeof p.image === 'string' && p.image.startsWith('data:') ? 0 : 32, marginBottom:10 }}>
              {p.image.startsWith('data:') ? (
                <img src={p.image} alt={p.nameAr} style={{ width:56, height:56, objectFit:'cover', borderRadius:10 }} />
              ) : p.image}
            </div>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:2 }}>{p.nameAr}</div>
            <div style={{ fontSize:11, color:'#666', marginBottom:8, direction:'ltr', textAlign:'right' }}>{p.nameEn}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ padding:'2px 8px', borderRadius:20, fontSize:11, background:'rgba(212,175,55,0.1)', color:'#D4AF37' }}>{p.category}</span>
              <span style={{ fontSize:13, fontWeight:700, color:'#D4AF37' }}>{p.basePrice.toLocaleString()} د.ع</span>
            </div>
            <button onClick={()=>deleteProduct(p.id)} style={{ position:'absolute', top:10, left:10, background:'none', border:'none', color:'#e57373', cursor:'pointer', fontSize:16, opacity:0.6 }}>🗑️</button>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 }} onClick={()=>setShowModal(false)}>
          <div dir="rtl" style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:18, padding:28, width:440, maxWidth:'90vw', maxHeight:'85vh', overflowY:'auto' }} onClick={e=>e.stopPropagation()}>
            <h3 style={{ fontSize:16, fontWeight:700, color:'#D4AF37', marginBottom:20 }}>إضافة منتج جديد</h3>

            {/* Image upload */}
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:8 }}>صورة المنتج</label>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ width:64, height:64, borderRadius:12, background:'#1a1a1a', border:'1px dashed #333', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 }}>
                  {imgPreview ? <img src={imgPreview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <span style={{ fontSize:28 }}>💊</span>}
                </div>
                <label style={{ padding:'8px 16px', border:'1px dashed #D4AF3766', borderRadius:8, color:'#D4AF37', cursor:'pointer', fontSize:13 }}>
                  📁 رفع صورة
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display:'none' }} />
                </label>
              </div>
            </div>

            {[
              { label:'اسم الدواء (عربي)',    key:'nameAr',    placeholder:'باراسيتامول 500mg' },
              { label:'اسم الدواء (إنجليزي)', key:'nameEn',    placeholder:'Paracetamol 500mg' },
              { label:'السعر الأساسي (د.ع)',   key:'basePrice', placeholder:'1500' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:5 }}>{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  style={{ width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:8, padding:'10px 12px', color:'#e8e0d0', fontSize:13, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                />
              </div>
            ))}

            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:'#888', display:'block', marginBottom:5 }}>الفئة</label>
              <select value={form.category} onChange={e=>setForm(prev=>({...prev,category:e.target.value}))} style={{ width:'100%', background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:8, padding:'10px 12px', color:'#e8e0d0', fontSize:13, outline:'none', fontFamily:'inherit' }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ display:'flex', gap:10 }}>
              <button onClick={addProduct} style={{ ...addBtn, flex:1 }}>إضافة المنتج</button>
              <button onClick={()=>setShowModal(false)} style={{ flex:1, padding:'10px', borderRadius:8, border:'1px solid #333', background:'transparent', color:'#888', cursor:'pointer', fontFamily:'inherit' }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── REPORTS ─── */
function ReportsSection() {
  const monthly = [
    { month: 'يناير', revenue: 820,  orders: 210, pharmacies: 98  },
    { month: 'فبراير', revenue: 940, orders: 245, pharmacies: 104 },
    { month: 'مارس',  revenue: 1080, orders: 268, pharmacies: 112 },
    { month: 'أبريل', revenue: 1240, orders: 287, pharmacies: 124 },
  ];
  return (
    <div>
      <SectionTitle>التقارير الشهرية</SectionTitle>
      <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 14, overflow: 'hidden', marginTop: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#1c1c1c', borderBottom: '1px solid #2a2a2a' }}>
              {['الشهر', 'الإيرادات', 'الطلبات', 'الصيدليات النشطة'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#888', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthly.map((m, i) => (
              <tr key={m.month} style={{ borderBottom: i < monthly.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
                <td style={td}>{m.month}</td>
                <td style={{ ...td, color: '#D4AF37', fontWeight: 600 }}>${m.revenue.toLocaleString()}</td>
                <td style={{ ...td, color: '#4fc3f7' }}>{m.orders}</td>
                <td style={{ ...td, color: '#81c784' }}>{m.pharmacies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple bar chart using divs */}
      <div style={{ marginTop: 28 }}>
        <SectionTitle>الإيرادات الشهرية</SectionTitle>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 140, marginTop: 16, padding: '0 8px' }}>
          {monthly.map(m => {
            const pct = (m.revenue / 1400) * 100;
            return (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: '#D4AF37', fontWeight: 600 }}>${m.revenue}</span>
                <div style={{
                  width: '100%', background: 'linear-gradient(180deg, #D4AF37, #8B6914)',
                  borderRadius: '6px 6px 0 0', height: `${pct}%`, minHeight: 8, transition: 'height 0.5s ease',
                }} />
                <span style={{ fontSize: 12, color: '#888' }}>{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── SHARED ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 16, fontWeight: 700, color: '#D4AF37', marginBottom: 4 }}>{children}</h2>;
}

function StatusBadge({ status }: { status: string }) {
  const active = status === 'نشط';
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 12,
      background: active ? 'rgba(129,199,132,0.15)' : 'rgba(229,115,115,0.15)',
      color: active ? '#81c784' : '#e57373',
    }}>{status}</span>
  );
}

function SubBadge({ sub }: { sub: string }) {
  const paid = sub === 'مدفوع';
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 12,
      background: paid ? 'rgba(212,175,55,0.15)' : 'rgba(150,150,150,0.15)',
      color: paid ? '#D4AF37' : '#888',
    }}>{sub}</span>
  );
}

const td: React.CSSProperties = { padding: '12px 16px', textAlign: 'right', color: '#ccc' };
const viewBtn: React.CSSProperties = {
  padding: '5px 12px', marginLeft: 6, border: '1px solid #D4AF3766', borderRadius: 6,
  background: 'transparent', color: '#D4AF37', cursor: 'pointer', fontSize: 12,
};
const delBtn: React.CSSProperties = {
  padding: '5px 12px', border: '1px solid #e5737366', borderRadius: 6,
  background: 'transparent', color: '#e57373', cursor: 'pointer', fontSize: 12,
};
const addBtn: React.CSSProperties = {
  padding: '8px 18px', border: 'none', borderRadius: 8,
  background: 'linear-gradient(135deg, #D4AF37, #8B6914)', color: '#111',
  cursor: 'pointer', fontSize: 14, fontWeight: 700,
};
