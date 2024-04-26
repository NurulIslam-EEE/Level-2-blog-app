export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    console.log(await prisma.user.findMany());
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    console.log(await prisma.post.findMany());
    return await prisma.post.findMany();
  },
};
