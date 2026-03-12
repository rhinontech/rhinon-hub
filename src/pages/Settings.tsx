import { motion } from "framer-motion";
import { Globe, Bell, Palette, Database, Key, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    icon: Globe,
    title: "General",
    description: "Organization name, timezone, and defaults",
    items: [
      { label: "Organization Name", value: "Rhinon HQ" },
      { label: "Default Timezone", value: "UTC-5 (EST)" },
      { label: "Daily Send Limit", value: "500 emails/day" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alert preferences",
    toggles: [
      { label: "Campaign completion alerts", enabled: true },
      { label: "New reply notifications", enabled: true },
      { label: "Bounce warnings", enabled: false },
      { label: "Weekly digest email", enabled: true },
    ],
  },
  {
    icon: Key,
    title: "API & Integrations",
    description: "Manage API keys and third-party connections",
    items: [
      { label: "Gemini API Key", value: "••••••••••••k4Xm" },
      { label: "SMTP Provider", value: "SendGrid" },
      { label: "Webhook URL", value: "https://rhinon.io/api/webhook" },
    ],
  },
];

const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-[800px]">
      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-lg border border-border bg-card"
        >
          <div className="flex items-center gap-3 p-5 pb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="text-[11px] text-muted-foreground">{section.description}</p>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {section.items?.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs text-foreground font-mono">{item.value}</span>
              </div>
            ))}
            {section.toggles?.map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-muted-foreground">{toggle.label}</span>
                <Switch defaultChecked={toggle.enabled} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SettingsPage;
