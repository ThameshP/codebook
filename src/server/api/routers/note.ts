import { z } from "zod";
import { createTRPCRouter } from '../trpc';

import { protectedProcedure } from "../trpc";





export const noteRouter = createTRPCRouter({
  delete: protectedProcedure

    .input(
      z.object({
        id: z.string()
      })
    )

    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
            id: input.id,
        },
      });
    }),

  create: protectedProcedure

    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        subjectId: z.string(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          subjectId: input.subjectId,
          content: input.content,
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ subjectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          subjectId: input.subjectId,
        },
      });
    }),
});