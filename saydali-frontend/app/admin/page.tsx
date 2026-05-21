'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Section = 'dashboard' | 'pharmacies' | 'users' | 'orders' | 'subscriptions' | 'reports';

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard',     label: 'الرئيسية',    icon: '🏠' },
  { id: 'pharmacies',    label: 'الصيدليات',   icon: '🏥' },
  { id: 'users',         label: 'المستخدمين',  icon: '👥' },
  { id: 'orders',        label: 'الطلبات',     icon: '📦' },
  { id: 'subscriptions', label: 'الاشتراكات',  icon: '💳' },
  { id: 'reports',       label: 'التقارير',    icon: '📊' },
];

const pharmacies = [
  { id: 1, name: 'صيدلية الأمل', owner: 'أحمد محمد', city: 'بغداد', status: 'نشط',   sub: 'مدفوع',  joined: '2024-01-15' },
  { id: 2, name: 'صيدلية النور', owner: 'سالم علي',  city: 'البصرة', status: 'معلق',  sub: 'منتهي',  joined: '2024-02-20' },
  { id: 3, name: 'صيدلية الشفاء', owner: 'محمد حسن', city: 'أربيل', status: 'نشط',   sub: 'مدفوع',  joined: '2024-03-10' },
  { id: 4, name: 'صيدلية الحياة', owner: 'علي كريم', city: 'موصل', status: 'نشط',   sub: 'مدفوع',  joined: '2024-03-22' },
  { id: 5, name: 'صيدلية بغداد',  owner: 'كريم جاسم', city: 'بغداد', status: 'معلق', sub: 'منتهي',  joined: '2024-04-05' },
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
  const [active, setActive] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authed, setAuthed] = useState(false);

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
          {active === 'dashboard' && <DashboardSection />}
          {active === 'pharmacies' && <PharmaciesSection />}
          {active === 'users' && <UsersSection />}
          {active === 'orders' && <OrdersSection />}
          {active === 'subscriptions' && <SubscriptionsSection />}
          {active === 'reports' && <ReportsSection />}
        </div>
      </main>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function DashboardSection() {
  const stats = [
    { label: 'الصيدليات', value: '124',    icon: '🏥', color: '#D4AF37' },
    { label: 'المستخدمين', value: '3,842', icon: '👥', color: '#4fc3f7' },
    { label: 'طلبات اليوم', value: '287',  icon: '📦', color: '#81c784' },
    { label: 'الإيرادات',   value: '$1,240', icon: '💰', color: '#ff8a65' },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#161616', border: '1px solid #252525', borderRadius: 14, padding: '20px 22px',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <SectionTitle>آخر الصيدليات المسجلة</SectionTitle>
      <PharmacyTable rows={pharmacies.slice(0, 3)} />
    </div>
  );
}

/* ─── PHARMACIES ─── */
function PharmaciesSection() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SectionTitle>جميع الصيدليات</SectionTitle>
        <button style={addBtn}>+ إضافة صيدلية</button>
      </div>
      <PharmacyTable rows={pharmacies} />
    </div>
  );
}

function PharmacyTable({ rows }: { rows: typeof pharmacies }) {
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
                <button style={delBtn}>حذف</button>
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
