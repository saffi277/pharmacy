'use client';
import Link from 'next/link';

const TEAM = [
  { name: 'صفي',        role: 'المؤسس & المدير التنفيذي',    icon: '👨‍💼' },
  { name: 'فريق زاون',  role: 'تطوير البرمجيات',              icon: '👨‍💻' },
  { name: 'فريق التصميم', role: 'تجربة المستخدم & التصميم', icon: '🎨' },
];

const VALUES = [
  { icon: '🎯', title: 'الدقة',      desc: 'نضمن إن المعلومات الطبية دقيقة وموثوقة دائماً' },
  { icon: '⚡', title: 'السرعة',     desc: 'توصيل سريع وخدمة فورية بدون تأخير' },
  { icon: '🔒', title: 'الأمان',     desc: 'بياناتك محمية بأعلى معايير التشفير' },
  { icon: '🤝', title: 'الشراكة',    desc: 'نبني علاقة طويلة الأمد مع كل صيدلية' },
];

const MILESTONES = [
  { year: '2023', event: 'تأسيس شركة زاون للحلول البرمجية' },
  { year: '2024', event: 'بدء تطوير منصة صيدلي' },
  { year: '2025', event: 'إطلاق النسخة الأولى في العراق' },
  { year: '2025', event: 'التوسع لجميع المحافظات العراقية' },
];

export default function AboutPage() {
  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e8e0d0', fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fade { animation: fadeUp 0.5s ease forwards; }
        .card { background: #161616; border: 1px solid #222; border-radius: 16px; padding: 24px; }
        .gold { background: linear-gradient(135deg,#D4AF37,#F0D060); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚕️</span>
          <span style={{ fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>صيدلي</span>
        </Link>
        <Link href="/home" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← الرئيسية</Link>
      </header>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0a0a,#111,#0d1a0d)', borderBottom: '1px solid #1a1a1a', padding: '60px 24px', textAlign: 'center' }}>
        <div className="fade" style={{ fontSize: 64, marginBottom: 16 }}>⚕️</div>
        <h1 className="fade" style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, animationDelay: '0.1s', opacity: 0 }}>
          من نحن
        </h1>
        <p className="fade" style={{ fontSize: 16, color: '#888', maxWidth: 500, margin: '0 auto', lineHeight: 1.8, animationDelay: '0.2s', opacity: 0 }}>
          صيدلي منصة عراقية تربط المرضى بالصيدليات — نهدف إلى جعل الدواء في متناول الجميع بسهولة وسرعة وأمان
        </p>
        <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,transparent,#D4AF37,transparent)', margin: '24px auto 0' }} />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Mission */}
        <div className="card fade">
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: '#D4AF37' }}>🎯 مهمتنا</h2>
          <p style={{ fontSize: 15, color: '#aaa', lineHeight: 2 }}>
            نسعى لبناء منظومة صيدلانية رقمية متكاملة في العراق — تمكّن الصيدليات من الوصول لزبائن أكثر،
            وتمكّن المرضى من الحصول على أدويتهم بأسرع وقت وأفضل سعر. نؤمن إن الصحة حق للجميع وليست رفاهية.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#D4AF37' }}>💎 قيمنا</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            {VALUES.map((v, i) => (
              <div key={v.title} className="card fade" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{v.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#D4AF37', marginBottom: 6 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#D4AF37' }}>📅 رحلتنا</h2>
          <div style={{ position: 'relative', paddingRight: 20 }}>
            <div style={{ position: 'absolute', right: 7, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,#D4AF37,#2d7a2d)' }} />
            {MILESTONES.map((m, i) => (
              <div key={i} className="fade" style={{ display: 'flex', gap: 20, marginBottom: 24, animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#D4AF37', flexShrink: 0, marginTop: 3, border: '3px solid #0f0f0f', zIndex: 1 }} />
                <div>
                  <span style={{ fontSize: 12, color: '#D4AF37', fontWeight: 700 }}>{m.year}</span>
                  <p style={{ fontSize: 14, color: '#aaa', marginTop: 2 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#D4AF37' }}>👥 فريقنا</h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {TEAM.map((t, i) => (
              <div key={t.name} className="card fade" style={{ flex: 1, minWidth: 160, textAlign: 'center', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{t.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zawan section */}
        <div style={{ background: 'linear-gradient(135deg,rgba(212,175,55,0.06),rgba(45,122,45,0.06))', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#666', letterSpacing: 3, marginBottom: 8 }}>تطوير وتصميم</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#D4AF37', letterSpacing: 4, marginBottom: 10 }}>ZAWAN</div>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 20px' }}>
            شركة زاون للحلول البرمجية — نبني تطبيقات ومنصات رقمية تخدم السوق العراقي بأعلى معايير الجودة
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🌐', label: 'www.zawan.iq' },
              { icon: '📧', label: 'info@zawan.iq' },
              { icon: '📱', label: '@zawan.iq' },
            ].map(c => (
              <span key={c.label} style={{ fontSize: 13, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{c.icon}</span>{c.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingBottom: 20 }}>
          <Link href="/pharmacies" style={{ display: 'inline-block', padding: '13px 36px', background: 'linear-gradient(135deg,#D4AF37,#8B6914)', color: '#111', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 15, marginLeft: 12 }}>
            تصفح الصيدليات
          </Link>
          <Link href="/register" style={{ display: 'inline-block', padding: '13px 36px', border: '1px solid #D4AF3766', color: '#D4AF37', borderRadius: 12, textDecoration: 'none', fontSize: 15 }}>
            سجّل صيدليتك
          </Link>
        </div>

      </div>
    </div>
  );
}
