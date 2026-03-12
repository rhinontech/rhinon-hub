"use client";

import { motion } from "framer-motion";
import { Shield, UserPlus, MoreHorizontal, Mail, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
  lastActive: string;
}

const mockTeam: TeamMember[] = [
  { id: "1", name: "John Doe", email: "john@rhinon.io", role: "Admin", status: "Active", lastActive: "Now" },
  { id: "2", name: "Jane Smith", email: "jane@rhinon.io", role: "Campaign Manager", status: "Active", lastActive: "2h ago" },
  { id: "3", name: "Alex Rivera", email: "alex@rhinon.io", role: "Content Editor", status: "Active", lastActive: "1d ago" },
  { id: "4", name: "Pending Invite", email: "new@rhinon.io", role: "Viewer", status: "Invited", lastActive: "—" },
];

const roles = [
  { name: "Admin", description: "Full system access", permissions: 12 },
  { name: "Campaign Manager", description: "Manage campaigns & leads", permissions: 8 },
  { name: "Content Editor", description: "Edit templates & content", permissions: 5 },
  { name: "Viewer", description: "Read-only access", permissions: 2 },
];

export default function TeamPage() {
  return (
    <div className="space-y-4 max-w-[1000px]">
      <Tabs defaultValue="members">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="members" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Users & Invites
          </TabsTrigger>
          <TabsTrigger value="roles" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <UserPlus className="h-3.5 w-3.5" /> Invite Member
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Member</th>
                  <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Role</th>
                  <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="py-2.5 px-4 text-left font-medium text-muted-foreground">Last Active</th>
                  <th className="py-2.5 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {mockTeam.map((member, i) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-medium text-primary">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-muted-foreground font-mono">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded border border-border text-muted-foreground text-[10px]">{member.role}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 text-[10px] font-medium",
                        member.status === "Active" ? "text-success" : "text-warning"
                      )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", member.status === "Active" ? "bg-success" : "bg-warning")} />
                        {member.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-muted-foreground">{member.lastActive}</td>
                    <td className="py-2.5 px-4">
                      <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((role, i) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{role.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{role.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                      <Key className="h-3 w-3" />
                      {role.permissions} permissions
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
