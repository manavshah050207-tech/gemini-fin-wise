import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  PieChart,
  BarChart3,
  RefreshCw,
  Download,
  Eye,
  Percent
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"

// Mock portfolio data
const portfolioData = [
  { symbol: "TCS", name: "Tata Consultancy Services", qty: 50, avgPrice: 3200, currentPrice: 3450, sector: "IT", marketCap: "12.5L Cr" },
  { symbol: "RELIANCE", name: "Reliance Industries", qty: 25, avgPrice: 2400, currentPrice: 2650, sector: "Energy", marketCap: "17.9L Cr" },
  { symbol: "INFY", name: "Infosys Limited", qty: 40, avgPrice: 1500, currentPrice: 1620, sector: "IT", marketCap: "6.8L Cr" },
  { symbol: "HDFC", name: "HDFC Bank", qty: 30, avgPrice: 1600, currentPrice: 1580, sector: "Banking", marketCap: "8.9L Cr" },
  { symbol: "ITC", name: "ITC Limited", qty: 100, avgPrice: 420, currentPrice: 445, sector: "FMCG", marketCap: "5.5L Cr" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", qty: 60, avgPrice: 850, currentPrice: 920, sector: "Telecom", marketCap: "5.2L Cr" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", qty: 35, avgPrice: 1800, currentPrice: 1750, sector: "Banking", marketCap: "3.5L Cr" },
  { symbol: "HCLTECH", name: "HCL Technologies", qty: 45, avgPrice: 1200, currentPrice: 1280, sector: "IT", marketCap: "3.5L Cr" },
]

// Performance data
const performanceData = [
  { month: "Jan", value: 1200000 },
  { month: "Feb", value: 1350000 },
  { month: "Mar", value: 1280000 },
  { month: "Apr", value: 1450000 },
  { month: "May", value: 1580000 },
  { month: "Jun", value: 1720000 },
]

// Sector allocation
const sectorData = [
  { sector: "IT", value: 45, color: "#3B82F6" },
  { sector: "Banking", value: 25, color: "#10B981" },
  { sector: "Energy", value: 15, color: "#F59E0B" },
  { sector: "FMCG", value: 8, color: "#EF4444" },
  { sector: "Telecom", value: 7, color: "#8B5CF6" },
]

export default function Portfolio() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6M")
  const [isLiveUpdating, setIsLiveUpdating] = useState(true)

  // Calculate portfolio metrics
  const totalInvested = portfolioData.reduce((sum, stock) => sum + (stock.qty * stock.avgPrice), 0)
  const currentValue = portfolioData.reduce((sum, stock) => sum + (stock.qty * stock.currentPrice), 0)
  const totalGainLoss = currentValue - totalInvested
  const gainLossPercentage = ((totalGainLoss / totalInvested) * 100)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const calculateStockPL = (stock: any) => {
    const invested = stock.qty * stock.avgPrice
    const current = stock.qty * stock.currentPrice
    const pl = current - invested
    const plPercentage = ((pl / invested) * 100)
    return { pl, plPercentage, invested, current }
  }

  // Simulate live price updates
  useEffect(() => {
    if (!isLiveUpdating) return

    const interval = setInterval(() => {
      // Simulate small price changes
      portfolioData.forEach(stock => {
        const change = (Math.random() - 0.5) * 20 // Random change between -10 to +10
        stock.currentPrice = Math.max(stock.currentPrice + change, stock.currentPrice * 0.95) // Minimum 5% below current
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isLiveUpdating])

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
              <p className="text-muted-foreground">Track your stock investments and portfolio performance</p>
            </div>
            <div className="flex gap-3">
              <EnhancedButton 
                variant={isLiveUpdating ? "success" : "outline"} 
                size="sm"
                onClick={() => setIsLiveUpdating(!isLiveUpdating)}
              >
                <Zap className="h-4 w-4" />
                {isLiveUpdating ? "Live" : "Paused"}
              </EnhancedButton>
              <EnhancedButton variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Report
              </EnhancedButton>
              <EnhancedButton variant="gradient" size="sm">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </EnhancedButton>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totalInvested)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Principal amount</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Value</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(currentValue)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Market value</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10">
                    <BarChart3 className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total P&L</p>
                    <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {totalGainLoss >= 0 ? 
                        <TrendingUp className="h-4 w-4 text-success" /> : 
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      }
                      <span className={`text-sm font-medium ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {gainLossPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${totalGainLoss >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {totalGainLoss >= 0 ? 
                      <TrendingUp className="h-6 w-6 text-success" /> : 
                      <TrendingDown className="h-6 w-6 text-destructive" />
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Holdings</p>
                    <p className="text-2xl font-bold text-foreground">{portfolioData.length}</p>
                    <p className="text-sm text-muted-foreground mt-1">Active stocks</p>
                  </div>
                  <div className="p-3 rounded-lg bg-warning/10">
                    <PieChart className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Performance Chart */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>Growth over the last 6 months</CardDescription>
                </div>
                <div className="flex gap-2">
                  {["1M", "3M", "6M", "1Y"].map((period) => (
                    <EnhancedButton
                      key={period}
                      variant={selectedTimeframe === period ? "gradient" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeframe(period)}
                    >
                      {period}
                    </EnhancedButton>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Portfolio Value']}
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

          {/* Sector Allocation */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Sector Allocation
              </CardTitle>
              <CardDescription>Portfolio distribution by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, value }) => `${sector} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Stock Holdings</CardTitle>
            <CardDescription>Detailed view of your investment portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Stock</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Qty</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Avg Price</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Current Price</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Invested</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Current Value</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">P&L</th>
                    <th className="text-center py-3 px-2 font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.map((stock) => {
                    const { pl, plPercentage, invested, current } = calculateStockPL(stock)
                    return (
                      <tr key={stock.symbol} className="border-b border-border/50 hover:bg-card-hover transition-colors group">
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {stock.symbol}
                            </p>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {stock.sector}
                            </Badge>
                          </div>
                        </td>
                        <td className="text-right py-4 px-2 font-medium">{stock.qty}</td>
                        <td className="text-right py-4 px-2">₹{stock.avgPrice.toLocaleString('en-IN')}</td>
                        <td className="text-right py-4 px-2 font-medium">
                          <div className="flex items-center justify-end gap-1">
                            ₹{stock.currentPrice.toLocaleString('en-IN')}
                            {isLiveUpdating && <div className="w-2 h-2 bg-success rounded-full animate-pulse" />}
                          </div>
                        </td>
                        <td className="text-right py-4 px-2">{formatCurrency(invested)}</td>
                        <td className="text-right py-4 px-2 font-medium">{formatCurrency(current)}</td>
                        <td className="text-right py-4 px-2">
                          <div className={`font-bold ${pl >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {pl >= 0 ? '+' : ''}{formatCurrency(pl)}
                            <div className="text-xs">
                              ({pl >= 0 ? '+' : ''}{plPercentage.toFixed(2)}%)
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <EnhancedButton variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </EnhancedButton>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}