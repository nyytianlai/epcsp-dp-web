module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100, // 官方默认设置
      unitPrecision: 6,
      propList: ['*'],
    },
    autoprefixer: {}
  }
};
