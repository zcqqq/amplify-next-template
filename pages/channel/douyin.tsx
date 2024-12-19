import React, { useState, useEffect } from 'react';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { CognitoIdentityProviderClient, CreateGroupCommand, GetGroupCommand, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

async function upsertTableChannel(open_id: string, tenant_id: string) {
  //todo: upsert to update
  //todo: replace list to get with index
  const { data: channels } = await client.models.Channel.list({
    filter: { channel_id: { eq: open_id } }
  });
  if (channels.length > 0) {
    return channels[0].id;
  } else {
    const { errors, data: newChannel } = await client.models.Channel.create({
      channel_id: open_id,
      tenant_id: tenant_id,
    })
    console.log(errors);
    return newChannel.id;
  }
}

function callDouyinToken(client_key: string, client_secret: string, code: string) {
  const axios = require('axios');
  let access_token;
  let refresh_token;
  let open_id;
  let config = {
    method: 'post',
    url: 'https://open.douyin.com/oauth/access_token/?client_key=' + client_key + '&client_secret=' + client_secret + '&code=' + code + '&grant_type=authorization_code',
  };
  axios.request(config)
    .then((response: { data: any, errors: any }) => {
      console.log(JSON.stringify(response.data));
      access_token = response.data.access_token;
      refresh_token = response.data.refresh_token;
      open_id = response.data.open_id;
    })
    .catch((error: any) => {
      console.log(error);
    });
  return { access_token, refresh_token, open_id };
}

function callDouyinAPI(access_token: string, open_id: string) {
  const axios = require('axios');
  let nickname;
  let union_id;
  let config = {
    method: 'post',
    url: 'https://open.douyin.com/oauth/userinfo/?access_token=' + access_token + '&open_id=' + open_id,
  };
  axios.request(config)
    .then((response: { data: any, errors: any }) => {
      console.log(JSON.stringify(response.data));
      nickname = response.data.nickname;
      union_id = response.data.union_id;
    })
    .catch((error: any) => {
      console.log(error);
    });
  return {nickname, union_id};
}



export default function channelDouyin() {
  //5. access_token/expires_in/refresh_expires_in/refresh_token/scope存入channel表。avatar/nickname/union_id. 跳转到主页
  //1. auth页通过url参数获取code（需要部署）
  const router = useRouter();
  async function authDouyin() {
    let code = router.query.code;
    console.log('code: '+code);

    //2. 调用抖音api，通过code获取accesstoken和openid
    const douyinTokenResult = callDouyinToken('awgqrvbxb86rz073', 'f1089b5c3ca50ef27c9144d52a7febb1', code as string);
    let access_token = douyinTokenResult.access_token || '';
    console.log('access_token: ' + access_token);
    let open_id = douyinTokenResult.open_id || '';
    console.log('open_id: ' + open_id);
    const douyinAPIResult = callDouyinAPI(access_token, open_id);

    //3. upsert tables
    let tenant_id = '';
    console.log(`Tenant: ${tenant_id}`);
    let channel_id = upsertTableChannel(open_id, tenant_id || '');
    console.log(`Channel: ${channel_id}`);

    //4. 如果openid在cognito中已存在，则signIn
    let username = open_id + "@uni-scrm.com";
    
  }
  channelDouyin();

  return (
    <div></div>
  )
  //4. 如果在cognito中不存在，通过openid signUp和插入AppSync，此cognito user自动确认（pre sign-up Lambda trigger），并自动登录
  /*signUp({
    username: username,
    password: open_id,
    options: {
      autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      userAttributes: {
        'custom:user_source': 'douyin'
      }
    }
  }).then(response => {
    console.log('Sign up successful' + response);
  })
    .catch(error => {
      console.log('Error signing up: ' + error.message);
    });*/
}