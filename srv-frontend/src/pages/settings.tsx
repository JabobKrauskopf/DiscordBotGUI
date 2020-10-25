import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Stack,
  Text,
  Flex,
  Input,
  Button,
  Select,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { BaseWrapper } from '../components/templates/base-wrapper';
import { customColors } from '../components/templates/base-template';
import { useForm, OnSubmit } from 'react-hook-form';

export interface ChannelInterface {
  name: string;
  id: string;
  type: string;
}

export interface BotStatusInterface {
  botNameForm: string;
  tokenForm: string;
  mainChannelForm: number;
}

export const Settings = (): JSX.Element => {
  const [channels, setChannels] = useState<ChannelInterface[]>([]);
  const [botStatus, setBotStatus] = useState('offline');
  const [botName, setBotName] = useState('');
  const [token, setToken] = useState('');
  const { handleSubmit, errors, formState, register } = useForm();

  useEffect(() => {
    (async () => {
      const searchResult = await fetch(
        'http://127.0.0.1:5000/get_all_channels',
      ).then(respone => respone.json());
      setChannels(
        searchResult.filter(
          (channel: ChannelInterface) => channel.type == 'VoiceChannel',
        ),
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const searchResult = await fetch(
        'http://127.0.0.1:5000/get_bot_status',
      ).then(respone => respone.json());
      setBotStatus(searchResult.status);
      setBotName(searchResult.name);
      setToken(searchResult.token);
    })();
  }, []);

  const onSubmit: OnSubmit<BotStatusInterface> = async ({
    botNameForm,
    tokenForm,
    mainChannelForm,
  }) => {
    const query = `{${
      botNameForm
        ? `"botName":"${botNameForm}"${tokenForm || mainChannelForm ? ',' : ''}`
        : ''
    }${tokenForm ? `"token":"${tokenForm}"${mainChannelForm ? ',' : ''}` : ''}${
      mainChannelForm ? `"mainChannel": "${mainChannelForm}"` : ''
    }}`;
    console.log(query);
    await fetch('http://127.0.0.1:5000/set_bot_status', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: query,
    }).then(respone => respone.json());
    setBotName(botNameForm ? botNameForm : botName);
    setToken(tokenForm ? tokenForm : token);
  };
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
          <Flex>
            <Text fontSize="l" paddingRight="5px">
              Current Status:
            </Text>
            <Text as="strong" fontSize="l">
              {botStatus}
            </Text>
          </Flex>
          <form
            onSubmit={handleSubmit(data =>
              onSubmit(data as BotStatusInterface),
            )}
          >
            <FormControl isInvalid={Boolean(errors.token)}>
              <Flex paddingTop="2rem" alignItems="center" paddingBottom="1rem">
                <Text fontSize="l" paddingRight="10px">
                  Bot Name:
                </Text>
                <Input
                  width="15%"
                  size="sm"
                  placeholder={botName}
                  name="botNameForm"
                  ref={register}
                />
              </Flex>
              <Flex alignItems="center" paddingBottom="1rem">
                <Text fontSize="l" paddingRight="10px">
                  Discord Token:
                </Text>
                <Input
                  width="45%"
                  size="sm"
                  placeholder={token}
                  name="tokenForm"
                  ref={register}
                />
              </Flex>
              <Flex alignItems="center" paddingBottom="2rem">
                <Text fontSize="l" paddingRight="10px">
                  Main Channel:
                </Text>
                <Select
                  width="20%"
                  size="sm"
                  name="mainChannelForm"
                  ref={register}
                >
                  {channels.map(channel => (
                    <option value={channel.id} key={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <FormErrorMessage>
                {errors.token && errors.token.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              backgroundColor={customColors.successColor.standard}
              _hover={{ backgroundColor: customColors.successColor.lighter }}
              color="#fff"
              width="15rem"
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Save current Changes
            </Button>
          </form>
        </Stack>
      </BaseWrapper>
    </>
  );
};

export default Settings;
