import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import Hero from '@/components/sections/Hero'
import PicksCarousel from '@/components/sections/PicksCarousel'
import PreviewGrid from '@/components/sections/PreviewGrid'
import HowItWorks from '@/components/sections/HowItWorks'
import CuratorBio from '@/components/sections/CuratorBio'
import Pricing from '@/components/sections/Pricing'
import CommunityBand from '@/components/sections/CommunityBand'
import FAQ from '@/components/sections/FAQ'

export default function Page() {
  return (
    <>
      <a id="top" />
      <Header />
      <main>
        <Hero headlineVariant="classic" />
        <PicksCarousel count={6} />
        <PreviewGrid count={32} />
        <HowItWorks />
        <CuratorBio />
        <Pricing />
        <CommunityBand />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
