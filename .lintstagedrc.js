module.exports = {
  // Lint then format TypeScript and JavaScript files
  '/**/*.(ts|tsx|js|jsx)': filenames => [
    `prettier --write ${filenames.join(' ')}`,
    `eslint --fix ${filenames.join(' ')}`
  ],

  // Format MarkDown and JSON
  '/**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`
};
