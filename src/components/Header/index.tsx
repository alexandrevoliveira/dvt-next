import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { Logo } from "./Logo";

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'VET' }: HeaderProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex
        as="header"
        w="100%"
        h="20"
        mx="auto"
        mt="4"
        px="6"
        pb="4"
        align="center"
        justify="center"
        borderBottomWidth={2}
        borderBottomColor="whitesmoke"
      >
        <Logo />
      </Flex>
    </>
  )
}