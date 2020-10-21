import { Flex, useColorModeValue, Stack } from '@chakra-ui/core';
import { Theme, theme } from '@chakra-ui/theme';
import { runIfFn, merge } from '@chakra-ui/utils';
import { mode } from '@chakra-ui/theme-tools';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface BaseTemplateProps {
  heading: string;
}

export const customColors = {
  level1: {
    bg: { light: '#ffffff', dark: '#212121' },
    color: { light: '#3a3a3a', dark: '#f5f5f5' },
    borderColor: { light: '#f5f5f5', dark: '#242424' },
  },
  level2: {
    bg: { light: '#f3f3f3', dark: '#303030' },
    color: { light: '#3a3a3a', dark: '#f5f5f5' },
    borderColor: { light: '#c2c2c2', dark: '#3f3f3f' },
    buttonBackgroundColor: { light: '#e0e0e0', dark: '#606060' },
  },
  heading: {
    color: { light: '#CA4A94', dark: '#CA4A94' },
  },
  icons: {
    color: { light: '#3a3a3a', dark: '#f5f5f5' },
  },
  dangerColor: {
    standard: '#C64242',
    lighter: '#EE6262',
  },
  successColor: {
    standard: '#4D9B53',
    lighter: '#7CCA83',
  },
};

export const customTheme: Theme = {
  ...theme,
  styles: {
    global: (props: any) =>
      merge(runIfFn(theme.styles.global, props), {
        body: {
          color: mode(
            customColors.level1.color.light,
            customColors.level1.color.dark,
          )(props),
          background: mode(
            customColors.level1.bg.light,
            customColors.level1.bg.dark,
          )(props),
        },
      }),
  },
};

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  children,
  heading,
}): JSX.Element => {
  const bgColor = useColorModeValue(
    customColors.level1.bg.light,
    customColors.level1.bg.dark,
  );

  const color = useColorModeValue(
    customColors.level1.color.light,
    customColors.level1.color.dark,
  );

  return (
    <Flex color={color} backgroundColor={bgColor} width="100%" height="100%">
      <Sidebar>
        <Header heading={heading} />
        <Stack
          paddingX="3"
          marginTop="4rem"
          width="100%"
          height="100%"
          backgroundColor={bgColor}
          color={color}
        >
          {children}
        </Stack>
      </Sidebar>
    </Flex>
  );
};
