const uploaded_file_url = (filePath) => {
  const subFolderPath = filePath.split("public/")[1];
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}/${subFolderPath}`;
};

module.exports = uploaded_file_url;
