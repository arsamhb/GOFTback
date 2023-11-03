
const allowedOrigins = [];

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) === -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("error by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOption;
