module.exports = function(api) {
  api.cache(false);
  return {
    exclude: 'node_modules/**',
    presets: [
      ['@babel/typescript', { exclude: /node_modules/ }],
      [
        '@babel/preset-env',
        {
          targets: { node: 10 },
          modules: 'false',
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-reserved-words',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
};
