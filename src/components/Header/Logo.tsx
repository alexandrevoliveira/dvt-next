import { Flex, Text } from "@chakra-ui/react"

export function Logo() {
  return (
    <Flex direction="column">
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        lineHeight="1"
        w="64"
        textTransform="uppercase"
        textAlign="center"
      >
        dvt
        <Text as="span" ml="1" color="pink.400">.</Text>
      </Text>

      <Text
        lineHeight="1"
        letterSpacing=".6px"
        color="purple.dvt-light"
        textAlign="center"
      >
        Ferramenta de<br />visualização de dados
      </Text>
    </Flex>
  )
}