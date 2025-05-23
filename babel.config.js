module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'inline-dotenv',
        {
          path: '.env',
          systemvars: true // Allow system environment variables to override .env
        }
      ]
    ]
  };
};