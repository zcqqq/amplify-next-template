import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource'
import { AxiosResponse, AxiosError } from 'axios';
import { Code } from 'aws-cdk-lib/aws-synthetics';

export default async function change_auth(refresh_token?: String) {
    const client = generateClient<Schema>();
    let refresh_tokens: string[];

    if (refresh_token === null) {
        //list Channel.refresh_token in database
        const { data: channels } = await client.models.Channel.list({
            filter: { is_deleted: { eq: false } }
        });
        refresh_tokens = channels.map(channel => channel.refresh_token).filter((token): token is string => token !== null);
    } else {
        refresh_tokens = [refresh_token as string];
    }

    for (const refresh_token of refresh_tokens) {
        //call API https://developers.tiktok.com/doc/oauth-user-access-token-management
        const axios = require('axios');
        const qs = require('qs');
        let data = qs.stringify({
            'client_key': '{{client_key}}',
            'client_secret': '{{client_secret}}',
            'grant_type': 'refresh_token',
            'refresh_token': 'rft.RZpJMODHISmutlz9k4YVkDegkvmVuvnykOXKmOsLqpdvXPo9P7ICEwkJbpNM!5092.va'
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://open.tiktokapis.com/v2/oauth/token/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        await axios.request(config)
            .then((response: AxiosResponse) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });
    }
}