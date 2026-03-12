# 🛒 ShopVerse (Frontend)

The client-side application for **ShopVerse**, a premium e-commerce platform. This project features a custom-designed, responsive interface built with React.js, focusing on a high-quality user experience and a powerful administrative suite.

## 🚀 Live Demo

**Frontend URL:** [Insert your Vercel/Netlify Link Here]  
**Backend API (Deployed on Render):** `https://mernshoppingbackend-ygpp.onrender.com`

---

## ✨ Key Features

### 🛍️ User Interface

- **Custom Branding:** Modern orange-and-white theme (`#ff7011`) matching professional e-commerce standards.
- **Dynamic Product Discovery:** \* Category-based filtering (Fruits, Grocery, Electronics, Books, etc.).
  - Real-time search bar for instant product lookups.
  - Price sorting (Low to High / High to Low).
- **Shopping Cart:** Fully functional cart management using React Context API for persistent state.
- **Responsive Design:** Optimized for a seamless experience across mobile, tablet, and desktop devices.

### 🛠️ Admin Features

- **Inventory Management:** Specialized UI for adding new products with automated discount logic.
- **Order Dashboard:** Real-time monitoring of customer orders and delivery status.
- **Secure Access:** Protected routes ensuring only authorized users can access the admin dashboard.

---

## 🛠️ Tech Stack

- **Core Library:** React.js
- **Routing:** React Router DOM (v6)
- **State Management:** Context API
- **Styling:** Modular CSS3 (Custom properties for branding)
- **Icons:** React Icons (FontAwesome, Feather, and IcoMoon)
- **Deployment:** Vercel

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [your-repo-link]
    cd [your-folder-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your backend base URL:

    ```env
    VITE_API_URL=[https://mernshoppingbackend-ygpp.onrender.com/api](https://mernshoppingbackend-ygpp.onrender.com/api)
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

- `src/components` - Reusable UI elements like Navbar, Footer, and Product Cards.
- `src/pages` - Main views (Home, UserDashboard, AdminDashboard, AddProduct).
- `src/context` - State management for the Shopping Cart and Authentication.

---

---

© 2026 ShopVerse. All rights reserved.
