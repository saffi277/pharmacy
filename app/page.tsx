'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'snake' | 'drop' | 'freeze' | 'text' | 'done'>('snake');

  useEffect(() => {
    // Snake drawing: 0 - 2500ms
    const dropTimer = setTimeout(() => setPhase('drop'), 2500);
    // Drop falls: 2500 - 3200ms
    const freezeTimer = setTimeout(() => setPhase('freeze'), 3200);
    // Text fades in: 3400ms
    const textTimer = setTimeout(() => setPhase('text'), 3400);
    // Navigate away after 5s total
    const navTimer = setTimeout(() => {
      setPhase('done');
      router.push('/home');
    }, 5000);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(freezeTimer);
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  const snakePathLength = 520;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#1a472a' }}
    >
      <style>{`
        @keyframes drawSnake {
          from { stroke-dashoffset: ${snakePathLength}; }
          to   { stroke-dashoffset: 0; }
        }

        @keyframes dropFall {
          0%   { transform: translateY(0px); opacity: 1; }
          80%  { transform: translateY(54px); opacity: 1; }
          100% { transform: translateY(54px); opacity: 0; }
        }

        @keyframes ripple {
          0%   { r: 2; opacity: 0.8; }
          100% { r: 9; opacity: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 6px #D4AF37aa); }
          50%       { filter: drop-shadow(0 0 16px #D4AF37ff); }
        }

        .chalice-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .snake-path {
          stroke-dasharray: ${snakePathLength};
          stroke-dashoffset: ${snakePathLength};
          animation: drawSnake 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .snake-head {
          opacity: 0;
          animation: fadeIn 0.3s ease forwards 2.3s;
        }

        .drop {
          animation: dropFall 0.7s cubic-bezier(0.4, 0, 0.8, 1) forwards;
        }

        .ripple {
          animation: ripple 0.6s ease-out forwards 0.5s;
        }

        .text-fade {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>

      <div className="flex flex-col items-center gap-8">
        {/* SVG Chalice + Snake */}
        <svg
          viewBox="0 0 160 220"
          width="220"
          height="300"
          xmlns="http://www.w3.org/2000/svg"
          className="chalice-glow"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#D4AF37" />
              <stop offset="50%"  stopColor="#F0D060" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#C5A028" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
            <linearGradient id="cupShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#8B6914" stopOpacity="0.8" />
              <stop offset="30%"  stopColor="#F0D060" stopOpacity="0.9" />
              <stop offset="70%"  stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B6914" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2d7a2d" />
              <stop offset="50%"  stopColor="#3da53d" />
              <stop offset="100%" stopColor="#2d7a2d" />
            </linearGradient>
          </defs>

          {/* ── BASE / FOOT ── */}
          <ellipse cx="80" cy="196" rx="38" ry="7" fill="url(#goldGrad2)" />
          <rect x="56" y="188" width="48" height="10" rx="3" fill="url(#goldGrad)" />
          {/* base rim highlight */}
          <ellipse cx="80" cy="188" rx="24" ry="3" fill="none" stroke="#F0D060" strokeWidth="1" opacity="0.6" />

          {/* ── STEM ── */}
          {/* lower stem */}
          <rect x="74" y="148" width="12" height="42" rx="4" fill="url(#goldGrad2)" />
          {/* stem highlight */}
          <rect x="77" y="150" width="3" height="38" rx="1.5" fill="#F0D060" opacity="0.5" />
          {/* knob in middle of stem */}
          <ellipse cx="80" cy="168" rx="10" ry="6" fill="url(#goldGrad)" />
          <ellipse cx="80" cy="166" rx="7" ry="3" fill="#F0D060" opacity="0.4" />

          {/* upper stem */}
          <rect x="76" y="130" width="8" height="22" rx="3" fill="url(#goldGrad2)" />

          {/* ── CUP BODY ── */}
          {/*
            The cup is a wide goblet shape.
            Path: start narrow at stem, flare out, slight inward curve at rim.
          */}
          <path
            d="M58,130 Q44,118 42,100 Q40,82 52,68 Q62,56 80,54 Q98,56 108,68 Q120,82 118,100 Q116,118 102,130 Z"
            fill="url(#cupShine)"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />
          {/* inner cup shadow */}
          <path
            d="M63,130 Q52,120 50,103 Q49,88 58,75 Q67,63 80,61 Q93,63 102,75 Q111,88 110,103 Q108,120 97,130 Z"
            fill="#8B6914"
            opacity="0.4"
          />
          {/* cup shine streak */}
          <path
            d="M65,72 Q62,85 63,100 Q64,112 68,122"
            fill="none"
            stroke="#F0D060"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* rim */}
          <ellipse cx="80" cy="130" rx="22" ry="5" fill="url(#goldGrad)" />
          <ellipse cx="80" cy="129" rx="18" ry="3" fill="#F0D060" opacity="0.5" />

          {/* ── LIQUID IN CUP ── */}
          <ellipse cx="80" cy="122" rx="14" ry="4" fill="#1a6b3a" opacity="0.7" />

          {/* ── SNAKE PATH ──
            The snake starts near the base, winds around the stem (two loops),
            travels up and wraps around the cup body, ending near the rim.
            Drawn with stroke-dashoffset animation.
          */}
          <path
            className="snake-path"
            d="
              M 80,200
              C 92,195 100,188 95,182
              C 90,176 70,176 65,170
              C 60,164 70,158 80,162
              C 90,166 98,160 95,154
              C 92,148 72,148 68,142
              C 64,136 72,132 80,134
              C 96,134 108,118 106,100
              C 104,84 94,68 80,64
              C 66,60 54,72 52,88
              C 50,102 60,116 72,122
              C 84,128 96,122 100,112
            "
            fill="none"
            stroke="url(#snakeGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Snake scales texture overlay (static, appears with snake) */}
          <path
            className="snake-path"
            d="
              M 80,200
              C 92,195 100,188 95,182
              C 90,176 70,176 65,170
              C 60,164 70,158 80,162
              C 90,166 98,160 95,154
              C 92,148 72,148 68,142
              C 64,136 72,132 80,134
              C 96,134 108,118 106,100
              C 104,84 94,68 80,64
              C 66,60 54,72 52,88
              C 50,102 60,116 72,122
              C 84,128 96,122 100,112
            "
            fill="none"
            stroke="#5dba5d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 8"
            opacity="0.5"
            style={{
              strokeDashoffset: snakePathLength,
              animation: 'drawSnake 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />

          {/* Snake head (appears near rim when drawing finishes) */}
          <g className="snake-head">
            <ellipse cx="102" cy="108" rx="7" ry="5" fill="#2d7a2d" transform="rotate(-30 102 108)" />
            <ellipse cx="103" cy="107" rx="4" ry="3" fill="#3da53d" transform="rotate(-30 103 107)" />
            {/* eyes */}
            <circle cx="104" cy="105" r="1.5" fill="#ff4444" />
            <circle cx="104.5" cy="105" r="0.6" fill="#200" />
            {/* tongue */}
            <path d="M106,110 L110,107 M110,107 L112,105 M110,107 L112,109"
              stroke="#ff2222" strokeWidth="1" strokeLinecap="round" fill="none"
              transform="rotate(-30 106 110)" />
          </g>

          {/* ── DROP (shown only during 'drop' phase) ── */}
          {phase === 'drop' && (
            <g className="drop" style={{ transformOrigin: '102px 108px' }}>
              {/* teardrop shape */}
              <path
                d="M102,108 C100,112 98,118 100,122 C102,126 104,126 106,122 C108,118 106,112 102,108 Z"
                fill="#4fc3f7"
                opacity="0.9"
              />
              <ellipse cx="101" cy="114" rx="1" ry="2.5" fill="white" opacity="0.5" />
            </g>
          )}

          {/* ── RIPPLE in cup after drop ── */}
          {(phase === 'freeze' || phase === 'text' || phase === 'done') && (
            <ellipse
              className="ripple"
              cx="80"
              cy="122"
              rx="2"
              ry="1"
              fill="none"
              stroke="#4fc3f7"
              strokeWidth="1.5"
            />
          )}
        </svg>

        {/* ── Arabic Text ── */}
        {(phase === 'text' || phase === 'done') && (
          <div className="text-fade flex flex-col items-center gap-2">
            <span
              style={{
                fontFamily: "'Noto Naskh Arabic', 'Scheherazade New', 'Arial', serif",
                fontSize: '3.5rem',
                color: '#D4AF37',
                letterSpacing: '0.05em',
                textShadow: '0 0 20px #D4AF3788, 0 2px 8px #00000099',
                fontWeight: 700,
              }}
            >
              صيدلي
            </span>
            <span
              style={{
                color: '#C5A028',
                fontSize: '0.85rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              Pharmacy
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
