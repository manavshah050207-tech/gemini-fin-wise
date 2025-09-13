import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Shield, TrendingUp, CreditCard, Building, Wallet, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const permissions = [
  { id: "transactions", label: "Bank Transactions", icon: CreditCard, description: "View your transaction history and spending patterns" },
  { id: "portfolio", label: "Demat Portfolio", icon: TrendingUp, description: "Access your stock investments and portfolio analytics" },
  { id: "realestate", label: "Real Estate", icon: Building, description: "Property valuations and real estate insights" },
  { id: "epf", label: "EPF Balance", icon: Shield, description: "Employee Provident Fund balance and growth" },
  { id: "credit", label: "Credit Score", icon: Shield, description: "Credit score monitoring and improvement tips" },
  { id: "assets", label: "Assets & Liabilities", icon: Wallet, description: "Complete financial overview and net worth" },
]

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setShowOTP(true)
      setLoading(false)
      toast({
        title: "OTP Sent Successfully",
        description: "Use 123456 as the verification code",
      })
    }, 1500)
  }

  const handleVerifyOTP = async () => {
    if (otp !== "123456") {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP (123456)",
        variant: "destructive"
      })
      return
    }

    if (selectedPermissions.length === 0) {
      toast({
        title: "Permissions Required",
        description: "Please grant at least one permission to continue",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem("financeai_auth", "true")
      localStorage.setItem("financeai_permissions", JSON.stringify(selectedPermissions))
      setLoading(false)
      toast({
        title: "Login Successful",
        description: "Welcome to your Personal Finance Assistant",
      })
      navigate("/dashboard")
    }, 1500)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">FinanceAI Login</CardTitle>
              <CardDescription className="text-muted-foreground">
                Secure access to your personal finance assistant
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showOTP ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength={10}
                  />
                </div>
                
                <EnhancedButton 
                  variant="gradient" 
                  className="w-full" 
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </EnhancedButton>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo OTP: <span className="font-mono font-semibold">123456</span>
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Grant Permissions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose which financial data the AI can access to provide personalized insights
                  </p>

                  <div className="space-y-3">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-card-hover transition-colors">
                        <Checkbox
                          id={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <permission.icon className="h-4 w-4 text-primary" />
                            <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                              {permission.label}
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <EnhancedButton 
                  variant="gradient" 
                  className="w-full" 
                  onClick={handleVerifyOTP}
                  disabled={loading || selectedPermissions.length === 0}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </EnhancedButton>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}