import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export interface s3ResourceArgs {
    teamName: string,
    environment: string,
}

export class s3Resource extends pulumi.ComponentResource {
    public readonly bucketName: pulumi.Output<string>;
    public readonly websiteUrl: pulumi.Output<string>;
    constructor(name:string, args: s3ResourceArgs, opts?: pulumi.ComponentResourceOptions) {
        super("x:index:s3resource", name, opts);

        const bucket = new aws.s3.Bucket(`${name}-bucket`, {
            tags: {
                teamName: args.teamName,
                env: args.environment
            },
            website: {
                indexDocument: "index.html"
            }
        }, {...opts, parent: this});

        const bucketBlock = new aws.s3.BucketPublicAccessBlock("bucketBlock", {
            blockPublicAcls: false,
            blockPublicPolicy: false,
            bucket: bucket.bucket,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
        });

        const bucketPolicyDocument = (bucketName: string) : aws.iam.PolicyDocument => {
            return {
                Version: "2012-10-17",
                Statement: [{
                    Effect: "Allow",
                    Principal: "*",
                    Action: ["s3:GetObject"],
                    Resource: [
                        `arn:aws:s3:::${bucketName}/*`
                    ]
                }]
            }
        }

        const bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
            bucket: bucket.bucket,
            policy: bucket.bucket.apply(bucketPolicyDocument),
        }, {parent: this})

        this.bucketName = bucket.bucket;
        this.websiteUrl = bucket.websiteEndpoint;
        this.registerOutputs({
            "bucketName": this.bucketName,
            "websiteUrl": this.websiteUrl
        });
    }
}