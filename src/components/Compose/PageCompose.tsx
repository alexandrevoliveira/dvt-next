import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface PageComposeProps {
  header_title?: string;
  children: ReactNode;
}

export function PageCompose({ header_title, children }: PageComposeProps) {
  return (
    <Box>
      <Header title={header_title} />

      <Flex w="100%" my="6" mx="auto" px="6">
        <Sidebar />

        { children }
      </Flex>
    </Box>
  )
}