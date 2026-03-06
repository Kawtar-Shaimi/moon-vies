import React from 'react';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovieCard = ({ video }) => {

    return (
        <div className="group relative bg-[#18191f] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg cursor-pointer">
            {/* Thumbnail */}
            <Link to={`/watch/${video.id}`} className="relative block aspect-video w-full overflow-hidden">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-14 h-14 text-white fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                </div>
            </Link>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <Link to={`/watch/${video.id}`} className="block">
                        <h3 className="text-white font-semibold truncate hover:text-[#e50914] transition-colors">{video.title}</h3>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        {video.rating}
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{video.releaseYear}</span>
                    <span className="uppercase border border-gray-600 px-1 rounded">{video.type}</span>
                    <span>{video.duration}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
