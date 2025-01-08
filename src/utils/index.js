const formatResponse = (success, data, error = null) => ({
  success,
  data: data || null,
  error
});

module.exports = {
  formatResponse
};