import * as pulumi from "@pulumi/pulumi"
import * as s3resource from "./s3Resource";
import * as staticAppContentResource from "./staticAppContentResource";

export interface StaticAppResourceArgs  {
    path: string,
    environment: string, 
    teamName: string
}

export class StaticAppResource extends pulumi.ComponentResource {
    public readonly url: pulumi.Output<string>;
    constructor(name:string, args: StaticAppResourceArgs, opts?: pulumi.ComponentResourceOptions) {
        super("x:index:staticresource", name, opts);

        const mybucket = new s3resource.s3Resource("mybucket", {
            environment: args.environment,
            teamName: args.teamName
        }, {parent: this});

        const staticApp = new staticAppContentResource.StaticAppContentResource("mystaticapp", {
            bucketName: mybucket.bucketName,
            path: args.path
        }, {parent: this})

        this.url = mybucket.websiteUrl;
        this.registerOutputs({
            "url": this.url
        })
    }
}



