import { Injectable } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService {
	public client: PrismaClient

	constructor() {
		this.client = new PrismaClient()
	}

}
