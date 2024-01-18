import * as cdk from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { PipelineStage } from "./PipelineStage";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CicdCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "AwesomePipeline", {
      pipelineName: "AwsomePipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("robotsWhoFeelLove/cdk-repo", "main"),
        commands: ["npm ci", "npx cdk synth"],
      }),
    });

    const testStage = pipeline.addStage(
      new PipelineStage(this, "PipelineTestStage", {
        stageName: "test",
      })
    );

    testStage.addPre(
      new CodeBuildStep("unit-tests", {
        commands: ["npm ci", "npm test"],
      })
    );
  }
}
