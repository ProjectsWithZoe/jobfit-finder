
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/AnimatedText';

export function CallToAction() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-radial from-primary/20 to-transparent opacity-60 blur-3xl pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-card p-12 md:p-16 rounded-2xl text-center animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect <AnimatedText text="Job Match" type="gradient" className="font-bold" />?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start matching your CV with job descriptions today and discover opportunities that align perfectly with your skills and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">Start Matching Now</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
