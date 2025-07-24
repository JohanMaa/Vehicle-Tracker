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
