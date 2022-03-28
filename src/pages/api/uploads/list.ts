import { ApiResponse } from '../../../models/ApiResponse';
import { filesUploadDestination, uploadConfig } from '../../../config/uploadConfig';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[] | any[], string>;

interface FileData {
  name: string;
  rows: any[];
}

const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something went wrong! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  const filesData: FileData[] = []
  const filenames = fs.readdirSync(filesUploadDestination);
  
  filenames.forEach((name, index) => {
    const fileBuffer = fs.readFileSync(`${filesUploadDestination}/${name}`)
    const fileContent = fileBuffer.toString("utf-8")
    const fileSplit = fileContent.split("\n").map(file => file.split(","))
    const fileMap = fileSplit.map(line => line.map(column => column.replace("\r", "")))
    filesData.push({
      name: filenames[index],
      rows: fileMap
    })
  }); 

  res.status(200).json({ data: filesData });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;