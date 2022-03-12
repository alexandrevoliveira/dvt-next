import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
          <title>VET</title>
      </Head>

      <Flex>
        <Box>
          <Heading>Iniciando projeto</Heading>
        </Box>
      </Flex>
    </>
  )
}