const concurrently = require("concurrently")

concurrently(
	[
		{ command: "pnpm --filter backend dev", name: "backend" },
		{ command: "pnpm --filter frontend start", name: "frontend" },
	],
	{
		prefix: "name",
		killOthers: ["failure", "success"],
		restartTries: 0,
	},
).result.then(
	() => console.log("All processes exited with success"),
	(err) => console.error("Error occurred:", err.message),
)
