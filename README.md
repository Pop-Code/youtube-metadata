# youtube-metadata

## Install

```sh
// using yarn
yarn add youtube-metadata

// using npm
npm install youtube-metadata
```

## Usage

### Scraper

```ts
import { scrap } from 'youtube-metadata';

scrap('videoId') // pass the videoId
    .then((metadata) => console.log(metadata))
    .catch((error) => console.log(error));
```

### Watcher

```ts
import { watch } from 'youtube-metadata';

watch(
    'videoId', // pass the videoId
    5, // the interval in seconds
    (metadata) => console.log(metadata), // the metadata callback
    (error) => console.log(error) // the error callback
);
```

### Cli

```sh
Usage: youtube-metadata [options] [command]

Options:
  -h, --help                 display help for command

Commands:
  scrap <videoId>            scrap youtube metadata
  watch [options] <videoId>  watch youtube metadata
  help [command]             display help for command
```
