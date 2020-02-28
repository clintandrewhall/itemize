module.exports = function(api) {
  api.cache(false);
  return {
    presets: [
      ["@babel/typescript", { exclude: /node_modules/ }],
      ["@babel/preset-env", { targets: { node: true }, modules: "cjs" }]
    ],
    plugins: [
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  };
};
