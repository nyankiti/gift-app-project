module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // workletのfunctionを実行可能にするプラグイン
    plugins: ["react-native-reanimated/plugin"],
  };
};
