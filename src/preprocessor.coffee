# Panda Sky Mixin: Cuddle Monkey
# This mixin allocates the a CloudWatch Rule that activates on a fixed interval and targets all of your deployment's Lambdas, writing the configuration to your CloudFormation stack.

import {cat, isObject, plainText, camelCase, capitalize, empty, collect, project} from "fairmont"

process = (_AWS_, config) ->
  # Start by extracting out the Cuddle Monkey Mixin configuration:
  {env, tags=[]} = config
  c = config.aws.environments[env].mixins["cuddle-monkey"]
  c = if isObject c then c else {}
  c.tags = cat (c.tags || []), tags

  {cuddles: {interval}, tags} = c

  # CloudWatch's Rate Expression syntax is sensitive to plurality.
  if interval == 1
    interval = "rate(1 minute)"
  else
    interval = "rate(#{interval} minutes)"


  # Extract additional configuration from the main stack config.
  stackName = capitalize camelCase plainText config.environmentVariables.fullName

  # Identify every Lambda in the API to be a CloudWatch target.
  targets = []
  for methodName, method of config.rootResource?.methods
    targets.push
      id: method.lambda.handler.name
      arn: method.lambda.function.arn
  for resourceName, resource of config.resources
      for methodName, method of resource.methods
        targets.push
          id: method.lambda.handler.name
          arn: method.lambda.function.arn

  # There can only be 5 targets per rule.  Split them up into groups so we can assign targets and permissions in the template.
  targetGroups = {}
  group = 0
  while targets.length > 0
    targetGroups[group] = targets: targets.splice 0, 5
    group++


  # Output configuration to be used by the Cuddle Monkey template.
  {interval, tags, stackName, targetGroups}


export default process
