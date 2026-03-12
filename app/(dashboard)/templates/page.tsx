"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, MoreHorizontal, FileText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  channel: "Email" | "LinkedIn" | "Instagram";
  description: string;
  lastEdited: string;
  uses: number;
}

const channelIcons = { Email: Mail, LinkedIn: Linkedin, Instagram: Instagram };
const channelColors = {
  Email: "text-primary bg-primary/10 border-primary/30",
  LinkedIn: "text-[hsl(210,80%,55%)] bg-[hsl(210,80%,55%)]/10 border-[hsl(210,80%,55%)]/30",
  Instagram: "text-[hsl(330,70%,55%)] bg-[hsl(330,70%,55%)]/10 border-[hsl(330,70%,55%)]/30",
};

const mockTemplates: Template[] = [
  { id: "1", name: "Cold Intro - Enterprise", channel: "Email", description: "Initial outreach for enterprise decision-makers. Mentions funding & recent news.", lastEdited: "2h ago", uses: 847 },
  { id: "2", name: "Follow-up Nudge", channel: "Email", description: "Gentle follow-up 3 days after initial contact. Includes social proof.", lastEdited: "1d ago", uses: 523 },
  { id: "3", name: "Connection Request", channel: "LinkedIn", description: "Personalized connection request with mutual interest hook.", lastEdited: "3d ago", uses: 312 },
  { id: "4", name: "DM Intro - Founders", channel: "LinkedIn", description: "Direct message for startup founders with product demo offer.", lastEdited: "5d ago", uses: 198 },
  { id: "5", name: "Story Reply Hook", channel: "Instagram", description: "Casual outreach triggered by story engagement.", lastEdited: "1w ago", uses: 89 },
  { id: "6", name: "Value Prop - SaaS", channel: "Email", description: "Concise value proposition for SaaS buyers with ROI metrics.", lastEdited: "1w ago", uses: 634 },
];

export default function TemplatesPage() {
  const [activeChannel, setActiveChannel] = useState<string>("All");
  const channels = ["All", "Email", "LinkedIn", "Instagram"];

  const filtered = activeChannel === "All" ? mockTemplates : mockTemplates.filter((t) => t.channel === activeChannel);

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Channel Filter */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 w-fit">
        {channels.map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              activeChannel === ch
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template, i) => {
          const ChannelIcon = channelIcons[template.channel];
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="gradient-shine absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("flex h-7 w-7 items-center justify-center rounded-md border", channelColors[template.channel])}>
                      <ChannelIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{template.name}</h3>
                      <span className="text-[10px] text-muted-foreground">{template.channel}</span>
                    </div>
                  </div>
                  <button className="p-1 rounded text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground">Edited {template.lastEdited}</span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    {template.uses} uses
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
