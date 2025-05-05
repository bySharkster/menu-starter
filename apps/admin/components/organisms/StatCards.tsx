import { Users, MoveUpRight, MoveDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive = true, icon }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={cn("text-xs", positive ? "text-green-600" : "text-red-600")}>{change}</p>
    </CardContent>
  </Card>
);

const StatCards: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatCard title="Total Users" value="1,234" change="↑ 5% from last week" icon={<Users className="w-5 h-5 text-primary" />} />
    <StatCard title="Active Sessions" value="87" change="↓ 2% from last week" positive={false} icon={<MoveUpRight className="w-5 h-5 text-primary" />} />
    <StatCard title="Revenue" value="$12,345" change="↑ 12% from last week" icon={<MoveDownLeft className="w-5 h-5 text-primary" />} />
  </div>
);

export default StatCards;
