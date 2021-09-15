import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import * as types from "../declarations/types";
import api from "../services/API";

export class Store {
  public searchDisposer: IReactionDisposer;
  constructor() {
    makeAutoObservable(this);
    this.searchDisposer = reaction(
      () => this.search,
      () => this.fetchMovies()
    );
  }
  public movies: types.Movie[] = [];
  public loading: boolean = false;
  public search: string = "";

  public setSearch(search: string) {
    this.search = search;
  }
  public setMovies(movies: types.Movie[]) {
    this.movies = movies;
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public fetchMovies = async () => {
    if (this.loading) {
      return;
    }
    this.setLoading(true);

    try {
      const movies = await api.getMovies(this.search);
      this.setMovies(movies);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  };

  // Exemplos do Desafio (Matheus)

  public date: number = 0;

  public setDate(date: Date) {
    return (this.date = new Date(date).getFullYear());
  }

  public get voteAverage() {
    return this.movies.filter((m) => m.vote_average > 6);
  }

  public get createdAt() {
    return this.movies.filter((m) => this.setDate(m.release_date));
  }

  public dispose() {
    this.searchDisposer?.();
  }
}
