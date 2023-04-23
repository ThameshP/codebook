import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.subject.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subject.create({
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
