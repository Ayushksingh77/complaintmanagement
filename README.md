# PrimeVacation Complaint Management App

A modern web application for submitting and managing complaints, featuring a beautiful UI, MongoDB Atlas integration, and email notifications.

---

## 🚀 Features
- Users can submit complaints (title, description, category, priority)
- Admins can view, filter, update, and delete complaints
- Email notifications on new complaint and status update
- Responsive, modern UI (MUI, animated background, glassmorphism)
- MongoDB Atlas for data storage

---

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier is fine)
- (Optional) [Vercel account](https://vercel.com/) for deployment

---

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/primevacation.git
   cd primevacation/complaintmanagement
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a file named `.env.local` in the `complaintmanagement` directory.
   - Add the following (replace with your actual values):
     ```env
     MONGODB_URI=your_mongodb_atlas_connection_string
     EMAIL_USER=your_gmail_address@gmail.com
     EMAIL_PASS=your_gmail_app_password
     ADMIN_EMAIL=admin_email_to_notify@gmail.com
     ```
   - **How to get these values:**
     - See the sections below for MongoDB Atlas and Gmail App Password setup.

---

## 🌐 MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free cluster.
2. Create a database user and password (Database Access > Add New Database User).
3. In Network Access, add IP address `0.0.0.0/0` (for development/testing).
4. Click "Connect" > "Drivers" and copy the connection string. Replace `<username>` and `<password>` with your database user credentials, and add your database name (e.g., `primevacation`).
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/primevacation?retryWrites=true&w=majority
   ```

---

## ✉️ Email (Gmail App Password) Setup
1. Enable 2-Step Verification on your Google account.
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
3. Generate an App Password for "Mail" and copy it.
4. Use this as `EMAIL_PASS` in your `.env.local` file.

---

## ▶️ Running the App Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser:
   - User: [http://localhost:3000/](http://localhost:3000/)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## ☁️ Deploying to Vercel
1. Push your code to GitHub.
2. Import the repo into [Vercel](https://vercel.com/).
3. In Vercel dashboard, set the same environment variables as above.
4. Deploy!

---

## 🖥️ Usage
- **User Interface:**
  - Fill out the complaint form and submit.
  - You’ll see a success message if the complaint is submitted.
- **Admin Interface:**
  - Go to `/admin` to view, filter, update, or delete complaints.
  - Status changes and new complaints trigger email notifications to the admin.

---

## 📸 Screenshots
_Add screenshots of the user and admin interfaces here._

---

## 📄 License
MIT
