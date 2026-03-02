import type { Page } from '../App';

interface HeroProps {
  onNavigate?: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Demo Notice */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm shadow-lg">
          🎓 KLUST FEST - Demo Version with Mock Data
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full text-sm">
                Faculty of Engineering, Science and Technology
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl mb-6 text-gray-900">
              FEST: Shaping Future Innovators
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Empowering students through excellence in engineering, science, and technology education. 
              Join us in creating innovative solutions for tomorrow's challenges.
            </p>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="bg-[#1e3a8a] text-white px-8 py-3 rounded-full hover:bg-[#1e40af] transition-all shadow-lg hover:shadow-xl"
            >
              CONTACT US
            </button>
          </div>

          {/* Hero Image with Curved Overlay */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxhYm9yYXRvcnklMjBzY2llbmNlfGVufDF8fHx8MTc2ODExMTEyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="FEST Students"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Curved overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/20 to-transparent"></div>
            </div>
            
            {/* Decorative curve element */}
            <svg 
              className="absolute -left-20 top-0 w-64 h-full text-[#1e3a8a] opacity-10 hidden lg:block"
              viewBox="0 0 200 400"
              fill="currentColor"
            >
              <path d="M0,0 Q100,200 0,400 L0,0 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z" 
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  );
}