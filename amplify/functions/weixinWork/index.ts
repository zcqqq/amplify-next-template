import type { Handler } from 'aws-lambda';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../data/resource';
import { getSignature, decrypt } from '@wecom/crypto';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export const handler: Handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters;
  console.log(queryStringParameters);
  const signature = getSignature('xyT411BTEZ4', queryStringParameters.timestamp, queryStringParameters.nonce, queryStringParameters.echostr);
  console.log(signature);
  const { message, id } = decrypt('wMyHVOyBFHEHaQrdWuicK29PbaLeynJHLIhI4HZatph', queryStringParameters.echostr);
  console.log({ message, id });
  return {
    statusCode: 200,
    body: message
  };
};
