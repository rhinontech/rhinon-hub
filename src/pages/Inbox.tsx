import { motion } from "framer-motion";
import { Mail, Send, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  company: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  campaign: string;
}

const mockConversations: Conversation[] = [
  { id: "1", name: "Sarah Chen", company: "Acme Corp", subject: "Re: Quick question about your infrastructure", preview: "Hi! Thanks for reaching out. I'd love to learn more about what you're building...", time: "5m", unread: true, campaign: "Q3 Enterprise" },
  { id: "2", name: "Omar Hassan", company: "PayStream", subject: "Re: Scaling payment ops", preview: "This is interesting. Can we schedule a call next week? I'm free Tuesday...", time: "23m", unread: true, campaign: "Fintech Pilot" },
  { id: "3", name: "Lisa Wang", company: "Quantix", subject: "Re: Data pipeline optimization", preview: "We're actually evaluating solutions right now. Your timing is perfect...", time: "1h", unread: false, campaign: "Q3 Enterprise" },
  { id: "4", name: "Tom Baker", company: "ShipFast", subject: "Re: Developer tools for fast-moving teams", preview: "Not the right time for us, but keep us in mind for Q4...", time: "3h", unread: false, campaign: "SaaS Founders" },
];

const InboxPage = () => {
  const [selected, setSelected] = useState<string>("1");
  const active = mockConversations.find((c) => c.id === selected);

  return (
    <div className="flex gap-0 h-[calc(100vh-8rem)] max-w-[1400px] rounded-lg border border-border bg-card overflow-hidden">
      {/* List */}
      <div className="w-80 border-r border-border flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <h2 className="text-xs font-semibold text-foreground">Inbox</h2>
          <span className="text-[10px] text-muted-foreground">{mockConversations.filter((c) => c.unread).length} unread</span>
        </div>
        <div className="flex-1 overflow-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv.id)}
              className={cn(
                "w-full text-left px-3 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors",
                selected === conv.id && "bg-secondary/50",
                conv.unread && "border-l-2 border-l-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-medium", conv.unread ? "text-foreground" : "text-muted-foreground")}>{conv.name}</span>
                <span className="text-[10px] text-muted-foreground">{conv.time}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{conv.subject}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1 truncate">{conv.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {active ? (
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">{active.subject}</h3>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
              <span>{active.name} · {active.company}</span>
              <span className="px-1.5 py-0.5 rounded border border-border text-[10px]">{active.campaign}</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-medium text-primary">
                {active.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="rounded-lg bg-secondary/50 px-3 py-2 text-xs text-foreground leading-relaxed max-w-md">
                {active.preview}
              </div>
            </motion.div>
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <input
              className="flex-1 bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              placeholder="Type a reply..."
            />
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
              <Send className="h-3 w-3" /> Send
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Sparkles className="h-3 w-3" /> AI Draft
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
          Select a conversation
        </div>
      )}
    </div>
  );
};

export default InboxPage;
