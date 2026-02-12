import Header from '@/components/header'
import Hero from '@/components/hero'
import CheckerForm from '@/components/checker-form'
import Features from '@/components/features'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <CheckerForm />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
