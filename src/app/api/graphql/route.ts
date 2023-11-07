import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../prisma/db";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

export type Context = {
	prisma: PrismaClient;
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

 const handler= startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});
export { handler as GET, handler as POST };