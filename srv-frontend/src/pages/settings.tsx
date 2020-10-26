import React from 'react';
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
import { useGetChannels, ChannelInterface } from '../hooks/use-get-channels';
import { useGetBotStatus } from '../hooks/use-get-bot-status';
import { useOnFormSubmit } from '../hooks/use-on-form-submit';
import { useForm } from 'react-hook-form';

export interface BotStatusInterface {
  botNameForm: string;
  tokenForm: string;
  mainVoiceChannelForm: number;
  mainTextChannelForm: number;
}

export const Settings = (): JSX.Element => {
  const [channels] = useGetChannels();
  const [botStatus, botName, token, setBotName, setToken] = useGetBotStatus();
  const { handleSubmit, errors, formState, register } = useForm();
  const [onSubmit] = useOnFormSubmit({ setBotName, setToken });
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
              <Flex alignItems="center" paddingBottom="1rem">
                <Text fontSize="l" paddingRight="10px">
                  Main Voice Channel:
                </Text>
                <Select
                  width="20%"
                  size="sm"
                  name="mainVoiceChannelForm"
                  ref={register}
                >
                  {channels
                    .filter(
                      (channel: ChannelInterface) =>
                        channel.type == 'VoiceChannel',
                    )
                    .map(channel => (
                      <option value={channel.id} key={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                </Select>
              </Flex>
              <Flex alignItems="center" paddingBottom="2rem">
                <Text fontSize="l" paddingRight="10px">
                  Main Text Channel:
                </Text>
                <Select
                  width="20%"
                  size="sm"
                  name="mainTextChannelForm"
                  ref={register}
                >
                  {channels
                    .filter(
                      (channel: ChannelInterface) =>
                        channel.type == 'TextChannel',
                    )
                    .map(channel => (
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
