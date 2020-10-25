import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useGetBotStatus = (): [
  string,
  string,
  string,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
] => {
  const [botStatus, setBotStatus] = useState('offline');
  const [botName, setBotName] = useState('');
  const [token, setToken] = useState('');
  const fetchQuery = () => {
    (async () => {
      const searchResult = await fetch(
        'http://127.0.0.1:5000/get_bot_status',
      ).then(respone => respone.json());
      setBotStatus(searchResult.status);
      setBotName(searchResult.name);
      setToken(searchResult.token);
    })();
  };
  useEffect(() => fetchQuery(), []);
  return [botStatus, botName, token, setBotName, setToken];
};

export default useGetBotStatus;
