import {
  Box,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { customColors } from './base-template';
import { FaHome, FaChartBar, FaCogs } from 'react-icons/fa';
import { LogoIcon } from '../icons';
import React from 'react';

export interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
}): React.ReactElement => {
  const bgColor = useColorModeValue(
    customColors.level2.bg.light,
    customColors.level2.bg.dark,
  );
  const color = useColorModeValue(
    customColors.level2.color.light,
    customColors.level2.color.dark,
  );
  const borderColor = useColorModeValue(
    customColors.level2.borderColor.light,
    customColors.level2.borderColor.dark,
  );
  const iconColor = useColorModeValue(
    customColors.icons.color.light,
    customColors.icons.color.dark,
  );
  const buttonBackgroundColor = useColorModeValue(
    customColors.level2.buttonBackgroundColor.light,
    customColors.level2.buttonBackgroundColor.dark,
  );
  return (
    <>
      <Box
        bg={bgColor}
        width="15rem"
        zIndex={20}
        position="fixed"
        height="100%"
        left={0}
        borderRight="1px"
        borderRightStyle="solid"
        paddingTop="1rem"
        borderRightColor={borderColor}
        color={color}
      >
        <Stack spacing="3" direction="column" alignItems="left">
          <LogoIcon alignSelf="center" boxSize="10rem" />
          <Box>
            <Text fontSize="xl" textAlign="center">
              Discord Bot GUI
            </Text>
          </Box>
          <Box>
            <NextLink href="/" as="/">
              <Link href="/" height="100%" width="100%">
                <Button
                  variant="ghost"
                  width="100%"
                  textAlign="left"
                  borderRadius="0"
                  _hover={{ backgroundColor: buttonBackgroundColor }}
                >
                  <FaHome size="25px" color={iconColor} />
                  <Text paddingLeft="10px" width="100%" fontWeight="normal">
                    Home
                  </Text>
                </Button>
              </Link>
            </NextLink>
          </Box>
          <Box>
            <NextLink href="/insights" as="/insights">
              <Link href="/insights" height="100%" width="100%">
                <Button
                  variant="ghost"
                  width="100%"
                  textAlign="left"
                  borderRadius="0"
                  _hover={{ backgroundColor: buttonBackgroundColor }}
                >
                  <FaChartBar size="25px" color={iconColor} />
                  <Text paddingLeft="10px" width="100%" fontWeight="normal">
                    Insights
                  </Text>
                </Button>
              </Link>
            </NextLink>
          </Box>
          <Box>
            <NextLink href="/settings" as="/settings">
              <Link href="/settings" height="100%" width="100%">
                <Button
                  variant="ghost"
                  width="100%"
                  textAlign="left"
                  borderRadius="0"
                  _hover={{ backgroundColor: buttonBackgroundColor }}
                >
                  <FaCogs size="25px" color={iconColor} />
                  <Text paddingLeft="10px" width="100%" fontWeight="normal">
                    Settings
                  </Text>
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Stack>
      </Box>
      <Box paddingLeft="15rem" height="100%" width="100%">
        {children}
      </Box>
    </>
  );
};
