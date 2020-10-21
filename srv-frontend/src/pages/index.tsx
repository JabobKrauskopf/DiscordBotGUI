import * as React from 'react';
import Head from 'next/head';
import { Text } from '@chakra-ui/core';
import { BaseWrapper } from '../components/templates/base-wrapper';

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseWrapper heading="Home">
        <Text>Test</Text>
      </BaseWrapper>
    </>
  );
};

export default Home;
