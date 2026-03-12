import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, ArrowUpDown, Upload, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  campaign: string;
  status: "New" | "Emailed" | "Replied" | "Bounced" | "Processing";
}

const statusStyles: Record<string, string> = {
  New: "border-primary/30 text-primary bg-primary/10",
  Emailed: "border-warning/30 text-warning bg-warning/10",
  Replied: "border-success/30 text-success bg-success/10",
  Bounced: "border-destructive/30 text-destructive bg-destructive/10",
  Processing: "border-muted-foreground/30 text-muted-foreground bg-muted",
};

const mockLeads: Lead[] = [
  { id: "1", name: "Sarah Chen", company: "Acme Corp", email: "sarah@acme.com", campaign: "Q3 Enterprise", status: "Replied" },
  { id: "2", name: "James Wilson", company: "TechFlow", email: "james@techflow.io", campaign: "SaaS Founders", status: "Emailed" },
  { id: "3", name: "Maria Garcia", company: "FinServe", email: "maria@finserve.co", campaign: "Fintech Pilot", status: "Processing" },
  { id: "4", name: "Alex Thompson", company: "DataHive", email: "alex@datahive.com", campaign: "Q3 Enterprise", status: "New" },
  { id: "5", name: "Priya Patel", company: "CloudScale", email: "priya@cloudscale.io", campaign: "SaaS Founders", status: "Emailed" },
  { id: "6", name: "David Kim", company: "NeuralNet AI", email: "david@neuralnet.ai", campaign: "AI Startups", status: "New" },
  { id: "7", name: "Emma Roberts", company: "GreenLogix", email: "emma@greenlogix.com", campaign: "Fintech Pilot", status: "Bounced" },
  { id: "8", name: "Omar Hassan", company: "PayStream", email: "omar@paystream.co", campaign: "Fintech Pilot", status: "Replied" },
  { id: "9", name: "Lisa Wang", company: "Quantix", email: "lisa@quantix.io", campaign: "Q3 Enterprise", status: "Emailed" },
  { id: "10", name: "Tom Baker", company: "ShipFast", email: "tom@shipfast.dev", campaign: "SaaS Founders", status: "New" },
];

const Leads = () => {
  const [search, setSearch] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const filtered = mockLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedLeads((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedLeads.size === filtered.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filtered.map((l) => l.id)));
    }
  };

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="pl-9 h-8 text-xs bg-secondary border-border"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
          <Filter className="h-3 w-3" /> Filter
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
          <ArrowUpDown className="h-3 w-3" /> Sort
        </Button>
        {selectedLeads.size > 0 && (
          <span className="text-xs text-muted-foreground">
            {selectedLeads.size} selected
          </span>
        )}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg border border-border bg-card overflow-hidden"
      >
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-2.5 px-4 text-left w-8">
                <input
                  type="checkbox"
                  checked={selectedLeads.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="rounded border-border"
                />
              </th>
              <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Name</th>
              <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Company</th>
              <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Email</th>
              <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Campaign</th>
              <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Status</th>
              <th className="py-2.5 px-4 text-right font-medium text-muted-foreground w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer",
                  selectedLeads.has(lead.id) && "bg-primary/5"
                )}
              >
                <td className="py-2.5 px-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.id)}
                    onChange={() => toggleSelect(lead.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-2.5 px-4 font-medium text-foreground">{lead.name}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{lead.company}</td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono">{lead.email}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{lead.campaign}</td>
                <td className="py-2.5 px-4">
                  <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium", statusStyles[lead.status])}>
                    {lead.status === "Processing" && <span className="mr-1 h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />}
                    {lead.status}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filtered.length} leads</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
};

export default Leads;
