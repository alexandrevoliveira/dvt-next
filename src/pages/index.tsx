import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PageCompose } from "../components/Compose/PageCompose";
import { FileInput } from "../components/Form/FileInput";
import { getUploadedFiles, uploadFileRequest } from "../domains/upload.services";
import { CustomCSVSelect } from "../components/Select/CustomCSVSelect";
import { shapeCSVLines } from "../utils/helpers";

interface FileProps {
  name: string;
  rows: string[][];
}

export default function Home() {
  const [filesData, setFilesData] = useState<any[]>()
  const [file, setFile] = useState<FileProps>()
  const [fileObject, setFileObject] = useState({})

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
  
  useEffect(() => {
    file ? setFileObject(shapeCSVLines(file.rows)) : null;
  }, [file])
  console.log(fileObject)
  
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

        <CustomCSVSelect
          value={file}
          items={filesData}
          onChange={(newValue) => setFile(newValue)}
        />
      </Stack>
    </PageCompose>
  )
}