#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CicdCdkStack } from "../lib/cicd-cdk-stack";

const app = new cdk.App();
new CicdCdkStack(app, "CicdCdkStack", {});

app.synth();
