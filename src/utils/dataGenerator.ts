export interface DataPoint {
  timestamp: number;
  value: number;
  anomaly?: boolean;
}

export class DataGenerator {
  private baseTime = Date.now();
  private timeStep = 5 * 60 * 1000; // 5 minutes in milliseconds
  private currentIndex = 0;

  generateProtonFlux(count: number): DataPoint[] {
    const data: DataPoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = this.baseTime + i * this.timeStep;
      const baseValue = 1000 + Math.sin(i * 0.1) * 200;
      const noise = (Math.random() - 0.5) * 100;
      
      // Add occasional spikes for CME events
      const spike = Math.random() > 0.95 ? Math.random() * 2000 : 0;
      const value = Math.max(0, baseValue + noise + spike);
      
      data.push({
        timestamp,
        value,
        anomaly: spike > 1000
      });
    }
    
    return data;
  }

  generateSolarWindSpeed(count: number): DataPoint[] {
    const data: DataPoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = this.baseTime + i * this.timeStep;
      const baseValue = 400 + Math.sin(i * 0.05) * 50;
      const noise = (Math.random() - 0.5) * 30;
      
      // Add high-speed streams
      const highSpeed = Math.random() > 0.9 ? Math.random() * 300 : 0;
      const value = Math.max(250, baseValue + noise + highSpeed);
      
      data.push({
        timestamp,
        value,
        anomaly: value > 500
      });
    }
    
    return data;
  }

  generateHeRatio(count: number): DataPoint[] {
    const data: DataPoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = this.baseTime + i * this.timeStep;
      const baseValue = 0.04 + Math.sin(i * 0.03) * 0.01;
      const noise = (Math.random() - 0.5) * 0.005;
      
      // Add ratio spikes during CME events
      const spike = Math.random() > 0.97 ? Math.random() * 0.05 : 0;
      const value = Math.max(0, baseValue + noise + spike);
      
      data.push({
        timestamp,
        value,
        anomaly: value > 0.08
      });
    }
    
    return data;
  }

  generateTempRatio(count: number): DataPoint[] {
    const data: DataPoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = this.baseTime + i * this.timeStep;
      const baseValue = 0.04 + Math.sin(i * 0.03) * 0.01;
      const noise = (Math.random() - 0.5) * 0.005;
      
      // Add ratio spikes during CME events
      const spike = Math.random() > 0.97 ? Math.random() * 0.05 : 0;
      const value = Math.max(0, baseValue + noise + spike);
      
      data.push({
        timestamp,
        value,
        anomaly: value > 0.08
      });
    }
    
    return data;
  }

  generateLikelihoodScore(count: number): DataPoint[] {
    const data: DataPoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = this.baseTime + i * this.timeStep;
      const baseValue = 0.2 + Math.sin(i * 0.02) * 0.1;
      const noise = (Math.random() - 0.5) * 0.05;
      
      // Add high probability events
      const event = Math.random() > 0.98 ? 0.3 + Math.random() * 0.5 : 0;
      const value = Math.max(0, Math.min(1, baseValue + noise + event));
      // const value = 83 ;
      
      data.push({
        timestamp,
        value,
        anomaly: value > 0.8
      });
    }
    
    return data;
  }

  generateCMEEvents(count: number) {
    const events = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(this.baseTime + i * this.timeStep * 10);
      const fluxSpike = 800 + Math.random() * 1500;
      const speed = 350 + Math.random() * 400;
      const score = Math.random();
      const status = score > 0.8 ? 'warning' : 'normal';
      
      events.push({
        id: `CME-${timestamp.getFullYear()}-${String(i + 1).padStart(3, '0')}`,
        timestamp,
        fluxSpike,
        speed,
        score,
        status
      });
    }
    
    return events;
  }

  getRealtimeUpdate() {
    const now = Date.now();
    const protonFlux = {
      timestamp: now,
      value: 1000 + Math.sin(now * 0.0001) * 200 + (Math.random() - 0.5) * 100,
      anomaly: Math.random() > 0.98
    };
    
    const solarWindSpeed = {
      timestamp: now,
      value: 400 + Math.sin(now * 0.00005) * 50 + (Math.random() - 0.5) * 30,
      anomaly: Math.random() > 0.95
    };
    
    const heRatio = {
      timestamp: now,
      value: Math.max(0, 0.04 + Math.sin(now * 0.00003) * 0.01 + (Math.random() - 0.5) * 0.005),
      anomaly: Math.random() > 0.97
    };

    const tempRatio  = {
      timestamp: now,
      value: Math.max(0, 0.04 + Math.sin(now * 0.00003) * 0.01 + (Math.random() - 0.5) * 0.005),
      anomaly: Math.random() > 0.87
    }
    
    const likelihoodScore = {
      timestamp: now,
      value: Math.max(0, Math.min(1, 0.2 + Math.sin(now * 0.00002) * 0.1 + (Math.random() - 0.5) * 0.05)),
      anomaly: Math.random() > 0.98
    };
    
    return {
      protonFlux,
      solarWindSpeed,
      heRatio,
      likelihoodScore,
      tempRatio,
    };
  }
}