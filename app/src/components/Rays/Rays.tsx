import "@/components/Rays/Rays.css";

export default function Rays({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`rays ${className}`}
      viewBox="0 0 120 160"
      aria-hidden="true"
    >
      <path d="M17 57 46 10 M45 101 95 70 M52 146 108 138" />
    </svg>
  );
}
