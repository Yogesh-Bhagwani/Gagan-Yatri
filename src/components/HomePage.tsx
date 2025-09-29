import React from 'react';
import { ArrowRight, Satellite, Zap, Wind, Atom, TrendingUp, Shield } from 'lucide-react';

interface HomePageProps {
  onNavigateToDashboard: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDashboard }) => {
  const concepts = [
    {
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      title: "Halo CME",
      description: "Coronal Mass Ejections appearing as expanding halos around the Sun, indicating Earth-directed plasma clouds that can cause severe geomagnetic storms."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Proton Flux",
      description: "High-energy proton particle streams from the Sun measured in particles/cm²/s, serving as early indicators of incoming CME events."
    },
    {
      icon: <Wind className="w-8 h-8 text-green-400" />,
      title: "Particle Velocity",
      description: "Velocity of charged particles flowing from the Sun (typically 300-800 km/s), with speeds >500 km/s indicating potential CME arrival."
    },
    {
      icon: <Atom className="w-8 h-8 text-purple-400" />,
      title: "He++/H+ Ratio",
      description: "Ratio of doubly ionized helium to hydrogen ions, which increases significantly during CME events, providing compositional signatures."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-400" />,
      title: "Entropy Analysis",
      description: "Thermodynamic measure of plasma disorder and temperature variations that help identify CME-driven disturbances in solar wind."
    },
    {
      icon: <Satellite className="w-8 h-8 text-cyan-400" />,
      title: "Precursor Detection",
      description: "AI-powered early warning system using machine learning to identify CME signatures 6-24 hours before Earth impact."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=40&h=40" 
              alt="ISRO Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Satellite className="w-8 h-8 text-orange-400" />
              Gagan-Yatri
            </h1>
          </div>
          <button
            onClick={onNavigateToDashboard}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-blue-900/20"></div>
        <div className="relative px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  Halo CME  Detection
                </h2>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Advanced AI-powered space weather monitoring system using ISRO's Aditya-L1 mission data 
                  to detect Coronal Mass Ejections before they impact Earth's magnetosphere.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                    {/* <span className="text-orange-400 font-semibold">6-24 Hours</span> */}
                    <span className="text-slate-300 ml-2">Early Warning</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                    <span className="text-blue-400 font-semibold">83%+</span>
                    <span className="text-slate-300 ml-2">Accuracy</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                    <span className="text-green-400 font-semibold">CME</span>
                    <span className="text-slate-300 ml-2">Monitoring</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400/30 shadow-2xl">
                  <img 
                    src="https://www.newindian.in/wp-content/uploads/2024/01/New-Project-82.jpg" 
                    alt="CME Dashboard Preview" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">CME Dashboard</h3>
                    {/* <p className="text-slate-300 text-sm">Real-time CME precursor detection interface</p> */}
                  </div>
                </div>
                {/* <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  LIVE DATA
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts Section */}
      <div className="px-6 py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Understanding Space Weather Parameters</h3>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Learn about the key measurements and indicators that help us predict potentially dangerous solar events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center mb-4">
                  {concept.icon}
                  <h4 className="text-xl font-semibold text-white ml-3">{concept.title}</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Info Section */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">About Aditya-L1 Mission</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  India's pioneering solar mission positioned at the Sun-Earth L1 Lagrange point, 1.5 million km from Earth. 
                  Aditya-L1 provides continuous observations of the Sun's corona, chromosphere, and photosphere, 
                  enabling unprecedented insights into solar dynamics and space weather phenomena.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">1.5M km</div>
                    <div className="text-sm text-slate-400">Distance from Earth</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">24/7</div>
                    <div className="text-sm text-slate-400">Solar Monitoring</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=500&h=300" 
                  alt="Solar Corona" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 bg-gradient-to-r from-orange-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Monitor Space Weather?</h3>
          <p className="text-slate-300 text-lg mb-8">
            Access real-time CME precursor detection and protect critical infrastructure from solar storms
          </p>
          <button
            onClick={onNavigateToDashboard}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 mx-auto transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
          >
            <Satellite className="w-6 h-6" />
            Launch Gagan-Yatri Dashboard
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=40&h=40" 
                alt="ISRO Logo" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-slate-400">
                Built for Hack2Vision 2025 🚀 by Team
                "Bharatiya Antariksh"
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-slate-400">Powered by ISRO Aditya-L1 Mission</span>
              <div className="w-px h-6 bg-slate-600"></div>
              <span className="text-orange-400 font-semibold">Space Weather Protection</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;