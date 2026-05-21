'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);
    // TODO: replace with real API call
    await new Promise(r => setTimeout(r, 1200));

    // Demo check — remove when backend is ready
    if (email === 'admin@saydali.iq' && password === 'admin123') {
      sessionStorage.setItem('admin_authed', '1');
      router.push('/admin');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 70% at 50% 38%, #1a1a1a 0%, #111 55%, #0a0a0a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif',
      padding: 20,
    }}>
      <style>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.15); }
          50%       { box-shadow: 0 0 40px rgba(212,175,55,0.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card { animation: fadeUp 0.6s ease forwards; }
        .glow-btn {
          background: linear-gradient(135deg, #D4AF37, #8B6914);
          color: #111;
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
        .glow-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .input-field {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
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
        .input-field:focus { border-color: #D4AF37; }
        .input-field::placeholder { color: #555; }
      `}</style>

      <div className="card" style={{
        width: '100%',
        maxWidth: 400,
        background: '#141414',
        border: '1px solid #222',
        borderRadius: 20,
        padding: 40,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>⚕️</div>
          <h1 style={{
            fontSize: 28, fontWeight: 700, margin: 0,
            background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            صيدلي
          </h1>
          <p style={{ color: '#888', fontSize: 13, marginTop: 6, letterSpacing: '0.1em' }}>
            لوحة تحكم المشرف
          </p>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', margin: '12px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 7 }}>
              البريد الإلكتروني
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="admin@saydali.iq"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 7 }}>
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
                style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: '#666',
                  padding: 0, lineHeight: 1,
                }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(229,115,115,0.1)', border: '1px solid rgba(229,115,115,0.3)',
              borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e57373', textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button className="glow-btn" type="submit" disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#444', marginTop: 24, marginBottom: 0 }}>
          هذه الصفحة مخصصة لمشرفي النظام فقط
        </p>
      </div>
    </div>
  );
}
