export function CornerOrnaments() {
  const Svg = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 18 Q2 2 18 2" />
      <path d="M6 16 Q6 6 16 6" opacity="0.6" />
      <path d="M2 12 Q8 8 12 2" opacity="0.5" />
      <circle cx="6" cy="6" r="1.4" fill="currentColor" />
      <path d="M14 4 Q18 6 16 10" opacity="0.7" />
      <path d="M4 14 Q6 18 10 16" opacity="0.7" />
    </svg>
  );
  return (
    <>
      <div className="corner-ornament tl"><Svg /></div>
      <div className="corner-ornament tr"><Svg /></div>
      <div className="corner-ornament bl"><Svg /></div>
      <div className="corner-ornament br"><Svg /></div>
    </>
  );
}
