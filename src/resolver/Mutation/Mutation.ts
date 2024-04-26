import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHelper } from "../../utils/jwtHelper";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}
const prisma = new PrismaClient();
export const Mutation = {
  signup: async (parent: any, args: userInfo, { Prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        userError: "Already this email is registered!",
        token: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );
    console.log("tttt", token);
    return {
      userError: null,
      token,
    };
  },
  signin: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    // console.log("uuuu", user);
    if (!user) {
      return {
        userError: "User not found!",
        token: null,
      };
    }

    const correctPass = await bcrypt.compare(args.password, user.password);

    if (!correctPass) {
      return {
        userError: "Incorrect Password!",
        token: null,
      };
    }
    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );
    return {
      userError: null,
      token,
    };
  },
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args);
  },
};