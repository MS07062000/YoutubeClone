import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  
  
  const videoThumbnailImage= snippet && snippet.thumbnails && snippet.thumbnails.high && snippet.thumbnails.high.url? snippet.thumbnails.high.url:demoThumbnailUrl;
  const videoTitle= snippet && snippet.title ? snippet.title.slice(0,60) : demoVideoTitle.slice(0,60);
  const channelTitle=snippet && snippet.channelTitle ? snippet.channelTitle.slice(0,60) : demoChannelTitle.slice(0,60);
  const videoURL=videoId ? `/video/${videoId}` : demoVideoUrl;
  const channelURL=snippet && snippet.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl;
  
  
  return (
    <Card sx={{width:{sm:'300px', xs:'100%'},boxShadow:'none',borderRadius:2}}>
      <Link to={videoURL}>
        <CardMedia image={videoThumbnailImage}
          alt={videoTitle}
          sx={{ width: { xs: '100%'}, height: '180px' }} />
        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
          <Link to={videoURL}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {videoTitle}
            </Typography>
          </Link>
          <Link to={channelURL}>
            <Typography variant="subtitle2" fontWeight="bold" color="gray">
              {channelTitle}
              <CheckCircle sx={{fontSize:12,color:'gray',ml:'5px'}}/>
            </Typography>
          </Link>
        </CardContent>
      </Link>
    </Card>
  )
}

export default VideoCard;