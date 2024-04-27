export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(userInfo, "cccc");
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args, "cccc");
    return await prisma.profile.findUnique({
      where: {
        userId: Number(userInfo.userId),
      },
    });
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    console.log(await prisma.user.findMany());
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    console.log(await prisma.post.findMany());
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });
  },
};
