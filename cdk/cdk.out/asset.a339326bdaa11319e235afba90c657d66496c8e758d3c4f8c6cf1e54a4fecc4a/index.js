"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../lib/main.trigger.ts
var main_trigger_exports = {};
__export(main_trigger_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(main_trigger_exports);

// codegen/graphql/mutations.ts
var createTodo = (
  /* GraphQL */
  `mutation CreateTodo($id: ID, $name: String!, $description: String) {
  createTodo(id: $id, name: $name, description: $description) {
    id
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
`
);

// ../lib/appsyncRequest.ts
var https = __toESM(require("https"));
var import_url = require("url");
var import_aws_sdk = require("aws-sdk");
var AWS = require("aws-sdk");
var region = process.env.AWS_REGION;
var request2 = (queryDetails, appsyncUrl, apiKey) => {
  const endpoint = new import_url.URL(appsyncUrl).hostname;
  const req = new import_aws_sdk.HttpRequest(new import_aws_sdk.Endpoint(endpoint), region);
  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify(queryDetails);
  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  }
  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });
    httpRequest.write(req.body);
    httpRequest.end();
  });
};
var appsyncRequest_default = request2;

// ../lib/main.trigger.ts
var appsyncURL = process.env.GRAPHQL_URL;
var handler = async (event) => {
  const variables = {
    name: event.name || "a new todo",
    description: event.description || "with a description"
  };
  const result = await appsyncRequest_default({ query: createTodo, variables }, appsyncURL);
  if (result.errors) {
    return console.log("Errors in mutation", result.errors);
  }
  console.log(result.data);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
