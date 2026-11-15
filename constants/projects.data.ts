export type ProjectKind = "health" | "agent" | "mobile" | "desktop";
export interface Project {
  id: string;
  title: string;
  headline: string;
  category: string;
  screen: string;
  selectorLabel: string;
  kind: ProjectKind;
  status: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  repositoryVisibility?: "public" | "private";
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  steps: string[];
}

export const projects: Project[] = [
  {
    id: "foreseeme",
    repositoryVisibility: "private",
    title: "ForeSeeMe",
    headline: "Health, with foresight.",
    category: "APPLIED AI / HEALTH INTELLIGENCE",
    screen: "foreseeme",
    selectorLabel: "ForeSeeMe",
    kind: "health",
    status: "Flagship · Final-year project",
    shortDescription:
      "AI-assisted health intelligence that connects medication routines with environmental awareness. My final-year project, built to help people stay informed about the factors that shape their everyday health.",
    fullDescription:
      "ForeSeeMe is my final-year software engineering project: an AI-assisted health intelligence application combining timely medication tracking with real-time health and outbreak alerts informed by environmental factors. It brings personal routines and the surrounding environment into a connected experience. The mobile application is supported by a Python inference and API layer; the interface study illustrates the product without presenting sample alerts as live health information.",
    techStack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Authentication",
      "Firebase Cloud Messaging",
      "Riverpod",
      "GoRouter",
      "Python",
      "FastAPI",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Google Maps SDK",
      "Docker",
    ],
    githubUrl: "https://github.com/Haseebmzahid/ForeSEEME",
    highlights: [
      "Timely medication tracking and reminders",
      "Environmental context for health and outbreak alerts",
      "AI-assisted health intelligence in a mobile experience",
      "Final-year software engineering project",
    ],
    steps: [
      "Personal routine",
      "Environmental context",
      "AI intelligence",
      "Timely alerts",
    ],
  },
  {
    id: "omnichannel",
    title: "Omnichannel Meta Suite",
    headline: "Every conversation. Connected.",
    category: "AGENTIC AI / PATIENT OPERATIONS",
    screen: "omnichannel",
    selectorLabel: "Meta Suite",
    kind: "agent",
    status: "Agentic AI platform",
    shortDescription:
      "An agentic AI platform that connects patient conversations, natural-language responses and appointment scheduling across Meta channels. From the first question to the next available appointment.",
    fullDescription:
      "Omnichannel Meta Suite brings WhatsApp, Instagram and Facebook Messenger conversations into a connected patient-operations platform. An AI agent answers queries in a patient’s natural language, handles appointment requests on behalf of a doctor, checks available slots and records appointments in the database so subsequent patients are offered appropriate availability. The portfolio demonstration runs locally with illustrative conversations and slots; it does not access a real clinic or patient database.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "Turborepo",
      "Google Gemini AI",
      "WhatsApp Cloud API",
      "Instagram Graph API",
      "Facebook Messenger Platform",
      "AWS S3-compatible storage",
    ],
    githubUrl: "https://github.com/Haseebmzahid/Omnichannel-Meta-Platform",
    highlights: [
      "Omnichannel conversations across WhatsApp, Instagram and Messenger",
      "Natural-language query handling with an AI agent",
      "Appointment scheduling informed by database availability",
      "Coordinated patient communication and appointment records",
    ],
    steps: [
      "Patient message",
      "Agent reasoning",
      "Slot lookup",
      "Appointment record",
    ],
  },
  {
    id: "finflow",
    title: "FinFlow — AI Crypto Sentinel",
    headline: "Your market. In your pocket.",
    category: "MOBILE PRODUCT / CRYPTO INTELLIGENCE",
    screen: "finflow",
    selectorLabel: "FinFlow",
    kind: "mobile",
    status: "Flutter mobile product",
    shortDescription:
      "A personalized crypto tracking app and AI crypto sentinel, built for mobile. FinFlow brings a focused view of the market, technical charts and AI-assisted intelligence into a product you can carry with you.",
    fullDescription:
      "FinFlow is a Flutter mobile application built around a personalized cryptocurrency tracking experience and an AI crypto sentinel. Its stack combines Gemini AI, structured market-data access, Riverpod state management and a clean architecture, with candlestick and chart visualizations for exploring the market. A context-aware Gemini assistant complements the market and chart views, with resilient networking and structured state management behind the experience. The device presentation uses historical app captures from the source repository; it is not a live market feed, performance claim or trading recommendation.",
    techStack: [
      "Flutter",
      "Dart",
      "Google Gemini AI",
      "Google Generative AI SDK",
      "Riverpod",
      "Dio",
      "REST APIs",
      "Freezed",
      "JSON Serialization",
      "FL Chart",
      "Candlesticks",
      "GoRouter",
      "Clean Architecture",
    ],
    githubUrl: "https://github.com/Haseebmzahid/FinFlow-AI-Crypto-Sentinel",
    highlights: [
      "Personalized cryptocurrency tracking in a Flutter mobile app",
      "AI-assisted crypto sentinel powered by Google Gemini",
      "Candlestick charts and focused market visualizations",
      "Riverpod state management with clean architecture",
    ],
    steps: [
      "Personal watchlist",
      "Market data",
      "AI sentinel",
      "Mobile insight",
    ],
  },
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
    headline: "Royal Enclave",
    category: "FULL-STACK / REAL ESTATE",
    screen: "royal",
    selectorLabel: "Royal Enclave",
    kind: "desktop",
    status: "Selected project",
    steps: ["Property discovery", "Valuation", "Bidding", "Transactions"],
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
    headline: "Property, understood.",
    category: "APPLIED AI / VALUATION",
    screen: "estimation",
    selectorLabel: "Estimation",
    kind: "desktop",
    status: "Selected project",
    steps: ["Property data", "Feature engineering", "ML inference", "REST API"],
  },
];
