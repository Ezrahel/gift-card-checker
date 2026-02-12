import { Card } from '@/components/ui/card'
import { Shield, Zap, Globe, Lock, CheckCircle2, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get verification results in seconds with our advanced API technology.',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'Military-grade encryption protects your personal information.',
  },
  {
    icon: Globe,
    title: 'Global Support',
    description: 'Works with gift cards from 50+ countries and all major currencies.',
  },
  {
    icon: Shield,
    title: 'Verified & Trusted',
    description: 'Works with all authorized gift card issuers and major retailers.',
  },
  {
    icon: TrendingUp,
    title: 'Accurate Info',
    description: 'Real-time data from retailers ensures current balance information.',
  },
  {
    icon: CheckCircle2,
    title: '24/7 Available',
    description: 'Check your gift cards anytime, anywhere, from any device.',
  },
]

const brands = [
  'Amazon',
  'Apple Store',
  'Best Buy',
  'Google Play',
  'Netflix',
  'PlayStation',
  'Sephora',
  'Steam',
  'Target',
  'Uber',
  'Walmart',
  'Xbox',
]

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading gift card verification with enterprise-grade security and instant results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="p-6 sm:p-8 border border-border/50 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Supported Brands */}
        <div className="mt-20 border-t border-border/50 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              All Major Brands Supported
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We support gift cards from leading retailers and digital platforms worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg text-center hover:border-primary hover:bg-primary/5 transition-all"
              >
                <p className="text-foreground font-semibold text-sm">{brand}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 border-t border-border/50 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-foreground mb-2">Enter Details</h4>
              <p className="text-muted-foreground text-sm">Submit your gift card information and details above</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-foreground mb-2">We Verify</h4>
              <p className="text-muted-foreground text-sm">Our team securely verifies the gift card validity</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-foreground mb-2">Get Results</h4>
              <p className="text-muted-foreground text-sm">Receive verification results via email within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
