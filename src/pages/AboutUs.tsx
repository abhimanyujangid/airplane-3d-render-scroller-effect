import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = sliderContainerRef.current;
      const slider = sliderRef.current;
      
      if (container && slider) {
        // Calculate how much we need to move based on the slider width vs viewport
        const scrollAmount = slider.scrollWidth - window.innerWidth;
        
        // Only run if the content is wider than viewport
        if (scrollAmount > 0) {
          gsap.to(slider, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: `+=${scrollAmount}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const timelineData = [
    { year: "2021", text: "The initial concept. A small team of engineers gathered to tackle indoor air quality problems." },
    { year: "2022", text: "First prototype developed, achieving 99% filtration in lab tests with our custom fan design." },
    { year: "2023", text: "Secured our first round of funding and began scaling the manufacturing process in North America." },
    { year: "2024", text: "Launched the PureFlow One to market. Over 100,000 units sold in the first quarter." },
    { year: "2025", text: "Expanded our product line to include commercial HVAC solutions and pure carbon filters." },
    { year: "2026", text: "Celebrating our 5th anniversary with a continued commitment to making clean air accessible to all." },
  ];

  const teamData = [
    { name: "Sarah Jenkins", role: "CEO & Co-founder", desc: "Former aerospace engineer turned environmental advocate." },
    { name: "Michael Chang", role: "Chief Design Officer", desc: "Award-winning industrial designer with 15 years experience." },
    { name: "Dr. Elena Rossi", role: "Head of Research", desc: "PhD in Atmospheric Science, specializing in micro-particulates." },
    { name: "David Alpert", role: "Lead Engineer", desc: "Expert in fluid dynamics and ultra-quiet motor designs." },
    { name: "Aisha Patel", role: "COO", desc: "Operations specialist ensuring our supply chain is sustainable." },
    { name: "Marcus Johnson", role: "Head of Marketing", desc: "Storyteller passionate about community health initiatives." },
    { name: "Li Wei", role: "Software Lead", desc: "Architect behind the PureFlow smart home integration app." },
    { name: "Jessica Bloom", role: "Customer Success", desc: "Dedicated to ensuring every user breathes perfectly clean air." },
  ];

  return (
    <div className="w-full pointer-events-auto bg-transparent">
      
      {/* Hero + Horizontal timeline slider */}
      <section ref={sliderContainerRef} className="w-full h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-5 overflow-hidden">
        <div className="px-5 sm:px-8 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-8">
            About Us.
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            We are a collective of engineers, designers, and scientists dedicated to a simple but profound mission: democratizing access to clean, breathable air. This is the story of how PureFlow came to be.
          </p>
        </div>

        <div className="w-full translate-y-12">
          <div className="px-5 sm:px-8 max-w-7xl mx-auto w-full mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Our Journey</h2>
          </div>
          
          <div ref={sliderRef} className="flex gap-12 px-5 sm:px-8 pl-5 sm:pl-8 pr-[50vw]">
            {timelineData.map((item, i) => (
              <div key={i} className="flex flex-col min-w-[300px] w-[300px]">
                <span className="text-6xl font-bold text-gray-900/10 mb-4">{item.year}</span>
                <p className="text-gray-800 font-medium text-lg border-t-2 border-gray-900 pt-4">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Small description below slider */}
        <div className="mb-24">
          <p className="text-[16px] text-gray-700 leading-relaxed max-w-[20rem]">
            Since our inception, our focus has always been on user-centric design paired with uncompromising performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl">
            <div className="flex gap-1 mb-4 text-gray-900">
              {'★★★★★'}
            </div>
            <p className="text-lg text-gray-800 font-medium mb-6">
              "PureFlow completely changed the way I work from home. My allergies have subsided and I feel significantly more energetic throughout the day."
            </p>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wider">— Amanda L.</p>
          </div>
          
          <div className="p-8 rounded-3xl">
            <div className="flex gap-1 mb-4 text-gray-900">
              {'★★★★★'}
            </div>
            <p className="text-lg text-gray-800 font-medium mb-6">
              "As someone with severe asthma, this device has been a lifesaver. It's so quiet I often forget it's even running in my bedroom."
            </p>
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wider">— Robert T.</p>
          </div>
        </div>

        <div className="text-center py-12 border-t border-b border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to breathe easier?</h3>
          <button className="bg-gray-900 text-white font-medium px-8 py-4 rounded-full hover:bg-gray-700 transition-colors inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Book a Call
          </button>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-16 tracking-tight text-left">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamData.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl flex flex-col items-start text-left">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-500">
                  <User size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h4>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-5 sm:px-8 max-w-3xl mx-auto w-full mb-32">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            { q: "How long does the battery last?", a: "The PureFlow One lasts for up to 10 hours on a single charge under normal operation." },
            { q: "Is the filter replaceable?", a: "Yes, the HEPA filter can be easily swapped out. We recommend replacing it every 6 months." },
            { q: "Do you ship internationally?", a: "We currently ship to North America and Europe. We're working on expanding our reach globally soon." },
            { q: "What is your warranty policy?", a: "We offer a standard 2-year warranty on all parts and labor to give you peace of mind." },
          ].map((faq, i) => (
            <div key={i} className="rounded-2xl p-6">
              <div className="flex justify-between items-center cursor-pointer group">
                <h4 className="font-bold text-gray-900 text-lg">{faq.q}</h4>
                <ChevronDown className="text-gray-500 group-hover:text-gray-900 transition-colors" size={20} />
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
