import ValTown from "@valtown/sdk";
import * as core from "@actions/core"


const valTownToken = core.getInput("valtown-token");

// check if valTownToken is set
if (!valTownToken) {
  core.setFailed("valtown-token is not set");
  process.exit(1);
}