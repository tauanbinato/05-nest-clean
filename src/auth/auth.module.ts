import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { EnvSchema } from 'src/env'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /**
     * Here i'm using registerAsync to be able to inject the ConfigService
     * so I can access the JWT_SECRET from the environment variables
     * This is how we use a service inside a module configuration.
     */
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<EnvSchema, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
          },
        }
      },
    }),
  ],
})
export class AuthModule { }
