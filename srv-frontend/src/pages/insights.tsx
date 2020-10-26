import * as React from 'react';
import Head from 'next/head';
import { Text } from '@chakra-ui/core';
import { BaseWrapper } from '../components/templates/base-wrapper';

export const Insights = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Insights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseWrapper heading="Insights">
        <Text>Test</Text>
      </BaseWrapper>
    </>
  );
};

export default Insights;
