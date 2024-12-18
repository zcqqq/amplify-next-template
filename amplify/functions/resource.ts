import { defineFunction } from '@aws-amplify/backend';

export const weixinWork = defineFunction({
  name: 'weixinWork',
  entry: './weixinWork/index.ts'
});

export const tiktok = defineFunction({
  name: 'tiktok',
  entry: './tiktok/index.ts',
  timeoutSeconds: 60 // 1 minute timeout
});

export const tiktokDaily = defineFunction({
  name: "tiktokDaily",
  entry: './tiktok/daily.ts',
  schedule: "every day",
});

