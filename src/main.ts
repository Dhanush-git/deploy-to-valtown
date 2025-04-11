import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";

if (!process.env.VAL_TOWN_API_KEY) {
  console.error("VAL_TOWN_API_KEY is not set");
  process.exit(1);
}

const valTown = new ValTown({
  bearerToken: process.env.VAL_TOWN_API_KEY,
});

try {
  const configPath = path.join("./", "valtown.json");
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
