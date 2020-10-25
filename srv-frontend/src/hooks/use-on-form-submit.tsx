import { Dispatch, SetStateAction } from 'react';
import { OnSubmit } from 'react-hook-form';

export interface BotStatusInterface {
  botNameForm: string;
  tokenForm: string;
  mainVoiceChannelForm: number;
  mainTextChannelForm: number;
}

interface OnFormSubmitProps {
  setBotName: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
}

export const useOnFormSubmit = ({
  setBotName,
  setToken,
}: OnFormSubmitProps): [OnSubmit<BotStatusInterface>] => {
  const onSubmit: OnSubmit<BotStatusInterface> = async ({
    botNameForm,
    tokenForm,
    mainVoiceChannelForm,
    mainTextChannelForm,
  }) => {
    const query = `{${
      botNameForm
        ? `"botName":"${botNameForm}"${
            tokenForm || mainVoiceChannelForm || mainTextChannelForm ? ',' : ''
          }`
        : ''
    }${
      tokenForm
        ? `"token":"${tokenForm}"${
            mainVoiceChannelForm || mainTextChannelForm ? ',' : ''
          }`
        : ''
    }${
      mainVoiceChannelForm
        ? `"mainVoiceChannel": "${mainVoiceChannelForm}"${
            mainTextChannelForm ? ',' : ''
          }`
        : ''
    }${
      mainTextChannelForm ? `"mainTextChannel": "${mainTextChannelForm}"` : ''
    }}`;
    console.log(query);
    await fetch('http://127.0.0.1:5000/set_bot_status', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: query,
    }).then(respone => respone.json());
    if (botNameForm) {
      setBotName(botNameForm);
    }
    if (tokenForm) {
      setToken(tokenForm);
    }
  };
  return [onSubmit];
};

export default useOnFormSubmit;
