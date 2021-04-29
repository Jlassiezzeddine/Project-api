require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
const errorHandler = require("./middlewares/error");
//Middlewares
app.use(express.json());
//Routes


app.use("/api/admins", require("./routes/admin.route"));
app.use("/api/customers", require("./routes/customer.route"));
app.use("/api/theaters", require("./routes/theater.route"));
app.use("/api/movies", require("./routes/movie.route"));
app.use("/api/genres", require("./routes/genre.route"));
app.use("/api/rooms", require("./routes/room.route"));
app.use("/api/screenings", require("./routes/screening.route"));
app.use("/api/reservations", require("./routes/reservation.route"));
app.use("/api/seats", require("./routes/seat.route"));
app.use("/api/reviews", require("./routes/review.route"));
app.use("/api/discounts", require("./routes/discount.route"));


//Error Handler(Keep as Last Middleware)
app.use(errorHandler);
const port = process.env.PORT || 7200;
app.listen(port, () => console.log(`Server is running on ${port}`));
