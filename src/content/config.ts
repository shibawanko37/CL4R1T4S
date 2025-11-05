import { defineCollection, z } from 'astro:content';
import { readdirSync } from 'fs';

const contentPath = 'src/content';
const collectionsToExport = {};

const dirents = readdirSync(contentPath, { withFileTypes: true });

for (const dirent of dirents) {
  if (dirent.isDirectory()) {
    collectionsToExport[dirent.name] = defineCollection({
      type: 'content',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        pubDate: z.coerce.date().optional(),
        updatedDate: z.coerce.date().optional(),
      }),
    });
  }
}

export const collections = collectionsToExport;
