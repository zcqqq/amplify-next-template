import config from '@/amplifyconfiguration.json';
import React from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import type { AppProps } from "next/app";
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';

Amplify.configure(config);

/* with authenticator */
function App({ Component, pageProps }: AppProps, { signOut, user }: WithAuthenticatorProps) {
  return (
    <Authenticator
      initialState='signUp'
      signUpAttributes={['nickname', 'preferred_username']}
    ><Component {...pageProps} /></Authenticator>
  );
} 
export default withAuthenticator(App);

/* no authenticator 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
} */
