import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma'

/**
 * PrismaService is a service or provider that extends
 * the PrismaClient to avoid boilerplate code
 * Also implements OnModuleInit and OnModuleDestroy interfaces to manage
 * the database connection lifecycle within a NestJS application.
 */
@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  onModuleInit() {
    this.$connect()
  }

  onModuleDestroy() {
    this.$disconnect()
  }
}
