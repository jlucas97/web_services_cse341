const tonyRoute = (req, res) => {
  res.send("Tony");
}

const janaRoute = (req, res) => {
  res.send("Jana");
}

const home = (req, res) => {
  res.send("Hello World!");
};

module.exports = { tonyRoute, janaRoute, home };

