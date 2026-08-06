interface DocLink {
  label: string;
  desc?: string;
  url: string;
}

interface DocsBoxProps {
  links: DocLink[];
}

export default function DocsBox({ links }: DocsBoxProps) {
  return (
    <div className="docsbox">
      <div className="docsbox-head">
        <span className="docsbox-badge">docs</span>
        <h4>Onde descobrir mais? Na documentação, né cara!</h4>
      </div>
      <p className="docsbox-sub">
        Tudo que foi mostrado aqui é só a ponta do iceberg — a fonte oficial
        sempre tem mais detalhes, mais props e os exemplos mais atualizados.
      </p>
      <div className="docsbox-grid">
        {links.map((l, i) => (
          <a
            key={i}
            className="docsbox-link"
            href={l.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="docsbox-link-text">
              <span className="docsbox-link-label">{l.label}</span>
              {l.desc && <span className="docsbox-link-desc">{l.desc}</span>}
            </span>
            <span className="docsbox-link-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
