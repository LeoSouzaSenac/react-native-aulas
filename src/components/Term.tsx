import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TermOption } from "../utils/ann";

interface TermProps {
  children: React.ReactNode;
  note: string;
  options?: TermOption[];
  kind?: "text" | "code";
}

const TOOLTIP_WIDTH = 280;

export default function Term({ children, note, options, kind = "text" }: TermProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxLeft = window.innerWidth - TOOLTIP_WIDTH - 16;
    const left = Math.max(8, Math.min(rect.left, maxLeft));
    setPos({ top: rect.bottom + 9, left });
  };

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    place();
    setOpen(true);
  };

  const scheduleHide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        !target.closest?.(".term-tooltip-portal")
      ) {
        setOpen(false);
      }
    }
    function onDismiss() {
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("scroll", onDismiss, true);
    window.addEventListener("resize", onDismiss);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("scroll", onDismiss, true);
      window.removeEventListener("resize", onDismiss);
    };
  }, [open]);

  return (
    <span className={`term term-${kind} ${open ? "open" : ""}`}>
      <span
        ref={triggerRef}
        className="term-trigger"
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open ? setOpen(false) : show();
          }
        }}
      >
        {children}
      </span>
      {open &&
        createPortal(
          <span
            className="term-tooltip-portal"
            role="tooltip"
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
          >
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
          </span>,
          document.body
        )}
    </span>
  );
}
