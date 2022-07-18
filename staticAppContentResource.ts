import * as pulumi from "@pulumi/pulumi"
import * as aws from "@pulumi/aws";
import * as path from "path";
import * as mime from "mime";
import * as utils from "./utils";

export interface staticAppContentResourceArgs {
    bucketName: pulumi.Output<string>,
    path: string
}

export class StaticAppContentResource extends pulumi.ComponentResource {
    constructor(name: string, args: staticAppContentResourceArgs, opts?: pulumi.ComponentResourceOptions ) {
        super("x:index:staticappresource", name, opts);

        const filePath = path.join(process.cwd(), args.path);
        utils.crawlDirectory(filePath, (filepath: string) => {
            const relativePath = filepath.replace(filePath + "/", "");
            new aws.s3.BucketObject(relativePath, {
                key: relativePath,
                bucket: args.bucketName,
                contentType: mime.getType(filepath) || undefined,
                source: new pulumi.asset.FileAsset(filepath)
            }, {parent: this});
        })
    }
}