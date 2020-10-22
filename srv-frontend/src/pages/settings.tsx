import * as React from 'react';
import Head from 'next/head';
import { Stack, Text, Flex, Input, Button } from '@chakra-ui/core';
import { BaseWrapper } from '../components/templates/base-wrapper';
import { customColors } from '../components/templates/base-template';

export const Settings = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseWrapper heading="Settings">
        <Stack padding="1rem">
          <Text as="strong" fontSize="3xl">
            Change the Settings of your Discord Bot
          </Text>
          <Flex paddingTop="2rem" alignItems="center" paddingBottom="2rem">
            <Text fontSize="l" paddingRight="10px">
              Discord Guild Token:
            </Text>
            <Input width="30%" size="sm" placeholder="Token" />
          </Flex>
          <Button
            backgroundColor={customColors.successColor.standard}
            _hover={{ backgroundColor: customColors.successColor.lighter }}
            color="#fff"
            width="15rem"
          >
            Save current Changes
          </Button>
        </Stack>
      </BaseWrapper>
    </>
  );
};

export default Settings;
