frontend/
│
├── index.html
├── package.json
├── .gitignore
│
└── src/
    │
    ├── index.jsx               # React entry point (ReactDOM.createRoot)
    ├── App.jsx                 # Root component (routes + layout)
    │
    ├── assets/                 # Static assets
    │   ├── images/
    │   │   ├── hero/
    │   │   ├── menu/
    │   │   └── icons/
    │   ├── fonts/
    │   └── logo.svg
    │
    ├── components/             # Reusable UI components
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Loader.jsx
    │   │   └── Modal.jsx
    │   │
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Footer.jsx
    │   │   └── MainLayout.jsx
    │   │
    │   └── menu/
    │       ├── MenuCard.jsx
    │       ├── MenuList.jsx
    │       └── CategoryFilter.jsx
    │
    ├── pages/                  # Route-level pages
    │   ├── Home/
    │   │   ├── Home.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── FeaturedMenu.jsx
    │   │   └── home.css
    │   │
    │   ├── Menu/
    │   │   ├── Menu.jsx
    │   │   └── menu.css
    │   │
    │   ├── About/
    │   │   └── About.jsx
    │   │
    │   ├── Contact/
    │   │   └── Contact.jsx
    │   │
    │   └── NotFound.jsx
    │
    ├── context/                # Global state (React Context)
    │   ├── CartContext.jsx
    │   ├── UserContext.jsx
    │   └── ThemeContext.jsx
    │
    ├── hooks/                  # Custom hooks
    │   ├── useFetch.js
    │   ├── useDebounce.js
    │   └── useLocalStorage.js
    │
    ├── services/               # API communication layer
    │   ├── apiClient.js        # axios / fetch wrapper
    │   ├── menuService.js
    │   └── bookingService.js
    │
    ├── utils/                  # Helper functions
    │   ├── constants.js
    │   ├── formatPrice.js
    │   ├── validators.js
    │   └── storage.js
    │
    ├── routes/                 # Route definitions
    │   └── AppRoutes.jsx
    │
    ├── styles/                 # Global styles
    │   ├── global.css
    │   ├── variables.css
    │   └── reset.css
    │
    └── config/                 # App configuration
        ├── env.js
        └── appConfig.js
