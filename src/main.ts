import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";

const valTown = new ValTown({
  bearerToken: process.env.VAL_TOWN_API_KEY,
});

try {
  const configPath = path.join(process.env.GITHUB_WORKSPACE, "valtown.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  console.log(config);
} catch (error) {
  console.error(error);
  process.exit(1);
}

export async function main() {
  const me = await valTown.me.profile.retrieve();
  console.log(me);
}
