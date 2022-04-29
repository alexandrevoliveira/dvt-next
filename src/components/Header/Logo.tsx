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
        color="gray.50"
      >
        dvt
        <Text as="span" ml="1" color="purple.dvt-light">.</Text>
      </Text>

      <Text
        lineHeight="1"
        letterSpacing=".6px"
        color="pink.400"
        textAlign="center"
        fontFamily="Ubuntu"
      >
        Ferramenta de<br />visualização de dados
      </Text>
    </Flex>
  )
}