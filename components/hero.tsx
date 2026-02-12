import { CheckCircle2, Lock, Zap, Globe } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
          <CheckCircle2 size={18} />
          <span className="text-sm font-semibold">Trusted Security Standard</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance tracking-tight">
          Verify Gift Card <span className="text-primary">Validity</span> in Seconds
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
          Instantly check your gift card balance, validity status, and expiration dates. Secure, reliable, and works worldwide with all major brands.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Instant Results</h3>
            <p className="text-sm text-muted-foreground">Get verification results in real-time</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lock size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Bank-Level Security</h3>
            <p className="text-sm text-muted-foreground">End-to-end encrypted transfers</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Globe size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Global Coverage</h3>
            <p className="text-sm text-muted-foreground">Works with cards from 50+ countries</p>
          </div>
        </div>
      </div>
    </section>
  )
}
