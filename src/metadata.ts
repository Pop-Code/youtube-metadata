import cheerio from 'cheerio';

export const MetadataRegExp = {
    LIKE_DISLIKE: /tooltip":"([0-9\s]+)\/\s([0-9\s]+)"}}/g
};

export interface YoutubeMetadata {
    id: string;
    date: Date;
    like: number;
    dislike: number;
}

export const extractMetadatas = async (videoId: string, html: string): Promise<YoutubeMetadata> => {
    const $ = cheerio.load(html);
    const scripts = $('script').filter((i, e) => {
        return $(e).html()?.startsWith('var ytInitialData') === true;
    });
    const json = scripts.html()?.replace('var ytInitialData = {', '{').replace('};', '}');
    if (json === undefined) {
        throw new Error('Can not fetch metadata');
    }

    // like dislike
    const matches = Array.from(json.matchAll(MetadataRegExp.LIKE_DISLIKE));
    if (matches.length === 0) {
        throw new Error('Can not match like/dislike count');
    }

    return {
        id: videoId,
        date: new Date(),
        like: parseInt(matches[0][1].replace(/\s/g, ''), 10),
        dislike: parseInt(matches[0][2].replace(/\s/g, ''), 10)
    };
};
