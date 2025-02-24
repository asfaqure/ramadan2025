# Ramadan and Iftar Calendar - Landås Mosque

A web application for managing Iftar registrations during Ramadan at Landås Mosque.

## Features

- Interactive calendar for Ramadan 2025 (March 1-30)
- Registration system for hosts and attendees
- Prayer times display (Suhoor and Iftar)
- Admin dashboard with registration management
- Export registrations to CSV

## Deployment on Replit

1. Fork this Replit project to your account

2. Set up environment variables in Replit:
   - Click on "Tools" in the left sidebar
   - Select "Secrets"
   - Add the following secrets:
     ```
     SESSION_SECRET=your-secure-random-string
     ```

3. Deploy:
   - Click on "Deploy" in the top navigation
   - Select "Deploy to Replit"
   - Your app will be deployed and accessible via the provided URL

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Admin Access

- Access the admin dashboard at `/admin`
- Default password: `aman1234`
- From the admin panel you can:
  - View all registrations
  - Delete registrations
  - Export data to CSV

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Drizzle ORM
- Express.js

## Support

For any issues or questions, please contact the mosque at:
- Address: Erleveien 14-18, Bergen, Norway
- Phone: 40606051
