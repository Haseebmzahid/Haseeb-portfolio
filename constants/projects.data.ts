export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
    highlights: string[];
}

export const projects: Project[] = [
    {
        id: "royal-enclave",
        title: "ROYAL ENCLAVE",
        shortDescription:
            "An AI-powered real estate bidding platform that enables intelligent property auction management with real-time competitive bidding and automated valuation.",
        fullDescription:
            "ROYAL ENCLAVE is a cutting-edge real estate platform that leverages artificial intelligence to revolutionize property auctions. The system features real-time bidding with WebSocket connections, AI-driven property valuation models, and a comprehensive dashboard for both buyers and sellers. Built with a microservices architecture to handle high-concurrency auction events, it includes fraud detection, automated escrow management, and predictive analytics for market trends.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Node.js",
            "MongoDB",
            "Socket.IO",
            "TensorFlow",
            "Redis",
            "Docker",
        ],
        githubUrl: "https://github.com/Haseebmzahid",
        highlights: [
            "Real-time bidding engine with WebSocket integration",
            "AI-powered property valuation using machine learning models",
            "Microservices architecture for high-concurrency events",
            "Automated fraud detection and escrow management",
        ],
    },
    {
        id: "property-estimation",
        title: "AI-Based Property Estimation Engine",
        shortDescription:
            "A machine learning engine that predicts property values using historical data, geospatial analysis, and market trend modeling with high accuracy.",
        fullDescription:
            "This estimation engine uses ensemble machine learning models trained on large-scale real estate datasets to predict property values with high accuracy. It incorporates geospatial features, neighborhood amenities scoring, historical transaction analysis, and macroeconomic indicators. The system exposes a REST API for integration and includes an interactive dashboard for visual analysis of predictions and market trends.",
        techStack: [
            "Python",
            "FastAPI",
            "Scikit-learn",
            "Pandas",
            "PostgreSQL",
            "React",
            "Docker",
            "AWS",
        ],
        githubUrl: "https://github.com/Haseebmzahid",
        highlights: [
            "Ensemble ML models with 94%+ prediction accuracy",
            "Geospatial feature engineering with neighborhood scoring",
            "REST API for seamless third-party integration",
            "Interactive visualization dashboard for market trends",
        ],
    },
    {
        id: "crypto-dashboard",
        title: "Crypto Trading Analysis Dashboard",
        shortDescription:
            "A real-time cryptocurrency analytics dashboard with technical indicators, portfolio tracking, and AI-driven trading signal generation.",
        fullDescription:
            "A comprehensive trading analytics platform that aggregates data from multiple crypto exchanges via WebSocket feeds. It provides real-time candlestick charts, over 30 technical indicators (RSI, MACD, Bollinger Bands, etc.), portfolio performance tracking, and AI-generated trading signals. The backend processes streaming market data and runs predictive models to surface actionable insights for traders.",
        techStack: [
            "React",
            "TypeScript",
            "Node.js",
            "WebSocket",
            "Python",
            "PostgreSQL",
            "Redis",
            "Chart.js",
        ],
        githubUrl: "https://github.com/Haseebmzahid",
        highlights: [
            "Real-time data aggregation from multiple exchanges",
            "30+ technical indicators with customizable charts",
            "AI-driven trading signal generation",
            "Portfolio tracking with P&L analytics",
        ],
    },
];
