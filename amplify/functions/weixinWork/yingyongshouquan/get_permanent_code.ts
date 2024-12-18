import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource'
import axios, { AxiosResponse, AxiosError } from 'axios';

export default async function get_permanent_code(suite_access_token: String, auth_code: String) {
    const client = generateClient<Schema>();

    const axios = require('axios');
    let data = JSON.stringify({"auth_code": auth_code});
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://qyapi.weixin.qq.com/cgi-bin/service/get_permanent_code?suite_access_token=' + suite_access_token,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    let response;
    try {
        response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error: any) {
        console.log(error);
        throw error;
    }

    //upsert Channel in database
    const { data: channels } = await client.models.Channel.list({
        filter: { channel_id: { eq: response.data.auth_corp_info.corpid } }
    });
    if (channels.length > 0) {
        const channel = {
            id: channels[0].id,
            is_deleted: false,
            channel_secret: response.data.permanent_code,
        };
        const { data: updatedChannel, errors } = await client.models.Channel.update(channel);
    } else {
        const channel = {
            channel_id: response.data.auth_corp_info.corpid,
            channel_secret: response.data.permanent_code,
            channel_name: response.data.auth_corp_info.corp_name,
        };
        const { data: createdChannel, errors } = await client.models.Channel.create(channel);
    }
}