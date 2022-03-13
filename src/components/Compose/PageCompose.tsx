import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";

interface PageComposeProps {
  header_title?: string;
  children: ReactNode;
}

export function PageCompose ({ header_title, children }: PageComposeProps) {
  return (
    <Box>
      <Header title={header_title} />

      <Flex w="100%" maxWidth="100%" mx="auto" px="6">
        { children }
      </Flex>
    </Box>
  )
}