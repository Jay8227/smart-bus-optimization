const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Loads and parses all CSV data from the /data directory.
 * This function runs once at server startup.
 */
function loadAll() {
  try {
    // --- Load Ticket Sales Data ---
    const ticketsCsvPath = path.join(__dirname, '../data/ticket_sales.csv');
    const ticketsCsv = fs.readFileSync(ticketsCsvPath, 'utf8');
    const tickets = parse(ticketsCsv, {
      columns: true, // Treat the first row as headers
      skip_empty_lines: true,
      // Safely convert string values to their correct data types
      cast: (value, context) => {
        if (context.column === 'passengers' || context.column === 'price') {
          // If parsing a number fails (e.g., on an empty cell), default to 0 to prevent NaN errors
          return parseInt(value, 10) || 0;
        }
        if (context.column === 'timestamp') {
          return new Date(value);
        }
        return value;
      }
    });

    // --- Load GPS Logs Data ---
    const gpsCsvPath = path.join(__dirname, '../data/gps_logs.csv');
    const gpsCsv = fs.readFileSync(gpsCsvPath, 'utf8');
    const gps = parse(gpsCsv, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        if (context.column === 'lat' || context.column === 'lng' || context.column === 'speed') {
          // Default to 0.0 if parsing a float fails
          return parseFloat(value) || 0.0;
        }
        // **IMPROVEMENT**: Also parse the timestamp for GPS logs
        if (context.column === 'timestamp') {
          return new Date(value);
        }
        return value;
      }
    });

    return { tickets, gps };

  } catch (error) {
    console.error("❌ Error loading data from CSV files:", error.message);
    console.error("Please ensure 'ticket_sales.csv' and 'gps_logs.csv' exist in the '/data' directory and are correctly formatted.");
    // Return empty arrays to prevent the application from crashing
    return { tickets: [], gps: [] };
  }
}

module.exports = { loadAll };