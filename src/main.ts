import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { EnvSchema } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Using app.get when can get any service from our modules
  // The type in get tells NestJS what to expect and set true
  // to inform nest that this schema was validated
  const configService = app.get<ConfigService<EnvSchema, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  console.log(`Server running on port: ${port}`)
  await app.listen(port)
}
bootstrap()
