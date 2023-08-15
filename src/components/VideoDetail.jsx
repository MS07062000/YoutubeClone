import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import { Link, useParams } from "react-router-dom";
import {ThumbUpOutlined, ThumbDownOutlined, CheckCircle} from '@mui/icons-material';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { Videos, Loader } from './';
import {formatNumber} from '../utils/helper';
const VideoDetail = () => {
  const { videoId, channelId } = useParams();
  const [videoDetail, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  console.log(videoDetail);
  console.log(videos);
  console.log(channelDetail);
  useEffect(() => {
    fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${videoId}`).then((data) => {
      setVideoDetails(data && data.items ? data.items[0] : null);
    });
    fetchFromAPI(`search?part=snippet&relatedtoVideoId=${videoId}&type=video`).then((data) => {
      setVideos(data && data.items ? data.items : null);
    });
    fetchFromAPI(`channels?part:snippet,statistics&id=${channelId}`).then((data) => {
      setChannelDetail(data && data.items ? data.items[0] : null);
    });
  }, [videoId, channelId]);

  if (!(videoDetail && videoDetail.snippet && videoDetail.statistics) && !(channelDetail && channelDetail.statistics)) {
    return (<Loader />);
  }

  const { snippet: { channelTitle, localized: { description, title } }, statistics: { likeCount, viewCount } } = videoDetail;
  const { statistics: { hiddenSubscriberCount, subscriberCount } } = channelDetail;

  return (
    <Box minHeight="95vh">
      <Stack>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2} >{title}</Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Stack>
                <Link to={`channel/${channelId}`}>
                  <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff">
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                  </Typography>
                </Link>
                {!hiddenSubscriberCount &&
                  <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                    {formatNumber(subscriberCount).toLocaleString('en-US')+" Subscribers" }
                  </Typography>}
              </Stack>
              <Box>
              <Typography>
                <ThumbUpOutlined/>
                {" "+formatNumber(likeCount,0).toLocaleString('en-US')+" "}
                <ThumbDownOutlined/>
              </Typography>
              </Box>
            </Stack>
            <Typography>{formatNumber(viewCount,0).toLocaleString('en-US')+" Views"}+</Typography>
            <Typography>{description}</Typography>
          </Box>
        </Box>
        <Box  px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail