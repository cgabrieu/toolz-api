const paths = {
  '/auth': {
    post: {
      tags: ['User'],
      summary: 'User',
      description: 'Create User',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'body',
          name: 'create',
          required: true,
          schema: {
            $ref: '#/definitions/UserPayload',
          },
        },
      ],
      responses: {
        201: {
          description: 'Created',
          schema: {
            $ref: '#/definitions/User',
          },
        },
        409: {
          description: 'Conflict',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        400: {
          description: 'Bad Request',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
  },
};

const definitions = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
    },
  },
  UserPayload: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export default {
  paths,
  definitions,
};
