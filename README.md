# Latency Visualizer: Global Crypto Exchange Infrastructure Visualizer

This project is a Next.js application that provides an interactive 3D globe to visualize the server infrastructure of major cryptocurrency exchanges. It plots server locations, shows connections between them, and provides detailed information on hover and click.

## Assumptions

- **Static Data**: The application currently uses a static data file (`src/data/data.json`) to represent server and cloud region locations. This data is for demonstration purposes and is not fetched from a live API.
- **Illustrative Latency**: The latency values associated with each server are illustrative and do not represent real-time network performance.
- **Development Environment**: It is assumed that you have a current version of Node.js and the `npm` package manager installed on your development machine.

## Libraries & Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Rendering**: [Three.js](https://threejs.org/) for the interactive globe.
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## How to Run the Project Locally

1.  **Install Dependencies**:
    Open your terminal, navigate to the project's root directory, and run the following command to install all the necessary packages:

    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    Once the installation is complete, start the local development server:

    ```bash
    npm run dev
    ```

3.  **View the Application**:
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Code Documentation

### Project Structure Overview

```
src
├── app
│   ├── page.tsx                  # Main page with the globe visualization.
│   └── layout.tsx
│   └── globals.css
│
├── components
│   ├───
│   │   ├── control-panel.tsx     # The interactive filtering panel.
│   │   ├── header.tsx            # The main application header.
│   │   └── map-container.tsx     # The core component that renders the 3D globe.
│   │   └── LatencyTable.tsx      # Page displaying server data in a table.
│   │   └── liveMarketData.tsx    # The page for the live crypto ticker data.
│   │   └── MarketDashboard.tsx   # component for switching tabs
│   └── ui                        # Reusable UI components from ShadCN.
├── data
│   └── data.json                 # Static data for server and cloud region locations.
├── lib
│   ├── three-utils.ts            # Utility functions for Three.js (e.g., coordinate conversion).
│   └── utils.ts                  # General utility functions (e.g., `cn` for classnames).
└── types
    └── geo.ts                    # TypeScript type definitions for the geo data.
```

### Key Components

- **`map-container.tsx`**: This is the heart of the visualization. It uses `three.js` to set up and render the 3D scene, including the Earth globe, the starfield background, server markers, and the animated connection lines between them. It also handles user interactions like clicking and hovering on markers.
- **`control-panel.tsx`**: This component provides the UI for filtering the data displayed on the globe. It allows users to search, filter by crypto exchange, cloud provider, and latency, and toggle the visibility of different map layers.
- **`page.tsx` (main)**: This is the entry point of the application's UI. It manages the application's state, including the current filters, and passes the filtered data down to the `MapContainer` and `ControlPanel` components.
- **`LatencyTable.tsx`**: This page presents the same server data but in a simple tabular format, offering a more data-centric view. It's a good example of a secondary page that reuses the same core data.
- **`liveMarketData.tsx`**: A Live Crypto Ticker Data Page is a crucial, dynamic component of any crypto-related website or app. It provides users with live price updates, trends, and essential market data in real time, enabling informed decisions and quick insights.
