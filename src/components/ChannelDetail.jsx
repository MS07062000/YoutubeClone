import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ChannelCard, Videos} from './';
import { fetchFromAPI } from '../utils/fetchFromApi';
const ChannelDetail = () => {
  const { channelId } = useParams();
  const [channelDetail,setChannelDetail]=useState(null);
  const [videos,setVideos]=useState(null);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${channelId}`).then((data)=>{
      setChannelDetail(data && data.items ? data.items[0]:null);
    });

    fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`).then((data)=>{
      setVideos(data && data.items ? data.items:null);
    });
  },[channelId]);

  console.log(channelDetail);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{background: 'linear-gradient(to left, #544a7d, #ffd452)', zIndex:10, height:'300px'}}></div>
      </Box>
      <ChannelCard channelDetail={channelDetail} marginTop="-133px" />
      <Videos videos={videos} justifyContent="center"/>
    </Box>
  )
}

export default ChannelDetail;