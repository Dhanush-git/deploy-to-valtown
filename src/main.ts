import ValTown from "@valtown/sdk";
import * as core from "@actions/core";

const valTown = new ValTown({
  bearerToken: core.getInput("VAL_TOWN_API_KEY"),
});

async function main() {
  const me = await valTown.me.profile.retrieve();
  console.log(me);
}

main();
