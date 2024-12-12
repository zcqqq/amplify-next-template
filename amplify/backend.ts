import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { weixinWork } from './functions/resource';
defineBackend({
  auth,
  data,
  weixinWork
});
