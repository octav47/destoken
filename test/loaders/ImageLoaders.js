const getImageLoaders = function () {
  return {
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
      },
    ],
  };
};

module.exports = { getImageLoaders };
