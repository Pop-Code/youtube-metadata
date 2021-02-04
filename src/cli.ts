/**
 * Cli usage
 *
 * ```
 * Usage: cli [options] [command]
 *
 * Options:
 *
 *   -h, --help                 display help for command
 *
 * Commands:
 *
 *   scrap <videoId>            scrap youtube metadata
 *
 *   watch [options] <videoId>  watch youtube metadata
 *
 *   help [command]             display help for command
 * ```
 *
 * @packageDocumentation
 */
import commander from 'commander';

import { scrap, watch } from './scraper';

commander
    .command('scrap <videoId>')
    .description('scrap youtube metadata')
    .action(async (videoId: string) => {
        const metadata = await scrap(videoId);
        console.log(JSON.stringify(metadata, null, 2));
    });

commander
    .command('watch <videoId>')
    .description('watch youtube metadata')
    .option<number>('-d,--duration <seconds>', 'The duration of the interval in second', (v) => parseInt(v, 10), 1000)
    .action(async (videoId: string, opts: { duration: number }) => {
        watch(
            videoId,
            opts.duration,
            (metadata) => console.log(JSON.stringify(metadata, null, 2)),
            (e) => console.log(e)
        );
    });

commander.parseAsync(process.argv).catch((e) => {
    console.log(e);
    process.exit(1);
});
