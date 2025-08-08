import multer from "multer";
import path from "path"; // Node.js 'path' module to work with file paths
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url"; // convert file URL to path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
        false
      );
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("image");

const computeHash = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

const handleImageUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return next();

    const hash = computeHash(req.file.buffer);
    const ext = path.extname(req.file.originalname);
    const filename = `${hash}${ext}`;
    const uploadDir = path.join(__dirname, "../uploads");
    const fullPath = path.join(uploadDir, filename);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, req.file.buffer);
    }

    req.file.filename = filename;
    next();
  });
};

export default handleImageUpload;

/*

import.meta.url gives you the file URL of the current module (e.g., file:///C:\Users\sibin\OneDrive\Desktop\blog\server\middleware\image.js).
fileURLToPath() converts that file URL to a regular file path (e.g., C:\Users\sibin\OneDrive\Desktop\blog\server\middleware

__filename	C:\Users\sibin\Desktop\blog\server\middleware\image.js
__dirname	C:\Users\sibin\Desktop\blog\server\middleware
uploadDir	C:\Users\sibin\Desktop\blog\server\uploads

__filename → full file path (including the file name)
__dirname → just the folder path

 */
