import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar,
  Filter,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  Utensils,
  Car,
  ShoppingBag,
  Zap
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock transaction data
const transactions = [
  { id: "T001", date: "2024-01-15", description: "Salary Credit", amount: 120000, type: "credit", category: "Salary", balance: 245000 },
  { id: "T002", date: "2024-01-14", description: "Rent Payment", amount: -25000, type: "debit", category: "Housing", balance: 125000 },
  { id: "T003", date: "2024-01-13", description: "Grocery Shopping", amount: -3500, type: "debit", category: "Food", balance: 150000 },
  { id: "T004", date: "2024-01-12", description: "Uber Payment", amount: -450, type: "debit", category: "Transport", balance: 153500 },
  { id: "T005", date: "2024-01-11", description: "Shopping Mall", amount: -8500, type: "debit", category: "Shopping", balance: 153950 },
  { id: "T006", date: "2024-01-10", description: "Electricity Bill", amount: -2200, type: "debit", category: "Utilities", balance: 162450 },
  { id: "T007", date: "2024-01-09", description: "Restaurant", amount: -1800, type: "debit", category: "Food", balance: 164650 },
  { id: "T008", date: "2024-01-08", description: "Mutual Fund SIP", amount: -10000, type: "debit", category: "Investment", balance: 166450 },
]

// Monthly spending data
const monthlyData = [
  { month: "Jan", income: 120000, expense: 45000 },
  { month: "Feb", income: 120000, expense: 42000 },
  { month: "Mar", income: 120000, expense: 48000 },
  { month: "Apr", income: 125000, expense: 44000 },
  { month: "May", income: 125000, expense: 46000 },
  { month: "Jun", income: 125000, expense: 43000 },
]

const categoryIcons = {
  Salary: CreditCard,
  Housing: Building2,
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Utilities: Zap,
  Investment: TrendingUp,
}

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const totalCredit = transactions.filter(t => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)
  const totalDebit = transactions.filter(t => t.type === "debit").reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const netBalance = totalCredit - totalDebit

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons] || CreditCard
    return Icon
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bank Transactions</h1>
              <p className="text-muted-foreground">Track your income and expenses with detailed insights</p>
            </div>
            <div className="flex gap-3">
              <EnhancedButton variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Export
              </EnhancedButton>
              <EnhancedButton variant="gradient" size="sm">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </EnhancedButton>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                    <p className="text-2xl font-bold text-success">{formatCurrency(totalCredit)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">+8.2%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Debits</p>
                    <p className="text-2xl font-bold text-destructive">{formatCurrency(totalDebit)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowDownLeft className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">+5.1%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <TrendingDown className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(netBalance)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">+12.8%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense Chart */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Income vs Expenses
              </CardTitle>
              <CardDescription>Monthly comparison over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${Number(value).toLocaleString('en-IN')}`, name === 'income' ? 'Income' : 'Expenses']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cash Flow Trend */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Cash Flow Trend
              </CardTitle>
              <CardDescription>Daily balance movement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transactions.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Balance']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Transaction List */}
        <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Detailed view of all your transactions</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const Icon = getCategoryIcon(transaction.category)
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-card-hover transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-success/10' : 'bg-muted'}`}>
                        <Icon className={`h-5 w-5 ${transaction.type === 'credit' ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('en-IN')}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${transaction.type === 'credit' ? 'text-success' : 'text-destructive'}`}>
                        {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Balance: {formatCurrency(transaction.balance)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}