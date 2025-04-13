// import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

const valTownToken = core.getInput("VAL_TOWN_API_KEY");

if (!valTownToken || valTownToken === "") {
  core.setFailed("VAL_TOWN_API_KEY is not set or is empty");
  process.exit(1);
}

console.log(process.env.GITHUB_WORKSPACE);
