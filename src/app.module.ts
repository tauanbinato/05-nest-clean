import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from
  './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

@Module({
  // ConfigModule expose a ConfigService under the hood
  imports: [ConfigModule.forRoot({
    validate: (config) => envSchema.parse(config),
    isGlobal: true,
  })],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
