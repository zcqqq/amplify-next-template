import type { Handler } from 'aws-lambda';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import authorize from './Login/authorize';


Amplify.configure(outputs);
export const handler: Handler = async (event) => {
    if (event.requestContext.http.method === 'GET') {
        console.log('Query parameters:', event.queryStringParameters);

        const code = event.queryStringParameters.code;
        const scopes = event.queryStringParameters.scopes;
        const state = event.queryStringParameters.state;

        await authorize(code);
    }
}