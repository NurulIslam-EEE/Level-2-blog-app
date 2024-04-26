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
    // console.log(args, userInfo);
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });

    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });

    if (!post) {
      return {
        userError: "post not found",
        post: null,
      };
    }

    if (post.authorId !== user.id) {
      return {
        userError: "post not own by you",
        post: null,
      };
    }

    console.log("user", user, "ppp", post);
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};
