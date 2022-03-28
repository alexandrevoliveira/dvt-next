import { Icon, Select, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PageCompose } from "../components/Compose/PageCompose";
import { FileInput } from "../components/Form/FileInput";
import { getUploadedFiles, uploadFileRequest } from "../domains/upload.services";
import { MdArrowDropDown } from "react-icons/md";

interface FileProps {
  name: string;
  rows: string[];
}

export default function Home() {
  const [filesData, setFilesData] = useState<any[]>()

  const onChange = async (formData: FormData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    setFilesData(response.data)
  };

  useEffect(() => {
    const response = getUploadedFiles()
    Promise.resolve(response).then(res => {
      setFilesData(res.data)
    })
  }, [])
  console.log(filesData)
  
  return (
    <PageCompose header_title="VET | Home">
      <Stack
        mt={4}
        justify="space-between"
        align="center"
      >
        <FileInput
          label="Upload Single CSV File"
          uploadFileName="files"
          onChange={onChange}
        />

        <Select
          bgColor="white"
          color="black"
          icon={<Icon as={MdArrowDropDown}/>}
          placeholder='Select the file'>
          { filesData?.map((file: FileProps, index) => {
            return (
              <option 
                key={index}
                // value={file.name}
                style={{
                  color: "black",
                  backgroundColor: "white"
                }}
              >
                {file.name}
              </option>
            )
          }) }
        </Select>
      </Stack>
    </PageCompose>
  )
}