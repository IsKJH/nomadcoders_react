import {Link} from "react-router-dom";

const Movie = ({Movies}) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-5">
            {Movies.map((movie) => (
                <div>
                    <Link to={`/Movie_Detail/${movie.id}`}>
                        <div key={movie.id} className="group transition duration-300 cursor-pointer relative">
                            <div
                                className="opacity-0 group-hover:opacity-100 transition duration-300 text-white absolute inset-0 flex flex-col items-center justify-center text-3xl font-extrabold gap-2">
                                <div>
                                    {movie.rating}/10
                                </div>

                                <button type="button"
                                        className="border-2 px-2 bg-amber-300 rounded-lg text-black text-sm">Detail
                                </button>


                            </div>
                            <img src={movie.medium_cover_image} alt={movie.medium_cover_image}
                                 className="group-hover:opacity-20 transition duration-300 w-full h-auto"/>
                        </div>
                    </Link>
                    <div className="text-white truncate">{movie.title}</div>
                </div>

            ))}
        </div>
    );
}
export default Movie;