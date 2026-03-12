import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const outreachData = [
  { day: "Mon", sent: 120, replies: 18 },
  { day: "Tue", sent: 185, replies: 24 },
  { day: "Wed", sent: 210, replies: 32 },
  { day: "Thu", sent: 165, replies: 28 },
  { day: "Fri", sent: 240, replies: 38 },
  { day: "Sat", sent: 80, replies: 12 },
  { day: "Sun", sent: 45, replies: 8 },
];

const engagementData = [
  { week: "W1", rate: 12 },
  { week: "W2", rate: 15 },
  { week: "W3", rate: 14 },
  { week: "W4", rate: 19 },
  { week: "W5", rate: 22 },
  { week: "W6", rate: 18 },
  { week: "W7", rate: 25 },
  { week: "W8", rate: 28 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: <span className="text-foreground font-medium">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export function OutreachChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={outreachData} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="sent" fill="hsl(217 91% 60%)" radius={[3, 3, 0, 0]} name="Sent" />
        <Bar dataKey="replies" fill="hsl(142 71% 45%)" radius={[3, 3, 0, 0]} name="Replies" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={engagementData}>
        <defs>
          <linearGradient id="engGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" vertical={false} />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="rate" stroke="hsl(217 91% 60%)" fill="url(#engGradient)" strokeWidth={2} name="Reply Rate" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
