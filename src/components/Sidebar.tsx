import React from "react";
import { Calendar, Settings, Download, Upload, Filter } from "lucide-react";


interface SidebarProps {
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
  selectedEvent: string;
  onEventChange: (event: string) => void;
  parameters: {
    flux: boolean;
    speed: boolean;
    temperature: boolean;
    ratio: boolean;
    entropy: boolean;
  };
  onParameterChange: (param: string, value: boolean) => void;
  threshold: number;
  onThresholdChange: (value: number) => void;
  smoothingWindow: number;
  onSmoothingWindowChange: (value: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  dateRange,
  onDateRangeChange,
  selectedEvent,
  onEventChange,
  parameters,
  onParameterChange,
  threshold,
  onThresholdChange,
  smoothingWindow,
  onSmoothingWindowChange,
}) => {
  const cmeEvents = [
    "All Events",
    "CME-2024-001",
    "CME-2024-002",
    "CME-2024-003",
    "CME-2024-004",
  ];

  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/*  Selector */}
        {/* <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">From</label>
              <input
                type="datetime-local"
                value={dateRange.from}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, from: e.target.value })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">To</label>
              <input
                type="datetime-local"
                value={dateRange.to}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, to: e.target.value })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div> */}

        {/* CME Event Selector */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            CME Event
          </h3>
          <select
            value={selectedEvent}
            onChange={(e) => onEventChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-400"
          >
            {cmeEvents.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        {/* Parameter Toggles */}
        {/* <div>
          <h3 className="text-white font-semibold mb-3">Parameters</h3>
          <div className="space-y-2">
            {Object.entries(parameters).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => onParameterChange(key, e.target.checked)}
                  className="w-4 h-4 text-orange-400 bg-slate-700 border-slate-600 rounded focus:ring-orange-400"
                />
                <span className="text-slate-300 text-sm capitalize">
                  {key === "ratio" ? "He++/H+ Ratio" : key}
                </span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Model Settings */}
        {/* <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Model Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Threshold: {threshold.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={threshold}
                onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Smoothing Window: {smoothingWindow}
              </label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={smoothingWindow}
                onChange={(e) =>
                  onSmoothingWindowChange(parseInt(e.target.value))
                }
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div> */}

        {/* Export Data */}
          <div>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Upload CDF file
          </button>
        </div>

        <div>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
