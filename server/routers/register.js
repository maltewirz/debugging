const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router.post("/api/register", async (req, res) => {
    try {
        let { first, last, email, password } = req.body;
        if (password == undefined || password.length < 8) {
            res.json({ pwError: true });
            return;
        }
        let passHash = await bc.hashPassword(password);
        let resp = await db.addUser(first, last, email, passHash);
        req.session.userId = resp.rows[0].id;
        res.json({ error: false });
    } catch(err) {
        console.log("err from post /register", err);
        res.json({ error: true });
    }
});

module.exports = router;
