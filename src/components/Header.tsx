import React, { useState, useEffect } from 'react';
import { Satellite, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface HeaderProps {
  hasAlert: boolean;
  lastAlertTime: Date | null;
}

const Header: React.FC<HeaderProps> = ({ hasAlert, lastAlertTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').split('.')[0] + ' UTC';
  };

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img 
              src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=40&h=40" 
              alt="ISRO Logo" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Satellite className="w-6 h-6 text-orange-400" />
                Gagan-Yatri | Real-Time CME Monitoring Dashboard
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mt-4">
        {hasAlert ? (
          <div className="bg-red-900/50 border border-red-500 rounded-lg px-4 py-3 flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-red-200 font-medium">
              ⚠️ CME Precursor Detected at {lastAlertTime ? formatTime(lastAlertTime) : 'Unknown'}!
            </span>
          </div>
        ) : (
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg px-4 py-3 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-200 font-medium">
              ✅ No CME Precursors Detected - System Operating Normally
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;