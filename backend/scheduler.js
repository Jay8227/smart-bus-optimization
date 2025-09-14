function aggregateDemand(tickets, windowMinutes = 60) {
  const demandByTime = {};
  if (!tickets || tickets.length === 0) return [];
  
  tickets.forEach(ticket => {
    const timestamp = ticket.timestamp.getTime();
    const windowStart = timestamp - (timestamp % (windowMinutes * 60 * 1000));
    const windowDate = new Date(windowStart);

    if (!demandByTime[windowDate]) {
      demandByTime[windowDate] = 0;
    }
    demandByTime[windowDate] += ticket.passengers;
  });

  return Object.entries(demandByTime).map(([time, demand]) => ({
    time: new Date(time),
    demand,
  })).sort((a, b) => a.time - b.time);
}

function clusterDemand(aggregatedDemand, numClusters = 3) {
  const demands = aggregatedDemand.map(d => d.demand);
  if (demands.length === 0) return [];
  const maxDemand = Math.max(...demands);
  const lowThreshold = maxDemand / numClusters;
  const highThreshold = maxDemand * (numClusters - 1) / numClusters;

  return aggregatedDemand.map(d => {
    let level = 'Low';
    if (d.demand >= highThreshold) {
      level = 'High';
    } else if (d.demand >= lowThreshold) {
      level = 'Medium';
    }
    return { ...d, level };
  });
}

function optimizeAllocation(clusteredDemand, fleetSize = 10) {
  if (clusteredDemand.length === 0) return [];
  
  const totalDemand = clusteredDemand.reduce((sum, slot) => sum + slot.demand, 0);

  if (totalDemand === 0) {
    return clusteredDemand.map(d => ({ ...d, buses_allocated: 1 }));
  }

  let allocatedFleet = 0;
  const schedule = clusteredDemand.map(slot => {
    const demandShare = slot.demand / totalDemand;
    let buses = Math.round(fleetSize * demandShare);
    if (buses === 0 && slot.demand > 0) {
      buses = 1;
    }
    allocatedFleet += buses;
    return { ...slot, buses_allocated: buses };
  });

  let fleetDifference = fleetSize - allocatedFleet;
  while (fleetDifference !== 0) {
    if (fleetDifference > 0) {
      const busiestSlot = schedule.sort((a, b) => b.demand - a.demand)[0];
      busiestSlot.buses_allocated++;
      fleetDifference--;
    } else {
      const quietestSlot = schedule.filter(s => s.buses_allocated > 1).sort((a, b) => a.demand - b.demand)[0];
      if (quietestSlot) {
        quietestSlot.buses_allocated--;
        fleetDifference++;
      } else {
        break;
      }
    }
  }
  return schedule;
}

function computeImpact(aggregatedDemand, optimizedSchedule, fleetSize) {
    if (aggregatedDemand.length === 0) {
        return {
            unmetDemand: { original: 0, optimized: 0, reduction_percent: '0.00' },
            wastedCapacity: { original: 0, optimized: 0, reduction_percent: '0.00' }
        };
    }
    const busesPerSlotOriginal = Math.floor(fleetSize / aggregatedDemand.length) || 1;
    let unmetDemandOriginal = 0, wastedCapacityOriginal = 0;
    
    aggregatedDemand.forEach(d => {
        const capacity = busesPerSlotOriginal * 50; // Assume bus capacity is 50
        if (d.demand > capacity) unmetDemandOriginal += d.demand - capacity;
        else wastedCapacityOriginal += capacity - d.demand;
    });

    let unmetDemandOptimized = 0, wastedCapacityOptimized = 0;
    optimizedSchedule.forEach(d => {
        const capacity = d.buses_allocated * 50;
        if (d.demand > capacity) unmetDemandOptimized += d.demand - capacity;
        else wastedCapacityOptimized += capacity - d.demand;
    });

    const calculateReduction = (original, optimized) => {
        if (original <= 0) return '0.00';
        return (((original - optimized) / original) * 100).toFixed(2);
    };

    return {
        unmetDemand: { original: unmetDemandOriginal, optimized: unmetDemandOptimized, reduction_percent: calculateReduction(unmetDemandOriginal, unmetDemandOptimized) },
        wastedCapacity: { original: wastedCapacityOriginal, optimized: wastedCapacityOptimized, reduction_percent: calculateReduction(wastedCapacityOriginal, wastedCapacityOptimized) }
    };
}

function generateAlerts(optimizedSchedule) {
    const alerts = [];
    if (!optimizedSchedule || optimizedSchedule.length === 0) return alerts;

    const highDemandSlot = optimizedSchedule.find(s => s.level === 'High');
    if (highDemandSlot) {
        alerts.push({
            type: 'info',
            time: new Date(highDemandSlot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: `Peak demand detected. Allocating ${highDemandSlot.buses_allocated} buses.`
        });
    }
    
    const lowDemandSlot = optimizedSchedule.find(s => s.level === 'Low');
    if (lowDemandSlot) {
         alerts.push({
            type: 'warning',
            time: new Date(lowDemandSlot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: `Off-peak period. Service reduced to ${lowDemandSlot.buses_allocated} bus(es).`
        });
    }
    return alerts;
}

module.exports = {
  aggregateDemand,
  clusterDemand,
  optimizeAllocation,
  computeImpact,
  generateAlerts,
};
