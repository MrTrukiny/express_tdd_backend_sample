module.exports = async () => {
  return {
    verbose: true,
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  };
};
