import React from 'react';

function Video({ onTimeUpdate, currentPlaybackTime, videoSrc }) {
    return (
        <div className="h-100 d-flex justify-content-center">
            <video 
                className="h-100"
                controls 
                autoPlay
                src={videoSrc ? videoSrc : ''}
                onTimeUpdate={event => onTimeUpdate(event.target.currentTime)}
                id="video"
            />
        </div>
    );
}

export default Video;