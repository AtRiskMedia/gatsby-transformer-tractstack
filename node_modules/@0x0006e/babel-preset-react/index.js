module.exports = function () {
  return {
    presets: [
      require("@babel/preset-env"),
      require("@babel/preset-react"),
      require("@babel/preset-typescript"),
    ],
    plugins: [
      [
        require("@babel/plugin-proposal-class-properties"),
        { loose: true },
      ],
    ],
  };
};
