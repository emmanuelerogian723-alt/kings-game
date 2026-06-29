# Kings Game — Architecture Blueprint

## Core Design Principles
1. Monorepo structure (frontend + backend in one repo)
2. Plugin-based game engine (each game is a self-contained module)
3. Event-driven backend (Socket.IO + Redis pub/sub)
4. Zero-trust security model
5. Mobile-first responsive design

## Folder Structure
kings-game/
├── frontend/          # Next.js 14 App Router
│   ├── app/           # Pages
│   ├── components/    # Reusable UI
│   ├── lib/           # Utils, hooks, stores
│   └── games/         # Game modules (plug-and-play)
├── backend/           # NestJS
│   ├── src/
│   │   ├── auth/      # JWT + 2FA + OAuth
│   │   ├── users/     # Profiles
│   │   ├── games/     # Game registry + engine
│   │   ├── wallet/    # Financial system
│   │   ├── tournaments/
│   │   ├── social/    # Friends, chat, notifications
│   │   ├── rewards/   # XP, badges, daily rewards
│   │   ├── marketplace/
│   │   ├── admin/     # Admin dashboard APIs
│   │   ├── security/  # Rate limiting, fraud detection
│   │   └── gateway/   # WebSocket gateway
└── docker-compose.yml
