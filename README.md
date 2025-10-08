# LA_OLUXE

Monorepo for an e-commerce platform consisting of:

- **Backend** (Node.js/Express + MongoDB + Cloudinary) – Product & User APIs, authentication, media upload.
- **Frontend** (Vite + React) – Customer-facing storefront (work in progress here).
- **admin** (Vite + React) – Admin dashboard for managing products (work in progress here).

> The current `main` branch contains the `la_oluxe` code snapshot you wanted preserved. Previous main code was backed up in the branch `main-backup`.

---
## ✨ Features (Implemented Backend)
- User registration & login (JWT)
- Admin login (separate credential check)
- Product CRUD (currently: add, list, remove, get single)
- Multiple product image upload via `multer`
- Cloud image hosting via Cloudinary
- MongoDB persistence (Mongoose models)
- Input validation & password hashing (validator + bcrypt)

---
## 📁 Repository Structure
```
LA_OLUXE/
  Backend/
    config/        # DB & cloud configs
    controllers/   # Business logic for users/products
    middleware/    # Auth + multer upload
    models/        # Mongoose schemas
    routes/        # Express routers
    server.js      # App bootstrap
  Frontend/        # Storefront React app (Vite)
  admin/           # Admin dashboard React app (Vite)
  .gitignore
  README.md
```

---
## 🔧 Backend Tech Stack
| Layer        | Tool / Library |
|--------------|----------------|
| Runtime      | Node.js (ES Modules) |
| Framework    | Express |
| Database     | MongoDB (Mongoose) |
| Auth         | JSON Web Tokens (jsonwebtoken) |
| Passwords    | bcrypt |
| Validation   | validator |
| File Upload  | multer |
| Media CDN    | Cloudinary |
| Env Config   | dotenv |
| Dev Reload   | nodemon |

---
## 🚀 Getting Started (Backend)
### 1. Clone & Install
```bash
git clone https://github.com/milindasandaru/LA_OLUXE.git
cd LA_OLUXE/Backend
npm install
```
### 2. Environment Variables
Create a `.env` file inside `Backend/`:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRETE_KEY=your_cloudinary_secret
```
> Note: In `cloudinary.js` the keys are named `cloude_name` / `api_secrete` – consider correcting those to `cloud_name` / `api_secret` for clarity.

### 3. Run the API
Development (with auto-reload):
```bash
npm run server
```
Production style:
```bash
npm start
```
Server default: http://localhost:4000

---
## 🔐 Auth Flow
- User registration & login return a JWT token: `{ success: true, token }`.
- Admin login checks email & password against environment variables and issues a token signed with `JWT_SECRET`.
- Admin-only routes use the `adminAuth` middleware (expects `token` in `headers`).

---
## 🧪 API Endpoints
Base URL: `http://localhost:4000`

### Health
`GET /` → `API Working!`

### User Routes (`/api/user`)
| Method | Endpoint    | Body                                   | Description |
|--------|-------------|----------------------------------------|-------------|
| POST   | /register   | `name, email, password`                | Register new user |
| POST   | /login      | `email, password`                      | User login |
| POST   | /admin      | `email, password`                      | Admin login |

### Product Routes (`/api/product`)
| Method | Endpoint | Body / Form Data | Auth | Description |
|--------|----------|------------------|------|-------------|
| POST   | /add     | multipart form: `name, description, price, category, subCategory, sizes (JSON array as string), bestseller ("true"/"false"), image1..image4` | Admin token in `headers.token` | Add new product w/ up to 4 images |
| POST   | /remove  | `{ id }`         | Admin token | Remove product by ID |
| POST   | /single  | `{ productId }`  | None | Get single product |
| GET    | /list    | —                | None | List all products |

---
## 🗄️ Data Models
### User (`models/userModel.js`)
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String (bcrypt hashed),
  cartData: Object (default {})
}
```
### Product (`models/productModel.js`)
```js
{
  name: String,
  description: String,
  price: Number,
  image: [String], // Cloudinary URLs
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: Boolean,
  date: Number (timestamp)
}
```

---
## 📦 Scripts (Backend/package.json)
| Script  | Command           | Purpose |
|---------|-------------------|---------|
| start   | `node server.js`  | Run server in production mode |
| server  | `nodemon server.js` | Dev mode with reload |

---
## 🛡️ Notes & Potential Improvements
- Add rate limiting (e.g. `express-rate-limit`).
- Add request validation (e.g. `zod` / `joi`).
- Add refresh tokens / token expiry handling.
- Enhance error responses with HTTP status codes instead of generic JSON.
- Implement product update endpoint.
- Implement user profile & cart operations (add/remove items).
- Secure multer uploads (currently stores with original filename).
- Sanitize & restrict Cloudinary upload folder.
- Fix typos in `cloudinary.js` keys (`cloude_name` → `cloud_name`, `api_secrete` → `api_secret`).
- Consider separating environment handling per app (admin/frontend/backend).

---
## 🧩 Frontend & Admin (Overview)
Both `Frontend/` and `admin/` are Vite + React projects. Typical usage:
```bash
cd Frontend
npm install
npm run dev

cd ../admin
npm install
npm run dev
```
Configure API base URL in those apps (not shown here—add a centralized config file, e.g. `src/config/api.js`).

---
## 🔁 Branching & History
- Current production base: `main` (restored from historical code after backup).
- Feature snapshot you wanted preserved: `la_oluxe` and (if created) `la_oluxe-saved`.
- Previous main retained at: `main-backup` (do not delete until fully sure).

Suggested workflow:
1. Create feature branches from `main`.
2. Open Pull Requests (PRs) into `main`.
3. Tag releases: `git tag -a v0.1.0 -m "Initial backend"`.

---
## 🧪 Quick Test (Manual)
```bash
curl http://localhost:4000/
# -> API Working!

curl -X POST http://localhost:4000/api/user/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---
## 🤝 Contributing
1. Fork & clone
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add new feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---
## 🛠 Troubleshooting
| Issue | Fix |
|-------|-----|
| `DB Connected!` never appears | Check `MONGODB_URI`, ensure MongoDB service running |
| Cloudinary upload errors | Verify API keys & fix key name typos in config |
| `Not Authorized Login Again!` | Ensure `token` header is set with admin login token |
| Images not saving | Ensure multipart form names: image1, image2, image3, image4 |

---
## � Credits
This project was created for learning/practice by following the GreatStack YouTube tutorial.

**Original Tutorial Author:** GreatStack  
**Video:** https://youtu.be/7E6um7NGmeE?si=JGln3OmONxHXOf80

All core structural ideas for the initial implementation (project setup, component flow, and general architecture) were inspired by the above tutorial. Any further modifications, restructuring, or added features beyond the tutorial are adaptations for personal learning.

If you use this code publicly, please also credit GreatStack and link back to the original video.

---
## 🙌 Acknowledgements
- Express & MongoDB ecosystem
- Cloudinary for media hosting
- Vite for fast frontend development

---

## Thanks for watching! ❤️