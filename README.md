# Smart Bus Optimization Challenge

A prototype for a smart bus management system designed to solve common inefficiencies in urban transit networks.This project addresses the challenge of static bus timetables in Indian Tier-1 cities by creating a dynamic, data-driven scheduling system.

# Problem Statement

Urban bus systems in major Indian cities often rely on fixed timetables that fail to adapt to real-world traffic and demand fluctuations. This leads to significant operational issues, including **bus bunching**, **under-utilized trips** during off-peak hours, and **unpredictable wait times** for commuters. Transit agencies currently lack the necessary tools to forecast demand and adjust schedules in real-time.

Our challenge is to build a prototype system in 36 hours that makes city buses run smarter, improve on-time performance, and enhance the overall passenger experience.

\# Core Features

Our system is designed to meet the challenge requirements with the following features:

  * **Historical Data Analysis**: The system processes and cleans at least two types of historical data (e.g., ticket sales, GPS logs) to fix missing values and format timestamps, creating a reliable dataset for analysis.
  * **Live Simulation Engine**: A real-time data feed simulates buses moving on their routes and passengers boarding, allowing the system to react dynamically to new data like GPS locations and bus occupancy.
  * **Dynamic Scheduling Engine**: An intelligent, rule-based engine automatically adjusts bus timings and frequency to prevent bus bunching and eliminate empty, inefficient trips during off-peak hours.
  * **Predictive Demand Forecasting**: A forecasting model predicts passenger ridership for the next few hours on an hourly or per-route basis, enabling proactive scheduling decisions.
  * **Interactive Dashboard**: A user-friendly UI provides a clear comparison between the original and the optimized schedules, visualizes forecasted vs. actual ridership, and displays critical system alerts for operators.
  * **Impact Visualization**: The dashboard uses simple charts and maps to clearly demonstrate system improvements, such as reduced waiting times and better bus utilization.
  * **Live Map View (Bonus)**: An interactive map view displays the live location of all buses in the fleet, providing a real-time operational overview.

# Technology Stack

  * **Backend**: Node.js, Express, Socket.IO
  * **Frontend**: Vue.js, Vite, Pinia, Tailwind CSS
  * **Data Visualization**: Chart.js (Charts), Leaflet.js (Maps)
  * **Database**: (Not specified, using CSV for prototype)

# Getting Started

To get a local copy up and running, follow these steps.

# Prerequisites

  * Node.js and npm installed
  * Git

### \#\#\# Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### \#\#\# Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run dev
    ```
2.  **Start the Frontend Server (in a new terminal):**
    ```bash
    cd frontend
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:5173`.

-----

# Meet the Team Risers

This project was built by the following members:

| Name                | GitHub Profile                                                                                              |
| :------------------ | :---------------------------------------------------------------------------------------------------------- |
| Yash Kumar Mishra | [](https://github.com/ykmishra2009-cell)   |
| Pranav Singh Bisht | []((https://github.com/Phantomdlxx)) |
| Jayesh More | []((https://github.com/Jay8227)) |

-----

## \#\# License

This project is licensed under the MIT License.
