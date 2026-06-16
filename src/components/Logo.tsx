import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  white?: boolean;
}

export default function Logo({ size = 'md', white = false }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-2xl' },
    lg: { icon: 52, text: 'text-4xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Premium SVG Logo: location pin + leaf + fork */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="50%" stopColor="#FF8A65" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        {/* Pin body */}
        <path d="M26 4C18.268 4 12 10.268 12 18C12 28 26 46 26 46C26 46 40 28 40 18C40 10.268 33.732 4 26 4Z"
          fill="url(#logoGrad)" />
        {/* Inner circle */}
        <circle cx="26" cy="18" r="7" fill="white" fillOpacity="0.95" />
        {/* Leaf inside pin */}
        <path d="M26 14C26 14 22 16 22 19C22 21.2 23.8 23 26 23C28.2 23 30 21.2 30 19C30 16 26 14 26 14Z"
          fill="url(#leafGrad)" />
        {/* Fork tines inside leaf */}
        <line x1="24.5" y1="16" x2="24.5" y2="21" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="26" y1="15.5" x2="26" y2="21" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="27.5" y1="16" x2="27.5" y2="21" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
      <span className={`font-black ${s.text} tracking-tight ${white ? 'text-white' : 'text-gradient'}`}>
        Everbite
      </span>
    </div>
  );
}
