interface TerminalLine {
  type?: "cmd" | "out";
  text: React.ReactNode;
}

interface TerminalBlockProps {
  lines: TerminalLine[];
}

export default function TerminalBlock({ lines }: TerminalBlockProps) {
  return (
    <div className="termblock">
      {lines.map((l, i) =>
        l.type === "out" ? (
          <div className="line out" key={i}>
            {l.text}
          </div>
        ) : (
          <div className="line" key={i}>
            <span className="prompt">$</span>
            {l.text}
          </div>
        )
      )}
    </div>
  );
}
