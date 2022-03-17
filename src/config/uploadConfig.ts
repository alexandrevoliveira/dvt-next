import multer from "multer"

export const filesUploadDestination = "./public/uploads"

export const uploadConfig = multer({
  storage: multer.diskStorage({
    destination: filesUploadDestination,
    filename: (request, file, callback) => {
      const date = new Date().getDate().toString();
      const month:number = new Date().getMonth() + 1;
      const year = new Date().getFullYear().toString();
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      const seconds = new Date().getSeconds().toString();
      const today = `${date}-${month}-${year}(${hours}:${minutes}:${seconds})`

      const fileName = `${today}_${file.originalname}`;

      return callback(null, fileName);
    },
  })
})