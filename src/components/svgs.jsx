export const HexBg = () => (
  <svg className="hex-bg" width="600" height="600" viewBox="0 0 600 600">
    <polygon points="300,50 530,175 530,425 300,550 70,425 70,175" fill="none" stroke="white" strokeWidth="1"/>
    <polygon points="300,120 470,210 470,390 300,480 130,390 130,210" fill="none" stroke="white" strokeWidth="0.5"/>
    <polygon points="300,190 410,245 410,355 300,410 190,355 190,245" fill="none" stroke="white" strokeWidth="0.3"/>
  </svg>
);
export const NetworkSvg = () => (
          <svg viewBox="0 0 300 200" width="300" height="200" style={{opacity:0.7}}>
            <defs>
              <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {/* Network nodes */}
            <circle cx="150" cy="100" r="20" fill="none" stroke="#00ff9f" strokeWidth="1.5" filter="url(#glow)"/>
            <circle cx="150" cy="100" r="8" fill="#00ff9f" opacity="0.8"/>
            <circle cx="60" cy="50" r="10" fill="none" stroke="#00cfff" strokeWidth="1"/>
            <circle cx="60" cy="50" r="4" fill="#00cfff"/>
            <circle cx="240" cy="50" r="10" fill="none" stroke="#00cfff" strokeWidth="1"/>
            <circle cx="240" cy="50" r="4" fill="#00cfff"/>
            <circle cx="60" cy="150" r="10" fill="none" stroke="#00cfff" strokeWidth="1"/>
            <circle cx="60" cy="150" r="4" fill="#00cfff"/>
            <circle cx="240" cy="150" r="10" fill="none" stroke="#00cfff" strokeWidth="1"/>
            <circle cx="240" cy="150" r="4" fill="#00cfff"/>
            <circle cx="30" cy="100" r="7" fill="none" stroke="#ff3c5f" strokeWidth="1"/>
            <circle cx="270" cy="100" r="7" fill="none" stroke="#ff3c5f" strokeWidth="1"/>
            {/* Connections */}
            <line x1="150" y1="100" x2="60" y2="50" stroke="#00ff9f" strokeWidth="0.8" opacity="0.4"/>
            <line x1="150" y1="100" x2="240" y2="50" stroke="#00ff9f" strokeWidth="0.8" opacity="0.4"/>
            <line x1="150" y1="100" x2="60" y2="150" stroke="#00ff9f" strokeWidth="0.8" opacity="0.4"/>
            <line x1="150" y1="100" x2="240" y2="150" stroke="#00ff9f" strokeWidth="0.8" opacity="0.4"/>
            <line x1="60" y1="50" x2="30" y2="100" stroke="#00cfff" strokeWidth="0.5" opacity="0.3"/>
            <line x1="60" y1="150" x2="30" y2="100" stroke="#00cfff" strokeWidth="0.5" opacity="0.3"/>
            <line x1="240" y1="50" x2="270" y2="100" stroke="#00cfff" strokeWidth="0.5" opacity="0.3"/>
            <line x1="240" y1="150" x2="270" y2="100" stroke="#00cfff" strokeWidth="0.5" opacity="0.3"/>
            {/* Animated packet */}
            <circle r="4" fill="#00ff9f" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M150,100 L60,50 L150,100 L240,150 L150,100"/>
            </circle>
            <circle r="3" fill="#ff3c5f" opacity="0.8">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M30,100 L60,50 L150,100 L240,50 L270,100"/>
            </circle>
          </svg>
);
export const CircuitSvg = () => (
  <svg className="edu-circuit" viewBox="0 0 600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="0" x2="100" y2="900" stroke="white" strokeWidth="0.5"/>
    <line x1="200" y1="0" x2="200" y2="900" stroke="white" strokeWidth="0.3"/>
    <line x1="350" y1="0" x2="350" y2="900" stroke="white" strokeWidth="0.5"/>
    <line x1="500" y1="0" x2="500" y2="900" stroke="white" strokeWidth="0.3"/>
    <line x1="0" y1="150" x2="600" y2="150" stroke="white" strokeWidth="0.5"/>
    <line x1="0" y1="400" x2="600" y2="400" stroke="white" strokeWidth="0.3"/>
    <line x1="0" y1="650" x2="600" y2="650" stroke="white" strokeWidth="0.5"/>
    <circle cx="100" cy="150" r="3" fill="white"/>
    <circle cx="200" cy="400" r="2" fill="white"/>
    <circle cx="350" cy="150" r="3" fill="white"/>
    <circle cx="500" cy="650" r="3" fill="white"/>
    <circle cx="100" cy="650" r="2" fill="white"/>
    <circle cx="350" cy="400" r="3" fill="white"/>
    <polyline points="200,150 280,150 280,250 500,250" stroke="white" strokeWidth="0.4" fill="none"/>
    <polyline points="100,400 180,400 180,500 350,500" stroke="white" strokeWidth="0.4" fill="none"/>
    <polyline points="350,650 430,650 430,780 600,780" stroke="white" strokeWidth="0.4" fill="none"/>
    <rect x="90" y="295" width="20" height="10" stroke="white" strokeWidth="0.5" fill="none"/>
    <rect x="340" y="195" width="20" height="10" stroke="white" strokeWidth="0.5" fill="none"/>
    <rect x="490" y="245" width="20" height="10" stroke="white" strokeWidth="0.5" fill="none"/>
  </svg>
);
export const OrbitSvg = () => (
          <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-edu"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="glow-sm-edu"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(0,255,159,0.06)" strokeWidth="1"/>
            <circle cx="140" cy="140" r="100" fill="none" stroke="rgba(0,255,159,0.08)" strokeWidth="0.5" strokeDasharray="4 8"/>
            <circle cx="140" cy="140" r="80" fill="none" stroke="rgba(0,207,255,0.1)" strokeWidth="1"/>
            <circle cx="140" cy="140" r="110" fill="none" stroke="rgba(0,255,159,0.12)" strokeWidth="0.8" strokeDasharray="12 6">
              <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="360 140 140" dur="30s" repeatCount="indefinite"/>
            </circle>
            <circle cx="140" cy="140" r="92" fill="none" stroke="rgba(0,207,255,0.1)" strokeWidth="0.6" strokeDasharray="6 10">
              <animateTransform attributeName="transform" type="rotate" from="360 140 140" to="0 140 140" dur="22s" repeatCount="indefinite"/>
            </circle>
            {/* Skill nodes */}
            <circle cx="140" cy="30" r="14" fill="var(--panel)" stroke="rgba(0,255,159,0.4)" strokeWidth="1" filter="url(#glow-sm-edu)"/>
            <text x="140" y="34" fontFamily="'Share Tech Mono'" fontSize="6" fill="#00ff9f" textAnchor="middle">CS</text>
            <circle cx="250" cy="140" r="14" fill="var(--panel)" stroke="rgba(0,207,255,0.4)" strokeWidth="1" filter="url(#glow-sm-edu)"/>
            <text x="250" y="138" fontFamily="'Share Tech Mono'" fontSize="5" fill="#00cfff" textAnchor="middle">NET</text>
            <text x="250" y="146" fontFamily="'Share Tech Mono'" fontSize="5" fill="#00cfff" textAnchor="middle">SEC</text>
            <circle cx="140" cy="250" r="14" fill="var(--panel)" stroke="rgba(0,207,255,0.4)" strokeWidth="1" filter="url(#glow-sm-edu)"/>
            <text x="140" y="254" fontFamily="'Share Tech Mono'" fontSize="6" fill="#00cfff" textAnchor="middle">ML</text>
            <circle cx="30" cy="140" r="14" fill="var(--panel)" stroke="rgba(255,60,95,0.4)" strokeWidth="1" filter="url(#glow-sm-edu)"/>
            <text x="30" y="144" fontFamily="'Share Tech Mono'" fontSize="5.5" fill="#ff3c5f" textAnchor="middle">CRYPT</text>
            {/* Connector lines */}
            <line x1="140" y1="44" x2="140" y2="108" stroke="#00ff9f" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4"/>
            <line x1="236" y1="140" x2="172" y2="140" stroke="#00cfff" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4"/>
            <line x1="140" y1="236" x2="140" y2="172" stroke="#00cfff" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4"/>
            <line x1="44" y1="140" x2="108" y2="140" stroke="#ff3c5f" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4"/>
            {/* Center */}
            <circle cx="140" cy="140" r="32" fill="rgba(0,255,159,0.04)" stroke="rgba(0,255,159,0.25)" strokeWidth="1.5" filter="url(#glow-edu)"/>
            <circle cx="140" cy="140" r="20" fill="rgba(0,255,159,0.08)" stroke="rgba(0,255,159,0.5)" strokeWidth="1"/>
            <circle cx="140" cy="140" r="6" fill="#00ff9f" opacity="0.9"/>
            <text x="140" y="160" fontFamily="'Bebas Neue'" fontSize="9" fill="rgba(0,255,159,0.7)" textAnchor="middle" letterSpacing="1">B.TECH</text>
            {/* Orbiting particles */}
            <circle r="3.5" fill="#00ff9f" opacity="0.85" filter="url(#glow-sm-edu)">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath xlinkHref="#edu-orbit1"/>
              </animateMotion>
            </circle>
            <path id="edu-orbit1" d="M 140 20 A 120 120 0 1 1 140 260 A 120 120 0 1 1 140 20" fill="none"/>
            <circle r="2.8" fill="#ff3c5f" opacity="0.82" filter="url(#glow-sm-edu)">
              <animateMotion dur="9.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="-1.3s">
                <mpath xlinkHref="#edu-orbit2"/>
              </animateMotion>
            </circle>
            <path id="edu-orbit2" d="M 140 40 A 100 100 0 1 0 140 240 A 100 100 0 1 0 140 40" fill="none"/>
          </svg>
);
