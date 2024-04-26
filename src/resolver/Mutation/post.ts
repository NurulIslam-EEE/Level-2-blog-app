export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    console.log(userInfo, "infoooo");

    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args, userInfo);
  },
};
