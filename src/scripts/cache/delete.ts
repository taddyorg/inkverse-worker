import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

const envPath = path.resolve('.env');
dotenv.config({ path: envPath });

import { purgeCacheOnCdn, type CacheType } from '../../shared/cache/index.js'

async function run() {

  const inputs = process.argv.slice(2);
  const type = inputs[0];
  const id = inputs[1];
  const shortUrl = inputs[2];

  if(!type){
    throw new Error("Must pass in a taddyType as arg 1")
  }

  await purgeCacheOnCdn({ type: type as CacheType, id, shortUrl });

  // end node program
  process.exit()

}

run();