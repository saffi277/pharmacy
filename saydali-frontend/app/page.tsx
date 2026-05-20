'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 7000);
    const navTimer = setTimeout(() => router.push('/home'), 8200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <>
      <style>{`
        @property --p {
          syntax: '<number>';
          inherits: false;
          initial-value: 0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100%; height: 100%;
          overflow: hidden;
          background: radial-gradient(ellipse 80% 70% at 50% 38%, #ffffff 0%, #fdf9ef 55%, #f3eada 100%);
        }
        .stage {
          width: 100vw;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vmin, 22px);
          transition: opacity 1.2s ease;
        }
        .stage.fade-out {
          opacity: 0;
        }
        .brand {
          text-align: center;
          opacity: 0;
          animation: fadeDown 0.9s 5.65s ease-out forwards;
        }
        .brand .word {
          font-family: "Amiri", serif;
          font-weight: 700;
          font-size: clamp(28px, 6vmin, 52px);
          background: linear-gradient(180deg, #c89216 0%, #8b6914 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .brand .rule {
          margin: 0.4em auto 0.35em;
          width: 50px; height: 1px;
          background: linear-gradient(90deg, transparent, #c89216, transparent);
        }
        .brand .sub {
          font-size: clamp(9px, 1.7vmin, 13px);
          letter-spacing: 0.5em;
          color: #8b6914;
          text-transform: uppercase;
        }
        .symbolWrap {
          position: relative;
          width: min(80vw, 80vh, 500px);
          height: min(80vw, 80vh, 500px);
        }
        .symbolWrap img {
          width: 100%; height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 18px 30px rgba(110,77,10,0.18));
          --p: 0;
          -webkit-mask-image: linear-gradient(to top, #000 0%, #000 calc(var(--p)*100%), rgba(0,0,0,0) calc(var(--p)*100% + 6%));
          mask-image: linear-gradient(to top, #000 0%, #000 calc(var(--p)*100%), rgba(0,0,0,0) calc(var(--p)*100% + 6%));
          mask-size: 100% 100%;
          animation: drawUp 5.5s cubic-bezier(.45,.05,.35,1) forwards;
        }
        .scanline {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 22px;
          background: linear-gradient(to top, rgba(255,233,160,0) 0%, rgba(255,220,130,0.55) 45%, rgba(255,245,200,0.95) 60%, rgba(255,220,130,0.55) 75%, rgba(255,233,160,0) 100%);
          filter: blur(2px);
          mix-blend-mode: screen;
          opacity: 0;
          animation: scanUp 5.5s cubic-bezier(.45,.05,.35,1) forwards;
        }
        @keyframes drawUp { from { --p: 0; } to { --p: 1; } }
        @keyframes scanUp {
          0%   { transform: translateY(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-2000%); opacity: 0; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`stage${fading ? ' fade-out' : ''}`}>
        <div className="brand">
          <div className="word">صيدلي</div>
          <div className="rule"></div>
          <div className="sub">PHARMACY</div>
        </div>

        <div className="symbolWrap">
          <img src="/assets/pharmacy-symbol.png" alt="Pharmacy symbol" />
          <div className="scanline"></div>
        </div>
      </div>
    </>
  );
}
