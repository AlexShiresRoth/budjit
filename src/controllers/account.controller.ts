import { Controller, Get } from '@nestjs/common';

interface Response {
  message: string;
  success: boolean;
  responseData: any;
}

@Controller('accounts')
export class AccountsController {
  @Get('myaccount')
  findMyAccount(): Response {
    return {
      message: 'Yay',
      success: true,
      responseData: { name: 'Jub' },
    };
  }
}
