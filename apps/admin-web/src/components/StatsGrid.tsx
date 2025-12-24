"use client";

type Stat = {
  label: string;
  value: string;
};

type StatsGridProps = {
  stats: Stat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="grid">
      {stats.map((stat, index) => (
        <div
          className="panel stat reveal"
          style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
          key={stat.label}
        >
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
