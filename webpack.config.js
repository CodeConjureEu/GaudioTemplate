const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "react-native-maps": path.resolve(
        __dirname,
        "../node_modules/react-native-maps"
      ),
      "react-native-web-maps": "@preflower/react-native-web-maps",
    },
  },
};
