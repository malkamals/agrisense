class loginCheck {
	getCheck(req, res) {
		res.send("Welcome to dashboard");
	}
}

module.exports = new loginCheck();
