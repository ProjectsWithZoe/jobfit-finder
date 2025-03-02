
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';
import { Footer } from '@/components/sections/Footer';
import { RewardTracker } from '@/components/ui/RewardTracker';
import { toast } from 'sonner';

const Index = () => {
  React.useEffect(() => {
    // Welcome toast for new visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        toast("Welcome to our CV matching platform!", {
          description: "Track your progress in our new rewards system!",
          duration: 5000,
        });
        localStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        
        {/* Rewards section */}
        <section className="py-12 bg-gradient-to-br from-white to-purple-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                For every 5 CVs with over 50% match you analyze, you'll earn rewards.
                Reach 25 CVs and treat yourself to a coffee on us!
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <RewardTracker className="shadow-lg" />
            </div>
          </div>
        </section>
        
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
