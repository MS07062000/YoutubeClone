import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';
import {formatNumber} from '../utils/helper';
const ChannelCard = ({channelDetail,marginTop}) => {
  let channelID=channelDetail && channelDetail.id && channelDetail.id.channelId ? channelDetail.id.channelId:null;
  let channelImage= channelDetail && channelDetail.snippet && channelDetail.snippet.thumbnails && channelDetail.snippet.thumbnails.high && channelDetail.snippet.thumbnails.high.url ? channelDetail.snippet.thumbnails.high.url:demoProfilePicture;
  return (
    <Box sx={{boxShadow:'none',
    borderRadius:'20px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    width:{xs:'356px',sm:'300px'},
    height:'326px',
    margin: 'auto',
    marginTop,}}>
      <Link to={`/channel/${channelID}`}>
        <CardContent 
          sx={{display:'flex',
          flexDirection:'column', 
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center',
          color:'#fff'}}>
            <CardMedia image={channelImage}
            alt={channelDetail && channelDetail.snippet && channelDetail.snippet.title ? channelDetail.snippet.title : 'Channel Image'}
            sx={{borderRadius:'50%', height:'180px', width:'180px', mb:2, border:'1px solid #e3e3e3'}}>
            </CardMedia>
            <Typography variant="h6">{channelDetail && channelDetail.snippet && channelDetail.snippet.title ? channelDetail.snippet.title :'Channel Title'}
              <CheckCircle sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
            </Typography>
            {channelDetail && channelDetail.statistics && !channelDetail.statistics.hiddenSubscriberCount &&
            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
              {channelDetail && channelDetail.statistics && channelDetail.statistics.subscriberCount ? formatNumber(channelDetail.statistics.subscriberCount).toLocaleString('en-US')+" Subscribers" : "No Subscribers"}
            </Typography>}
          </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard;