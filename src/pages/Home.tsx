import { Play, Wind } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="relative w-full h-screen flex flex-col pl-0 pr-0 items-center justify-start pt-32 sm:pt-40 md:pt-44 text-center overflow-hidden pointer-events-auto">
        <div className="px-5 z-10 flex flex-col items-center">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-gray-700 uppercase mb-3 sm:mb-4">
            PureFlow One
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 sm:mb-8 tracking-tight">
            Clean Air, Clear<br className="hidden sm:block" /> Mind. Anywhere.
          </h1>
          <div className="flex items-center gap-4 sm:gap-6 justify-center">
            <button className="bg-gray-900 text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-700 transition-colors">
              Discover
            </button>
            <button className="flex items-center gap-2 text-gray-700 text-sm sm:text-base font-medium hover:text-gray-900 transition-colors group">
              <Play size={14} className="fill-gray-700 group-hover:fill-gray-900 transition-colors" /> View Specs
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section (Teaser) */}
      <section className="min-h-screen py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center w-full pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Our Mission.</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We believe that everyone deserves to breathe clean, pure air, no matter where they are. 
              PureFlow was founded on the principle that cutting-edge technology can seamlessly 
              integrate into our daily lives to protect our health and enhance our well-being.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Years of rigorous research and engineering have culminated in a portable purification 
              system that doesn't compromise on efficiency or design. It's not just a product; 
              it's a commitment to a clearer mind and a healthier tomorrow.
            </p>
          </div>
          <div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="min-h-screen py-24 sm:py-32 px-5 sm:px-8 flex flex-col justify-center w-full pointer-events-auto">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase mb-4">Engineering Excellence</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Designed for life.<br/>Built for performance.</h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Every component of the PureFlow One has been meticulously engineered to deliver maximum purification power in a beautifully compact form factor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-8">
                  <Wind className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced HEPA Filtration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Captures 99.97% of airborne particles as small as 0.3 microns, including dust, pollen, and pet dander, ensuring the air you breathe is pristine.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Whisper-Quiet Operation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Custom aerodynamically designed fan blades operate at just 22dB, making it practically silent while maintaining exceptional airflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto border-b border-gray-200 flex flex-col justify-center w-full pointer-events-auto">
        <div className="w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">The numbers speak for themselves.</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Independently verified and lab-tested to deliver results you can measure and feel.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">99.9%</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Particles Caught</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">22dB</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Noise Level</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">45m²</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Area Coverage</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">10h</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Battery Life</span>
          </div>
          <div className="flex flex-col items-center text-center col-span-2 lg:col-span-1">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">4hrs</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Full Charge</span>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
