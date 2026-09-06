# Cafe Street

A mini e-commerce website for a coffee shop, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Product Browsing** - Browse 12 products across hot coffee, cold coffee, and food categories
- **Search & Filter** - Search by name, filter by category, sort by name or price
- **Shopping Cart** - Add/remove items, update quantities, view order summary
- **User Authentication** - Register and login with session management via localStorage
- **Admin Dashboard** - Manage products, users, and orders (admin role required)
- **Responsive Design** - Mobile-friendly layout across all pages

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with hero section, popular products carousel, categories, and testimonials |
| `products.html` | Product listing with search, category filter, and sort controls |
| `about.html` | Company info, vision/mission, values, and contact details |
| `cart.html` | Shopping cart with quantity controls and order summary |
| `dashboard.html` | Admin panel for managing products, users, and orders |
| `login.html` | User login form |
| `register.html` | User registration form |

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, Media Queries, Transitions)
- Vanilla JavaScript (ES Modules)
- Font Awesome 6.5.1 (icons)
- Google Fonts (Plus Jakarta Sans)
- localStorage for data persistence

## File Structure

```
├── index.html
├── products.html
├── about.html
├── cart.html
├── dashboard.html
├── login.html
├── register.html
├── css/
│   ├── style.css          # Global shared styles
│   ├── home.css
│   ├── products.css
│   ├── about.css
│   ├── cart.css
│   ├── dashboard.css
│   └── auth.css
├── js/
│   ├── data.js            # Initial product and user data
│   ├── navbar.js          # Dynamic navbar (auth state, admin link)
│   ├── home.js            # Home page logic
│   ├── products.js        # Products page filtering/sorting
│   ├── cart.js            # Cart management and order creation
│   ├── dashboard.js       # Admin CRUD operations
│   ├── login.js           # Login form handler
│   ├── register.js        # Registration form handler
│   └── utils/
│       ├── auth.js        # Login, register, logout, session management
│       ├── cartUtility.js # Cart CRUD operations
│       └── productUtility.js # Product CRUD and filtering
└── assets/
    └── images/
        ├── logo/
        ├── hero/
        ├── products/
        └── about-us/
```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a browser

No build tools or server required - the site runs entirely from static files.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | ahmed@cafestreet.com | 123456 |
| Customer | sara@cafestreet.com | 123456 |

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Brown | `#2c1810` | Primary text, dark backgrounds |
| Orange | `#e37f30` | Accent, buttons, highlights |
| Warm Beige | `#f5ebdb` | Header background |
| Light Cream | `#f9f5f0` | Card backgrounds |
| Off White | `#faf6f0` | Auth page backgrounds |
