import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;   // 🔥 read token from header

    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Your token payload contains _id, not id
    req.user = { id: decoded._id };

    next();
  } catch (error) {
    console.log("Auth error:", error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
