const allowedOrigins = [
  'http://localhost:5173', // User portal
  'http://localhost:5174', // Admin panel
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allow cookies/auth headers
};


/*
Internally (behind the scenes):

const requestOrigin = req.headers.origin; // e.g., "http://localhost:5173"

origin(requestOrigin, function (err, allow) {
  // if allow === true, allow the origin
  // if err is truthy, block the request
});

At this point:
- requestOrigin already has a value from the request header.
- This value is passed into your function as the 'origin' parameter.
- The 'callback' parameter holds the function that tells CORS whether to allow or block the request.
*/
