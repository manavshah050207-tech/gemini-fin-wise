import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { AppLayout } from "@/components/layout/AppLayout"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet, 
  CreditCard,
  Building,
  Shield,
  MessageSquare,
  ArrowRight
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for charts
const portfolioData = [
  { month: "Jan", value: 1200000 },
  { month: "Feb", value: 1350000 },
  { month: "Mar", value: 1280000 },
  { month: "Apr", value: 1450000 },
  { month: "May", value: 1580000 },
  { month: "Jun", value: 1720000 },
]

const expenseData = [
  { category: "Food", value: 25000, color: "#3B82F6" },
  { category: "Transport", value: 15000, color: "#10B981" },
  { category: "Shopping", value: 35000, color: "#F59E0B" },
  { category: "Bills", value: 20000, color: "#EF4444" },
]

export default function Dashboard() {
  const quickStats = [
    {
      title: "Total Portfolio",
      value: "₹17,20,000",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "success"
    },
    {
      title: "Monthly Expenses",
      value: "₹95,000",
      change: "-8.2%",
      trend: "down",
      icon: CreditCard,
      color: "primary"
    },
    {
      title: "Net Worth",
      value: "₹42,80,000",
      change: "+15.3%",
      trend: "up",
      icon: Wallet,
      color: "success"
    },
    {
      title: "Credit Score",
      value: "750",
      change: "+25 pts",
      trend: "up",
      icon: Shield,
      color: "primary"
    }
  ]

  const quickActions = [
    { title: "View Transactions", description: "Check your recent bank transactions", icon: CreditCard, path: "/transactions" },
    { title: "Portfolio Analysis", description: "Analyze your investment portfolio", icon: TrendingUp, path: "/portfolio" },
    { title: "Property Valuation", description: "Get your real estate estimates", icon: Building, path: "/real-estate" },
    { title: "Ask AI Assistant", description: "Get financial insights and advice", icon: MessageSquare, path: "/ai-chat" },
  ]

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, User!</h1>
          <p className="text-muted-foreground">Here's your financial overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <Card key={stat.title} className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? 
                        <TrendingUp className="h-4 w-4 text-success" /> : 
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      }
                      <span className={`text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color === "success" ? "bg-success/10" : "bg-primary/10"}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color === "success" ? "text-success" : "text-primary"}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Growth Chart */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Portfolio Growth
              </CardTitle>
              <CardDescription>Your investment performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Portfolio Value']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Monthly Expenses
              </CardTitle>
              <CardDescription>Breakdown of your spending categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most used financial tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <div key={action.title} className="group p-4 rounded-lg border hover:bg-card-hover transition-all duration-300 cursor-pointer card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <action.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant CTA */}
        <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Ready to optimize your finances?</h3>
            <p className="text-primary-foreground/80 mb-6">
              Ask our AI assistant about your spending patterns, investment strategies, or financial goals
            </p>
            <EnhancedButton variant="secondary" size="lg" className="font-semibold">
              Start Conversation
              <ArrowRight className="h-4 w-4" />
            </EnhancedButton>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}