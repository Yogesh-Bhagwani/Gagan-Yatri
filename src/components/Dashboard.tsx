import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Graph from './Graph';
import DataTable from './DataTable';
import { DataGenerator } from '../utils/dataGenerator';
import { ArrowLeft } from 'lucide-react';

interface DataPoint {
  timestamp: number;
  value: number;
  anomaly?: boolean;
}

interface DashboardProps {
  onNavigateToHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToHome }) => {
  const [dataGenerator] = useState(new DataGenerator());
  const [activeTab, setActiveTab] = useState<'events' | 'insights' | 'export'>('events');
  
  // Data states
  const [protonFluxData, setProtonFluxData] = useState<DataPoint[]>([]);
  const [solarWindData, setSolarWindData] = useState<DataPoint[]>([]);
  const [heRatioData, setHeRatioData] = useState<DataPoint[]>([]);
  const [likelihoodData, setLikelihoodData] = useState<DataPoint[]>([]);
  const [cmeEvents, setCmeEvents] = useState<any[]>([]);
  
  // UI states
  const [hasAlert, setHasAlert] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState<Date | null>(null);
  const [currentLikelihood, setCurrentLikelihood] = useState(0);

  // Filter states
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    to: new Date().toISOString().slice(0, 16)
  });
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [parameters, setParameters] = useState({
    flux: true,
    speed: true,
    temperature: true,
    ratio: true,
    entropy: true
  });
  const [threshold, setThreshold] = useState(0.8);
  const [smoothingWindow, setSmoothingWindow] = useState(10);

  // Initialize data
  useEffect(() => {
    const initialData = {
      protonFlux: dataGenerator.generateProtonFlux(100),
      solarWind: dataGenerator.generateSolarWindSpeed(100),
      heRatio: dataGenerator.generateHeRatio(100),
      likelihood: dataGenerator.generateLikelihoodScore(100),
      events: dataGenerator.generateCMEEvents(20)
    };

    setProtonFluxData(initialData.protonFlux);
    setSolarWindData(initialData.solarWind);
    setHeRatioData(initialData.heRatio);
    setLikelihoodData(initialData.likelihood);
    setCmeEvents(initialData.events);
    
    // Set current likelihood from last data point
    const lastLikelihood = initialData.likelihood[initialData.likelihood.length - 1];
    setCurrentLikelihood(lastLikelihood.value);
    
    // Check for initial alert
    if (lastLikelihood.value > threshold) {
      setHasAlert(true);
      setLastAlertTime(new Date(lastLikelihood.timestamp));
    }
  }, [dataGenerator, threshold]);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const realtimeData = dataGenerator.getRealtimeUpdate();
      
      // Update data arrays (keep last 100 points)
      setProtonFluxData(prev => [...prev.slice(-99), realtimeData.protonFlux]);
      setSolarWindData(prev => [...prev.slice(-99), realtimeData.solarWindSpeed]);
      setHeRatioData(prev => [...prev.slice(-99), realtimeData.heRatio]);
      setLikelihoodData(prev => [...prev.slice(-99), realtimeData.likelihoodScore]);
      
      // Update current likelihood
      setCurrentLikelihood(realtimeData.likelihoodScore.value);
      
      // Check for alerts
      if (realtimeData.likelihoodScore.value > threshold) {
        setHasAlert(true);
        setLastAlertTime(new Date(realtimeData.likelihoodScore.timestamp));
      } else if (realtimeData.likelihoodScore.value < threshold * 0.8) {
        setHasAlert(false);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [dataGenerator, threshold]);

  const handleParameterChange = (param: string, value: boolean) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const tabs = [
    { id: 'events', label: 'CME Events', icon: '📊' },
    { id: 'insights', label: 'Model Insights', icon: '🧠' },
    { id: 'export', label: 'Export Data', icon: '📤' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-2">
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <Header hasAlert={hasAlert} lastAlertTime={lastAlertTime} />
      
      <div className="flex">
        <Sidebar
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
          parameters={parameters}
          onParameterChange={handleParameterChange}
          threshold={threshold}
          onThresholdChange={setThreshold}
          smoothingWindow={smoothingWindow}
          onSmoothingWindowChange={setSmoothingWindow}
        />
        
        <main className="flex-1 p-6">
          {/* Main Graph Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {parameters.flux && (
              <Graph
                title="Flux vs Time"
                data={protonFluxData}
                yLabel=""
                color="#f97316"
                threshold={1500}
              />
            )}
            
            {parameters.speed && (
              <Graph
                title="Velocity vs Time"
                data={solarWindData}
                yLabel=""
                color="#3b82f6"
                threshold={500}
              />
            )}
            
            {parameters.ratio && (
              <Graph
                title="Density vs Time"
                data={heRatioData}
                yLabel=""
                color="#10b981"
                threshold={0.08}
              />
            )}
            
              <Graph
                title="Accuracy "
                data={likelihoodData}
                yLabel=""
                color="#ef4444"
                threshold={threshold}
                isGauge={true}
                currentValue={currentLikelihood}
              />
          </div>

          {/* Tabbed Panels */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg">
            <div className="border-b border-slate-700">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-orange-400 text-orange-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'events' && (
                <DataTable events={cmeEvents} />
              )}
              
              {activeTab === 'insights' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Current Threshold</h4>
                      <p className="text-2xl font-bold text-orange-400">{threshold.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Last Updated Score</h4>
                      <p className="text-2xl font-bold text-blue-400">{currentLikelihood.toFixed(3)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Feature Attribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Proton Flux Spike</span>
                        <span className="text-orange-400">High Impact</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Solar Wind Speed</span>
                        <span className="text-yellow-400">Medium Impact</span>
                      </div>
                      <div className="flex justify-between">
                        <span>He++/H+ Ratio</span>
                        <span className="text-green-400">Low Impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded transition-colors">
                      Export Current View (CSV)
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition-colors">
                      Download CME Event Logs
                    </button>
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Export Options</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                        <span>Include timestamps</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                        <span>Include anomaly markers</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Include raw sensor data</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;