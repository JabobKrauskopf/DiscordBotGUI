import { ChakraProvider } from '@chakra-ui/core';
import { BaseTemplate, customTheme } from './base-template';

export interface BaseWrapperProps {
  heading: string;
}

export const BaseWrapper: React.FC<BaseWrapperProps> = ({
  heading,
  children,
}): React.ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={customTheme}>
      <BaseTemplate heading={heading}>{children}</BaseTemplate>
    </ChakraProvider>
  );
};
