// Uncomment these imports to begin using these cool features!
// import {LoggingBindings, logInvocation, WinstonLogger} from '@loopback/logging';
import {get, param, post, requestBody, response} from '@loopback/rest';
import fsExtra from 'fs-extra';

export class LogProductosController {
  constructor() { }
  // Inject a winston logger
  // @inject(LoggingBindings.WINSTON_LOGGER)
  // private logger: WinstonLogger;
  // http access is logged by a global interceptor
  @get('/greet/{name}')
  // log the `greet` method invocations
  // @logInvocation()
  greet(@param.path.string('name') name: string) {
    return `Hello, ${name}`;
  }
  // Intento log post

  // @post('/log-productos')
  @post('/log-productos')
  // @response(200, {
  //   description: 'Productos model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Productos)}},
  // })
  @response(200, {
    description: 'Files and fields',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    }
  })
  async log(@requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  }) productos: Omit<any, 'id'>,
  ): Promise<any> {
    // productos = Object.keys(productos).map((key) => [Number(key), productos[key]])
    productos = Object.keys(productos).map((key) => [productos[key]])
    const destPath = `./public/logs/logs-productos/`;
    // Creamos directorio si no existe
    try {
      await fsExtra.ensureDir(destPath)
    } catch (err) {
      console.error(err)
    }
    const fechaHoy = new Date()
    const fechaFormateada = fechaHoy.toLocaleString().replace(/[\/\\:]/g, "_");
    const rutaConNombre = destPath + "Sincronización Productos Navision " + fechaFormateada + ".txt"
    fsExtra.writeFileSync(rutaConNombre, productos.toString())
  }
}
