import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, IconButton, Stack, Typography, useMediaQuery, Card, Collapse } from '@mui/material';
import { KeyboardArrowDown, ThumbUpOffAlt, ThumbDownOffAlt } from '@mui/icons-material';
import { getTimeAgoString } from '../utils/helper';

const Comment = ({ commentInfo }) => {
  const commentDetails = commentInfo.snippet.topLevelComment.snippet;
  const commentAuthorImage = commentDetails.authorProfileImageUrl;
  const commentAuthorName = commentDetails.authorDisplayName;
  const comment = commentDetails.textDisplay;
  const commentPublishedTime = commentDetails.publishedAt;
  const commentAuthorChannelId = commentDetails.authorChannelId.value;
  const likeCount = commentDetails.likeCount;
  const commentParagraphRef = useRef(null);
  const [isClamped, setClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    function handleResize() {
      if (
        commentParagraphRef &&
        commentParagraphRef.current &&
        commentParagraphRef.current.scrollHeight >
        commentParagraphRef.current.clientHeight
      ) {
        setClamped(true);
      } else {
        setClamped(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Stack
      key={commentInfo.id}
      direction='row'
      gap='10px'
    >
      <Link to={`/channel/${commentAuthorChannelId}`}>
        <Avatar alt={commentAuthorName} src={commentAuthorImage} />
      </Link>
      <Stack
        direction='column'
        alignItems='flex-start'
        color='white'
      >
        <Link to={`/channel/${commentAuthorChannelId}`}>
          <Typography
            whiteSpace='nowrap'
            fontSize='1rem'
            fontWeight={500}
            lineHeight='1.8rem'
            color='white'
          >
            {commentAuthorName}
            <span
              style={{
                marginLeft: '5px',
                fontFamily: '"Roboto", "Arial", sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.8rem',
                fontWeight: 400,
                color: 'gray',
              }}
            >
              {getTimeAgoString(commentPublishedTime)}
            </span>
          </Typography>
        </Link>

        <Typography
          style={{
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: '"Roboto", "Arial", sans-serif',
            fontSize: '1.05rem',
            lineHeight: '1.8rem',
            fontWeight: 400,
            overflowWrap: 'anywhere',
          }}
          ref={commentParagraphRef}
        >
          {comment}
        </Typography>
        {isClamped && (
          <Button
            variant='text'
            sx={{ color: 'white', textTransform: 'none' }}
            onClick={toggleExpanded}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
        <Stack
          direction='row'
          alignItems='center'
        >
          <IconButton aria-label='ThumbUpOffAlt' sx={{ color: 'white' }}>
            <ThumbUpOffAlt />{' '}
            <span
              style={{
                ml: 0.5,
                fontFamily: '"Roboto", "Arial", sans-serif',
                fontSize: '1rem',
                lineHeight: '1.8rem',
                fontWeight: 400,
              }}
            >
              {likeCount}
            </span>
          </IconButton>
          <IconButton aria-label='ThumbDownOffAlt' sx={{ color: 'white' }}>
            <ThumbDownOffAlt />
          </IconButton>
          <Button sx={{ color: 'white' }}>Reply</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const CommentSection = ({ videoComments }) => {
 return (
    <Stack
      direction='column'
      justifyContent='flex-start'
    >
      {videoComments.map((commentInfo) => (
        <Comment key={commentInfo.id} commentInfo={commentInfo} />
      ))}
    </Stack>
  );
};

export default CommentSection;
