import { Stack } from "@chakra-ui/react";
import { PageCompose } from "../components/Compose/PageCompose";
import { Input } from "../components/Form/Input";

export default function Home() {
  return (
    <PageCompose header_title="VET | Home">
      <Stack>
        <Input
          name="dvtfile"
          label="Arquivo"
          type="file"
          size="sm"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </Stack>
    </PageCompose>
  )
}