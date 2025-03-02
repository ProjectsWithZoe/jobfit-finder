
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { PercentageDisplay } from '@/components/ui/PercentageDisplay';

export function Hero() {
  const [isTextareaActive, setIsTextareaActive] = useState(false);

  return (
    <section className="pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-radial from-primary/20 to-transparent opacity-60 blur-3xl pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <span className="text-sm font-medium text-primary">AI-Powered Job Matching</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Match Your <AnimatedText text="CV" type="gradient" className="font-bold" /> with 
              <br className="hidden md:block" /> Job Descriptions In <AnimatedText text="Seconds" type="gradient" className="font-bold" />
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
              Instantly analyze your resume against job postings and discover your match percentage. Get personalized job recommendations based on your skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center lg:justify-start animate-fade-in">
              <Button size="lg" className="px-8">Try It Free</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg animate-fade-in">
            <div className="glass-card p-8 rounded-2xl relative">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">Job Description</label>
                    <div 
                      className={`min-h-[120px] p-4 rounded-lg border transition-all ${
                        isTextareaActive ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200'
                      } glass-input`}
                      onClick={() => setIsTextareaActive(true)}
                      onBlur={() => setIsTextareaActive(false)}
                    >
                      <p className="text-sm text-muted-foreground">We are looking for a Frontend Developer with 3+ years of experience in React.js, TypeScript, and Tailwind CSS...</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">Your CV</label>
                    <div className="min-h-[120px] p-4 rounded-lg border border-slate-200 glass-input">
                      <p className="text-sm text-muted-foreground">Frontend Developer with 4 years experience in building responsive web applications using React.js, TypeScript, Tailwind CSS...</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center">
                  <PercentageDisplay finalPercentage={87} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
