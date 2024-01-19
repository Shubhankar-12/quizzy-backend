const adminMiddleware = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ error: 'Permission denied. Only admins can perform this action.' });
    }
};

export default adminMiddleware;