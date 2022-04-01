import { Box, Stack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";

interface PageComposeProps extends StackProps {
  header_title?: string;
  children: ReactNode;
}

export function PageCompose({ header_title, children, ...rest }: PageComposeProps) {
  return (
    <Box>
      <Header title={header_title} />

      <Stack
        w="100%"
        maxWidth="100%"
        my="6"
        mx="auto"
        px={"6"}
        justify="space-evenly"
        align="center"
        direction={["column" ,"row"]}
        spacing={["8", "10"]}
        {...rest}
      >
        { children }
      </Stack>
    </Box>
  )
}