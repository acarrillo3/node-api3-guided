const express = require("express"); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// the three amigas: rachel, rita, and nancy

// global middleware
server.use(express.json()); //built-in middleware
//server.use(morgan("dev"));
server.use(helmet());
//server.use(logger);

// routes - endpoints
server.use("api/hubs", logger, gateKeeper("mellon"), hubsRouter);

server.get("/", logger, greeter, gateKeeper("notto"), (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = "Web 26";
  next();
}

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} `);
  next();
}

function gateKeeper(guess) {
  return function (req, res, next) {
    const password = req.headers.password;

    if(password && password.toLowerCase() === 'guess'){
    next();

    } else {
      res.status(401).json({ you: "shall not pass!"});
    }
  }
}


// write a gatekeeper middleware that read a passord from req.headers
// if the password is "melton" let the request continue
// if the password is not "melton" send a 400 status code and a message to the client

/*
function fetchHubs() {
  const endpoints = 'https//lotr.com/hubs';
  const options = {
    headers: {
      passord 'mellon'
    }
  }
  axios.get(endpoint, options).then().cath()
}*/