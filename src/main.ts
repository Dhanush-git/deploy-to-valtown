// import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

const valTownToken = core.getInput("VAL_TOWN_API_KEY");

if (!valTownToken || valTownToken === "") {
  core.setFailed("VAL_TOWN_API_KEY is not set or is empty");
  process.exit(1);
}

// if file does not exist, throw error
if (!fs.existsSync(path.join(__dirname, "../valtown.json"))) {
  core.setFailed("valtown.json does not exist");
  process.exit(1);
}

