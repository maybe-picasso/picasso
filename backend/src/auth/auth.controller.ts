import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const { CLIENT_HOST } = process.env;

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    const redirectPath = `${CLIENT_HOST}/#/auth`;

    if (jwt) {
      res.redirect(`${redirectPath}/${jwt}`);
    } else {
      res.redirect(`${redirectPath}`);
    }
  }
}
