import axios from 'axios';

export const fetchYoutube = async (videoId: string) => {
    const { data } = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);
    return data;
};
