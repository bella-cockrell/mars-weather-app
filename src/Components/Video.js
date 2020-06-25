import video from '../Images/Mars.mp4';
import React from 'react';

const Video = () => {
  return (
    <div className='video-background'>
      <video src={video} width='600' height='auto' autoPlay={true} loop />
    </div>
  )
}

export default Video;
