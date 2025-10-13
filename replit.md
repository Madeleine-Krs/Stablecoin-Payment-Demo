# Stablecoin Payment Demo

## Overview

This is a Next.js-based demo application that simulates a stablecoin payment flow for merchants. The application allows users to select a stablecoin (USDC, USDT, or DAI), input a payment amount, and submit a mock transaction. It demonstrates how merchants could integrate stablecoin payments via API, complete with live price data fetching from CoinGecko and transaction confirmation displays.

## Recent Changes

**October 13, 2025** - Added live cryptocurrency price feature:
- Created `/api/prices` endpoint that fetches real-time USD prices for USDC, USDT, and DAI from CoinGecko API
- Built `PriceDisplay` component showing live exchange rates with auto-refresh every 60 seconds
- Enhanced `PaymentForm` to calculate and display USD equivalent based on live prices
- All components include proper error handling and fallback values
- No API key required - using CoinGecko's free public API (30 calls/minute limit)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js with TypeScript using the Pages Router pattern

The application uses a component-based architecture with React, structured around three main UI components:

1. **PaymentForm** - Handles user input for payment amount and stablecoin selection, displays real-time USD equivalent calculations
2. **TransactionCard** - Displays transaction confirmation details after payment submission
3. **PriceDisplay** - Shows live cryptocurrency prices with periodic updates

**UI Library**: Material-UI (MUI) v7 is used for styled components, providing pre-built form elements, buttons, and layout components. The application also includes TailwindCSS configuration, though MUI appears to be the primary styling solution.

**State Management**: Local React state using `useState` hooks for managing form inputs, transaction data, and price information. No global state management library is implemented.

**Styling Approach**: Hybrid approach combining Material-UI's sx prop styling with global CSS files. Custom CSS modules are available but primarily MUI components handle styling.

### Backend Architecture

**API Routes**: Next.js API routes handle backend logic with two main endpoints:

1. **/api/pay** - Mock payment processing endpoint that generates fake transaction hashes and confirmation data. Returns transaction status, hash, and fee information without actual blockchain interaction.

2. **/api/prices** - Cryptocurrency price fetching endpoint that integrates with CoinGecko's public API to retrieve real-time USD prices for USDC, USDT, and DAI.

**Request Flow**: Client-side forms submit POST requests to API routes, which process data and return JSON responses. Price data is fetched via GET requests with automatic polling every 60 seconds.

**Error Handling**: Basic try-catch blocks with fallback values for price data. Console logging for debugging errors.

### External Dependencies

**Third-Party APIs**:
- **CoinGecko API** - Free cryptocurrency price data API used to fetch real-time USD values for stablecoins (USDC, USDT, DAI). No authentication required for basic usage.

**NPM Packages**:
- **Next.js** (v15.2.3) - React framework for server-side rendering and API routes
- **React** (v19) - UI library for component development
- **Material-UI** (@mui/material v7.3.2) - Component library for pre-styled UI elements
- **Emotion** (@emotion/react, @emotion/styled) - CSS-in-JS styling solution required by MUI
- **TailwindCSS** (v4) - Utility-first CSS framework (configured but appears secondary to MUI)

**Development Tools**:
- TypeScript for type safety
- ESLint with Next.js configuration for code quality
- Replit-specific configuration for development environment

**Deployment Considerations**: The application is configured for Replit deployment with custom port (5000) and hostname settings. The Next.js configuration includes allowed dev origins for Replit domains.

**Data Flow**: The application operates entirely client-side with no database persistence. All transactions are mock data generated at runtime. Price data is cached in component state and refreshed periodically.