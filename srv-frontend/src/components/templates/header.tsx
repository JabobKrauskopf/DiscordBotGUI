import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  useColorMode,
  Switch,
  background,
} from '@chakra-ui/core';
import { customColors } from './base-template';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

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
  const iconColor = useColorModeValue(
    customColors.icons.color.light,
    customColors.icons.color.dark,
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
            {isDark ? (
              <SunIcon
                onClick={toggleColorMode}
                boxSize="30px"
                color={iconColor}
                borderRadius="0.5em"
                padding="5px"
                cursor="pointer"
                _hover={{ backgroundColor: '#4d4d4d' }}
              />
            ) : (
              <MoonIcon
                onClick={toggleColorMode}
                boxSize="30px"
                color={iconColor}
                borderRadius="0.5em"
                padding="5px"
                cursor="pointer"
                _hover={{ backgroundColor: '#c7c3c3' }}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
