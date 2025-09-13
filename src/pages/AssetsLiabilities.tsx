import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Home,
  Car,
  Coins,
  Building2,
  Target,
  AlertTriangle,
  Plus,
  Minus,
  Calculator
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

// Mock data for assets and liabilities
const assetsData = [
  { category: "Investments", amount: 1720000, subcategories: [
    { name: "Mutual Funds", amount: 850000, returns: 12.5 },
    { name: "Stocks", amount: 650000, returns: 15.2 },
    { name: "PPF", amount: 120000, returns: 7.1 },
    { name: "FD", amount: 100000, returns: 6.5 }
  ]},
  { category: "Real Estate", amount: 8500000, subcategories: [
    { name: "Primary Residence", amount: 6500000, appreciation: 8.2 },
    { name: "Investment Property", amount: 2000000, appreciation: 10.5 }
  ]},
  { category: "Cash & Bank", amount: 245000, subcategories: [
    { name: "Savings Account", amount: 180000 },
    { name: "Current Account", amount: 35000 },
    { name: "Cash", amount: 30000 }
  ]},
  { category: "Gold & Precious Metals", amount: 485000, subcategories: [
    { name: "Physical Gold", amount: 350000 },
    { name: "Gold ETF", amount: 135000 }
  ]},
  { category: "Vehicles", amount: 850000, subcategories: [
    { name: "Car", amount: 650000, depreciation: -8.5 },
    { name: "Motorcycle", amount: 200000, depreciation: -12.0 }
  ]},
  { category: "Others", amount: 150000, subcategories: [
    { name: "Insurance (Cash Value)", amount: 80000 },
    { name: "Electronics", amount: 70000 }
  ]}
]

const liabilitiesData = [
  { category: "Home Loan", amount: 2850000, details: {
    originalAmount: 4500000,
    interestRate: 8.5,
    tenure: 20,
    monthlyEMI: 38500,
    remainingYears: 12.5
  }},
  { category: "Personal Loan", amount: 280000, details: {
    originalAmount: 500000,
    interestRate: 11.5,
    tenure: 5,
    monthlyEMI: 11200,
    remainingYears: 2.1
  }},
  { category: "Credit Cards", amount: 125000, details: [
    { bank: "HDFC", amount: 85000, limit: 250000, interestRate: 36 },
    { bank: "ICICI", amount: 40000, limit: 150000, interestRate: 42 }
  ]},
  { category: "Car Loan", amount: 165000, details: {
    originalAmount: 450000,
    interestRate: 9.5,
    tenure: 7,
    monthlyEMI: 7800,
    remainingYears: 2.8
  }}
]

// Chart data
const netWorthTrend = [
  { month: "Jan", assets: 11500000, liabilities: 3600000, netWorth: 7900000 },
  { month: "Feb", assets: 11750000, liabilities: 3550000, netWorth: 8200000 },
  { month: "Mar", assets: 11200000, liabilities: 3500000, netWorth: 7700000 },
  { month: "Apr", assets: 11850000, liabilities: 3450000, netWorth: 8400000 },
  { month: "May", assets: 12200000, liabilities: 3400000, netWorth: 8800000 },
  { month: "Jun", assets: 11950000, liabilities: 3420000, netWorth: 8530000 }
]

const assetAllocation = [
  { name: "Real Estate", value: 71.1, amount: 8500000, color: "#3B82F6" },
  { name: "Investments", value: 14.4, amount: 1720000, color: "#10B981" },
  { name: "Vehicles", value: 7.1, amount: 850000, color: "#F59E0B" },
  { name: "Gold", value: 4.1, amount: 485000, color: "#EF4444" },
  { name: "Cash", value: 2.1, amount: 245000, color: "#8B5CF6" },
  { name: "Others", value: 1.3, amount: 150000, color: "#6B7280" }
]

