# Customer Success Hub

A web-based platform for creating, managing, and visualizing customer success data and summaries.

## Project Overview

Customer Success Hub is designed to help CSMs manage customer information, create detailed customer summaries, and visualize customer health across their book of business. It replaces a previous RTF-based summary system with an interactive web platform that can integrate with various data sources.

### Key Features

- Centralized customer data management
- Interactive, beautifully designed customer summaries
- Advanced filtering and search capabilities
- Data visualization dashboards
- AI-powered summary generation
- Editable sections and data points
- Export functionality
- Future API integrations with common CSM tools

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- API keys for AI services (OpenAI or Claude)

### Installation

```bash
# Clone the repository
git clone https://github.com/jamesmcarthur-3999/customer-success-hub.git
cd customer-success-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the development server
npm run dev
```

## Project Structure

```
/
├── docs/                # Documentation
├── src/                 # Source code
│   ├── assets/          # Static assets
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── data/            # Sample data and data structure
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   ├── services/        # API and data services
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
├── public/              # Public assets
└── mock-api/           # Mock API for development
```

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query and Context API
- **Data Visualization**: Recharts/D3.js
- **API Integration**: Axios
- **Database**: Local file system
- **AI Integration**: OpenAI/Claude API
- **Deployment**: DigitalOcean

## Development Roadmap

See [ROADMAP.md](./docs/ROADMAP.md) for the project development plan.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

This project is proprietary and confidential.
