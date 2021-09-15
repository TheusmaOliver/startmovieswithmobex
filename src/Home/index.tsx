import React, { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Store } from './store';
import {Container, MapDiv} from '../styles/styles';
import * as types from '../declarations/types';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import MovieCard from '../components/MovieCard';



const Home: React.FC = () => {
  const store = useLocalObservable(() => new Store());

  useEffect(() => {
    return store.dispose;
  }, [store.dispose]);
  return (
    <Container>
      <Header />
      <SearchBox value={store.search}  onChange={(search: string) => store.setSearch(search)} />
      <MapDiv>
      {
        store.loading
          ? <p>loading</p>
          : (
            <>
              {/* Exemplos Desafio (Matheus) */}
              <h2>Filmes por ano de criação</h2>
                {store.createdAt.map((movie: types.Movie) => (
                  <MovieCard movie={movie} />
                ))}
              <h2>Filmes acima de média 6 dos votos</h2>
                {store.voteAverage.map((movie: types.Movie) => (
                  <MovieCard movie={movie} />
                ))}
              {/*  */}
              <h2>filmes</h2>
                {store.movies.map((movie: types.Movie) => (
                  <MovieCard key={movie.id}movie={movie}/>
                ))}
            </>
          )
      }
      </MapDiv>
    </Container>
  )
}
export default observer(Home);
