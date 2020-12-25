import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './like';
import Pagination from './pagination';


class Movies extends Component {

    state = {
        movies: getMovies(),
        pageSize: 4,
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    }

    handlePageChange = (page) => {
        console.log(page);
    }

    render() { 
        const movieCount = this.state.movies.length;
        if (movieCount === 0){
            return <p>There are no movies in the database.</p>
        }

        return (
            <React.Fragment>
            <p>Show {movieCount} movies in the database.</p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => <tr key = {movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>{movie.numberInStock}</td>
                            <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                            <td><button onClick = {() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <Pagination itemsCount={this.props.count} pageSize={this.state.pageSize} onPageChange = {this.handlePageChange}/>
            </div>
            </React.Fragment>
        );
    }
}
 
export default Movies;