require("dotenv").config();
require("./config/mongo"); // connect MongoDB
const { AppDataSource } = require('./config/data-source');
const app = require("./app");


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
