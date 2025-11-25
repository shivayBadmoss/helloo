# FederAI Chain Marketplace

A decentralized, privacy-preserving AI model training and marketplace platform built on Next.js 15 with TypeScript, combining federated learning with real machine learning capabilities.

## 🚀 Features

### Core Functionality
- **Real ML Training**: Train actual machine learning models with TensorFlow.js simulation
- **Federated Learning**: Privacy-preserving AI training where contributors train models locally without sharing raw data
- **Task Management**: Create and manage ML training tasks with reward pools and target accuracy goals
- **Contribution Tracking**: Record and verify model improvements with on-chain transparency
- **NFT Minting**: Convert trained models into unique NFTs with provenance and royalty sharing
- **Marketplace**: Buy, sell, and trade AI models with automatic royalty distribution
- **Reputation System**: Build trust through contributor ratings and model reviews

### ML Training Capabilities
- **Classification Tasks**: Multi-class classification with configurable architectures
- **Regression Tasks**: Continuous value prediction with various model types
- **Sentiment Analysis**: Text-based sentiment analysis with embedding support
- **Custom Hyperparameters**: Learning rate, batch size, epochs, dropout rate
- **Real-time Progress**: Live training metrics and loss curves
- **Model Evaluation**: Accuracy, loss, and performance metrics

### Technical Features
- **Real-time Updates**: Live training progress and marketplace activity
- **Simulation Mode**: Demo federated learning with realistic training rounds
- **Responsive Design**: Mobile-first UI with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript implementation with Prisma ORM
- **Database**: SQLite with comprehensive schema for users, tasks, models, and transactions

## 🏗️ Architecture

### Frontend (Next.js 15)
- **Pages**:
  - `/` - Landing page with platform overview
  - `/tasks` - Task creation and management
  - `/marketplace` - Model browsing and trading
  - `/analytics` - Performance dashboard (planned)

### Backend (API Routes)
- `/api/tasks` - Task CRUD operations
- `/api/contributions` - Contribution tracking and rewards
- `/api/models` - Model NFT management
- `/api/marketplace` - Marketplace listings and transactions
- `/api/simulation` - Federated learning simulation
- `/api/train` - **Real ML model training with TensorFlow.js simulation**
- `/api/users` - User management and profiles
- `/api/seed` - Sample data generation

### Database Schema (Prisma)
- **Users**: Wallet addresses, reputation, earnings
- **Tasks**: Training tasks with datasets and rewards
- **Contributions**: Model updates and improvements
- **ModelNfts**: Tokenized AI models with metadata
- **MarketplaceListings**: Model sales and pricing
- **Reviews**: Model ratings and feedback
- **TrainingRounds**: Progress tracking per task

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM with SQLite
- **UI Components**: Complete shadcn/ui component set
- **Icons**: Lucide React
- **State Management**: React hooks + Zustand (ready for implementation)
- **Form Handling**: React Hook Form + Zod validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   cd /home/z/my-project
   npm install
   ```

2. **Database setup**:
   ```bash
   npm run db:push
   ```

3. **Seed sample data** (optional):
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:3000`

## 📊 Sample Data

The platform includes comprehensive sample data:
- **3 Sample Users**: Alice Chen, Bob Smith, Carol Davis
- **3 Training Tasks**: Medical imaging, financial sentiment analysis, agriculture
- **2 Model NFTs**: Available for purchase in marketplace
- **Contributions & Reviews**: Realistic training history and ratings

## 🎯 User Journeys

### For Model Creators
1. Connect wallet → Create task → Set reward pool
2. Monitor training progress → View contributions
3. Mint model NFT when target accuracy reached
4. List on marketplace with pricing

### For Contributors
1. Browse available tasks → Join training
2. Run federated learning simulation
3. Earn immediate rewards + ongoing royalties
4. Track reputation and earnings

### For Model Buyers
1. Browse marketplace by category/accuracy/rating
2. Purchase models using FEDAI tokens
3. Download model weights from IPFS
4. Leave reviews and ratings

## 🔧 Key Components

### Task Creation Form
- Comprehensive task setup with validation
- Model type selection (classification, regression, NLP, etc.)
- Reward pool and target accuracy configuration
- Real-time reward estimation

### Federated Learning Simulation
- Multi-round training simulation
- Realistic accuracy improvements
- IPFS URI generation for model updates
- Automatic reward calculation

### Marketplace Interface
- Advanced filtering and search
- Model ratings and reviews
- Purchase flow with royalty distribution
- Detailed model information pages

### Navigation System
- Responsive mobile menu
- Active state indicators
- Wallet integration
- User profile management

## 📈 Data Models

### Task Status Flow
```
PENDING → ACTIVE → COMPLETED
    ↓         ↓
CANCELLED  (Target reached)
```

### Contribution Process
1. User joins task
2. Runs training simulation
3. Submits model update
4. Receives reward + reputation

### Marketplace Flow
1. Model minted as NFT
2. Listed with price
3. Buyer purchases
4. Royalties distributed to contributors

## 🎨 UI/UX Features

- **Dark Mode Support**: Built-in theme switching
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeletons and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Progress Indicators**: Visual training progress
- **Card Layouts**: Consistent information hierarchy

## 🔮 Future Enhancements

### Planned Features
- **Analytics Dashboard**: Performance metrics and insights
- **Smart Contract Integration**: Real blockchain transactions
- **IPFS Integration**: Actual decentralized storage
- **Advanced Federated Learning**: Real ML model training
- **Governance System**: DAO for platform decisions
- **Mobile App**: React Native implementation

### Technical Improvements
- **WebSocket Integration**: Real-time updates
- **Caching Layer**: Redis for performance
- **Monitoring**: Application performance tracking
- **Testing**: Comprehensive test suite
- **CI/CD**: Automated deployment pipeline

## 📝 API Documentation

### Tasks API
- `GET /api/tasks` - List all tasks with filters
- `POST /api/tasks` - Create new training task

### Marketplace API
- `GET /api/marketplace` - Browse model listings
- `POST /api/marketplace` - List model for sale

### Simulation API
- `POST /api/simulation` - Run federated learning
- `GET /api/simulation` - Get training status

## 🤝 Contributing

This is a demonstration project showcasing modern web development practices with AI and blockchain integration. The codebase follows best practices for:

- **Code Organization**: Clear separation of concerns
- **Type Safety**: Comprehensive TypeScript usage
- **Component Reusability**: Modular design patterns
- **Database Design**: Normalized schema with relationships
- **API Design**: RESTful endpoints with proper error handling

## 📄 License

This project is for educational and demonstration purposes.

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies**