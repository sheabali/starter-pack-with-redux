import PlanConfiguration from "./PlanConfiguration";
import TransactionLog from "./TransactionLog";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PlanConfiguration />
      <TransactionLog />
    </div>
  );
}
