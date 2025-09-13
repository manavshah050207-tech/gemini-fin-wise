import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  TrendingUp,
  Building,
  Wallet,
  MessageSquare
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  pan: string
  aadhar: string
}

interface NotificationSettings {
  emailAlerts: boolean
  smsAlerts: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  monthlyStatements: boolean
  priceAlerts: boolean
  aiInsights: boolean
}

interface PrivacySettings {
  shareAnalytics: boolean
  personalizedAds: boolean
  dataRetention: boolean
  thirdPartySharing: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  biometricLogin: boolean
  sessionTimeout: number
  loginNotifications: boolean
}

const permissions = [
  { id: "transactions", label: "Bank Transactions", icon: CreditCard, description: "Access to view your transaction history and spending patterns", enabled: true },
  { id: "portfolio", label: "Demat Portfolio", icon: TrendingUp, description: "Access to your stock investments and portfolio analytics", enabled: true },
  { id: "realestate", label: "Real Estate", icon: Building, description: "Property valuations and real estate insights", enabled: false },
  { id: "epf", label: "EPF Balance", icon: Shield, description: "Employee Provident Fund balance and growth tracking", enabled: true },
  { id: "credit", label: "Credit Score", icon: Shield, description: "Credit score monitoring and improvement suggestions", enabled: true },
  { id: "assets", label: "Assets & Liabilities", icon: Wallet, description: "Complete financial overview and net worth calculations", enabled: true },
  { id: "ai", label: "AI Insights", icon: MessageSquare, description: "AI-powered financial advice and personalized recommendations", enabled: true },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@email.com", 
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    pan: "ABCDE1234F",
    aadhar: "****-****-1234"
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyStatements: true,
    priceAlerts: false,
    aiInsights: true
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    shareAnalytics: false,
    personalizedAds: false,
    dataRetention: true,
    thirdPartySharing: false
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    biometricLogin: false,
    sessionTimeout: 30,
    loginNotifications: true
  })

  const [permissionsState, setPermissionsState] = useState(
    permissions.reduce((acc, perm) => ({ ...acc, [perm.id]: perm.enabled }), {})
  )

  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    })
  }

  const handleTogglePermission = (permissionId: string) => {
    setPermissionsState(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId as keyof typeof prev]
    }))
    
    toast({
      title: "Permission Updated",
      description: `${permissions.find(p => p.id === permissionId)?.label} access has been ${permissionsState[permissionId as keyof typeof permissionsState] ? 'disabled' : 'enabled'}`,
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be emailed to you within 24 hours",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please contact support to complete account deletion",
      variant: "destructive"
    })
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "permissions", label: "Data Permissions", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "account", label: "Account", icon: SettingsIcon },
  ]

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 border-0 shadow-card bg-card/50 backdrop-blur-sm h-fit">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <EnhancedButton
                    key={tab.id}
                    variant={activeTab === tab.id ? "gradient" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </EnhancedButton>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={userProfile.dateOfBirth}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan">PAN Number</Label>
                      <Input
                        id="pan"
                        value={userProfile.pan}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, pan: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhar Number</Label>
                      <Input
                        id="aadhar"
                        value={userProfile.aadhar}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <EnhancedButton variant="gradient" onClick={handleSaveProfile}>
                    Save Changes
                  </EnhancedButton>
                </CardContent>
              </Card>
            )}

            {/* Permissions Tab */}
            {activeTab === "permissions" && (
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Data Access Permissions
                  </CardTitle>
                  <CardDescription>Control which financial data the AI assistant can access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-card-hover transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <permission.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                              {permission.label}
                            </Label>
                            <Badge variant={permissionsState[permission.id as keyof typeof permissionsState] ? "default" : "outline"}>
                              {permissionsState[permission.id as keyof typeof permissionsState] ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id={permission.id}
                        checked={permissionsState[permission.id as keyof typeof permissionsState]}
                        onCheckedChange={() => handleTogglePermission(permission.id)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to receive updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Communication Channels</h4>
                    {[
                      { key: "emailAlerts", label: "Email Alerts", icon: "📧" },
                      { key: "smsAlerts", label: "SMS Alerts", icon: "📱" },
                      { key: "pushNotifications", label: "Push Notifications", icon: "🔔" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <Label className="font-medium">{item.label}</Label>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof NotificationSettings]}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Report Types</h4>
                    {[
                      { key: "weeklyReports", label: "Weekly Financial Summary", icon: "📊" },
                      { key: "monthlyStatements", label: "Monthly Statements", icon: "📄" },
                      { key: "priceAlerts", label: "Stock Price Alerts", icon: "📈" },
                      { key: "aiInsights", label: "AI Financial Insights", icon: "🤖" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <Label className="font-medium">{item.label}</Label>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof NotificationSettings]}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={security.twoFactorAuth ? "default" : "outline"}>
                          {security.twoFactorAuth ? "Enabled" : "Disabled"}
                        </Badge>
                        <Switch
                          checked={security.twoFactorAuth}
                          onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Biometric Login</p>
                        <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
                      </div>
                      <Switch
                        checked={security.biometricLogin}
                        onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, biometricLogin: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Login Notifications</p>
                        <p className="text-sm text-muted-foreground">Get alerted when someone logs into your account</p>
                      </div>
                      <Switch
                        checked={security.loginNotifications}
                        onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginNotifications: checked }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Password & Sessions</h4>
                    
                    <div className="space-y-3">
                      <Label>Change Password</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="New password"
                          />
                          <EnhancedButton
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </EnhancedButton>
                        </div>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <EnhancedButton variant="outline" size="sm">
                        Update Password
                      </EnhancedButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Privacy Controls
                  </CardTitle>
                  <CardDescription>Control how your data is used and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { 
                      key: "shareAnalytics", 
                      label: "Share Usage Analytics", 
                      description: "Help improve our services by sharing anonymous usage data",
                      icon: "📊"
                    },
                    { 
                      key: "personalizedAds", 
                      label: "Personalized Advertisements", 
                      description: "Receive targeted financial product recommendations",
                      icon: "🎯"
                    },
                    { 
                      key: "dataRetention", 
                      label: "Extended Data Retention", 
                      description: "Keep your financial history for advanced analytics",
                      icon: "🗃️"
                    },
                    { 
                      key: "thirdPartySharing", 
                      label: "Third-party Data Sharing", 
                      description: "Share data with partner financial institutions",
                      icon: "🤝"
                    },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy[item.key as keyof PrivacySettings]}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      Data Export
                    </CardTitle>
                    <CardDescription>Download all your financial data and AI insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Export Personal Data</p>
                        <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
                      </div>
                      <EnhancedButton variant="outline" onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </EnhancedButton>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm border-destructive/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible actions that affect your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-destructive">Delete Account</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Permanently remove your account and all associated data. This action cannot be undone.
                            </p>
                          </div>
                          <EnhancedButton variant="destructive" onClick={handleDeleteAccount}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </EnhancedButton>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}