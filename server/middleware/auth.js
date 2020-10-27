const admin = require("../firebase");
const User = require("../models/user");
exports.authCheck = async (req, res, next) => {
  // console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log(firebaseUser);
    req.user = firebaseUser;
    // console.log(firebaseUser.email);
  } catch (err) {
    // console.log(err);
    return res.status(401).json({
      err: "Invalid or Expired Token",
    });
  }
  next();
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    return res.status(403).json({
      err: "Admin Resource. Access Denied",
    });
  } else {
    next();
  }
};
