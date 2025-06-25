import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading.tsx";
import {motion} from 'framer-motion';

const Movie_Detail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    const getMovieDetail = async () => {
        const json = await (await (fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true`))).json();
        setMovie(json.data.movie);
        setLoading(false);
    }

    useEffect(() => {
        getMovieDetail();
        window.scrollTo(0, 0);

    }, []);

    return (
        <div className={`h-screen ${loading ? ("flex items-center justify-center") : null}`}>{
            loading ? <Loading/> : <motion.div className="relative"
                                               initial={{scale: 1.2, opacity: 0}}
                                               animate={{scale: 1, opacity: 1}}
                                               transition={{duration: 0.6, ease: "easeOut"}}
            >
                <div>
                    <img src={movie.background_image} alt={movie.background_image}
                         className="w-full h-screen opacity-40 object-cover"/>
                    <div
                        className="text-white text-5xl absolute inset-0 flex flex-col justify-center items-center  gap-5">{movie.title_long}
                        <div className="relative h-[550px] w-[400px]">
                            <motion.div
                                className="relative w-full h-full"
                                whileHover={{ rotateY: 180 }}
                                transition={{ duration: 0.6 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <motion.img
                                    src={movie.medium_cover_image}
                                    alt={movie.medium_cover_image}
                                    className="h-[550px] rounded-2xl absolute w-full h-full object-cover"
                                    style={{ backfaceVisibility: "hidden" }}
                                />

                                <motion.div
                                    className="absolute w-full h-full bg-transparent rounded-2xl flex flex-col justify-center items-center gap-4 text-white p-6"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)"
                                    }}
                                >
                                    <div className="text-3xl">평점: {movie.rating}/10</div>
                                    <div className="text-3xl">연도: {movie.year}</div>
                                    <div className="text-3xl text-center">{movie.description_full?.slice(0, 100)}...</div>
                                </motion.div>
                            </motion.div>
                        </div>

                        <div className="text-3xl flex flex-wrap gap-5">
                            {movie.genres.map((g) => (
                                <div key={g}>{g}</div>
                            ))}
                        </div>
                        <div className="text-3xl">
                            {'⭐'.repeat(movie.rating)}
                        </div>
                    </div>
                </div>
            </motion.div>
        }</div>
    );
}
export default Movie_Detail;