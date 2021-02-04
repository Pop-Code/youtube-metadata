import { fetchYoutube } from './fetch';
import { extractMetadatas, YoutubeMetadata } from './metadata';

export const scrap = async (videoId: string) => {
    const html = await fetchYoutube(videoId);
    return await extractMetadatas(videoId, html);
};

const noop = () => {};

export const watch = (
    videoId: string,
    seconds: number,
    onMetadata?: (m: YoutubeMetadata) => void,
    onError?: (e: Error) => void
) => {
    const sc = async () => await scrap(videoId);

    sc()
        .then(onMetadata ?? noop)
        .catch(onError ?? noop);
    return setInterval(() => {
        sc()
            .then(onMetadata ?? noop)
            .catch(onError ?? noop);
    }, seconds * 1000);
};
