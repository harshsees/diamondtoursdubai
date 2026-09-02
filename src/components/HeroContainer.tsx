import { brand } from "@/content/site";

const RIB_COUNT = 34;
const BOX = { x: 96, y: 192, w: 476, h: 176 };

/**
 * The hero's foreground object: a branded container slung under a crane hook.
 * Drawn rather than photographed so it stays crisp at any size, animates
 * cheaply, and carries the brand mark without a bitmap.
 */
export function HeroContainer({ className = "" }: { className?: string }) {
  const ribs = Array.from({ length: RIB_COUNT }, (_, i) => {
    const t = (i + 1) / (RIB_COUNT + 1);
    return BOX.x + t * BOX.w;
  });

  return (
    <svg
      viewBox="0 0 668 400"
      className={className}
      role="img"
      aria-label={`A shipping container marked ${brand.name}, slung beneath a crane hook`}
    >
      <defs>
        <linearGradient id="hc-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b2c2e" />
          <stop offset="42%" stopColor="#1a1b1d" />
          <stop offset="100%" stopColor="#0c0d0e" />
        </linearGradient>
        <linearGradient id="hc-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4c50" />
          <stop offset="100%" stopColor="#232427" />
        </linearGradient>
        <linearGradient id="hc-panel" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#43c48f" />
          <stop offset="55%" stopColor="#6ee6b0" />
          <stop offset="100%" stopColor="#2a8f76" />
        </linearGradient>
        <linearGradient id="hc-panel-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2b25" />
          <stop offset="100%" stopColor="#1c4f42" />
        </linearGradient>
        <linearGradient id="hc-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="46%" stopColor="#fff" stopOpacity="0.085" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hc-clip">
          <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx="2" />
        </clipPath>
      </defs>

      {/* hoist rope + hook */}
      <path d="M330 0v92" stroke="#0a0a0a" strokeWidth="2.4" />
      <path d="M331.2 0v92" stroke="#3a3b3d" strokeWidth="0.8" />
      <g transform="translate(330 92)">
        <rect x="-7" y="0" width="14" height="26" rx="3" fill="#141416" />
        {[0, 5, 10, 15, 20].map((y) => (
          <rect key={y} x="-7" y={y} width="14" height="2.6" rx="1.3" fill="#d08a2c" opacity="0.55" />
        ))}
        <path
          d="M0 26c-9 4-13 11-11 18 2 8 10 12 17 9"
          fill="none"
          stroke="#2c2d30"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* slings */}
      <path
        d={`M330 138 L${BOX.x + 10} ${BOX.y - 2} M330 138 L${BOX.x + BOX.w - 10} ${BOX.y - 2}`}
        stroke="#26272a"
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M330 138 L${BOX.x + 10} ${BOX.y - 2} M330 138 L${BOX.x + BOX.w - 10} ${BOX.y - 2}`}
        stroke="#55575c"
        strokeWidth="0.7"
        fill="none"
      />

      {/* body */}
      <g clipPath="url(#hc-clip)">
        <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} fill="url(#hc-steel)" />

        {ribs.map((x, i) => (
          <g key={x}>
            <rect x={x - 2.6} y={BOX.y} width="2.6" height={BOX.h} fill="#000" opacity="0.42" />
            <rect
              x={x}
              y={BOX.y}
              width="2.2"
              height={BOX.h}
              fill="#fff"
              opacity={i % 2 === 0 ? 0.05 : 0.035}
            />
          </g>
        ))}

        {/* brand panel */}
        <path
          d={`M${BOX.x} ${BOX.y} h132 l-26 ${BOX.h} h-106 z`}
          fill="url(#hc-panel-dark)"
        />
        <path
          d={`M${BOX.x + 14} ${BOX.y} h104 l-24 ${BOX.h} h-80 z`}
          fill="url(#hc-panel)"
          opacity="0.92"
        />
        <path
          d={`M${BOX.x + 46} ${BOX.y + 132} l24 -78 24 78 h-16 l-8 -28 -8 28 z`}
          fill="#08110e"
          opacity="0.88"
        />

        <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} fill="url(#hc-sheen)" />
      </g>

      {/* wordmark on the steel */}
      <text
        x={BOX.x + 300}
        y={BOX.y + 100}
        textAnchor="middle"
        fill="#e9e9e6"
        opacity="0.82"
        style={{
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
          fontSize: 46,
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        {brand.name}
      </text>

      {/* rails + corner castings */}
      <rect x={BOX.x - 6} y={BOX.y - 9} width={BOX.w + 12} height="10" rx="2" fill="url(#hc-rail)" />
      <rect x={BOX.x - 6} y={BOX.y + BOX.h - 1} width={BOX.w + 12} height="10" rx="2" fill="url(#hc-rail)" />
      {[BOX.x - 8, BOX.x + BOX.w - 12].map((x) => (
        <g key={x}>
          <rect x={x} y={BOX.y - 11} width="20" height="14" rx="2.5" fill="#3b3d41" />
          <rect x={x} y={BOX.y + BOX.h - 3} width="20" height="14" rx="2.5" fill="#303236" />
        </g>
      ))}
      <rect
        x={BOX.x - 6}
        y={BOX.y - 9}
        width={BOX.w + 12}
        height={BOX.h + 18}
        rx="3"
        fill="none"
        stroke="#000"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </svg>
  );
}
