require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
const errorHandler = require("./middlewares/error");
//Middlewares
app.use(express.json());
//Routes

app.use("/admins", require("./routes/admin.route"));
app.use("/customers", require("./routes/customer.route"));
app.use("/theaters", require("./routes/theater.route"));
app.use("/movie",require("./routes/movie.route"))
app.use('/genre',require("./routes/genre.route"))
//Error Handler(Keep as Last Middleware)
app.use(errorHandler);
const port = process.env.PORT || 7200;
app.listen(port, () => console.log(`Server is running on ${port}`));
