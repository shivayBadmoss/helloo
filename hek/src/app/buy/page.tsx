'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Shield,
  Lock,
  Zap,
  Loader2,
  Package,
  Calendar,
  Clock
} from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  seller: string
  rating: number
  reviews: number
  features: string[]
}

interface PaymentFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  paymentMethod: 'card' | 'crypto' | 'bank'
}

export default function BuyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('payment')

  const [formData, setFormData] = useState<PaymentFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulate API call to get product details
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock product data
        const mockProduct: Product = {
          id: productId || '1',
          name: 'Advanced Image Classification Model',
          description: 'State-of-the-art CNN model for image classification with 95% accuracy on ImageNet dataset. Perfect for e-commerce, content moderation, and visual search applications.',
          price: 299.99,
          category: 'Computer Vision',
          image: '/api/placeholder/400/300',
          seller: 'AI Research Lab',
          rating: 4.8,
          reviews: 127,
          features: [
            '95% Accuracy on ImageNet',
            'Real-time Processing',
            'Batch Processing Support',
            'API Documentation',
            '24/7 Technical Support',
            'Regular Updates'
          ]
        }
        
        setProduct(mockProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is required'
    }
    if (!formData.city) {
      newErrors.city = 'City is required'
    }
    if (!formData.state) {
      newErrors.state = 'State is required'
    }
    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required'
    }
    if (!formData.country) {
      newErrors.country = 'Country is required'
    }

    // Card validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number'
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required'
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)'
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required'
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV'
      }

      if (!formData.cardName) {
        newErrors.cardName = 'Cardholder name is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Show success message
      setShowSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardName: '',
          paymentMethod: 'card'
        })
        setErrors({})
      }, 2000)
      
    } catch (error) {
      console.error('Payment processing error:', error)
      setErrors({ general: 'Payment failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Product Not Found
          </h3>
          <p className="text-slate-500 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/marketplace')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Purchase Successful!
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Thank you for your purchase! Your order has been confirmed.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span className="font-semibold">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-semibold">ORD-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">
                      {formData.paymentMethod === 'card' ? 'Credit Card' : 
                       formData.paymentMethod === 'crypto' ? 'Cryptocurrency' : 'Bank Transfer'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push('/marketplace')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button variant="outline" onClick={() => router.push('/analytics')}>
                  View Order History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/marketplace')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-slate-600">Complete your purchase securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                    <Package className="h-12 w-12 text-slate-400" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-sm text-slate-500">({product.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span>${product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee:</span>
                        <span>${(product.price * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${(product.price * 1.05).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Features:</h4>
                    {product.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  Your payment information is encrypted and secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <Label>Payment Method</Label>
                    <Tabs value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value as any)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger value="crypto" className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Crypto
                        </TabsTrigger>
                        <TabsTrigger value="bank" className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Bank
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john.doe@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Billing Address</h3>
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="123 Main St"
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="New York"
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="NY"
                          className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="10001"
                          className={errors.zipCode ? 'border-red-500' : ''}
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="JP">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  {/* Card Payment Details */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Card Details</h3>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="John Doe"
                          className={errors.cardName ? 'border-red-500' : ''}
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={errors.cardNumber ? 'border-red-500' : ''}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={errors.expiryDate ? 'border-red-500' : ''}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className={errors.cvv ? 'border-red-500' : ''}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Crypto Payment */}
                  {formData.paymentMethod === 'crypto' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Cryptocurrency Payment</h3>
                      <Alert>
                        <Zap className="h-4 w-4" />
                        <AlertDescription>
                          Send cryptocurrency to the provided address. Your order will be confirmed once the transaction is verified.
                        </AlertDescription>
                      </Alert>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Payment Address:</p>
                        <code className="text-sm bg-white p-2 rounded border block">
                          0x742d35Cc6634C0532925a3b8D4C9db96c4b4d8b
                        </code>
                        <p className="text-sm text-slate-600 mt-2">
                          Network: Ethereum (ERC-20)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {formData.paymentMethod === 'bank' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Bank Transfer</h3>
                      <Alert>
                        <Building className="h-4 w-4" />
                        <AlertDescription>
                          Please transfer the amount to our bank account and include your order ID in the reference.
                        </AlertDescription>
                      </Alert>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Account Name:</span>
                            <span className="font-semibold">FederAI Chain Inc.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account Number:</span>
                            <span className="font-semibold">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Routing Number:</span>
                            <span className="font-semibold">021000021</span>
                          </div>
                          <div className="flex justify-between">
                            <span>SWIFT:</span>
                            <span className="font-semibold">FAIDUS33</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* General Error */}
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Shield className="h-4 w-4" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isProcessing}
                      className="min-w-[150px]"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Complete Purchase
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}