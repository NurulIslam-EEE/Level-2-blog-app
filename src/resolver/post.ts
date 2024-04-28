import { userLoader } from "../dataLoders/userLoaders";

export const Post = {
  author: async (parent: any, args: any, { prisma }: any) => {
    // console.log(parent);
    return userLoader.load(parent.authorId);
  },
};
