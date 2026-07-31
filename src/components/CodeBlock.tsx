interface CodeBlockProps {
  filename?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="codeblock">
      {filename && (
        <div className="cb-head">
          <div className="cb-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="fname">{filename}</span>
          <span style={{ width: 40 }} />
        </div>
      )}
      <pre>{children}</pre>
    </div>
  );
}
