import { ApiResponse } from '../../../models/ApiResponse';
import { filesUploadDestination, uploadConfig } from '../../../config/uploadConfig';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[] | any[], string>;

const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something went wrong! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadConfig.array('files'));

apiRoute.post((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  const filenames = fs.readdirSync(filesUploadDestination);
  const filesContentResult = filenames.map((name, index) => {
    const fileBuffer = fs.readFileSync(`${filesUploadDestination}/${name}`)
    const fileContent = fileBuffer.toString("utf-8")
    const fileSplit = fileContent.split("\n").map(file => file.split(","))
    const fileSlice = fileSplit.slice(0, fileSplit.length)
    const fileMap = fileSlice.map(line => line.map(column => column.replace("\r", "")))
    
    return {
      [filenames[index]]: fileMap
    }
  }); 

  res.status(200).json({ data: filesContentResult });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;