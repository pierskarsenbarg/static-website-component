# Static Website Component Resources

This is a demo of how you can use Pulumi's Component Resources to create a static website using AWS S3.

## Prerequistes 

You need to have the following installed:

* [NodeJS](https://nodejs.org/en/)
* [Pulumi](https://www.pulumi.com/docs/get-started/install/)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## Instructions

1. Clone this repo: `git clone git@github.com/pierskarsenbarg/static-website-component`
1. Change directory: `cd static-website-component`
1. Install NPM packages: `npm install`
1. Initialise Pulumi stack: `pulumi stack init dev`
1. Set AWS Region: `pulumi config set aws:region`
1. Set team name: `pulumi config set teamName {teamname}`
1. Set environment: `pulumi config set environment {environment}`
1. Deploy: `pulumi up -y --skip-preview`
1. Access website: `curl $(pulumi stack output appurl)`
1. Destroy infrastructure afterwards: `pulumi destroy -y --skip-preview`