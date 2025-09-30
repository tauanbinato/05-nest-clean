import { ConflictException, UsePipes } from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import z from 'zod'

/**
 * I'm creating a controller for each use case, so I can keep my code organized
 * This controller is responsible for handling the creation of a new account
*/

/**
 * Zod is a TypeScript-first schema declaration and validation library
 * Here I'm using it to validate the request body
 * It ensures that the name is at least 3 characters long,
 */
const createAccountBodySchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
})

// We can infer the type from the schema, nice feature from Zod
// So we don't need to define the type manually
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

/**
 * This controller uses the PrismaService to interact with the database
 * It checks if the email already exists,
 * and if so, it throws a ConflictException.
 * If the email doesn't exist, it creates a new user in the database
 * Finally, it returns the created account
 */
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('Email already exists')
    }

    const hashedPassword = await hash(password, 10)

    const account = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { account }
  }
}
