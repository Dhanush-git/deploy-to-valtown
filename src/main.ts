import ValTown from "@valtown/sdk";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";
import * as cache from "@actions/cache";
import { z } from "zod";

const deploytownSchema = z.object({
  name: z.string(),
  type: z.enum(["script", "http", "httpnext"]),
  entry: z.string(),
});

const valTownToken = core.getInput("VAL_TOWN_API_KEY");

if (!valTownToken || valTownToken === "") {
  core.setFailed("VAL_TOWN_API_KEY is not set or is empty");
  process.exit(1);
}

// get the path to the deploytown.json file
const deploytownConfigPath = path.join(process.env.GITHUB_WORKSPACE, "deploytown.json");

// check if deploytown.json exists
if (!fs.existsSync(deploytownConfigPath)) {
  core.setFailed("deploytown.json does not exist");
  process.exit(1);
}

const deploytownConfig: z.infer<typeof deploytownSchema> = JSON.parse(
  fs.readFileSync(deploytownConfigPath, "utf8")
);

const entryPath = path.join(process.env.GITHUB_WORKSPACE, deploytownConfig.entry);

// check if entryPath exists
if (!fs.existsSync(entryPath)) {
  core.setFailed(`${deploytownConfig.entry} does not exist`);
  process.exit(1);
}

async function main() {
  const valTown = new ValTown({bearerToken: valTownToken});
  const cacheKey = await cache.restoreCache(['deploytown-cache.json'],'deploytown');

  if (cacheKey) {
    const cacheData = JSON.parse(fs.readFileSync('deploytown-cache.json', "utf8"));

    console.log(JSON.stringify(cacheData, null, 2));
    
    await valTown.vals.versions.create(cacheData.id, {
      code: fs.readFileSync(entryPath, "utf8"),
      name: deploytownConfig.name,
      type: deploytownConfig.type,
    })
  } 
  else {
    const val = await valTown.vals.create({
      type: deploytownConfig.type,
      name: deploytownConfig.name,
      code: fs.readFileSync(entryPath, "utf8"),
    })
  
    fs.writeFileSync('deploytown-cache.json', JSON.stringify({id: val.id}))
    await cache.saveCache(['deploytown-cache.json'],'deploytown');
  }
}

main();
