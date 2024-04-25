import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
}
export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      console.log(await prisma.user.findMany());
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "signature", {
        expiresIn: "1d",
      });
      console.log("tttt", token);
      return {
        userError: null,
        token,
      };
    },
    signin: async (parent: any, args: any, context: any) => {
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
      const token = await jwt.sign({ userId: user.id }, "signature", {
        expiresIn: "1d",
      });
      return {
        userError: null,
        token,
      };
    },
  },
};
