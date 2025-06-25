import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
    }
    useEffect(() => {
        setLoading(false);
        getMovie();
    }, []);
    console.log(movie);
    return (
        <div>
            {loading || !movie.genres ? <h1>Loading...</h1> :
                <div>
                    <Link to={"/"}>
                        <button type="button">홈으로</button>
                    </Link>
                    <div>
                        <img src={movie.medium_cover_image} alt={movie.title_long}/>
                        <h1>{movie.title_long}</h1>
                        <ul>
                            {movie.genres.map((g, index) => (
                                <li key={index}>{g}</li>
                            ))}
                        </ul>

                    </div>
                </div>}
        </div>
    );
}

export default Detail;