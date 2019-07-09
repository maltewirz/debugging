const express = require("express");
const app = express();
const path = require("path");
const server = require('http').Server(app);
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
const secrets = (process.env.NODE_ENV == 'production') ? process.env : require("../secrets");
const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
////////////////////////////////////
app.use(compression());
app.use(express.json());
app.use(cookieSessionMiddleware);
app.use(csurf());
//Middleware: csrfToken and forbid Header iframe
app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    res.setHeader('x-frame-options', 'DENY');
    next();
});
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

const register = require("./routers/register");
app.use(register);

const login = require("./routers/login");
app.use(login);

app.get("/api/checkLoggedIn", function(req, res) {
    (req.session.userId) ? res.json("user_known") : res.json("user_unknown");
});

app.get("/api/testdata", function(req, res) {
    res.json({"test": "sucess"});
});

app.get("*", function(request, response) {
    console.log("gettin to *");
    response.sendFile(
        path.resolve(__dirname, "../react-ui/build", "index.html")
    );
});

server.listen(process.env.PORT || 5000, () =>
    console.log("I'm listening on 5000.")
);
