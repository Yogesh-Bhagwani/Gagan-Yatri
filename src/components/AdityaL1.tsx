import React, { FC, useState } from 'react';

// Define the structure for a scientific payload
interface Payload {
  name: string;
  acronym: string;
  description: string;
}


interface AdityaL1Props {
  onNavigateToHome: () => void;
}

const PAYLOADS: Payload[] = [
  {
    name: "Visible Emission Line Coronagraph",
    acronym: "VELC",
    description: "Studies the solar corona and the dynamics of Coronal Mass Ejections (CMEs). It is the primary instrument for this mission.",
  },
  {
    name: "Solar Ultraviolet Imaging Telescope",
    acronym: "SUIT",
    description: "Captures images of the solar photosphere and chromosphere in near-ultraviolet wavelengths to study energy transfer.",
  },
  {
    name: "Solar Low Energy X-ray Spectrometer",
    acronym: "SoLEXS",
    description: "Monitors the X-ray flares to study the processes of heating and acceleration of solar plasma.",
  },
  {
    name: "High Energy L1 Orbiting X-ray Spectrometer",
    acronym: "HEL1OS",
    description: "Observes the dynamic events in the solar corona and provides a broad band of hard X-ray spectroscopy.",
  },
  {
    name: "Aditya Solar wind Particle Experiment",
    acronym: "ASPEX",
    description: "Measures the properties and composition of solar wind and energetic ions.",
  },
  {
    name: "Plasma Analyser Package For Aditya",
    acronym: "PAPA",
    description: "Analyzes the composition of the solar wind and its energy distribution.",
  },
  {
    name: "Advanced Tri-axial High Resolution Digital Magnetometers",
    acronym: "MAG",
    description: "Measures the magnitude and nature of the interplanetary magnetic field at the L1 point.",
  },
];

// Component to display a single payload card
const PayloadCard: FC<Payload> = ({ name, acronym, description }) => (
  <div className="p-4 bg-gray-800 rounded-xl shadow-lg border border-indigo-500/30 hover:shadow-indigo-500/50 transition duration-300">
    <h3 className="text-xl font-bold text-indigo-300 mb-1 flex items-center">
      {acronym}
      <span className="text-sm font-light text-gray-400 ml-3">({name})</span>
    </h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

// Main Application Component
const AdityaL1: React.FC<AdityaL1Props> = ({onNavigateToHome}) => {
  // Customized Sketchfab URL for seamless embedding (hiding controls, infos, etc.)
  const sketchfabSrc = "https://sketchfab.com/models/6658e75eb32240d6a485227564ad2938/embed?autostart=1&ui_infos=0&ui_controls=0&camera=0&ui_watermark=0&autospin=0.5";

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300 tracking-tight">
          ADITYA-L1
        </h1>
        <p className="text-lg sm:text-2xl text-gray-400 mt-2">
          India's First Solar Observatory Mission
        </p>
      </header>

      {/* Full-Width 3D Model Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden relative w-full h-[70vh] min-h-[400px]">
          <h2 className="absolute top-0 left-0 bg-indigo-600/80 p-2 px-4 rounded-br-lg text-sm font-semibold z-10">
            Interactive 3D Model
          </h2>
          <iframe 
            title="ADITYA L1 Spacecraft 3D Viewer" 
            className="w-full h-full border-none"
            frameBorder="0" 
            allowFullScreen 
            mozallowfullscreen="true" 
            webkitallowfullscreen="true" 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src={sketchfabSrc}>
          </iframe>
        </div>
        <p className="p-2 text-xs text-center text-gray-400/70">
            *Courtesy of Sketchfab/MechLab3D
        </p>
      </div>


      {/* Mission Overview Section (Now below the model, side-by-side on desktop) */}
      <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Mission Overview Card */}
        <div className="p-6 bg-gray-800 rounded-2xl shadow-xl border border-sky-500/30 h-full">
          <h2 className="text-3xl font-bold text-sky-300 mb-4">Mission Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            Aditya-L1 is the first space-based Indian observatory to study the Sun. It is placed in a halo orbit around the **Lagrange Point 1 (L1)** of the Sun-Earth system, approximately $1.5$ million km from Earth.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            This vantage point allows for a continuous, uninterrupted view of the Sun without occultation/eclipses, enabling real-time observation of solar activities and their impact on space weather.
          </p>
        </div>

        {/* The L1 Advantage Card */}
        <div className="p-6 bg-gray-800 rounded-2xl shadow-xl border border-indigo-500/30 h-full">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">The L1 Advantage</h2>
          <p className="text-gray-300 leading-relaxed">
            The L1 point is gravitationally stable, reducing the amount of fuel needed for the spacecraft to maintain its position. More importantly, it provides a crucial viewpoint to observe the Sun's atmosphere and solar wind *before* they are influenced by Earth's magnetic field.
          </p>
        </div>
      </main>

      {/* Scientific Payloads Section */}
      <section className="max-w-7xl mx-auto mt-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-sky-400">Scientific Instruments (Payloads)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAYLOADS.map((payload) => (
            <PayloadCard key={payload.acronym} {...payload} />
          ))}
        </div>
      </section>

      {/* Footer / Credits */}
      <footer className="text-center mt-16 pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          Built with React & Tailwind CSS. Mission data based on ISRO specifications.
        </p>
      </footer>
    </div>
  );
};

export default AdityaL1;
