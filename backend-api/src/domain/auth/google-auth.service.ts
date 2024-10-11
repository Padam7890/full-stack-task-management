import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthorizationCode } from '@prisma/client';
import { AuthorizationCodeWithUser } from 'src/core/interfaces/types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly prisma: DatabaseService) {}

  async saveCode(
    addUserToUUId: string,
    id: number,
  ): Promise<AuthorizationCode> {
    try {
      const expiresAt = new Date();
      const expireDate = expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      return await this.prisma.authorizationCode.create({
        data: {
          code: addUserToUUId,
          userId: id,
          expiresAt: new Date(expireDate),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create authorization code');
    }
  }
  async findoneAuthCode(code: string): Promise<AuthorizationCodeWithUser> {
    try {
      return await this.prisma.authorizationCode.findUnique({
        where: { code },
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Faile to Find Auth Code');
    }
  }
  async deleteAuthCode(id: number): Promise<AuthorizationCode> {
    try {
      return await this.prisma.authorizationCode.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete Auth Code');
    }
  }
}
