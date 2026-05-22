'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Demo accounts — replace with real API later
const DEMO_ACCOUNTS = [
  { email: 'ahmed@amal.iq',   password: 'amal123',   pharmacyName: 'صيدلية الأمل',   city: 'بغداد',  id: 1 },
  { email: 'salem@noor.iq',   password: 'noor123',   pharmacyName: 'صيدلية النور',   city: 'البصرة', id: 2 },
  { email: 'mhmd@shifa.iq',   password: 'shifa123',  pharmacyName: 'صيدلية الشفاء', city: 'أربيل',  id: 3 },
];

export default function OwnerLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('يرجى إدخال البريد وكلمة المرور'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const account = DEMO_ACCOUNTS.find(a => a.email === email && a.password === password);
    if (account) {
      sessionStorage.setItem('owner_authed', '1');
      sessionStorage.setItem('owner_data', JSON.stringify({
        pharmacyName: account.pharmacyName,
        city: account.city,
        email: account.email,
        id: account.id,
      }));
      router.push('/owner');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 70% at 50% 38%, #0d1f0d 0%, #0a0a0a 60%, #050505 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif',
      padding: 20,
    }}>
      <style>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(61,165,61,0.1); }
          50%       { box-shadow: 0 0 40px rgba(61,165,61,0.25); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card { animation: fadeUp 0.6s ease forwards; }
        .glow-btn {
          background: linear-gradient(135deg, #2d7a2d, #1a4d1a);
          color: #e8e0d0;
          border: none;
          border-radius: 10px;
          padding: 13px;
          width: 100%;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          animation: glow 3s ease-in-out infinite;
          font-family: inherit;
        }
        .glow-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .glow-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .input-field {
          width: 100%;
          background: #111;
          border: 1px solid #1e2e1e;
          border-radius: 10px;
          padding: 12px 14px;
          color: #e8e0d0;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
          direction: ltr;
          text-align: right;
        }
        .input-field:focus { border-color: #3da53d; }
        .input-field::placeholder { color: #444; }
      `}</style>

      <div className="card" style={{
        width: '100%',
        maxWidth: 400,
        background: '#0f1a0f',
        border: '1px solid #1e2e1e',
        borderRadius: 20,
        padding: 40,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🏥</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#3da53d' }}>
            بوابة الصيدلاني
          </h1>
          <p style={{ color: '#4a6b4a', fontSize: 13, marginTop: 6 }}>
            سجّل دخولك لإدارة صيدليتك
          </p>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #2d7a2d, transparent)', margin: '12px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#6a8a6a', marginBottom: 7 }}>
              البريد الإلكتروني
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="ahmed@pharmacy.iq"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#6a8a6a', marginBottom: 7 }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input-field"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{ paddingLeft: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: '#4a6b4a', padding: 0 }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(229,115,115,0.08)', border: '1px solid rgba(229,115,115,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e57373', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button className="glow-btn" type="submit" disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '...' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Demo hint */}
        <div style={{ marginTop: 24, background: '#0a150a', border: '1px solid #1a2a1a', borderRadius: 10, padding: '12px 14px' }}>
          <p style={{ fontSize: 11, color: '#4a6b4a', marginBottom: 6, fontWeight: 600 }}>للتجربة:</p>
          <p style={{ fontSize: 11, color: '#3d5a3d', margin: '2px 0', direction: 'ltr', textAlign: 'right' }}>ahmed@amal.iq / amal123</p>
          <p style={{ fontSize: 11, color: '#3d5a3d', margin: '2px 0', direction: 'ltr', textAlign: 'right' }}>salem@noor.iq / noor123</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/home" style={{ fontSize: 12, color: '#3d5a3d', textDecoration: 'none' }}>
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
