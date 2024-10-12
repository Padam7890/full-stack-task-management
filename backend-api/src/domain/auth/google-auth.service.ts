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
      const expiresAt = new Date();
      const expireDate = expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      return await this.prisma.authorizationCode.create({
        data: {
          code: addUserToUUId,
          userId: id,
          expiresAt: new Date(expireDate),
        },
      });
  }
  async findoneAuthCode(code: string): Promise<AuthorizationCodeWithUser> {
      return await this.prisma.authorizationCode.findUnique({
        where: { code },
        include: {
          user: true,
        },
      });
  }
  async deleteAuthCode(id: number): Promise<AuthorizationCode> {
      return await this.prisma.authorizationCode.delete({
        where: { id },
      });
  }
}
