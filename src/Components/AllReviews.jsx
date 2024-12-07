import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllReviews = () => {
    const reviews = useLoaderData();
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const [sortOption, setSortOption] = useState("");
    const [filterGenre, setFilterGenre] = useState("");

    const applySorting = (reviewsToSort, option) => {
        return [...reviewsToSort].sort((a, b) => {
            if (option === "rating") {
                return b.rating - a.rating;
            } else if (option === "year") {
                return b.publishingYear - a.publishingYear;
            }
            return 0;
        });
    };

    const handleSort = (option) => {
        setSortOption(option);

        const sortedReviews = applySorting(filteredReviews, option);
        setFilteredReviews(sortedReviews);
    };

    const handleFilter = (genre) => {
        setFilterGenre(genre);

        let filtered;
        if (genre === "All") {
            filtered = reviews;
        } else {
            filtered = reviews.filter((review) => review.genre === genre);
        }

        const sortedFilteredReviews = applySorting(filtered, sortOption);
        setFilteredReviews(sortedFilteredReviews);
    };

    const genres = ["All", ...new Set(reviews.map((review) => review.genre))];

    return (
        <div className="mt-8">
            <h1 className="text-4xl font-bold text-center">All Reviews</h1>
            <div className="flex justify-between items-center m-4">
                <p className="text-2xl font-semibold">Total Reviews: {filteredReviews.length}</p>
                <div>
                    <div className="dropdown">
                        <label>Sort by:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => handleSort(e.target.value)}
                            className="ml-2 p-2 border rounded"
                        >
                            <option value="">Select</option>
                            <option value="rating">Rating</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    <div className="dropdown mt-4 ml-2">
                        <label>Filter by Genre:</label>
                        <select
                            value={filterGenre}
                            onChange={(e) => handleFilter(e.target.value)}
                            className="ml-2 p-2 border rounded"
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                    <div
                        key={review._id}
                        className="border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                    >
                        <img
                            src={review.gameCover}
                            alt={review.gameTitle}
                            className="w-full h-72 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {review.gameTitle}
                            </h3>
                            <p className="mb-1">
                                🎮 Genre:{" "}
                                <span className="font-medium">{review.genre}</span>
                            </p>
                            <p className="mb-1">
                                📅 Publishing Year:{" "}
                                <span className="font-medium">{review.publishingYear}</span>
                            </p>
                            <p className="text-indigo-600 font-bold text-lg">
                                ⭐ Rating: {review.rating}/10
                            </p>
                            <Link
                                to={`/allReviews/reviewDetails/${review._id}`}
                                className="inline-block mt-4 px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                            >
                                Explore Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;