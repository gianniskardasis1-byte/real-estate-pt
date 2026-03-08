let prismaClientPromise;

const getPrismaClient = async () => {
  if (!prismaClientPromise) {
    prismaClientPromise = import('@prisma/client')
      .then(({ PrismaClient }) => new PrismaClient())
      .catch((error) => {
        const prismaError = new Error(
          'Database service is not ready. Generate the Prisma client before using the API.',
        );
        prismaError.statusCode = 503;
        prismaError.cause = error;
        throw prismaError;
      });
  }

  return prismaClientPromise;
};

const createModelProxy = (modelName) =>
  new Proxy(
    {},
    {
      get(_target, operation) {
        return async (...args) => {
          const client = await getPrismaClient();
          return client[modelName][operation](...args);
        };
      },
    },
  );

export const prisma = new Proxy(
  {},
  {
    get(_target, modelName) {
      return createModelProxy(modelName);
    },
  },
);
