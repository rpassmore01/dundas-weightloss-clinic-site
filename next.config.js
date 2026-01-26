const dotenvLoad = require("dotenv-load");
dotenvLoad();

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};
