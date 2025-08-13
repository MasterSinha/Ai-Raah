import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { get } from "react-hook-form";


export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string().url(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      
      const user = await ctx.db.user.upsert({
        where: { id: ctx.user.userId! },
        update: {},
        create: {
          id: ctx.user.userId!,
          
          emailAddress: `${ctx.user.userId!}@example.com`,
        },
      });

      
      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          githubToken: input.githubToken,
          userToProjects: {
            create: {
              userId: user.id,
            },
          },
        },
      });
      await pollRepo(input.githubUrl, project.id);

      return project;
    }),
    getProject: protectedProcedure.query(async({ctx})=>{
      return await ctx.db.project.findMany({
        where:{
          userToProjects:{
            some:{
              userId:ctx.user.userId!
            }
          },
          deletedAt:null
        }
      })

    })
});

