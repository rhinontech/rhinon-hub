import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: "campaign" | "lead" | "email" | "system";
}

const typeColors: Record<string, string> = {
  campaign: "bg-primary",
  lead: "bg-success",
  email: "bg-warning",
  system: "bg-muted-foreground",
};

const mockActivities: ActivityItem[] = [
  { id: "1", text: "Campaign 'Q3 Enterprise Outreach' finished processing 500 leads", time: "2m ago", type: "campaign" },
  { id: "2", text: "42 new leads imported from CSV upload", time: "15m ago", type: "lead" },
  { id: "3", text: "Reply received from Sarah Chen (Acme Corp)", time: "23m ago", type: "email" },
  { id: "4", text: "AI generated 128 personalized emails for 'Fintech Pilot'", time: "1h ago", type: "system" },
  { id: "5", text: "Campaign 'SaaS Founders Q3' set to Active", time: "2h ago", type: "campaign" },
  { id: "6", text: "Bounce detected: 3 emails returned from 'Series A List'", time: "3h ago", type: "email" },
  { id: "7", text: "New team member invited: alex@rhinon.io", time: "5h ago", type: "system" },
];

export function ActivityFeed() {
  return (
    <div className="space-y-1">
      {mockActivities.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3 rounded-md px-3 py-2.5 hover:bg-secondary/50 transition-colors"
        >
          <div className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", typeColors[activity.type])} />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground leading-relaxed">{activity.text}</p>
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{activity.time}</span>
        </motion.div>
      ))}
    </div>
  );
}
