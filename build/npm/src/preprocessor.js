"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

// Panda Sky Mixin: Cuddle Monkey
// This mixin allocates the a CloudWatch Rule that activates on a fixed interval and targets all of your deployment's Lambdas, writing the configuration to your CloudFormation stack.
var process;

process = function (_AWS_, config) {
  var c, env, interval, method, methodName, policyName, ref, ref1, ref2, ref3, resource, resourceName, stackName, tags, targets;
  // Start by extracting out the Cuddle Monkey Mixin configuration:
  ({ env, tags = [] } = config);
  c = config.aws.environments[env].mixins["cuddle-monkey"];
  c = (0, _fairmont.isObject)(c) ? c : {};
  c.tags = (0, _fairmont.cat)(c.tags || [], tags);
  ({
    cuddles: { interval },
    tags
  } = c);
  // CloudWatch's Rate Expression syntax is sensitive to plurality.
  if (interval === 1) {
    interval = "rate(1 minute)";
  } else {
    interval = `rate(${interval} minutes)`;
  }
  // Extract additional configuration from the main stack config.
  stackName = (0, _fairmont.capitalize)((0, _fairmont.camelCase)((0, _fairmont.plainText)(config.environmentVariables.fullName)));
  policyName = config.policyName + "-cuddle-monkey";
  // Identify every Lambda in the API to be a CloudWatch target.
  targets = [];
  ref1 = (ref = config.rootResource) != null ? ref.methods : void 0;
  for (methodName in ref1) {
    method = ref1[methodName];
    targets.push(method.lambda.handler.name);
  }
  ref2 = config.resources;
  for (resourceName in ref2) {
    resource = ref2[resourceName];
    ref3 = resource.methods;
    for (methodName in ref3) {
      method = ref3[methodName];
      targets.push(method.lambda.handler.name);
    }
  }
  // Output configuration to be used by the Cuddle Monkey template.
  return { interval, tags, stackName, policyName, targets };
};

exports.default = process;