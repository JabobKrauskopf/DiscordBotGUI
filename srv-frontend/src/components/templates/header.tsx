import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  useColorMode,
  Switch,
} from '@chakra-ui/core';
import { customColors } from './base-template';
import React from 'react';

interface HeaderProps {
  heading: string;
}

export const Header: React.FC<HeaderProps> = ({ heading }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const bgColor = useColorModeValue(
    customColors.level2.bg.light,
    customColors.level2.bg.dark,
  );
  const headingColor = useColorModeValue(
    customColors.heading.color.light,
    customColors.heading.color.dark,
  );

  return (
    <>
      <Flex
        height="4rem"
        width="100%"
        position="fixed"
        bg={bgColor}
        zIndex={10}
      >
        <Flex alignItems="center">
          <Heading
            fontSize="1.5rem"
            size="lg"
            width="16rem"
            paddingLeft="1rem"
            color={headingColor}
          >
            {heading}
          </Heading>
        </Flex>

        <Flex alignItems="center" width="100%">
          <Box position="fixed" right="1rem" zIndex={10}>
            <Switch
              isChecked={isDark}
              onChange={toggleColorMode}
              paddingRight="3rem"
              paddingLeft="2rem"
              colorScheme="#fff"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
