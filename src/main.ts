// import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

const valTownToken = core.getInput("VAL_TOWN_API_KEY");

if (!valTownToken || valTownToken === "") {
  core.setFailed("VAL_TOWN_API_KEY is not set or is empty");
  process.exit(1);
}

const deploytownPath = path.join(process.env.GITHUB_WORKSPACE, "deploytown.json");

console.log(deploytownPath);

// check if deploytown.json exists
if (!fs.existsSync(deploytownPath)) {
  core.setFailed("deploytown.json does not exist");
  process.exit(1);
}

const deploytown = JSON.parse(
  fs.readFileSync(deploytownPath, "utf8")
);

console.log(deploytown);

