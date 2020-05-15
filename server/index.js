require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_module)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["transform-class-properties"],
});

require("localstorage-polyfill");

require("./server");
