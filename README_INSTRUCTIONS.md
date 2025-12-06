# Calistenia Elite Sales Funnel

This is a Next.js application implementing the "Calistenia Elite" sales funnel with a premium Dark/Gold theme.

## Setup

1. Navigate to the project directory:
   ```bash
   cd calistenia-elite
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/data/chatData.ts`: Contains the parsed conversation flow and strict message segmentation.
- `src/components/ChatEngine.tsx`: Core logic for the chat interface, handling typing effects, variables, and state.
- `src/app/globals.css`: Implementation of the "Calistenia Elite" theme using Tailwind CSS v4 variables.
- `src/app/page.tsx`: Entry point.

## Features

- **Strict Message Segmentation**: 1-to-1 mapping from source text.
- **Dynamic Variables**: Captures Name, Age, Weight, Goal and injects them into text (e.g. `{{nome}}`).
- **Typing Animation**: Simulates real conversation.
- **Responsive Design**: Mobile-first premium layout.
- **Logic**: Linear flow with input validation and conditional interactions.
