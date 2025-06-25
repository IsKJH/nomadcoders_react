import React, {useEffect, useState} from "react";
import Movie from "../components/Movie.tsx";
import Loading from "../components/Loading.tsx";
import {useParams} from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState(() => {
        return sessionStorage.getItem('currentSelect') || "";
    });
    const [page, setPage] = useState(() => {
        return parseInt(sessionStorage.getItem('currentPage') || 1);
    });
    const [totalPages, setTotalPages] = useState(0);

    const getMoive = async (sort) => {
        const json = await ((await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&page=${page}`)).json());
        setMovies(json.data.movies);
        setTotalPages(Math.ceil(json.data.movie_count / 20))
        setLoading(false);
    }

    const changePage = (newPage) => {
        setPage(newPage.toString());
        sessionStorage.setItem('currentPage', newPage.toString());
        setLoading(true);
    }


    const onChangeSelect = (e) => {
        sessionStorage.setItem('currentSelect', e.target.value);
        setSelect(e.target.value);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getMoive(select);
    }, [select, page]);

    return (
        <div className={`min-h-screen p-14 ${loading ? ("flex items-center justify-center") : ""}`}>{
            loading ? <Loading/> : <div>
                <div className="flex justify-end mb-4">
                    <select onChange={onChangeSelect} value={select}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base font-extrabold rounded-lg p-2">
                        <option value="">sort_by</option>
                        <option value="title">title</option>
                        <option value="year">year</option>
                        <option value="rating">rating</option>
                        <option value="peers">peers</option>
                        <option value="seeds">seeds</option>
                        <option value="download_count">download_count</option>
                        <option value="like_count">like_count</option>
                        <option value="date_added">date_added</option>
                    </select>
                </div>
                <Movie Movies={movies}/>
                <div className="flex justify-center gap-2 mt-10">
                    <button
                        onClick={() => changePage(parseInt(page) - 1)}
                        disabled={page === "1"}
                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
                    >
                        이전
                    </button>

                    <span className="text-white px-3 py-1">{page} / {totalPages}</span>
                    <button
                        onClick={() => changePage(parseInt(page) + 1)}
                        disabled={parseInt(page) >= totalPages}
                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
                    >
                        다음
                    </button>
                </div>
            </div>
        }</div>
    );
}
export default Home;