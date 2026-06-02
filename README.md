# BookHive Library Management System

BookHive is a modern library management web application built with Next.js. It provides a polished public book browsing experience, Firebase authentication, role-based dashboards, admin book/user management, borrowing workflows, wishlists, and visual dashboard analytics.


## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui styling
- Firebase Authentication
- TanStack React Query
- Axios
- Recharts
- Lucide React
- Sonner and SweetAlert2
- ImgBB image upload

## Features

- Email/password authentication
- Google authentication
- Admin quick login button
- Role-based dashboard home
- Admin statistics cards and charts
- User reading statistics cards and charts
- Recent user borrow history
- Manage users and update user roles
- Add, edit, and delete books
- Browse all books and book details
- Borrow books with return dates
- Return borrowed books from dashboard
- Wishlist support
- Responsive light/dark themed UI
- Toast and modal feedback for important actions

## Demo Credentials

Admin account:

```txt
Email: admin@bookhive.com
Password: admin@bookhive.comKk
```

The login page also includes a **Login as Admin** button that signs in with this account.


## Environment Variables

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

Current secure API calls are configured in `src/hooks/useAxiosSecure.jsx`. For local development it uses:

```js
baseURL: "http://localhost:5000"
```

Update that value if your backend is deployed.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after building.

```bash
npm run lint
```

Runs ESLint checks.

## Main Routes

- `/` - Home page
- `/auth/login` - Login page
- `/auth/register` - Register page
- `/all-books` - All books
- `/books/:id` - Book details
- `/dashboard` - Role-based dashboard overview
- `/dashboard/manage-users` - Admin user management
- `/dashboard/add-book` - Admin add book
- `/dashboard/manage-books` - Admin book management
- `/dashboard/borrowed-books` - User borrowed books
- `/dashboard/profile-setting` - Profile settings

## Project Structure

```txt
src/
  app/                 Next.js app routes and layouts
  assets/              Static assets
  components/          Reusable UI and feature components
  context/             Auth context provider
  Firebase/            Firebase client configuration
  hooks/               Custom hooks for auth, role, and axios
  lib/                 Utility helpers
```

## Notes

- This project uses Firebase auth tokens for secure API requests.
- Admin and user dashboard stats are fetched with TanStack Query.
- Chart components use Recharts through a shadcn-style chart wrapper.
- Image upload uses ImgBB, so `NEXT_PUBLIC_IMGBB_API_KEY` is required for book image uploads.
- Make sure the backend server is running before testing protected dashboard features.
