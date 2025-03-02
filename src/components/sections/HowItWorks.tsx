
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatedText } from '@/components/ui/AnimatedText';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload or Copy-Paste Your CV',
      description: 'Simply upload your resume or copy-paste its content into our platform.'
    },
    {
      number: '02',
      title: 'Add the Job Description',
      description: 'Copy-paste the job description you want to apply for.'
    },
    {
      number: '03',
      title: 'Get Your Match Percentage',
      description: 'Our AI analyzes both documents and shows how well your profile matches the job requirements.'
    },
    {
      number: '04',
      title: 'Receive Recommendations',
      description: 'Get personalized job recommendations based on your skills and experience.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <AnimatedText text="JobFit" type="gradient" className="font-bold" /> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple process helps you match your skills with job requirements in just a few clicks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-2xl flex items-start gap-6 animate-slide-up hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="mt-6 text-primary hidden md:flex items-center">
                    <span className="text-sm font-medium">Next Step</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
