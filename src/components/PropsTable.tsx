interface PropRow {
  name: string;
  type: string;
  desc: string;
}

interface PropsTableProps {
  rows: PropRow[];
}

export default function PropsTable({ rows }: PropsTableProps) {
  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Tipo</th>
          <th>Pra que serve</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className="prop-name">{r.name}</td>
            <td className="prop-type">{r.type}</td>
            <td>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
