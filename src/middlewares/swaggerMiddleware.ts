import fs from 'fs';
import { resolve } from 'path';

class SwaggerConfig {
  private readonly config: any;

  private paths = {};

  private definitions = {};

  constructor() {
    this.config = {
      swagger: '2.0',
      basePath: '/',
      info: {
        title: 'Documentação - Toolz',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    };

    this.definitions = {
      ErrorResponse: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              $ref: '#/definitions/ErrorData',
            },
          },
        },
      },
      ErrorData: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            description: 'Error code',
          },
          message: {
            type: 'string',
            description: 'Error message',
          },
        },
      },
    };
  }

  public async load(): Promise<{}> {
    const dir = await fs.readdirSync(resolve(__dirname, '..', 'apps'));
    const swaggerDocument = dir.reduce(
      (total, path) => {
        try {
          const swagger = require(`../apps/${path}/swagger`);
          const aux = total;

          aux.paths = { ...total.paths, ...swagger.default.paths };

          if (swagger.default.definitions) {
            aux.definitions = {
              ...total.definitions,
              ...swagger.default.definitions,
            };
          }

          return total;
        } catch {
          return total;
        }
      },
      {
        ...this.config,
        paths: { ...this.paths },
        definitions: { ...this.definitions },
      }
    );
    return swaggerDocument;
  }
}

export default new SwaggerConfig();
