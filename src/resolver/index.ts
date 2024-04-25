import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";
import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";

const prisma = new PrismaClient();

export const resolvers = {
  Query,
  Mutation,
};
