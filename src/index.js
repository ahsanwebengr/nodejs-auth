import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './configs/db.config.js';
import { PORT } from './configs/env.config.js';

dotenv.config({
  path: './.env'
});

connectDB()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!! ', err);
  });

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Node JS!');
});
