import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Stack, Text, Flex, Input, Button, Select } from '@chakra-ui/core';
import { BaseWrapper } from '../components/templates/base-wrapper';
import { customColors } from '../components/templates/base-template';

export interface ChannelInterface {
  name: string;
  id: string;
  type: string;
}

export const Settings = (): JSX.Element => {
  const [channels, setChannels] = useState<ChannelInterface[]>([]);

  useEffect(() => {
    (async () => {
      const searchResult = await fetch(
        'http://127.0.0.1:5000/get_all_channels',
      ).then(respone => respone.json());
      console.log(searchResult);
      setChannels(
        searchResult.filter(
          (channel: ChannelInterface) => channel.type == 'VoiceChannel',
        ),
      );
    })();
  }, []);
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
          <Flex paddingTop="2rem" alignItems="center" paddingBottom="1rem">
            <Text fontSize="l" paddingRight="10px">
              Discord Guild Token:
            </Text>
            <Input width="30%" size="sm" placeholder="Token" />
          </Flex>
          <Flex alignItems="center" paddingBottom="2rem">
            <Text fontSize="l" paddingRight="10px">
              Main Channel:
            </Text>
            <Select width="20%" size="sm" placeholder="Select Main Channel">
              {channels.map(channel => (
                <option value={channel.id} key={channel.id}>
                  {channel.name}
                </option>
              ))}
            </Select>
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
