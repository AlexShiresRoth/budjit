import { Module } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { config } from 'dotenv';
const fetch = require('node-fetch');
config();

const unsplashProvider = {
  provide: 'UNSPLASH',
  useFactory: () => {
    const client = createApi({
      accessKey: process.env.UNSPLASH_KEY,
      fetch,
    });

    return client;
  },
};

@Module({
  imports: [],
  providers: [unsplashProvider],
  exports: ['UNSPLASH', unsplashProvider],
})
export class UnsplashModule {}