export default function AssetsLiabilities() {
  const totalAssets = assetsData.reduce((sum, asset) => sum + asset.amount, 0)
  const totalLiabilities = liabilitiesData.reduce((sum, liability) => sum + liability.amount, 0)
  const netWorth = totalAssets - totalLiabilities
  const debtToAssetRatio = (totalLiabilities / totalAssets) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "investments": return TrendingUp
      case "real estate": return Home
      case "vehicles": return Car
      case "gold & precious metals": return Coins
      case "cash & bank": return Wallet
      case "home loan": return Home
      case "car loan": return Car
      case "personal loan": return CreditCard
      case "credit cards": return CreditCard
      default: return Building2
    }
  }

  const getHealthColor = (ratio: number) => {
    if (ratio <= 30) return "success"
    if (ratio <= 50) return "warning" 
    return "destructive"
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Assets & Liabilities</h1>
          <p className="text-muted-foreground">Complete overview of your financial position and net worth</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalAssets)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">+8.2%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <Plus className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(totalLiabilities)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">-5.1%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <Minus className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-card bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/80">Net Worth</p>
                  <p className="text-2xl font-bold">{formatCurrency(netWorth)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+15.3%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary-foreground/10">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Debt Ratio</p>
                  <p className="text-2xl font-bold text-foreground">{debtToAssetRatio.toFixed(1)}%</p>
                  <Badge variant={debtToAssetRatio <= 30 ? "default" : debtToAssetRatio <= 50 ? "secondary" : "destructive"} className="mt-1">
                    {debtToAssetRatio <= 30 ? "Healthy" : debtToAssetRatio <= 50 ? "Moderate" : "High Risk"}
                  </Badge>
                </div>
                <div className={`p-3 rounded-lg ${getHealthColor(debtToAssetRatio) === "success" ? "bg-success/10" : 
                  getHealthColor(debtToAssetRatio) === "warning" ? "bg-warning/10" : "bg-destructive/10"}`}>
                  <Calculator className={`h-6 w-6 ${getHealthColor(debtToAssetRatio) === "success" ? "text-success" : 
                    getHealthColor(debtToAssetRatio) === "warning" ? "text-warning" : "text-destructive"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Net Worth Trend */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Net Worth Trend
              </CardTitle>
              <CardDescription>Assets vs Liabilities over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={netWorthTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${Number(value).toLocaleString('en-IN')}`, 
                      name === 'assets' ? 'Assets' : name === 'liabilities' ? 'Liabilities' : 'Net Worth']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="assets" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="liabilities" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="netWorth" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Asset Allocation
              </CardTitle>
              <CardDescription>Distribution of your total assets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}%`, `${formatCurrency(props.payload.amount)}`]}
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

        {/* Detailed Assets and Liabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assets Breakdown */}
          <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-success" />
                Assets Breakdown
              </CardTitle>
              <CardDescription>Detailed view of all your assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {assetsData.map((category) => {
                const Icon = getCategoryIcon(category.category)
                const percentage = (category.amount / totalAssets) * 100
                
                return (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-success/10">
                          <Icon className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{category.category}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total assets</p>
                        </div>
                      </div>
                      <span className="font-bold text-lg">{formatCurrency(category.amount)}</span>
                    </div>
                    
                    <div className="ml-10 space-y-2">
                      {category.subcategories.map((sub, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                          <span className="text-sm text-muted-foreground">{sub.name}</span>
                          <div className="text-right">
                            <span className="text-sm font-medium">{formatCurrency(sub.amount)}</span>
                            {('returns' in sub || 'appreciation' in sub || 'depreciation' in sub) && (
                              <div className="text-xs">
                                {'returns' in sub && (
                                  <span className="text-success">+{sub.returns}%</span>
                                )}
                                {'appreciation' in sub && (
                                  <span className="text-success">+{sub.appreciation}%</span>
                                )}
                                {'depreciation' in sub && (
                                  <span className="text-destructive">{sub.depreciation}%</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Liabilities Breakdown */}
          <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Minus className="h-5 w-5 text-destructive" />
                Liabilities Breakdown
              </CardTitle>
              <CardDescription>Detailed view of all your debts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {liabilitiesData.map((liability) => {
                const Icon = getCategoryIcon(liability.category)
                const percentage = (liability.amount / totalLiabilities) * 100
                
                return (
                  <div key={liability.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/10">
                          <Icon className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{liability.category}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total debt</p>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-destructive">{formatCurrency(liability.amount)}</span>
                    </div>
                    
                    {liability.category !== "Credit Cards" && 'interestRate' in liability.details && (
                      <div className="ml-10 p-3 rounded-lg bg-muted/30">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Interest Rate:</span>
                            <span className="font-medium ml-2">{liability.details.interestRate}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Monthly EMI:</span>
                            <span className="font-medium ml-2">₹{liability.details.monthlyEMI?.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Remaining Years:</span>
                            <span className="font-medium ml-2">{liability.details.remainingYears}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Progress:</span>
                            <Progress 
                              value={((liability.details.originalAmount! - liability.amount) / liability.details.originalAmount!) * 100} 
                              className="mt-1 h-2" 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {liability.category === "Credit Cards" && Array.isArray(liability.details) && (
                      <div className="ml-10 space-y-2">
                        {liability.details.map((card, index) => (
                          <div key={index} className="p-3 rounded-lg bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{card.bank} Card</span>
                              <Badge variant="outline">{((card.amount / card.limit) * 100).toFixed(0)}% utilized</Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Outstanding:</span>
                                <span className="font-medium">₹{card.amount.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Limit:</span>
                                <span className="font-medium">₹{card.limit.toLocaleString('en-IN')}</span>
                              </div>
                              <Progress value={(card.amount / card.limit) * 100} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Financial Health Summary */}
        <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Financial Health Summary
            </CardTitle>
            <CardDescription>Key insights and recommendations for your financial portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-success">Strong Asset Base</p>
                    <p className="text-sm text-muted-foreground">Diversified portfolio</p>
                  </div>
                </div>
                <p className="text-sm">Your asset allocation shows good diversification with a strong real estate foundation and growing investment portfolio.</p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getHealthColor(debtToAssetRatio) === "success" ? "bg-success/10" : "bg-warning/10"}`}>
                    <Calculator className={`h-5 w-5 ${getHealthColor(debtToAssetRatio) === "success" ? "text-success" : "text-warning"}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${getHealthColor(debtToAssetRatio) === "success" ? "text-success" : "text-warning"}`}>
                      Debt Management
                    </p>
                    <p className="text-sm text-muted-foreground">{debtToAssetRatio.toFixed(1)}% debt ratio</p>
                  </div>
                </div>
                <p className="text-sm">
                  {debtToAssetRatio <= 30 
                    ? "Your debt levels are well managed and within healthy limits."
                    : "Consider strategies to reduce debt burden for better financial health."
                  }
                </p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Growth Potential</p>
                    <p className="text-sm text-muted-foreground">15.3% net worth growth</p>
                  </div>
                </div>
                <p className="text-sm">Excellent growth trajectory. Consider increasing investment allocations for long-term wealth building.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}