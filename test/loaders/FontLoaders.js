const getFontLoader = function () {
  return {
    test: /\.(woff|woff2)$/,
    use: {
      loader: 'url-loader',
    },
  };
};

module.exports = { getFontLoader };
