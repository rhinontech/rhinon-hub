import { Megaphone, Users, Mail, MessageSquare } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { OutreachChart, EngagementChart } from "@/components/DashboardCharts";

const metrics = [
  { title: "Active Campaigns", value: "12", change: "+3 this week", changeType: "positive" as const, icon: Megaphone },
  { title: "Leads Processed Today", value: "847", change: "+12.4% vs yesterday", changeType: "positive" as const, icon: Users },
  { title: "Emails Sent", value: "3,241", change: "78% delivery rate", changeType: "neutral" as const, icon: Mail },
  { title: "Reply Rate", value: "14.2%", change: "+2.1% this month", changeType: "positive" as const, icon: MessageSquare },
];

const Index = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.title} {...m} index={i} />
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Outreach Volume</h2>
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full border border-border">Last 7 days</span>
            </div>
            <OutreachChart />
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Engagement Trend</h2>
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full border border-border">Last 8 weeks</span>
            </div>
            <EngagementChart />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
