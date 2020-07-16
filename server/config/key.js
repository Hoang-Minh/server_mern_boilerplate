const environment = require("../environment");

if (environment === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
