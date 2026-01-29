import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Admin not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // optional: if you store role inside token
    // if (decoded.role !== "admin") {
    //   return res.json({ success: false, message: "Not an admin" });
    // }

    req.admin = { id: decoded._id };
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid admin token" });
  }
};

export default adminAuth;
