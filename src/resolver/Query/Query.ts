export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    console.log(await prisma.user.findMany());
    return await prisma.user.findMany();
  },
};