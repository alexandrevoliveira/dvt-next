import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PageCompose } from "../../components/Compose/PageCompose";
import { FileInput } from "../../components/Form/FileInput";
import { getUploadedFiles, uploadFileRequest } from "../../domains/upload.services";
import { CustomCSVSelect } from "../../components/Select/CustomCSVSelect";
import { shapeCSVLines, shapeEvasionCSVLines } from "../../utils/helpers";
import AreaDashboard from "../../components/Dashboard/Area";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface FileProps {
  name: string;
  rows: string[][];
}

export default function AreaDashboardPage() {
  const [filesData, setFilesData] = useState<any[]>()
  const [file, setFile] = useState<FileProps>()
  const [fileObject, setFileObject] = useState({})
  console.log(file)

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
    }).catch(err => console.error(err))
  }, [])
  
  useEffect(() => {
    if (file) {
      const column_names = file.rows[0] as string[]
      column_names.includes('Período Ingresso')
      && column_names.includes('Semestre da Evasão')
      && column_names.includes('Número de evadidos por turma') ?
        setFileObject(shapeEvasionCSVLines(file.rows))
        : setFileObject(shapeCSVLines(file.rows))

    } else {
      return null
    };
  }, [file])
  
  return (
    <PageCompose header_title="DVT | Area Dashboard">
      <Stack flex="1" direction="column" spacing={[4, 4, 4, 4, 6]} justify="center" align="center">
        <Stack
          mt={4}
          align="center"
          direction={["column", "column", "column", "column" ,"row"]}
          spacing={[4, 4, 4, 4, 16]}
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
        
        {file && (<Stack w="100%" maxW="680px" h="100%">
          <AreaDashboard name={file?.name} object={fileObject}/>
        </Stack>)}
      </Stack>
    </PageCompose>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const data = await getSession({
    ctx
  })
  
  if (data?.user) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
}