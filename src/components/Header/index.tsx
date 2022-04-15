import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'VET' }: HeaderProps) {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex
        as="header"
        w="100%"
        maxWidth="100%"
        h="20"
        mx="auto"
        mt="4"
        px="6"
        align="center"
        borderBottomWidth={2}
        borderBottomColor="whitesmoke"
      >
        { !isWideVersion && (
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr="2"
          />
        )}

        <Logo />
      </Flex>
    </>
  )
}