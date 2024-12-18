import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource'
import axios, { AxiosResponse } from 'axios';

export default async function get_suite_token(suite_ticket: String) {
    let data = JSON.stringify({
        //todo
      "suite_id": "dka305d89efb00d70b",
      "suite_secret": "8yDdZAEDkfXK82Pg8TNplVqZrIpTeSLHaudDO_lnZ-g",
      "suite_ticket": suite_ticket
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    try {
        const response = await axios.request(config);
        console.log(response);
        return response.data.suite_access_token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}