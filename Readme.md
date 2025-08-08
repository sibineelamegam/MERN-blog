

````markdown
# 💻 Full-Stack MERN Blog Application

### **Project Overview**

This is a full-stack application for managing and viewing blog posts, built with the MERN stack. It includes a secure admin panel for content creators and a public-facing user portal for readers.

The backend server runs on port **5000**.
The user portal runs on port **5173**.
The admin panel runs on port **5174**.

---

## ✨ Features & Technology

### Backend
* **Node.js & Express:** The server-side environment and web framework.
* **MongoDB (via Mongoose):** A NoSQL database for storing blog post data.
* **JSON Web Tokens (JWT):** Used for secure authentication of admin users.
* **Static File Uploads:** Handles image uploads for blog posts.

### Frontend
* **React with Vite:** A fast and modern JavaScript library for building user interfaces.
* **React Router:** For handling navigation within the applications.
* **Axios:** A promise-based HTTP client for making API requests.
* **Material-UI (MUI):** A popular React UI framework for a polished design.
* **Ports:** The user portal runs on **5173** and the admin panel runs on **5174**.

---

## 🚀 Project Structure

The project is divided into three main parts: a server and two distinct React client applications.

* `server/`: The Node.js/Express backend that manages all API requests and database interactions.
* `client/user-portal/`: The public-facing React application where users can view blog posts.
* `client/admin-panel/`: The secure, authenticated React application for administrators to manage blog content.

---

## ⚙️ Getting Started

Follow these steps to set up and run the entire project on your local machine.

### Step 1: Server Setup

1.  Navigate into the server directory:
    ```bash
    cd server
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Add `"type": "module"` to your `package.json` file to enable ES module syntax.
4.  Create a `.env` file in the `server` directory and add your configuration details:
    ```env
    PORT=5000
    DB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/...
    ACCESS_TOKEN_SECRET=your_access_token_secret_key
    REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
    NODE_ENV=development
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

---

### Step 2: User Portal Setup

1.  Navigate to the user portal directory:
    ```bash
    cd ../client/user-portal
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file for the API configuration:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
4.  Start the user portal:
    ```bash
    npm run dev
    ```

---

### Step 3: Admin Panel Setup

1.  Navigate to the admin panel directory:
    ```bash
    cd ../admin-panel
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file for the API configuration:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
4.  Start the admin panel:
    ```bash
    npm run dev
    ```

---

## 📡 API Endpoints

The server provides a RESTful API with the following endpoints:

### Public Endpoints
| Method | Endpoint        | Description                      |
| :----- | :-------------- | :------------------------------- |
| `GET`  | `/api/posts`    | Retrieve a list of all blog posts. |
| `GET`  | `/api/posts/:id`| Retrieve a single blog post by ID. |

### Admin Endpoints (Secured)
These routes require a valid JWT access token.
| Method | Endpoint              | Description                 | Middleware |
| :----- | :-------------------- | :-------------------------- | :--------- |
| `POST` | `/api/admin/login`    | Log in an administrator.    | None       |
| `GET`  | `/api/admin/refresh`  | Refresh an expired token.   | None       |
| `POST` | `/api/admin/logout`   | Log out an administrator.   | None       |
| `POST` | `/api/posts`          | Create a new blog post.     | `verifyJwt`, `verifyRole`, `upload` |
| `PUT`  | `/api/posts/:id`      | Update an existing post.    | `verifyJwt`, `verifyRole`, `upload` |
| `DELETE`| `/api/posts/:id`     | Delete a blog post.         | `verifyJwt`, `verifyRole` |
````
