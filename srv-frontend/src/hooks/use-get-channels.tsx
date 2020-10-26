import { useEffect, useState } from 'react';

export interface ChannelInterface {
  name: string;
  id: string;
  type: string;
}

export const useGetChannels = (): [ChannelInterface[], () => void] => {
  const [channels, setChannels] = useState<ChannelInterface[]>([]);
  const fetchQuery = () => {
    (async () => {
      const searchResult = await fetch(
        'http://127.0.0.1:5000/get_all_channels',
      ).then(respone => respone.json());
      setChannels(searchResult);
    })();
  };
  useEffect(() => fetchQuery(), []);
  return [channels, fetchQuery];
};

export default useGetChannels;
