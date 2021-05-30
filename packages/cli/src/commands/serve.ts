import { Command } from 'commander';
import { serve } from '@jscode-book/local-api';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port running on server', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
      console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit this file`);
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try using different port');
      } else {
        console.log(err.message);
      }
      process.exit(1);
    }
  })