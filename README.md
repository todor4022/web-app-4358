# Peachtree Bank Transaction Management

A web application for managing financial transactions.

## Features

- **Authentication**: Simple login system with session management.
- **Transaction Dashboard**: A two-column layout providing quick access to transfers and transaction history.
- **Dynamic Transaction List**:
  - Real-time search by beneficiary or transaction type.
  - Sorting by date, beneficiary, and amount.
  - Visual status indicators: Red (Sent), Yellow (Received), Green (Payed).
- **Transaction Details**: Detailed view for individual transactions with the ability to update their status.
- **Transfer Initiation**: A persistent "Make a Transfer" form for rapid data entry.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [libsql](https://github.com/tursodatabase/libsql) (SQLite)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Runtime**: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone or download the project.
2. Install dependencies:

   ```bash
   bun install
   ```

### Database Setup

1. Push the schema to the local SQLite database:

   ```bash
   bunx drizzle-kit push
   ```
2. Seed the database with initial data:

   ```bash
   bun src/db/seed.ts
   ```

### Running the App

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000` (or `http://localhost:3001` if specified).
