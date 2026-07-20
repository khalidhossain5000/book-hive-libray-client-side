# 📚 BookHive - A Smarter Way to Manage Your Library

## 📖 Overview

BookHive is a full-stack library management platform offering a polished public book browsing experience alongside Firebase authentication and role-based dashboards. Admins can manage the book catalog and users, while members can borrow books, track return dates, and maintain a personal wishlist — all backed by visual analytics dashboards for both admins and users.

---

## 🚀 Live Site

🔗 **[book-hive-library-management-system.vercel.app](https://book-hive-library-management-system.vercel.app/)**

---

## 🖼️ Screenshot

<p align="center">
  <img src="./public/book-hive.png" alt="BookHive Screenshot" width="850">
</p>

---

## ⚙️ Installation & Setup Guide

### Prerequisites
- **Node.js** (v16 or above) — [Download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- A **Firebase project** with Authentication enabled
- An **ImgBB API key** for image uploads
- Backend server running (for protected dashboard features)

### 1. Clone the Repository
```bash
git clone https://github.com/khalidhossain5000/book-hive-libray-client-side.git
cd book-hive-libray-client-side
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_apiKey=your_firebase_api_key
NEXT_PUBLIC_authDomain=your_firebase_auth_domain
NEXT_PUBLIC_projectId=your_firebase_project_id
NEXT_PUBLIC_storageBucket=your_firebase_storage_bucket
NEXT_PUBLIC_messagingSenderId=your_firebase_messaging_sender_id
NEXT_PUBLIC_appId=your_firebase_app_id
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
PRODUCTION_URL=https://your-server-url.com
```
> Secure API calls are configured in `src/hooks/useAxiosSecure.jsx`. For local development it uses `baseURL: "http://localhost:5000"` — update this if your backend is deployed elsewhere.

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Open in Browser
```
http://localhost:3000
```

Your app should now be running locally! 🎉

### Other Available Scripts
```bash
npm run build   # Creates a production build
npm run start   # Starts the production server after building
npm run lint    # Runs ESLint checks
```

---

## ✨ Key Features

- 📊 **Admin analytics dashboard** — statistics cards and charts on books, users, and borrowing activity
- 📈 **Personal reading stats** — each user sees their own reading/borrowing charts
- 🕒 **Recent borrow history** tracked and displayed per user
- 👥 **User role management** — admins can promote/demote and manage user roles
- 📚 **Full book catalog control** — add, edit, and delete books from the dashboard
- 📅 **Borrow with due dates** — books are borrowed with automatic return date tracking
- ↩️ **One-click return** — return borrowed books directly from the dashboard
- ❤️ **Wishlist** — save books to read later
- 🌗 Responsive light/dark themed UI
- 🔔 Toast and modal feedback for key actions

---

## 🛠️ Main Technologies Used

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Firebase Authentication
- TanStack React Query
- Axios
- Recharts
- Lucide React
- Sonner & SweetAlert2
- ImgBB (image upload)

---

## 📦 Dependencies

```
next
react
react-dom
tailwindcss
firebase
@tanstack/react-query
axios
recharts
lucide-react
sonner
sweetalert2
clsx
tailwind-merge
class-variance-authority
tailwindcss-animate
```

---

## 🔐 Demo Credentials

**Admin account:**
```txt
Email: admin@bookhive.com
Password: admin@bookhive.comKk
```
The login page also includes a **Login as Admin** button that signs in with this account.

---

## 📝 Notes

- This project uses Firebase auth tokens for secure API requests.
- Admin and user dashboard stats are fetched with TanStack Query.
- Chart components use Recharts through a shadcn-style chart wrapper.
- Image upload uses ImgBB, so `NEXT_PUBLIC_IMGBB_API_KEY` is required for book image uploads.
- Make sure the backend server is running before testing protected dashboard features.

---

## 🔗 Repository

💻 [github.com/khalidhossain5000/book-hive-libray-client-side](https://github.com/khalidhossain5000/book-hive-libray-client-side)
