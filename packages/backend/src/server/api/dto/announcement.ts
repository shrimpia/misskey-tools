import { z } from 'zod';

export const announcementListItemDtoSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  title: z.string(),
}).strict();

export type AnnouncementListItemDto = z.infer<typeof announcementListItemDtoSchema>;

export const announcementDtoSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  title: z.string(),
  body: z.string(),
  like: z.number(),
}).strict();

export type AnnouncementDto = z.infer<typeof announcementDtoSchema>;
