import { Controller, Get } from '@nestjs/common';
import { AccountsService } from 'src/services/account.service';

interface Response {
  message: string;
  success: boolean;
  responseData: any;
}

@Controller('accounts')
export class AccountsController {
  private readonly accountService: AccountsService;
  @Get('myaccount')
  account(): string {
    return 'Do I need a controller if using graphql?';
  }
}
