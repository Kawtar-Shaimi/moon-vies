import React, { useState, useMemo } from 'react';
import { videos, CATEGORIES } from '../data/mockData';
import MovieCard from '../components/ui/MovieCard';
import Button from '../components/ui/Button';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState(''); // Could be lifted to context or URL params

    // Hero Content (Featured)
    const featuredVideo = videos.find(v => v.title === "The Dark Knight") || videos[0];

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesCategory = selectedCategory === 'all' || video.category.toLowerCase() === selectedCategory.toLowerCase();
            // Add more filters if needed
            return matchesCategory;
        });
    }, [selectedCategory]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[85vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredVideo.thumbnailUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014] via-[#0f1014]/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 space-y-6 container">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg max-w-2xl leading-tight">
                        {featuredVideo.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-xl drop-shadow-md line-clamp-3">
                        {featuredVideo.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                        <span className="text-[#e50914] font-bold">New Release</span>
                        <span>{featuredVideo.releaseYear}</span>
                        <span className="border border-gray-500 px-2 py-0.5">{featuredVideo.rating} Rating</span>
                        <span>{featuredVideo.duration}</span>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Link to={`/watch/${featuredVideo.id}`}>
                            <Button variant="primary" className="px-8 py-3 text-lg" icon={Play}>
                                Watch Trailer
                            </Button>
                        </Link>
                        <Link to={`/watch/${featuredVideo.id}`}>
                            <Button variant="secondary" className="px-8 py-3 text-lg" icon={Info}>
                                More Info
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container py-12 space-y-12 -mt-20 relative z-10">

                {/* Categories / Filters */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                    <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                        {CATEGORIES.slice(0, 5).map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                    ${selectedCategory === cat.id ? 'bg-white text-black' : 'bg-[#18191f] text-gray-300 hover:bg-gray-700'}
                  `}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {filteredVideos.map(video => (
                        <MovieCard key={video.id} video={video} />
                    ))}
                </div>

                {filteredVideos.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No content found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
