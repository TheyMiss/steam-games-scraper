import { z } from 'zod';

export const gameIdSchema = z.object({
  appid: z.number({ required_error: 'Game id is required!' }).min(10),
  name: z.string({ required_error: 'Game name is required!' }).min(1),
});
