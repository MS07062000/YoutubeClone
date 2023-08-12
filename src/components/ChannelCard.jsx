import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({channelDetail}) => {
  let channelID=channelDetail && channelDetail.id && channelDetail.id.channelId ? channelDetail.id.channelId:null;
  let channelImage= channelDetail.snippet.thumbnails.high.url!=null?channelDetail.snippet.thumbnails.high.url:demoProfilePicture;
  return (
    <Box sx={{boxShadow:'none',borderRadius:'20px'}}>
      <Link to={`/channel/${channelID}`}>
        <CardContent 
          sx={{display:'flex',
          flexDirection:'column', 
          justifyContent:'center',
          textAlign:'center',
          color:'#fff'}}>
            <CardMedia image={channelImage}
            alt={channelDetail && channelDetail.snippet && channelDetail.snippet.title ? channelDetail.snippet.title : 'Channel Image'}
            sx={{borderRadius:'50%', height:'180px', width:'180px', mb:2, border:'1px solid #e3e3e3'}}>
            </CardMedia>
            <Typography variant="h6">{channelDetail.snippet.title!=null?channelDetail.snippet.title:'Channel Title'}
              <CheckCircle sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
            </Typography>
          </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard