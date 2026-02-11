import React from 'react';

const VideoPlayer = ({ trailerUrl, title }) => {
    // Ensure the URL is an embed URL
    // If it's a normal youtube link, convert it (simple check)
    const getEmbedUrl = (url) => {
        if (url.includes('embed')) return url;
        const v = url.split('v=')[1];
        if (v) return `https://www.youtube.com/embed/${v}`;
        return url;
    };

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            <iframe
                src={`${getEmbedUrl(trailerUrl)}?autoplay=1&modestbranding=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
            ></iframe>
        </div>
    );
};

export default VideoPlayer;
