const firstMiddle = (req, res, next) => {
  console.log("hello from middleware", new Date().toTimeString());
  next();
};

const bodyLooger = (req, res, next) => {
  //patikrinti ar route metodas yra PUT, POST arba patch

  // if (req.method === "PUT" || req.method === "POST" || req.method === "PATCH") {
  //   console.log(req.body);
  // }

  if (["PUT", "POST", "PATCH"].includes(req.method)) {
    console.log(req.body);
  }
  console.log(req.method);
  next();
};

const validateUser = (req, res, next) => {
  const { name, town, isDriver } = req.body;
  if (name.trim().length === 0) {
    res.status(400).json({
      field: "name",
      error: "name required field",
    });
    return;
  }
  if (town.trim().length === 0) {
    res.status(400).json({
      field: "town",
      error: "town required field",
    });
    return;
  }
  if (name.trim().length < 3) {
    res.status(400).json({
      field: "name",
      error: "name must be 3 letters or more",
    });
    return;
  }
  //klaidu nera
  next();
};

module.exports = {
  firstMiddle: firstMiddle,
  bodyLooger,
  validateUser,
};
