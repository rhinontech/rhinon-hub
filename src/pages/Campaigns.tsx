import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, CheckCircle, Clock, Users, Mail, MoreHorizontal, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: "Active" | "Draft" | "Completed" | "Paused";
  leads: number;
  processed: number;
  sent: number;
  replies: number;
  startDate: string;
}

const statusConfig: Record<string, { color: string; icon: typeof Play }> = {
  Active: { color: "text-success bg-success/10 border-success/30", icon: Play },
  Draft: { color: "text-muted-foreground bg-muted border-border", icon: Clock },
  Completed: { color: "text-primary bg-primary/10 border-primary/30", icon: CheckCircle },
  Paused: { color: "text-warning bg-warning/10 border-warning/30", icon: Pause },
};

const mockCampaigns: Campaign[] = [
  { id: "1", name: "Q3 Enterprise Outreach", channel: "Email", status: "Active", leads: 500, processed: 347, sent: 320, replies: 42, startDate: "Mar 1" },
  { id: "2", name: "SaaS Founders Q3", channel: "Email", status: "Active", leads: 250, processed: 180, sent: 175, replies: 28, startDate: "Mar 5" },
  { id: "3", name: "Fintech Pilot", channel: "Email", status: "Paused", leads: 150, processed: 80, sent: 78, replies: 11, startDate: "Feb 28" },
  { id: "4", name: "AI Startups - LinkedIn", channel: "LinkedIn", status: "Draft", leads: 300, processed: 0, sent: 0, replies: 0, startDate: "—" },
  { id: "5", name: "Series A Follow-up", channel: "Email", status: "Completed", leads: 120, processed: 120, sent: 118, replies: 19, startDate: "Feb 15" },
  { id: "6", name: "DevTool Launch", channel: "Email", status: "Completed", leads: 400, processed: 400, sent: 392, replies: 61, startDate: "Feb 1" },
];

const Campaigns = () => {
  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Active", value: mockCampaigns.filter((c) => c.status === "Active").length, color: "text-success" },
          { label: "Draft", value: mockCampaigns.filter((c) => c.status === "Draft").length, color: "text-muted-foreground" },
          { label: "Paused", value: mockCampaigns.filter((c) => c.status === "Paused").length, color: "text-warning" },
          { label: "Completed", value: mockCampaigns.filter((c) => c.status === "Completed").length, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card px-4 py-3 flex items-center gap-3">
            <span className={cn("text-xl font-bold", s.color)}>{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Campaign list */}
      <div className="space-y-2">
        {mockCampaigns.map((campaign, i) => {
          const config = statusConfig[campaign.status];
          const StatusIcon = config.icon;
          const progress = campaign.leads > 0 ? Math.round((campaign.processed / campaign.leads) * 100) : 0;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg border", config.color)}>
                  <StatusIcon className="h-3.5 w-3.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">{campaign.name}</h3>
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded border border-border">{campaign.channel}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{campaign.leads} leads</span>
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{campaign.sent} sent</span>
                    <span>{campaign.replies} replies</span>
                    {campaign.startDate !== "—" && <span>Started {campaign.startDate}</span>}
                  </div>
                </div>
                <div className="w-32 space-y-1 hidden sm:block">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
                <button className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Campaigns;
