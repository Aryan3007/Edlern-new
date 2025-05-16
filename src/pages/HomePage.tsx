import Navbar from '@/components/Navbar'
import BottomCTA from '@/section/BottomCTA'
import CommunitySection from '@/section/community-section'
import FAQSection from '@/section/faq-section'
import FeaturesSection from '@/section/features-section'
import Footer from '@/section/footer'
import Hero from '@/section/Hero'
import PricingSection from '@/section/pricing-section'
import TabsSection from '@/section/TabsSection'
import { TestimonialsSection } from '@/section/testimonials-section'
import { useEffect } from 'react'

const HomePage = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <div>
       <Navbar />
        <Hero/>
        <TabsSection/>
        <FeaturesSection/>
        <CommunitySection/>
        <TestimonialsSection/>
        <PricingSection/>
        <FAQSection/>
        <BottomCTA/>
        <Footer/>
    </div>
  )
}

export default HomePage