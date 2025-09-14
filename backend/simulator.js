const { EventEmitter } = require('events');

const stops = [
  { id: "Connaught Place", lat: 28.6330, lng: 77.2199 },
  { id: "Karol Bagh", lat: 28.6478, lng: 77.1943 },
  { id: "Hauz Khas Village", lat: 28.5539, lng: 77.1943 },
  { id: "Sector 18, Noida", lat: 28.5692, lng: 77.3248 },
  { id: "Cyber Hub, Gurgaon", lat: 28.4961, lng: 77.0883 },
  { id: "Nehru Place", lat: 28.5471, lng: 77.2503 }
];

class FleetSimulator extends EventEmitter {
  constructor(fleetSize = 10, speed = 0.05) {
    super();
    this.vehicles = this.initializeFleet(fleetSize);
    this.speed = speed;
    this.interval = null;
  }

  initializeFleet(fleetSize) {
    return Array.from({ length: fleetSize }).map((_, i) => ({
      id: `BUS-${101 + i}`,
      lat: stops[i % stops.length].lat,
      lng: stops[i % stops.length].lng,
      route: [stops[i % stops.length], stops[(i + 1) % stops.length]],
      targetStop: stops[(i + 1) % stops.length],
      status: 'moving',
      occupancy: Math.floor(Math.random() * 40) + 5,
    }));
  }

  start() {
    this.interval = setInterval(() => {
      this.vehicles = this.vehicles.map((v) => {
        v.lat += (v.targetStop.lat - v.lat) * this.speed;
        v.lng += (v.targetStop.lng - v.lng) * this.speed;
        const distance = Math.hypot(v.lat - v.targetStop.lat, v.lng - v.targetStop.lng);
        
        if (distance < 0.001) {
          let nextStop;
          do {
            nextStop = stops[Math.floor(Math.random() * stops.length)];
          } while (nextStop.id === v.targetStop.id);
          
          v.route = [v.targetStop, nextStop];
          v.targetStop = nextStop;
          v.occupancy += Math.floor(Math.random() * 10) - 5;
          if (v.occupancy < 0) v.occupancy = 0;
          if (v.occupancy > 50) v.occupancy = 50;
        }
        return v;
      });
      this.emit('tick', this.vehicles);
    }, 1500);
  }

  stop() {
    clearInterval(this.interval);
  }
}

module.exports = FleetSimulator;
