import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Building2,
  MapPin,
  Calculator,
  TrendingUp,
  TrendingDown,
  Home,
  Bed,
  Car,
  TreePine,
  Shield,
  FileText,
  Zap
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PropertyForm {
  location: string
  bhk: string
  sqft: string
  age: string
  paperwork: string
  amenities: string[]
  parking: boolean
  terrace: boolean
}

// Mock property data
const mockProperties = [
  {
    id: 1,
    location: "Whitefield, Bangalore",
    type: "3 BHK Apartment",
    sqft: 1200,
    age: 5,
    estimatedValue: 8500000,
    marketTrend: "up",
    appreciation: 12.5
  },
  {
    id: 2,
    location: "Koramangala, Bangalore",
    type: "2 BHK Apartment", 
    sqft: 900,
    age: 3,
    estimatedValue: 12000000,
    marketTrend: "up",
    appreciation: 8.2
  }
]

const locationPremiums = {
  "whitefield": 5500,
  "koramangala": 8500,
  "indiranagar": 9200,
  "hsr-layout": 7800,
  "electronic-city": 4200,
  "marathahalli": 5800
}

export default function RealEstate() {
  const [propertyForm, setPropertyForm] = useState<PropertyForm>({
    location: "",
    bhk: "",
    sqft: "",
    age: "",
    paperwork: "",
    amenities: [],
    parking: false,
    terrace: false
  })
  const [estimation, setEstimation] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  const calculateEstimate = async () => {
    if (!propertyForm.location || !propertyForm.bhk || !propertyForm.sqft || !propertyForm.age) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      })
      return
    }

    setIsCalculating(true)

    // Simulate API call
    setTimeout(() => {
      const locationKey = propertyForm.location.toLowerCase().replace(/[^a-z]/g, '-')
      const baseRate = locationPremiums[locationKey as keyof typeof locationPremiums] || 5000
      const sqft = parseInt(propertyForm.sqft)
      const age = parseInt(propertyForm.age)
      
      // Base calculation
      let baseValue = baseRate * sqft
      
      // Age depreciation
      const ageDepreciation = Math.min(age * 3, 20) // Max 20% depreciation
      baseValue = baseValue * (1 - ageDepreciation / 100)
      
      // Amenities premium
      let amenityPremium = 0
      if (propertyForm.parking) amenityPremium += 5
      if (propertyForm.terrace) amenityPremium += 8
      if (propertyForm.amenities.includes("gym")) amenityPremium += 3
      if (propertyForm.amenities.includes("pool")) amenityPremium += 7
      
      baseValue = baseValue * (1 + amenityPremium / 100)
      
      // Paperwork bonus
      if (propertyForm.paperwork === "complete") {
        baseValue = baseValue * 1.15 // 15% bonus for complete paperwork
      }
      
      const minValue = baseValue * 0.9
      const maxValue = baseValue * 1.1
      
      setEstimation({
        baseValue,
        minValue,
        maxValue,
        factors: {
          baseRate,
          ageDepreciation,
          amenityPremium,
          paperworkBonus: propertyForm.paperwork === "complete" ? 15 : 0
        }
      })
      
      setIsCalculating(false)
      toast({
        title: "Estimate Calculated",
        description: "Your property valuation is ready",
      })
    }, 2000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const toggleAmenity = (amenity: string) => {
    setPropertyForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-8 bg-gradient-card min-h-full animate-fade-in">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Real Estate Portfolio</h1>
          <p className="text-muted-foreground">Manage and valuate your property investments with AI-powered estimates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Valuation Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Property Valuation Tool
                </CardTitle>
                <CardDescription>
                  Get instant AI-powered estimates for your property value
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={propertyForm.location} onValueChange={(value) => setPropertyForm(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Whitefield, Bangalore">Whitefield, Bangalore</SelectItem>
                        <SelectItem value="Koramangala, Bangalore">Koramangala, Bangalore</SelectItem>
                        <SelectItem value="Indiranagar, Bangalore">Indiranagar, Bangalore</SelectItem>
                        <SelectItem value="HSR Layout, Bangalore">HSR Layout, Bangalore</SelectItem>
                        <SelectItem value="Electronic City, Bangalore">Electronic City, Bangalore</SelectItem>
                        <SelectItem value="Marathahalli, Bangalore">Marathahalli, Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bhk">Property Type</Label>
                    <Select value={propertyForm.bhk} onValueChange={(value) => setPropertyForm(prev => ({ ...prev, bhk: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 BHK</SelectItem>
                        <SelectItem value="2">2 BHK</SelectItem>
                        <SelectItem value="3">3 BHK</SelectItem>
                        <SelectItem value="4">4 BHK</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sqft">Area (Sq Ft)</Label>
                    <Input
                      id="sqft"
                      type="number"
                      placeholder="e.g., 1200"
                      value={propertyForm.sqft}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, sqft: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Property Age (Years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 5"
                      value={propertyForm.age}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, age: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Paperwork Status */}
                <div className="space-y-2">
                  <Label>Paperwork Status</Label>
                  <Select value={propertyForm.paperwork} onValueChange={(value) => setPropertyForm(prev => ({ ...prev, paperwork: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paperwork status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">Complete (All documents clear)</SelectItem>
                      <SelectItem value="partial">Partial (Some pending)</SelectItem>
                      <SelectItem value="pending">Pending (Major documents missing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Label>Amenities & Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "parking", label: "Parking", icon: Car },
                      { id: "terrace", label: "Terrace", icon: Home },
                      { id: "gym", label: "Gym", icon: Zap },
                      { id: "pool", label: "Swimming Pool", icon: TreePine },
                    ].map((amenity) => {
                      const isSelected = amenity.id === "parking" ? propertyForm.parking : 
                                      amenity.id === "terrace" ? propertyForm.terrace : 
                                      propertyForm.amenities.includes(amenity.id)
                      
                      return (
                        <EnhancedButton
                          key={amenity.id}
                          variant={isSelected ? "gradient" : "outline"}
                          size="sm"
                          className="justify-start h-auto p-3"
                          onClick={() => {
                            if (amenity.id === "parking") {
                              setPropertyForm(prev => ({ ...prev, parking: !prev.parking }))
                            } else if (amenity.id === "terrace") {
                              setPropertyForm(prev => ({ ...prev, terrace: !prev.terrace }))
                            } else {
                              toggleAmenity(amenity.id)
                            }
                          }}
                        >
                          <amenity.icon className="h-4 w-4 mr-2" />
                          {amenity.label}
                        </EnhancedButton>
                      )
                    })}
                  </div>
                </div>

                <EnhancedButton 
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                  onClick={calculateEstimate}
                  disabled={isCalculating}
                >
                  {isCalculating ? "Calculating..." : "Get Property Valuation"}
                  <Calculator className="h-5 w-5 ml-2" />
                </EnhancedButton>
              </CardContent>
            </Card>
          </div>

          {/* Estimation Results */}
          <div className="space-y-6">
            {estimation && (
              <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Estimated Value
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    AI-powered property valuation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold mb-2">
                      {formatCurrency(estimation.baseValue)}
                    </p>
                    <p className="text-primary-foreground/80">
                      Range: {formatCurrency(estimation.minValue)} - {formatCurrency(estimation.maxValue)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Base Rate per Sq Ft</span>
                      <span className="font-medium">₹{estimation.factors.baseRate.toLocaleString('en-IN')}</span>
                    </div>
                    {estimation.factors.ageDepreciation > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Age Depreciation</span>
                        <span className="font-medium text-destructive-light">-{estimation.factors.ageDepreciation}%</span>
                      </div>
                    )}
                    {estimation.factors.amenityPremium > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Amenity Premium</span>
                        <span className="font-medium text-success-light">+{estimation.factors.amenityPremium}%</span>
                      </div>
                    )}
                    {estimation.factors.paperworkBonus > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Paperwork Bonus</span>
                        <span className="font-medium text-success-light">+{estimation.factors.paperworkBonus}%</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Market Trends */}
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">Bangalore Real Estate</span>
                    </div>
                    <span className="text-success font-semibold">+8.5%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium">IT Corridor Areas</span>
                    </div>
                    <span className="text-warning font-semibold">High Demand</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Investment Grade</span>
                    </div>
                    <span className="text-primary font-semibold">A+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Existing Properties */}
        <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Your Property Portfolio
            </CardTitle>
            <CardDescription>Overview of your existing real estate investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProperties.map((property) => (
                <div key={property.id} className="p-6 rounded-lg border hover:bg-card-hover transition-all duration-300 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{property.type}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                    </div>
                    <Badge variant={property.marketTrend === "up" ? "default" : "destructive"}>
                      {property.marketTrend === "up" ? "Rising" : "Declining"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-medium">{property.sqft} sq ft</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{property.age} years</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Value</span>
                      <span className="font-bold text-lg">{formatCurrency(property.estimatedValue)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Appreciation</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="font-medium text-success">+{property.appreciation}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
