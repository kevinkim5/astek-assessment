module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@": "./src", // Add this line
        },
        extension: [".js", ".jsx"],
      },
    ],
  ],
};
