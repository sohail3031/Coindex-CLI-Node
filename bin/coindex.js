#!/usr/bin/env node

const commander = require("commander");

const packageJson = require("../package.json");

commander
  .version(packageJson.version)
  .command("key", "Manage API Key -- https://nomics.com")
  .command("check", "Check Coin Price Info")
  .parse(process.argv);
