import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import z from "astro/zod";

const blogsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      pubDate: z.date().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      pref: z.boolean().optional(),
      image: z
        .object({
          url: image(),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  blogs: blogsCollection,
};
