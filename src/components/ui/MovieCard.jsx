import React from 'react';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from './Button';

const MovieCard = ({ video }) => {
    const [watchlist, setWatchlist] = useLocalStorage('vibz_watchlist', []);

    const isInWatchlist = watchlist.some(item => item.id === video.id);

    const toggleWatchlist = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        e.stopPropagation();

        if (isInWatchlist) {
            setWatchlist(watchlist.filter(item => item.id !== video.id));
        } else {
            setWatchlist([...watchlist, { ...video, addedAt: new Date().toISOString() }]);
        }
    };

    return (
        <div className="group relative bg-[#18191f] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg cursor-pointer">
            {/* Thumbnail */}
            <Link to={`/watch/${video.id}`}>
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                        loading="lazy"
                    />
                </div>
            </Link>

            {/* Content Overlay (Visible on Hover/Always? Design suggests cards with info below or overlay) 
         Let's match the Netflix-style card where info expands or appears on hover, 
         but for simplicity and better mobile UX, we'll put info below.
      */}
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

                {/* Hover Actions */}
                <div className="pt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black/80 flex-col justify-center items-center backdrop-blur-sm group-hover:visible invisible">
                    <Link to={`/watch/${video.id}`}>
                        <Button variant="primary" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                            <Play className="w-5 h-5 ml-1 fill-white" />
                        </Button>
                    </Link>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={toggleWatchlist}
                            className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors text-white"
                            title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                        >
                            {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </div>
                    <span className="text-white font-bold text-sm mt-2">{video.title}</span>
                    <span className="text-gray-300 text-xs px-2 text-center line-clamp-2">{video.description}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
