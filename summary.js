// =====================================================
// 🧠 Blog + Mini Task Buddy App – Project Summary
// Stack: React + Vite (2 apps) | Express | MongoDB | JWT
// =====================================================

// === 🌐 FRONTEND PROJECTS ===

// 👥 1. USER PORTAL (port 5173)
// - Public-facing site to view blog posts
// - Shows blog card: image, title, description,content, author
// - No login or editing
// - Pages:
//    - /               → blog list (cards)
//    - /post/:id       → single blog view
// - Uses API: GET /api/posts, GET /api/posts/:id

// 🛠️ 2. ADMIN PANEL (port 5174)
// - Secured login via JWT
// - Full blog CRUD (Create, Read, Update, Delete)
// - Pages:
//    - /login          → Admin login
//    - /dashboard      → Blog table (with Edit/Delete buttons)
//    - /create         → Create new blog
//    - /edit/:id       → Edit blog
// - Uses API: /api/login, /api/posts...

// === 🗃️ BACKEND (Node + Express) ===
// - Login with JWT
// - Blog post management
// - Custom blog ID with prefix (e.g., b1, b2...)
// - Uses MongoDB with 2 models:
//    - Blog: { id, title, description, content, image, author }
//    - User: { username, passwordHash }
//    - Counter: { name: "blog", seq: 1 }

// === 📦 REQUIRED NPM PACKAGES ===

// 🔧 Backend:
// express
// mongoose
// cors
// dotenv
// bcryptjs
// jsonwebtoken
// multer                 // (for image upload, optional)
// nodemon              // (for dev auto-reload)

// ✨ Frontend (user portal & admin panel):
// axios
// react-router-dom

// === 🛠️ Sample Scripts ===

// Create Vite Projects:
// npx create-vite@latest user-portal --template react
// cd user-portal && npm install && npm run dev -- --port 5173

// npx create-vite@latest admin-panel --template react
// cd admin-panel && npm install && npm run dev -- --port 5174

// Create Express Backend:
// mkdir backend && cd backend
// npm init -y
// npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer nanoid

// === ✅ Tips ===
// - Use custom hook (useBlogApi.js) to centralize all API logic
// - Admin buttons (Edit/Delete) should call update/delete APIs
// - Use Counter model to generate auto-incremented blog IDs like "b1", "b2"
// - Serve images statically or as base64

// === 📌 Next Steps ===
// 1. Scaffold backend (models + routes)
// 2. Set up user portal (5173)
// 3. Set up admin panel (5174)
// 4. Connect API using custom hook in both projects
// 5. Secure admin routes with JWT
