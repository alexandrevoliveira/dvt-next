import { Icon, IconButton, Stack, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SignInButton } from "../SignInButton";
import { Logo } from "./Logo";

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'DVT' }: HeaderProps) {
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

      <Stack
        direction="row"
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
            icon={<Icon as={RiMenuLine} color="gray.50"/>}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr="2"
          />
        )}
        <Stack
          flex="1"
          align="center"
          justify="center"
          direction="row"
        >
          <Logo />

          <SignInButton />
        </Stack>
      </Stack>
    </>
  )
}