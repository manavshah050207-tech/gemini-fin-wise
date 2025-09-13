import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Shield,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Award,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// Mock EPF data
const epfData = {
  currentBalance: 550000,
  employerContribution: 185000,
  employeeContribution: 185000,
  interestAccrued: 180000,
  monthlyContribution: 12000,
  interestRate: 8.15,
  yearsOfService: 8.5,
  projectedRetirement: 1850000
}

// Mock credit score data
const creditData = {
  score: 750,
  rating: "Excellent",
  lastUpdated: "2024-01-15",
  factors: [
    { factor: "Payment History", impact: "Positive", weight: 35, status: "excellent" },
    { factor: "Credit Utilization", impact: "Good", weight: 30, status: "good" },
    { factor: "Length of Credit History", impact: "Good", weight: 15, status: "good" },
    { factor: "Credit Mix", impact: "Fair", weight: 10, status: "fair" },
    { factor: "New Credit", impact: "Good", weight: 10, status: "good" }
  ],
  recommendations: [
    "Maintain low credit utilization ratio below 30%",
    "Continue making all payments on time",
    "Avoid applying for new credit frequently"
  ]
}

export default function EPFCredit() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getScoreColor = (score: number) => {
    if (score >= 750) return "hsl(var(--success))"
    if (score >= 650) return "hsl(var(--warning))"
    return "hsl(var(--destructive))"
  }

  const getFactorColor = (status: string) => {
    switch (status) {
      case "excellent": return "success"
      case "good": return "primary" 
      case "fair": return "warning"
      default: return "destructive"
    }
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">EPF & Credit Profile</h1>
          <p className="text-muted-foreground">Monitor your retirement savings and credit health</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EPF Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Employee Provident Fund
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Your retirement savings overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold mb-2">{formatCurrency(epfData.currentBalance)}</p>
                    <p className="text-primary-foreground/80">Current EPF Balance</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-foreground/10 p-4 rounded-lg">
                      <p className="text-sm text-primary-foreground/80">Monthly Contribution</p>
                      <p className="text-xl font-bold">{formatCurrency(epfData.monthlyContribution)}</p>
                    </div>
                    <div className="bg-primary-foreground/10 p-4 rounded-lg">
                      <p className="text-sm text-primary-foreground/80">Interest Rate</p>
                      <p className="text-xl font-bold">{epfData.interestRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EPF Breakdown */}
            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  EPF Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium">Employee Contribution</p>
                        <p className="text-sm text-muted-foreground">Your monthly deposits</p>
                      </div>
                    </div>
                    <span className="font-bold">{formatCurrency(epfData.employeeContribution)}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <div>
                        <p className="font-medium">Employer Contribution</p>
                        <p className="text-sm text-muted-foreground">Company matching</p>
                      </div>
                    </div>
                    <span className="font-bold">{formatCurrency(epfData.employerContribution)}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div>
                        <p className="font-medium">Interest Accrued</p>
                        <p className="text-sm text-muted-foreground">Compound growth</p>
                      </div>
                    </div>
                    <span className="font-bold">{formatCurrency(epfData.interestAccrued)}</span>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Projected at Retirement</span>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-2xl font-bold text-success">{formatCurrency(epfData.projectedRetirement)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on current contribution rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credit Score Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Credit Score
                </CardTitle>
                <CardDescription>
                  Last updated: {new Date(creditData.lastUpdated).toLocaleDateString('en-IN')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <CircularProgressbar
                      value={(creditData.score / 850) * 100}
                      text={creditData.score.toString()}
                      styles={buildStyles({
                        pathColor: getScoreColor(creditData.score),
                        textColor: 'hsl(var(--foreground))',
                        trailColor: 'hsl(var(--muted))',
                        textSize: '20px',
                        pathTransitionDuration: 2,
                      })}
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <Badge 
                        variant={creditData.score >= 750 ? "default" : creditData.score >= 650 ? "secondary" : "destructive"}
                        className="font-semibold"
                      >
                        {creditData.rating}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Poor</span>
                    <span className="text-muted-foreground">Fair</span>
                    <span className="text-muted-foreground">Good</span>
                    <span className="text-muted-foreground">Excellent</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 h-2 bg-destructive rounded-l"></div>
                    <div className="flex-1 h-2 bg-warning"></div>
                    <div className="flex-1 h-2 bg-primary"></div>
                    <div className="flex-1 h-2 bg-success rounded-r"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>300</span>
                    <span>550</span>
                    <span>700</span>
                    <span>850</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Factors */}
            <Card className="card-hover border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Credit Factors
                </CardTitle>
                <CardDescription>Breakdown of factors affecting your credit score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditData.factors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{factor.factor}</span>
                      <Badge 
                        variant={factor.status === 'excellent' ? "default" : factor.status === 'good' ? "secondary" : factor.status === 'fair' ? "outline" : "destructive"}
                        size="sm"
                      >
                        {factor.impact}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{factor.weight}%</span>
                    </div>
                    <Progress 
                      value={factor.weight * (factor.status === 'excellent' ? 10 : factor.status === 'good' ? 8 : factor.status === 'fair' ? 6 : 4)} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* EPF Tips */}
          <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                EPF Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Maximize VPF Contribution</p>
                    <p className="text-sm text-muted-foreground">Consider Voluntary Provident Fund for additional tax benefits</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Track Annual Statement</p>
                    <p className="text-sm text-muted-foreground">Verify contributions and interest credits annually</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Withdrawal Strategy</p>
                    <p className="text-sm text-muted-foreground">Plan partial withdrawals for major expenses wisely</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Recommendations */}
          <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Credit Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {creditData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-card-hover transition-colors">
                    <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}

                <div className="mt-4 p-3 rounded-lg bg-primary/10">
                  <p className="font-medium text-primary mb-1">Next Milestone</p>
                  <p className="text-sm text-muted-foreground">
                    Increase score to 800+ for premium loan rates
                  </p>
                  <Progress value={75} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}