import React from "react";
import { Satellite, ArrowRight } from "lucide-react";

interface HomeHeader {
  onNavigateToDashboard: () => void;
  onNavigeteToAdityaL1: () => void ; 
}

const Home_Header: React.FC<HomeHeader> = ({ onNavigateToDashboard , onNavigeteToAdityaL1 }) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <img
            src="/src/assets/Logo.png"
            alt="ISRO Logo"
            className="w-10 h-10 rounded-full"
          /> */}
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Satellite className="w-8 h-8 text-orange-400" />
            Gagan-Yatri
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onNavigeteToAdityaL1}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            Aaditya L1
          </button>

          <button
            onClick={onNavigateToDashboard}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home_Header;
