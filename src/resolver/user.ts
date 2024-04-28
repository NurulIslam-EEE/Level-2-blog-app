export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = parent.id === userInfo.userId;
    // console.log(userInfo, "uuuuu", parent.id, isMyProfile);
    if (isMyProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
};
