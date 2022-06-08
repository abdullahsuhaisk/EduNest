// import { rm } from 'fs/promises';
import { rmdir, rm } from 'promise-fs';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rmdir(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterEach(async () => {
    const conn = getConnection();
    await conn.close();
});
