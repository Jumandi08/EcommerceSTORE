module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 256 * 1024 * 1024, // 256 MB en bytes
    },
  },
});
