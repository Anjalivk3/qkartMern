const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.headers);
      const authHeader = req.headers.authorization

       if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
            success: false,
            message: "Invalid authorization format"
          });
        }
        
      const token = authHeader.split(" ")[1];
       if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      next();

  } catch (error) {
    return res.status(401).json({
      success:false,
      message: "Invalid or Expired Token"
    })
  }

}


module.exports = authMiddleware;