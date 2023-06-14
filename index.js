require('dotenv').config();
const express = require('express');
const app = express();
const mainRouter = require('./src/routes/index');
const helmet  = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use('/', mainRouter);

app.all("*", (req, res) => {
    res.status(404).json({ status: "error", statusCode: 404 });
  });
    
  app.use("/", (req, res) => {
    res.status(200).json({ status: "success", statusCode: 200 });
  });

app.listen(PORT, () => {
    console.log(`server starting on port ${PORT}`);
});

