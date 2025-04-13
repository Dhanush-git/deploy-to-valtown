// import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

const valTownToken = core.getInput("VAL_TOWN_TOKEN");

if (!valTownToken || valTownToken === "") {
  core.setFailed("VAL_TOWN_TOKEN is not set or is empty");
  process.exit(1);
}

const vs = fs.readFileSync(path.join(__dirname, "../valtown.json"), "utf8");
// if file does not exist, throw error
if (!fs.existsSync(path.join(__dirname, "../valtown.json"))) {
  core.setFailed("valtown.json does not exist");
  process.exit(1);
}

