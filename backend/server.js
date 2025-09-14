const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const { loadAll } = require('./data-loader');
const { aggregateDemand, clusterDemand, optimizeAllocation, computeImpact, generateAlerts } = require('./scheduler');
const FleetSimulator = require('./simulator');

// --- 1. INITIAL SETUP ---
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const { tickets } = loadAll();
console.log('✅ Historical data loaded.');

// --- 2. REAL-TIME SIMULATION & OPTIMIZATION ---
const fleetSize = 10;
const simulator = new FleetSimulator(fleetSize);
simulator.start();
console.log(`🚌 Fleet simulator started with ${fleetSize} vehicles.`);

simulator.on('tick', (liveVehicles) => {
  try {
    const agg = aggregateDemand(tickets, 60);
    const clustered = clusterDemand(agg, 3);
    const optimized = optimizeAllocation(clustered, fleetSize);
    const impact = computeImpact(agg, optimized, fleetSize);
    const alerts = generateAlerts(optimized);

    const systemUpdatePayload = {
      liveVehicles,
      schedule: {
        original: clustered,
        optimized,
      },
      impact,
      alerts,
      timestamp: new Date().toISOString(),
    };
    io.emit('system:update', systemUpdatePayload);
  } catch (error) {
    console.error("❌ Error during system tick:", error);
  }
});

io.on('connection', (socket) => {
  console.log('✅ Frontend connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔌 Frontend disconnected:', socket.id);
  });
});

// --- 3. START SERVER ---
// **FIX**: Changed port from 5000 to 5001 to avoid conflicts
const PORT = 5001;
server.listen(PORT, () => console.log(`🚀 Backend server running on http://localhost:${PORT}`));

