import { defineFunction } from '@aws-amplify/backend';

export const weixinWork = defineFunction({
  name: 'weixinWork',
  entry: './weixinWork/index.ts'
});

