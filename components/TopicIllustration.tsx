type TopicIllustrationProps = {
  slug: string;
  size?: number;
};

export default function TopicIllustration({
  slug,
  size = 44,
}: TopicIllustrationProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "stres-akademik":
      // Tumpukan buku lembut dengan daun kecil
      return (
        <svg {...common}>
          <rect x="12" y="38" width="40" height="12" rx="4" fill="#7DD3FC" />
          <rect x="16" y="25" width="34" height="11" rx="4" fill="#A5B4FC" />
          <rect x="20" y="13" width="26" height="10" rx="4" fill="#FDE68A" />
          <path
            d="M32 13 C32 7, 39 6, 41 11 C38 14, 34 14, 32 13 Z"
            fill="#6EE7B7"
          />
        </svg>
      );

    case "cemas":
      // Awan kecil dengan rintik hujan lembut dan lengkung pelangi
      return (
        <svg {...common}>
          <path
            d="M16 40 A16 16 0 0 1 48 40"
            stroke="#FDBA74"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="24" cy="30" r="10" fill="#BAE6FD" />
          <circle cx="36" cy="26" r="12" fill="#BAE6FD" />
          <circle cx="44" cy="32" r="8" fill="#BAE6FD" />
          <rect x="18" y="30" width="30" height="11" rx="5.5" fill="#BAE6FD" />
          <line
            x1="24"
            y1="46"
            x2="22"
            y2="52"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="34"
            y1="46"
            x2="32"
            y2="52"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="44"
            y1="46"
            x2="42"
            y2="52"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "tidur":
      // Bulan sabit dan bintang tenang
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" fill="#E0E7FF" opacity="0.5" />
          <path
            d="M37 16 A16 16 0 1 0 49 40 A12 12 0 1 1 37 16 Z"
            fill="#818CF8"
          />
          <circle cx="44" cy="20" r="2.5" fill="#FCD34D" />
          <circle cx="50" cy="28" r="1.8" fill="#FCD34D" />
        </svg>
      );

    case "burnout":
      // Baterai terisi ulang dengan kilau lembut
      return (
        <svg {...common}>
          <rect
            x="14"
            y="22"
            width="34"
            height="20"
            rx="6"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="2.5"
          />
          <rect x="49" y="28" width="4" height="8" rx="2" fill="#F59E0B" />
          <rect x="18" y="26" width="14" height="12" rx="3" fill="#34D399" />
          <path
            d="M37 25 L33 32 H38 L35 39"
            stroke="#F59E0B"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "kesepian":
      // Dua lingkaran hangat berdampingan
      return (
        <svg {...common}>
          <circle cx="25" cy="30" r="11" fill="#FBCFE8" />
          <circle cx="39" cy="30" r="11" fill="#BFDBFE" opacity="0.9" />
          <path
            d="M22 44 Q32 50 42 44"
            stroke="#F472B6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "mengenal-emosi":
      // Palet warna emosi yang lembut
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="20" fill="#E0F2FE" />
          <circle cx="25" cy="26" r="5" fill="#7DD3FC" />
          <circle cx="39" cy="26" r="5" fill="#FDE68A" />
          <circle cx="25" cy="39" r="5" fill="#FBCFE8" />
          <circle cx="39" cy="39" r="5" fill="#A7F3D0" />
        </svg>
      );

    case "prokrastinasi":
      // Jam pasir lembut dengan langkah kecil
      return (
        <svg {...common}>
          <rect x="20" y="14" width="24" height="4" rx="2" fill="#F59E0B" />
          <rect x="20" y="46" width="24" height="4" rx="2" fill="#F59E0B" />
          <path
            d="M23 18 L32 31 L41 18 Z"
            fill="#FDE68A"
          />
          <path
            d="M23 46 L32 33 L41 46 Z"
            fill="#FCD34D"
          />
        </svg>
      );

    case "perfeksionisme-imposter":
      // Cermin lembut dengan bintang kecil
      return (
        <svg {...common}>
          <rect
            x="18"
            y="12"
            width="28"
            height="40"
            rx="14"
            fill="#EDE9FE"
            stroke="#A78BFA"
            strokeWidth="2.5"
          />
          <circle cx="32" cy="29" r="7" fill="#C4B5FD" />
          <path
            d="M23 43 Q32 37 41 43"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" fill="#BAE6FD" />
          <circle cx="32" cy="32" r="9" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );
  }
}
