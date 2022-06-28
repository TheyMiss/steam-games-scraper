import { z } from 'zod';

export const gameDataSchema = z.object({
  appid: z.number({ required_error: 'Game appid required!' }).min(1),
  name: z.string({ required_error: 'Game name is required!' }).min(1),
  image: z.string({ required_error: 'Game image required!' }).min(1),
  reviews: z.number({ required_error: 'Game reviews required!' }).min(1),
});
