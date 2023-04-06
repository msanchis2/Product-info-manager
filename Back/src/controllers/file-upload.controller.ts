
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import fsExtra from 'fs-extra';
import multer from 'multer';
import sharp from 'sharp';
import {FileUploadBindings} from '../keys';
import {FileUploadHandler} from '../types';

@authenticate('jwt')
export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FileUploadBindings.FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) { }

  @authorize({allowedRoles: ['admin']})
  @post('/files-upload/{folderPathDir}/{fileName}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.path.string('folderPathDir') folderPathDir: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<object> {
    const destPath = `./public/multimedia/${folderPathDir}/`;
    let newFileName = "";

    // Creamos directorio si no existe
    try {
      await fsExtra.ensureDir(destPath)
    } catch (err) {
      console.error(err)
    }
    // Parametros-opciones de multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destPath)
      },
      filename: function (req, file, cb) {
        //Buscamos extension, renombramos y guardamos referencia para el resize posterior
        const fileNameSplit = file.originalname.split(".")
        newFileName = `${fileName}.${fileNameSplit[fileNameSplit.length -1]}`

        cb(null, newFileName);
      }
    })

    const promiseUpload = new Promise<object>((resolve, reject) => {
      const upload = multer({ storage: storage }).single("file")
      upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          reject(err)
        } else if (err) {
          // An unknown error occurred when uploading.
          reject(err)
        }
        // Fue todo bien
        resolve({ originalUrl: `${destPath}${newFileName}`})
      })
    })

    return promiseUpload.then(r =>{
      return { originalUrl: `${destPath}${newFileName}`}
    })
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;

    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body};
  }

  @authorize({allowedRoles: ['admin']})
  @post('/images-upload/{folderPathDir}/{fileName}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async imageUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.path.string('folderPathDir') folderPathDir: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<object> {
      const destPath = `./public/multimedia/${folderPathDir}/`;
      let newFileName = "";

      // Creamos directorio si no existe
      try {
        await fsExtra.ensureDir(destPath)
      } catch (err) {
        console.error(err)
      }
      // Parametros-opciones de multer
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, destPath)
        },
        filename: function (req, file, cb) {
          //Buscamos extension, renombramos y guardamos referencia para el resize posterior
          const fileNameSplit = file.originalname.split(".")
          newFileName = `${fileName}.${fileNameSplit[fileNameSplit.length -1]}`

          cb(null, newFileName);
        }
      })

      const promiseUploadAndResize = new Promise<object>((resolve, reject) => {
        const upload = multer({ storage: storage }).single("file")
        upload(request, response, function (err) {
          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            reject(err)
          } else if (err) {
            // An unknown error occurred when uploading.
            reject(err)
          }
          // Fue todo bien
          if (request.file?.mimetype.includes("image")) resolve(FileUploadController.tratarImagenes(`${destPath}/${newFileName}`))
        })
      })

      return promiseUploadAndResize.then(r =>{
        // Retornamos url de la orignal y de la resized que sera la que utilizaremos en la web
        return { originalUrl: `${destPath}${newFileName}`, resizedUrl: `${destPath}1250x850_${fileName}.png` }
      })
  }

  private static async tratarImagenes(dirPathImage: string) {
    const imageContent = await fsExtra.readFile(dirPathImage);

    await sharp(imageContent)
    .resize(1250, 850, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFormat('png')
    .toBuffer()
    .then(async function(outputBuffer) {
      const originPath = dirPathImage.split("/")
      const fileName = originPath.pop()?.split(".")[0]
      const outputPath = originPath.filter(p => p !== "").join("/")
      //Creamos si no existe
      await fsExtra.ensureDir(outputPath)
      fsExtra.writeFileSync(`${outputPath}/1250x850_${fileName}.png`, outputBuffer);
    });
  }
}
