import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface CMEEvent {
  id: string;
  timestamp: Date;
  fluxSpike: number;
  speed: number;
  score: number;
  status: 'normal' | 'warning';
}

interface DataTableProps {
  events: CMEEvent[];
}

const DataTable: React.FC<DataTableProps> = ({ events }) => {
  const formatTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').split('.')[0];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs text-slate-400 uppercase bg-slate-700">
          <tr>
            <th scope="col" className="px-6 py-3">Time</th>
            <th scope="col" className="px-6 py-3">Flux Spike</th>
            <th scope="col" className="px-6 py-3">Speed (km/s)</th>
            <th scope="col" className="px-6 py-3">Score</th>
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700">
              <td className="px-6 py-4 font-mono text-xs">
                {formatTime(event.timestamp)}
              </td>
              <td className="px-6 py-4">
                {event.fluxSpike.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span className={event.speed > 500 ? 'text-red-400' : 'text-slate-300'}>
                  {event.speed.toFixed(0)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={event.score > 0.8 ? 'text-red-400' : 'text-slate-300'}>
                  {event.score.toFixed(3)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {event.status === 'normal' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="capitalize">{event.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;