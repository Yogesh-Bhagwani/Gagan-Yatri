import React, { useRef, useEffect } from 'react';

interface DataPoint {
  timestamp: number;
  value: number;
  anomaly?: boolean;
}

interface GraphProps {
  title: string;
  data: DataPoint[];
  yLabel: string;
  color: string;
  threshold?: number;
  isGauge?: boolean;
  currentValue?: number;
}

const Graph: React.FC<GraphProps> = ({
  title,
  data,
  yLabel,
  color,
  threshold,
  isGauge = false,
  currentValue = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (isGauge) {
      drawGauge(ctx, width, height, currentValue, threshold);
    } else {
      drawLineChart(ctx, width, height, data, color, threshold);
    }
  }, [data, color, threshold, isGauge, currentValue]);

  const drawGauge = (ctx: CanvasRenderingContext2D, width: number, height: number, value: number, threshold?: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Value arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (value * 2 * Math.PI);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 10, startAngle, endAngle);
    ctx.strokeStyle = value > (threshold || 0.8) ? '#ef4444' : '#f97316';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Threshold line
    if (threshold) {
      const thresholdAngle = startAngle + (threshold * 2 * Math.PI);
      ctx.beginPath();
      ctx.moveTo(
        centerX + (radius - 30) * Math.cos(thresholdAngle),
        centerY + (radius - 30) * Math.sin(thresholdAngle)
      );
      ctx.lineTo(
        centerX + (radius + 5) * Math.cos(thresholdAngle),
        centerY + (radius + 5) * Math.sin(thresholdAngle)
      );
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Value text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(value.toFixed(3), centerX, centerY + 8);
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D, width: number, height: number, data: DataPoint[], color: string, threshold?: number) => {
    if (data.length < 2) return;

    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Find min/max values
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    const minTime = Math.min(...data.map(d => d.timestamp));
    const maxTime = Math.max(...data.map(d => d.timestamp));
    const timeRange = maxTime - minTime || 1;

    // Grid lines
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * chartWidth) / 10;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Threshold line
    if (threshold !== undefined) {
      const thresholdY = height - padding - ((threshold - minValue) / valueRange) * chartHeight;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, thresholdY);
      ctx.lineTo(width - padding, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Data line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    data.forEach((point, index) => {
      const x = padding + ((point.timestamp - minTime) / timeRange) * chartWidth;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Anomaly highlights
    data.forEach((point) => {
      if (point.anomaly) {
        const x = padding + ((point.timestamp - minTime) / timeRange) * chartWidth;
        const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
      }
    });

    // Y-axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (i * valueRange) / 5;
      const y = height - padding - (i * chartHeight) / 5;
      ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <div className="relative h-64">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      <div className="mt-2 text-sm text-slate-400">
        {yLabel}
      </div>
    </div>
  );
};

export default Graph;