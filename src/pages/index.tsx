import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <Flex>
        <Box>
          <Heading>Iniciando projeto</Heading>
        </Box>
      </Flex>
    </>
  )
}