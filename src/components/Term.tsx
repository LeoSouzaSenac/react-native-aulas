import { useEffect, useRef, useState } from "react";
import type { TermOption } from "../utils/ann";

interface TermProps {
  children: React.ReactNode;
  note: string;
  options?: TermOption[];
  kind?: "text" | "code";
}

export default function Term({ children, note, options, kind = "text" }: TermProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <span className={`term term-${kind} ${open ? "open" : ""}`} ref={ref}>
      <span
        className="term-trigger"
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        {children}
      </span>
      {open && (
        <span className="term-tooltip" role="tooltip">
          <span className="term-tooltip-note">{note}</span>
          {options && options.length > 0 && (
            <span className="term-tooltip-options">
              {options.map((o, i) => (
                <span className="term-opt" key={i}>
                  <code>{o.value}</code>
                  <span>{o.desc}</span>
                </span>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
