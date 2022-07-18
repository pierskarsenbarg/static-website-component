import * as pulumi from "@pulumi/pulumi";

const pulumiconfig = new pulumi.Config();
const teamName = pulumiconfig.require("teamName");
const environment = pulumiconfig.require("environment");

export const config = {
    teamName,
    environment,
}