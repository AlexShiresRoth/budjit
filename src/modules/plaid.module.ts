import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Module } from '@nestjs/common';
import { config } from 'dotenv';
config();

const plaidProvider = {
  provide: 'PLAID',
  useFactory: () => {
    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SANDBOX_SECRET,
        },
      },
    });

    const client = new PlaidApi(configuration);
    console.log('client', client);
    return client;
  },
};

@Module({
  imports: [],
  providers: [plaidProvider],
  exports: ['PLAID', plaidProvider],
})
export class PlaidModule {}
