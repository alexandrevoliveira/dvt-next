import { Flex } from "@chakra-ui/react";
import { PageCompose } from "../components/Compose/PageCompose";
import { FileInput } from "../components/Form/FileInput";
import { uploadFileRequest } from "../domains/upload.services";

export default function Home() {
  const onChange = async (formData: FormData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    console.log('response', response);
  };

  return (
    <PageCompose header_title="VET | Home">
      <Flex
        mt={4}
        justify="center"
        align="center"
      >
        <FileInput
          label="Upload Single File"
          uploadFileName="files"
          onChange={onChange}
        />
      </Flex>
    </PageCompose>
  )
}