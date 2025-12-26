# DailyHub

A server-side first web application built with [IonBeam](https://www.npmjs.com/package/ionbeam) - a pure React SSR framework with automatic asset hashing and CSS modules.

## Features

- Server-side rendering with React
- TypeScript support
- CSS Modules with automatic scoping
- Hot module replacement in development
- Automatic asset hashing for optimal caching

## Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified by IonBeam).

### Build

Create a production build:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Project Structure

```
dailyhub/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── HomePage.module.css
│   │   ├── AboutPage.tsx
│   │   └── AboutPage.module.css
│   ├── styles/          # Global styles
│   │   └── global.css
│   └── index.tsx        # Application entry point with routes
├── package.json
├── tsconfig.json
└── README.md
```

## Routes

- `/` - Home page
- `/about` - About page

## Technologies

- [IonBeam](https://www.npmjs.com/package/ionbeam) - React SSR framework
- React 19
- TypeScript
- CSS Modules
