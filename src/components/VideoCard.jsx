import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';
import { fetchFromAPI } from '../utils/fetchFromApi';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  let image;
  if (snippet && snippet.thumbnails && snippet.thumbnails.high) {
    image = snippet.thumbnails.high.url;
  } else {
    image = demoThumbnailUrl;
  }

  return (
    <Card sx={{width:{md:'320px', xs:'100%'},boxShadow:'none',borderRadius:2}}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia image={image}
          alt={snippet && snippet.title ? snippet.title : demoVideoTitle}
          sx={{ width: { xs: '100%'}, height: '180px' }} />
        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet && snippet.title ? snippet.title.slice(0,60) : demoVideoTitle.slice(0,60)}
            </Typography>
          </Link>
          <Link to={snippet && snippet.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl}>
            <Typography variant="subtitle2" fontWeight="bold" color="gray">
              {snippet && snippet.channelTitle ? snippet.channelTitle.slice(0,60) : demoChannelTitle.slice(0,60)}
              <CheckCircle sx={{fontSize:12,color:'gray',ml:'5px'}}/>
            </Typography>
          </Link>
        </CardContent>
      </Link>
    </Card>
  )
}

export default VideoCard;