import * as staticApp from "./staticAppResource";
import {config} from "./config";

const app = new staticApp.StaticAppResource("app", {
    path: "./app",
    teamName: config.teamName,
    environment: config.environment
});

export const appurl = app.url;

