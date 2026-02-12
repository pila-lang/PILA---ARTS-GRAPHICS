
# PILA ARTS & GRAPHICS

A premium artwork selling platform built with Next.js.
Features:
- **Rich Dark/Neon Aesthetics** with dynamic scroll-triggered backgrounds.
- **Categorized Artworks**: Nature, Animals, Locations, and Graphics.
- **Admin Panel** to upload artworks with category management.
- **About Me Page**: Personal details and direct contact links.
- **Customer Accounts** (Sign up/Login).
- **Shopping Cart** with WhatsApp Checkout integration.

## Getting Started

1.  **Install Dependencies** (if not already done):
    ```bash
    npm install
    ```

2.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access
- URL: `/admin/login`
- Email: `admin@pilaarts.com`
- Password: `admin123`

## Features & Usage
- **Upload Art**: Go to Admin Dashboard to upload images, set titles and prices.
- **Customers**: Can sign up, add items to cart, and checkout.
- **Checkout**: Sends order details directly to your WhatsApp (0788339243).
- **Database**: Currently uses a local JSON file (`data/db.json`). 

## Deployment to Online (Production)
Since this project uses a local file system for the database and image uploads, it is best hosted on a **VPS** (Virtual Private Server) or a platform that supports persistent storage (like Render (Disk service) or DigitalOcean).
If you deploy to **Vercel**, the database and uploaded images will reset because Vercel is serverless. To run on Vercel, you should upgrade `src/lib/data.js` to use a cloud database (Supabase/Postgres) and use an image storage service (AWS S3/Cloudinary).

## Contact Config
Update `src/app/contact/page.js` and `src/app/cart/page.js` if you change your WhatsApp number.
