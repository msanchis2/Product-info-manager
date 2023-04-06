/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {authenticate} from '@loopback/authentication';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Buffer} from 'buffer';
import * as fs from 'fs';
import jsftp from 'jsftp';
import JSZip from "jszip";
import {join} from 'path';
import {Aecoc} from '../models';

@authenticate('jwt')
export class AecocController {

  constructor(
  ) { }

  @post('/enviarAECOC')
  @response(200, {
    description: 'Enviar XML a AECOC',
    content: {
      'application/json': {schema: getModelSchemaRef(Aecoc)}
    },
  })
  async enviarAECOC(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aecoc),
        },
      },
    }) datosAecoc: Aecoc,
  ): Promise<string> {
      try {
        let partes, path, ficheroAecoc
        const xml = Buffer.from(datosAecoc.texto, 'base64')
        const imagenes = JSON.parse(datosAecoc.imagenes)
        const zip = new JSZip()
        const fecha = new Date()
        const fechaFormato = fecha.getFullYear().toString()
        + (fecha.getMonth() + 1).toString().padStart(2, '0')
        + fecha.getDate().toString().padStart(2, '0')
        + fecha.getHours().toString().padStart(2, '0')
        + fecha.getMinutes().toString().padStart(2, '0');
        const nombreFichero = `FichaSVAN_${datosAecoc.gln}_724_${fechaFormato}`

        imagenes.forEach(async (element: {fichero: string, tagAecoc: string}) => {
          partes = element.fichero.split("/")
          path = join(__dirname, '..', '..', 'public', 'multimedia', partes[1], partes[2]);
          ficheroAecoc = fs.readFileSync(path);
          zip.file(element.tagAecoc, ficheroAecoc, { binary: true })
        })
        zip.file(nombreFichero.concat('.xml'), xml, { binary: true })

        zip.generateAsync({ type: "nodebuffer" }).then(function (content) { enviarFtp(content, nombreFichero) })

      } catch (error) {
        return error
      }
      return 'Envío sin errores'
    }
}

function enviarFtp (data: Buffer, nombreFichero: string) {
  const Ftp = new jsftp({
    host: process.env.AECOC_FTP_ADDRESS,
    user: process.env.AECOC_FTP_USER,
    pass: process.env.AECOC_FTP_PASS,
    port: 21
  })
  Ftp.put(data, 'Test/'.concat(nombreFichero).concat('.zip'), err => {
    if (err)
      console.log(`\n${err}\n`)
    else
      console.log('Subido')
  })
}

