module.exports = function (api) {
  api.cache(false);
  return {
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 10 },
          modules: 'false',
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      ['@babel/typescript', { exclude: /node_modules/ }],
      '@babel/preset-react',
    ],
    plugins: [
      'transform-async-to-generator',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
};
