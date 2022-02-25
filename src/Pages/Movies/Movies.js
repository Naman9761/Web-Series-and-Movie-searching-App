import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import hookGenre from "../../hooks/hookGenre";

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const generforURL=hookGenre(selectedGenres);
    
    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}
        &with_genres=${generforURL}`
        );
        setContent(data.results);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
      }, [page,generforURL]);

    return(
        <div>
             <span className='pageTitle'>Top&nbsp;Movies</span>
             <p>Select Below Genres of your Choice</p>
             <Genres
                 type="movie"
                selectedGenres={selectedGenres}setSelectedGenres={setSelectedGenres} genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />

             <div className="trending">
            {content &&
              content.map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="movie"
                  vote_average={c.vote_average}
                />
              ))}
          </div>
          <CustomPagination setPage={setPage}numofPages={500} />
        </div>
    )
}

export default Movies;