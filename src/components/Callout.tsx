type CalloutType = "dica" | "atencao" | "pratica";

const LABELS: Record<CalloutType, string> = {
  dica: "Dica",
  atencao: "Atenção",
  pratica: "Mão na massa",
};

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

export default function Callout({ type = "dica", children }: CalloutProps) {
  return (
    <div className={`callout ${type}`}>
      <span className="tag">{LABELS[type]}</span>
      <p>{children}</p>
    </div>
  );
}
