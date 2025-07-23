# PrimeVacation Complaint Management App

## Features

- Users can submit complaints (title, description, category, priority)
- Admins can view, filter, update, and delete complaints
- Email notifications on new complaint and status update
- Responsive UI (MUI)
- MongoDB for data storage

## Setup

1. Clone the repo and install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file (see `.env.example`).

3. Run the app:
   ```
   npm run dev
   ```

4. Visit:
   - User: [http://localhost:3000/](http://localhost:3000/)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Email Setup

- Uses Gmail SMTP by default.
- Set `EMAIL_USER`, `EMAIL_PASS`, and `ADMIN_EMAIL` in `.env.local`.
- For Gmail, you may need an App Password.

## MongoDB Setup

- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB.
- Set `MONGODB_URI` in `.env.local`.

## Deployment

- Deploy on [Vercel](https://vercel.com/) or [Heroku](https://heroku.com/).
- Set environment variables in the deployment dashboard.

## Screenshots

_Add screenshots here after running the app._

## License

MIT
