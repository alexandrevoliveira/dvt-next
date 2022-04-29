import { Heading, Stack } from "@chakra-ui/react";
import { PageCompose } from "../components/Compose/PageCompose";

interface FileProps {
  name: string;
  rows: string[][];
}

export default function Home() {
  
  return (
    <PageCompose header_title="DVT | Home">
      <Stack
        flex="1"
        direction="column"
        spacing={[4, 6]}
        justify="center"
        align="center"
      >
        <Stack
          mt={4}
          align="center"
          direction={"column"}
          spacing={[10, 12]}
          color="gray.50"
        >
          <Heading>Hello! Welcome to our data visualization tool.</Heading>
          <Heading>Please log to be abble to use our graphs through adding any file you want</Heading>
        </Stack>
      </Stack>
    </PageCompose>
  )
}