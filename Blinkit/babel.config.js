module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@service': './src/service',
          '@features': './src/features',
          '@state': './src/state',
          '@styles': './src/styles',
        }
      }
    ]
  ]
};
