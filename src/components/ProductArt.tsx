import type { CategoryId } from "@/data/products";

// Простые SVG-иллюстрации вместо фото: проект учебный, чужие картинки не используем
const icons: Record<CategoryId, React.ReactNode> = {
  laptops: (
    <>
      <rect x="18" y="20" width="64" height="42" rx="4" />
      <path d="M8 70h84l-6 8H14z" />
    </>
  ),
  phones: (
    <>
      <rect x="34" y="12" width="32" height="64" rx="7" />
      <circle cx="50" cy="68" r="3" fill="currentColor" />
    </>
  ),
  audio: (
    <>
      <path d="M22 56V48a28 28 0 0 1 56 0v8" fill="none" strokeWidth="6" stroke="currentColor" />
      <rect x="16" y="52" width="16" height="24" rx="6" />
      <rect x="68" y="52" width="16" height="24" rx="6" />
    </>
  ),
  watches: (
    <>
      <rect x="38" y="8" width="24" height="16" rx="3" />
      <rect x="38" y="64" width="24" height="16" rx="3" />
      <rect x="30" y="22" width="40" height="44" rx="10" />
    </>
  ),
  accessories: (
    <>
      <rect x="26" y="28" width="48" height="36" rx="8" />
      <rect x="38" y="64" width="6" height="12" rx="2" />
      <rect x="56" y="64" width="6" height="12" rx="2" />
    </>
  ),
};

export function ProductArt({
  category,
  color,
  className = "",
}: {
  category: CategoryId;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 88" className="h-1/2 w-1/2 fill-white/90 text-white/90">
        {icons[category]}
      </svg>
    </div>
  );
}
