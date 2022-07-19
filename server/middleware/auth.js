const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, "secret");
      console.log({ decodedData });
      req.userId = decodedData?.id;
    } else {
      const decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};
