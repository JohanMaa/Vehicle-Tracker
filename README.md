# Vehicle Tracker Dashboard

A frontend dashboard built with React, TypeScript, TailwindCSS, Zustand, and ShadCN UI components to display vehicle telemetry data, developed for a frontend take-home assignment.

## Features
- **Vehicle List Page**: Displays vehicles in animated cards with name, status (as badges with green/red colors), speed, and updated time. Includes toggle-button filters (All, Active, Inactive) and sorting by name or speed.
- **Vehicle Detail Page**: Shows detailed vehicle information (ID, odometer, fuel level, speed, timestamp, and location as coordinates or an optional interactive map). Includes a refresh button for reloading data.
- **Conditional Navbar**: "Back to List" button appears only on the vehicle detail page for intuitive navigation.
- **API Integration**: Uses JSON Server to provide mock API endpoints (`GET /vehicles`, `GET /vehicleDetails/:id`). Ready for integration with real API endpoints if provided.
- **Responsive Design**: Modern UI with TailwindCSS, featuring gradient backgrounds, animations, and layouts optimized for mobile, tablet, and desktop.
- **Error Handling**: Displays loading states with a spinner and error notifications using Sonner.

## Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS, ShadCN UI, tailwindcss-animate
- **State Management**: Zustand
- **Routing**: React Router
- **Map (Optional)**: React Leaflet
- **Notifications**: Sonner
- **Mock API**: JSON Server

## Prerequisites
- Node.js v16 or higher
- npm v8 or higher

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vehicle-tracker-dashboard


Install dependencies:npm install


Install JSON Server globally (for mock API):npm install -g json-server


Run JSON Server in a separate terminal:json-server --watch db.json --port 3001


Run the development server:npm run dev


Open http://localhost:5173 in your browser.

Build Instructions
To create a production build:
npm run build

Preview the production build:
npm run preview

API Endpoints

GET http://localhost:3001/vehicles: Fetches the list of vehicles.
GET http://localhost:3001/vehicleDetails/:id: Fetches details for a specific vehicle by ID.
To integrate a real API, update fetchVehicles and fetchVehicleDetail in src/store.ts with the provided endpoint URLs.

Project Structure
vehicle-tracker-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # ShadCN UI components (button, card, badge, sonner)
│   │   ├── VehicleList.tsx   # Vehicle list page with toggle-button filter and sort
│   │   └── VehicleDetail.tsx # Vehicle detail page with coordinates or optional map
│   ├── lib/
│   │   └── utils.ts         # Utility functions for TailwindCSS
│   ├── App.tsx              # Main layout with conditional navbar
│   ├── main.tsx             # Entry point
│   ├── store.ts             # Zustand store with API integration
│   └── index.css            # TailwindCSS and optional Leaflet styles
├── db.json                  # Mock API data for JSON Server
├── tailwind.config.js       # TailwindCSS configuration
├── components.json          # ShadCN UI configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation

Testing API Endpoints
To verify the mock API:

Ensure JSON Server is running (json-server --watch db.json --port 3001).
Test endpoints using a browser, cURL, or Postman:
Browser: Open http://localhost:3001/vehicles or http://localhost:3001/vehicleDetails/1.
cURL:curl http://localhost:3001/vehicles
curl http://localhost:3001/vehicleDetails/1


Postman: Create GET requests for the above URLs.



Deployment
To deploy to Vercel for a live demo (optional):

Install Vercel CLI:npm install -g vercel


Login and deploy:vercel login
vercel


For a public mock API, host db.json on MockAPI.io or Render and update store.ts with the public URLs.

Notes

The map in VehicleDetail.tsx is optional. To use coordinates only, remove react-leaflet and leaflet dependencies and update VehicleDetail.tsx.
The project is ready for real API integration. Provide endpoint URLs to replace the mock API in store.ts.

Future Improvements

Integrate real API endpoints if provided.
Add filters for speed or updated time.
Implement dark mode with TailwindCSS.
Enhance map with custom vehicle icons (if retained).

License
MIT License```
