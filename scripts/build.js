const { execSync } = require("child_process")

console.log("Building backend...")
execSync("pnpm build --filter backend", { stdio: "inherit" })

console.log("Building frontend...")
execSync("pnpm build --filter frontend", { stdio: "inherit" })

console.log("Build complete!")
