import {resolve} from "path"
import MIXIN from "panda-sky-mixin"
import {read} from "fairmont"
import {yaml} from "panda-serialize"

#import getPolicyStatements from "./policy"
import preprocess from "./preprocessor"
#import cli from "./cli"

getFilePath = (name) -> resolve __dirname, "..", "..", "..", "files", name

mixin = do ->
  schema = yaml await read getFilePath "schema.yaml"
  template = await read getFilePath "template.yaml"

  CuddleMonkey = new MIXIN {
    name: "cuddle-monkey"
    schema
    template
    preprocess
    #cli
    #getPolicyStatements
  }
  CuddleMonkey

export default mixin
