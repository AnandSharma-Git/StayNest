const express = require("express");
const router = express.Router();
const passport = require("../controllers/facebooks.js");

router.get(
	"/",
	(req, res, next) => {
		if (!passport.facebookConfigured) {
			req.flash("error", "Facebook login is not configured yet.");
			return res.redirect("/login");
		}
		next();
	},
	passport.authenticate("facebook", {
		authType: "reauthenticate",
		display: "popup",
		scope: ["email"],
		profileFields: ["id", "displayName", "photos", "emails"],
	})
);

router.get(
	"/callback",
	(req, res, next) => {
		if (!passport.facebookConfigured) {
			req.flash("error", "Facebook login is not configured yet.");
			return res.redirect("/login");
		}
		next();
	},
	passport.authenticate("facebook", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("/listings");
	}
);

module.exports = router;
