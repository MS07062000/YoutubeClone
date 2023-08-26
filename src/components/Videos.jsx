import React from 'react';
import { Stack, Box } from '@mui/material';
import { VideoCard , ChannelCard } from './';
const Videos = ({ videos,direction,justifyContent }) => {
    console.log(videos);
    return (
        <Stack direction={direction || "row"}
            flexWrap='wrap'
            justifyContent={justifyContent}
            gap={2}
        >
            {videos && videos.map((item,index)=>(
                <Box key={index}>
                    {item.id.videoId && <VideoCard video={item}/>}
                    {item.id.playlistId && <VideoCard video={item}/>}
                    {item.id.channelId && <ChannelCard channelDetail={item}/>}
                </Box>
            ))}
        </Stack>
    )
}

export default Videos;