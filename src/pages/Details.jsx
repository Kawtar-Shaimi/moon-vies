import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/mockData';
import VideoPlayer from '../components/features/VideoPlayer';
import MovieCard from '../components/ui/MovieCard';
import Button from '../components/ui/Button';
import { Plus, Check, Star, ArrowLeft } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Details = () => {
    const { id } = useParams();
    const video = videos.find(v => v.id === parseInt(id));
    const [watchlist, setWatchlist] = useLocalStorage('vibz_watchlist', []);

    if (!video) return <div className="text-center py-20">Video not found</div>;

    const isInWatchlist = watchlist.some(item => item.id === video.id);

    const toggleWatchlist = () => {
        if (isInWatchlist) {
            setWatchlist(watchlist.filter(item => item.id !== video.id));
        } else {
            setWatchlist([...watchlist, { ...video, addedAt: new Date().toISOString() }]);
        }
    };

    const similarVideos = videos.filter(v => v.category === video.category && v.id !== video.id).slice(0, 4);

    return (
        <div className="container py-24 min-h-screen">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            {/* Video Player & Info */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <VideoPlayer trailerUrl={video.trailerUrl} title={video.title} />

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-white">{video.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1 text-yellow-500 font-bold">
                                <Star className="w-4 h-4 fill-yellow-500" /> {video.rating}
                            </span>
                            <span>{video.contentRating}</span>
                            <span>{video.releaseYear}</span>
                            <span>{video.duration}</span>
                            <span className="border border-gray-600 px-2 rounded uppercase text-xs">{video.type}</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-lg">{video.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 pt-4 border-t border-gray-800">
                            <div><span className="text-white font-semibold block mb-1">Director</span> {video.director}</div>
                            <div><span className="text-white font-semibold block mb-1">Cast</span> {video.cast.join(", ")}</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-[#18191f] p-6 rounded-lg space-y-4">
                        <Button
                            variant={isInWatchlist ? "secondary" : "primary"}
                            className="w-full justify-center"
                            onClick={toggleWatchlist}
                            icon={isInWatchlist ? Check : Plus}
                        >
                            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                        </Button>

                        <div className="text-xs text-center text-gray-500">
                            Added on: {isInWatchlist ? new Date().toLocaleDateString() : 'Not in list'}
                        </div>
                    </div>

                    {/* Similar Content */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">You might also like</h3>
                        <div className="grid gap-4">
                            {similarVideos.map(sim => (
                                <Link key={sim.id} to={`/watch/${sim.id}`} className="flex gap-4 group hover:bg-[#18191f] p-2 rounded transition-colors">
                                    <img src={sim.thumbnailUrl} alt={sim.title} className="w-24 h-16 object-cover rounded" />
                                    <div>
                                        <h4 className="font-semibold text-sm group-hover:text-[#e50914] transition-colors">{sim.title}</h4>
                                        <span className="text-xs text-gray-500">{sim.releaseYear}</span>
                                    </div>
                                </Link>
                            ))}
                            {similarVideos.length === 0 && <p className="text-gray-500 text-sm">No similar content found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
