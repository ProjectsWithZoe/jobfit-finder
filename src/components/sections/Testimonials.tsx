
import React from 'react';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

export function Testimonials() {
  const testimonials = [
    {
      quote: "I was applying to dozens of jobs with minimal responses. JobFit helped me refine my applications and focus on roles where I was over 80% match. I got 3 interviews in my first week!",
      author: "Sarah Johnson",
      position: "Frontend Developer"
    },
    {
      quote: "The skill gap analysis was eye-opening. I spent a month learning the missing skills, and my match percentage jumped from 65% to 92% for senior positions.",
      author: "Michael Chen",
      position: "Data Analyst"
    },
    {
      quote: "As a career changer, I wasn't sure how my skills translated to new roles. JobFit gave me clear insights and helped me focus my applications on positions where my experience was valuable.",
      author: "Emily Rodriguez",
      position: "Project Manager"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-accent/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            JobFit has helped thousands of job seekers find their perfect match. Here's what some of them have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
