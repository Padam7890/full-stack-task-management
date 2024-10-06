import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshJwtConfig from '../../core/config/refresh-jwt-config';
import jwtConfig from '../../core/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { MailService } from '../../common/service/mail/mail.service';
import path, { join } from 'path';
import ejs, { renderFile } from 'ejs';
import { resetPasswordDTO } from './dto/auth';
import { ifError } from 'assert';



//Injectable AUth service provider/Auth Service
@Injectable()
export class AuthService {
  constructor(
    // service injection
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(jwtConfig.KEY)
    private accessTokenConfig: ConfigType<typeof jwtConfig>,
    private mailService: MailService,
  ) {}

  //signup Service
  async signUp(data: CreateUserDto): Promise<any> {
    const user = await this.userService.create(data);
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    console.log(token, refresh_token);

    return {
      message: 'User SignUp Successfully',
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  //validate user service
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  //login service
  async login(user: User) {
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      message: 'User SignIn Successfully',
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  //create token service
  private async createToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, name: user.name};
    const access_token = await this.jwtService.signAsync(
      payload,
      this.accessTokenConfig,
    );
    return { access_token };
  }

  //create refresh token service
  async createRefreshToken(user: User): Promise<{ refreshToken: string }> {
    const payload = { sub: user.id, email: user.email, name:user.name };
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig,
    );
    return { refreshToken };
  }

  //validate google user service
  async validateGoogleUser(googleUser: CreateUserDto): Promise<User> {
    console.log('email:' + googleUser.email);
    if (!googleUser.email) {
      console.error('No email provided');
      throw new Error('Please provide a valid email');
    }
    const user = await this.userService.findByEmail(googleUser.email);
    console.log(user);
    if (user) return user;
    const createUser = await this.userService.create(googleUser);
    console.log(createUser);
    return createUser;
  }

  // Forget password service
  async forgetPassword(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    const resetToken = await this.userService.resetPasswordToken(user.id);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken.passwordResetToken}`;

    const html = await renderFile(
      join(__dirname, '..', '..', 'views', 'forget-password.ejs'),
      { getUserName: user.name, resetUrl }, 
    );

    try {
      const { success } = await this.mailService.sendEmail(
        user.email,
        'Reset Password',
        html,
      );

      return {
        message: success
          ? 'Reset password email sent successfully.'
          : 'Failed to send reset password email.',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        message: 'An error occurred while sending the reset password email.',
      };
    }
  }

  //reset password service
  async resetPassword(resetPasswordDTO: resetPasswordDTO): Promise<User> {
    const updatePassword = await this.userService.updatePassword(
      resetPasswordDTO.token,
      resetPasswordDTO.password,
    );
    return updatePassword;
  }
}
