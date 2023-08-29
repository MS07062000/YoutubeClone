import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Divider,
  Avatar,
  Stack,
  Card,
  Typography,
  IconButton
} from '@mui/material';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  CheckCircle,
} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { Videos, Loader, CommentSection } from './';
import { formatNumber } from '../utils/helper';

const VideoDetail = () => {
  let channelId = null;
  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState({
    videoDetails: null,
    videos: null,
    channelDetails: null,
    videoComments: null,
  });
  const videoDescriptionRef = useRef(null);
  const [isClamped, setClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      let channelDetailsData;
      const videoDetailsResponse = await fetchFromAPI(
        `videos?part=snippet,statistics&id=${videoId}`
      );
      const videoDetailsData =
        videoDetailsResponse && videoDetailsResponse.items
          ? videoDetailsResponse.items[0]
          : null;
      const relatedVideosResponse = await fetchFromAPI(
        `search?part=snippet&related=${videoId}&type=video`
      );
      const relatedVideosData = relatedVideosResponse && relatedVideosResponse.items
        ? relatedVideosResponse.items
        : null;

      if (videoDetailsData != null) {
        channelId = videoDetailsData.snippet ? videoDetailsData.snippet.channelId : null;
        if (channelId != null) {
          const channelDetailsResponse = await fetchFromAPI(
            `channels?part=snippet,statistics&id=${channelId}`
          );
          channelDetailsData =
            channelDetailsResponse && channelDetailsResponse.items
              ? channelDetailsResponse.items[0]
              : null;
        }else{
          channelDetailsData =null;
        }
      }

      const videoComments = await fetchFromAPI(
        `commentThreads?part=snippet&videoId=${videoId}&maxResults=100`
      );

      const fetchedData = {
        videoDetails: videoDetailsData,
        relatedVideos: relatedVideosData,
        channelDetails: channelDetailsData,
        videoComments: videoComments.items,
      };

      setVideoInfo(fetchedData);
    }

    fetchData();
  }, [videoId]);

  useEffect(() => {
    function handleResize() {
      if (
        videoDescriptionRef &&
        videoDescriptionRef.current &&
        videoDescriptionRef.current.scrollHeight >
        videoDescriptionRef.current.clientHeight
      ) {
        setClamped(true);
      } else {
        setClamped(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [videoDescriptionRef]);

  if (videoInfo.videoDetails === null && videoInfo.channelDetails === null) {
    return <Loader />;
  } else {
    console.log(isClamped);
    // console.log(videoInfo);
    const {
      snippet: {
        channelTitle,
        localized: { description, title },
      },
      statistics: { likeCount, viewCount },
    } = videoInfo.videoDetails;
    const {
      snippet: {
        thumbnails: {
          default: { url: channelImage },
        }
      },
      statistics: { hiddenSubscriberCount, subscriberCount },
    } = videoInfo.channelDetails;

    return (
      <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row", gap: 3 }}>
          <Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ mx: 2, mt: 1 }}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  className="react-player"
                  controls
                />
              </Box>
              <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                color="white"
                py={1}
                px={2}
                sx={{
                  alignItems: { xs: 'flex-start', lg: 'center' },
                  flexDirection: { xs: 'column', lg: 'row' }
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src={channelImage} />
                  <Stack>
                    <Link to={`channel/${channelId}`} color="white">
                      <Typography
                        sx={{
                          sm: 'subtitle1',
                          fontSize: '1.35rem',
                          color: 'white',
                        }}
                      >
                        {channelTitle}
                        <CheckCircle
                          sx={{
                            color: 'gray',
                            ml: '5px',
                            fontSize: '1.15rem',
                          }}
                        />
                      </Typography>
                    </Link>
                    {!hiddenSubscriberCount && (
                      <Typography
                        sx={{
                          sm: 'subtitle2',
                          fontSize: '1rem',
                          color: 'gray',
                        }}
                      >
                        {formatNumber(subscriberCount).toLocaleString(
                          'en-US'
                        ) + ' Subscribers'}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-evenly',
                    padding: '15px',
                    borderRadius: '30px',
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    flexDirection="row"
                    flexWrap="nowrap"
                    pr={1}
                  >
                    <ThumbUpOutlined />
                    <Typography>
                      {' ' +
                        formatNumber(likeCount, 0).toLocaleString(
                          'en-US'
                        ) +
                        ' '}
                    </Typography>
                  </Stack>
                  <Divider
                    sx={{
                      height: '60%',
                      color: 'gray',
                      border: 'none',
                      borderWidth: 'none',
                      borderColor: 'none',
                    }}
                  />
                  <ThumbDownOutlined px={1} />
                </Box>
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  borderRadius: 2,
                  mx: 2,
                  my: 1,
                  px: 2,
                  py: 1
                }}

              >
                <Typography>
                  {formatNumber(viewCount, 0).toLocaleString(
                    'en-US'
                  ) + ' Views'}
                </Typography>
                <Typography
                  variant="body2"
                  ref={videoDescriptionRef}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: expanded ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {description}
                </Typography>
                {isClamped && (
                  <Button
                    variant="text"
                    sx={{ color: 'white', textTransform: 'none' }}
                    onClick={toggleExpanded}
                  >
                    {expanded ? 'Show Less' : 'Read More'}
                  </Button>
                )}
              </Box>
              {videoInfo.videoComments != null && (<><Typography sx={{
                color: 'white',
                fontSize: '1.7rem',
                fontFamily: '"Roboto", "Arial", sans-serif',
                lineHeight: '2.8rem',
                fontWeight: 700,
                marginTop: '1rem',
                marginLeft: '16px'
              }}>{videoInfo.videoComments.length}{" "}Comments</Typography>
                <Box
                  px={2}
                  py={{ md: 1, xs: 2 }}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    overflowY: { xs: 'scroll', lg: 'hidden' },
                    overflowX: 'hidden'
                  }}
                  height={{ xs: '250px', lg: 'auto' }}
                >
                  <CommentSection videoComments={videoInfo.videoComments} />
                </Box></>)}
            </Box>
          </Box>
          {videoInfo.relatedVideos != null && <Box
            px={2}
            py={{ md: 1, xs: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            <Videos videos={videoInfo.relatedVideos} direction='column' />
          </Box>}
        </Stack>
      </Box>
    );
  }
};

export default VideoDetail;
