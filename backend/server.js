const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');


// conifgg 
dotenv.config({ path: "backend/config/config.env" });

// connect database 
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running onn http://localhost:${process.env.PORT}`);
})

// handle server 
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server");

    server.close(() => {
        process.exit(1);

    })
})
