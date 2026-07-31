import Term from "./Term";
import type { CodeSegment } from "../utils/ann";

interface AnnotatedCodeProps {
  filename?: string;
  lines: CodeSegment[][];
}

export default function AnnotatedCode({ filename, lines }: AnnotatedCodeProps) {
  return (
    <div className="codeblock annotated">
      <div className="cb-head">
        <div className="cb-dots">
          <span />
          <span />
          <span />
        </div>
        {filename && <span className="fname">{filename}</span>}
        <span className="hint">passe o mouse nos termos marcados</span>
      </div>
      <pre>
        {lines.map((line, i) => (
          <span className="code-line" key={i}>
            {line.map((seg, j) =>
              typeof seg === "string" ? (
                <span key={j}>{seg}</span>
              ) : (
                <Term key={j} note={seg.note} options={seg.options} kind="code">
                  {seg.term}
                </Term>
              )
            )}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
