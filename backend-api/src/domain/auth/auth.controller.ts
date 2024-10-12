import {
  Body,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Res,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ExchangeCode, forgetPasswordDTO, resetPasswordDTO, signInDTO } from './dto/auth';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';
import { RefreshAuthGuard } from '../../core/guards/refresh-auth.guard';
import { LocalAuthGuard } from '../../core/guards/local-auth.guard';
import { createResponse } from '../../helper/response.helper';
import { GoogleAuthGuard } from 'src/core/guards/googleauth.guard';
import { BlockToManyRequest } from 'src/core/guards/customTGuard.guard';

// Controller For Authentication Module
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //signin http method
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @UseGuards(BlockToManyRequest)
  @UniversalDecorator({
    summary: 'Sign in Form',
    responseType: signInDTO,
    body: {
      email: {
        type: 'string',
        example: 'padamthapa@gmail.com',
      },
      password: {
        type: 'string',
        example: 'padam786',
      },
    },
  })
  async signin(@Req() req) {
    return this.authService.login(req.user);
  }

  //signup http method
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
  })
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signUp(user);
  }

  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
    includeBearerAuth: true,
  })
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request) {
    const response = await this.authService.createRefreshToken(request.user.id);
    return createResponse(HttpStatus.OK, "Refresh Token", response);
  }

  //google login http method
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  //google callback http method
  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user);
    const generateCode = await this.authService.generateCode(response);
    res.redirect(`${process.env.FRONTEND_URL}?code=${generateCode.code}`);
  }



  @Post("exchange-code")
  @UniversalDecorator({
    summary: 'Exchange code to Token',
    responseType: ExchangeCode,
  })
  async exchangeCode(@Body() code:ExchangeCode ){
    console.log(code.code)
    const token = await this.authService.exchangeCodeWithToken(code.code);
    console.log(token)
    return createResponse(HttpStatus.OK, "User Fetched Successfully", token);
  }


  //forget password http method
  @Post('forget-password')
  @UniversalDecorator({
    summary: 'Forget Password',
    responseType: forgetPasswordDTO,
  })
  async forgetPassword(@Body() forgetPasswordDTO: forgetPasswordDTO) {
    const response = await this.authService.forgetPassword(
      forgetPasswordDTO.email,
    );
    return createResponse(HttpStatus.OK, response.message);
  }

  //reset password http method
  @Post('reset-password')
  @UniversalDecorator({
    summary: 'Reset Password',
    responseType: resetPasswordDTO,
  })
  async resetPassword(@Body() resetPasswordDTO: resetPasswordDTO) {
    const response = await this.authService.resetPassword(resetPasswordDTO);
    return createResponse(
      HttpStatus.OK,
      'Password reset successfully',
      response,
    );
  }
}
