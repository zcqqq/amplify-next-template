import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource'
import { AxiosResponse, AxiosError } from 'axios';
import { Code } from 'aws-cdk-lib/aws-synthetics';

export default async function change_auth(code: String) {
    const client = generateClient<Schema>();

    //call API https://developers.tiktok.com/doc/oauth-user-access-token-management
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'client_key': 'sbawqxclmj4epo0txj',
        'client_secret': 'otJCWnI0je36MF4BpxhNhERYV1xRCu7q',
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': 'https://imh484s1bh.execute-api.us-east-1.amazonaws.com/tiktok'
    });
    var config = {
        method: 'post',
        url: 'https://open.tiktokapis.com/v2/oauth/token/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data));

        //upsert Channel in database
        const { data: channels } = await client.models.Channel.list({
            filter: { channel_id: { eq: response.data.open_id } }
        });
        if (channels.length > 0) {
            const channel = {
                id: channels[0].id,
                is_deleted: false,
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                scope: response.data.scope,
            };
            const { data: updatedChannel, errors } = await client.models.Channel.update(channel);
            console.log('updatedChannel: '+updatedChannel);
        } else {
            const channel = {
                channel_id: response.data.open_id,
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                scope: response.data.scope,
            };
            const { data: createdChannel, errors } = await client.models.Channel.create(channel);
            console.log('createdChannel: '+createdChannel);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Success' })
        };
    } catch (error: any) {
        console.log('error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}