type Props = {
  value: string;
  label: string;
  index?: string;
};

export function StatCard({ value, label, index }: Props) {
  return (
    <div className="form-card flex flex-col justify-between p-8" style={{ minHeight: 230 }}>
      {index && <span className="t-15 text-muted">{index}</span>}
      <div>
        <div className="t-h3" style={{ lineHeight: 1 }}>
          {value}
        </div>
        <p className="t-17 text-muted mt-3">{label}</p>
      </div>
    </div>
  );
}
