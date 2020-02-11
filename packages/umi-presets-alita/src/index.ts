export default function() {
  return {
    plugins: [
      // commands
      require.resolve('./plugins/commands/version/version'),
    ],
  };
}
