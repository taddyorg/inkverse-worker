import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve('.env');
dotenv.config({ path: envPath });

import { database } from '../../shared/database/index.js';
import { addFeedByUuid } from './add-new-feed-by-uuid.js';
import { TaddyWebhookAction, TaddyWebhookType } from '@/shared/taddy/process-webhook.js';

async function run() {
  const inputs = process.argv.slice(2);
  const uuid = inputs[0];

  if (!uuid) {
    console.error('Usage: npm run audit-comic <uuid>');
    process.exit(1);
  }

  try {
    await addFeedByUuid(TaddyWebhookType.COMICSERIES, uuid);
  } catch (error) {
    console.log('error - ', error);
  }

  try {
    await addFeedByUuid(TaddyWebhookType.COMICSERIES, uuid, TaddyWebhookAction.UPDATED);
  } catch (error) {
    console.log('error - ', error);
  }

  // end node program
  process.exit()
}

run();