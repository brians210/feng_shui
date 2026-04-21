interface OverviewCardProps {
  text: string;
}

function OverviewCard({ text }: OverviewCardProps) {
  return <div className="overview-card">{text}</div>;
}

export default OverviewCard;
