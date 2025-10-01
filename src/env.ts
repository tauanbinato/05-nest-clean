import z from 'zod'

/**
 * Defining the schema for the environment variables
 * Using Zod to ensure that the variables are of the correct type
 * and that required variables are present
 *
 * We use this schema in our main module globally
 */
export const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().optional().default(3333),
})

export type EnvSchema = z.infer<typeof envSchema>
