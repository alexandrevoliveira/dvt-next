import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
import { ApiResponse } from '../../../models/ApiResponse';
import { filesUploadDestination, uploadConfig } from '../../../config/uploadConfig';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

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
  const images = filenames.map((name) => name);

  res.status(200).json({ data: images });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;