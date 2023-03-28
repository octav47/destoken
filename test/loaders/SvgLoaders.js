const getSvgLoaders = function () {
  return {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack', 'url-loader'],
  };
};

module.exports = { getSvgLoaders };
