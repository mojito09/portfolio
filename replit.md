# Mohit Jain Portfolio

## Overview

This is a personal portfolio website for Mohit Jain, an AI Product & Growth Operator. The site showcases professional experience, proof of work, and contact information through an interactive, animated single-page application. It features work history at companies like CHOMP and Tezos India, with visual galleries of events and project screenshots.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for interactive animations and transitions
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Hot module replacement via Vite middleware
- **Production**: Static file serving from built assets

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Current Schema**: Basic users table with id, username, password
- **Storage Interface**: Abstracted through `IStorage` interface in `server/storage.ts`
- **Development Mode**: In-memory storage (`MemStorage`) for quick iteration

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data access layer
├── shared/           # Shared types and schemas
└── attached_assets/  # Static images and media
```

### Build System
- **Development**: `tsx` for TypeScript execution with Vite dev server
- **Production**: Custom build script using esbuild for server and Vite for client
- **Output**: Bundled to `dist/` directory with server as CommonJS

## External Dependencies

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled primitives (dialog, dropdown, tooltip, etc.)
- **shadcn/ui**: Pre-configured component library built on Radix
- **Lucide React**: Icon library

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **connect-pg-simple**: PostgreSQL session store for Express

### Animation & Interactivity
- **Framer Motion**: Animation library for React
- **Embla Carousel**: Carousel/slider functionality

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **drizzle-zod**: Zod schema generation from Drizzle schemas

### Development Tools
- **Vite**: Build tool and dev server
- **Replit Plugins**: Custom Vite plugins for Replit environment (cartographer, dev-banner, runtime-error-modal)