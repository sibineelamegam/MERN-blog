const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.role) return res.sendStatus(401); // Unauthorized
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403); // Forbidden
    next(); // Role is allowed, proceed
  };
};

export default verifyRoles;
