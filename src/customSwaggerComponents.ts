export const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'Documentation for your API endpoints',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1/',
        },
        {
            url: 'my-brand-backend-lmk2.onrender.com/api/v1/'
        }
    ],
    security: [
        {
          BearerAuth: [],
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        schemas: {
            UserSignup: {
                type: 'object',
                properties: {
                    fullName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                    password: { type: 'string' },
                },
                required: ['fullName', 'email', 'password', 'role'],
            },
            UserLogin: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
                required: ['email', 'password'],
            },
            Message: {
                type: 'object',
                properties: {
                    fullName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    messageBody: { type: 'string' },
                },
                required: ['fullName', 'email', 'messageBody'],
            },
            BlogInput: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                  file: { 
                    type: 'string' ,
                    format:'binary'
                },
                },
                required: ['title', 'content', 'file'],
              },
        },
    }
}
