import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MovieCard from '../components/ui/MovieCard';
import { BookmarkMinus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Watchlist = () => {
    const [watchlist] = useLocalStorage('vibz_watchlist', []);

    if (watchlist.length === 0) {
        return (
            <div className="container py-24 min-h-screen text-center flex flex-col items-center justify-center space-y-6">
                <div className="bg-[#18191f] p-6 rounded-full">
                    <BookmarkMinus className="w-12 h-12 text-gray-500" />
                </div>
                <h1 className="text-3xl font-bold">Your Watchlist is Empty</h1>
                <p className="text-gray-400 max-w-md">Contents you add to your watchlist will appear here.</p>
                <Link to="/">
                    <Button variant="primary">Browse Content</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                My Watchlist <span className="text-sm font-normal text-gray-500 bg-[#18191f] px-3 py-1 rounded-full">{watchlist.length} items</span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {watchlist.map(video => (
                    <MovieCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
