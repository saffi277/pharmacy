'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div dir="rtl" style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Segoe UI,Tahoma,Arial,sans-serif', padding:20 }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .float { animation: float 3s ease-in-out infinite; }
        .fade { animation: fadeUp 0.6s ease forwards; }
      `}</style>
      <div style={{ textAlign:'center' }}>
        <div className="float" style={{ fontSize:80, marginBottom:16 }}>💊</div>
        <h1 className="fade" style={{ fontSize:72, fontWeight:900, margin:'0 0 8px', background:'linear-gradient(135deg,#D4AF37,#F0D060)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
          404
        </h1>
        <h2 className="fade" style={{ fontSize:20, fontWeight:700, color:'#e8e0d0', margin:'0 0 10px', animationDelay:'0.1s', opacity:0 }}>
          الصفحة غير موجودة
        </h2>
        <p className="fade" style={{ fontSize:14, color:'#666', marginBottom:32, animationDelay:'0.2s', opacity:0 }}>
          يبدو إن الرابط اللي تبحث عنه ما موجود
        </p>
        <div className="fade" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', animationDelay:'0.3s', opacity:0 }}>
          <Link href="/home" style={{ padding:'12px 28px', background:'linear-gradient(135deg,#D4AF37,#8B6914)', color:'#111', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
            الرئيسية
          </Link>
          <Link href="/pharmacies" style={{ padding:'12px 28px', border:'1px solid #D4AF3766', color:'#D4AF37', borderRadius:12, textDecoration:'none', fontSize:14 }}>
            تصفح الصيدليات
          </Link>
        </div>
      </div>
    </div>
  );
}
