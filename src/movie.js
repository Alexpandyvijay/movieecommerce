import React, {useEffect, useState} from "react";
import axios from 'axios';
import Imag from "./moviePic";
import FavImag from "./favorities";

export default function Movies(){
    const [movieList, setMovieList] = useState([]);
    const [copy , setCopy] = useState([])
    const [favorites , setFavorites] = useState([]);
    const [filter, setFilter]=useState('');
    const handleFilter = (e) => {
        e.preventDefault();
        if (e.target.value === '') {
          setMovieList(copy)
        } else {
          const filterResult = copy.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
          setMovieList(filterResult)
        }
        setFilter(e.target.value)
      }
    useEffect(()=>{
        const top10 =(movieList)=>{
            let sorted =  movieList.sort((a , b)=>{
             a = parseInt(a.rating.split('/')[0]);
             b = parseInt(b.rating.split('/')[0]);
             return b-a;
            });
            let topTen = sorted.slice(0,10);
            return topTen;
         }
        const fetchData= async()=>{
            await axios.get('https://movies-app1.p.rapidapi.com/api/movies',{
            headers: {
                'X-RapidAPI-Key': '6caf117470msh755317cc9c796a8p15b90djsn657466c72794',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
            }
            }).then((res)=>{
              console.log(res.data);
              setMovieList(top10(res.data.results));
              setCopy(top10(res.data.results));
            }).catch(function (error) {
            console.error(error);
            });
        }
        fetchData();
    },[])
    return(
        <div>
            <header>
                <h1>Movies</h1>
                <div id='searchbar'>
                    <input type='text' placeholder="search...." onChange={handleFilter} value={filter}></input>
                </div>
            </header>
            <section>
                <div className="cinema">
                    {movieList.map((cinema,ind)=>(<Imag key={ind} post={cinema} setFavorites={setFavorites} favorites={favorites}/>))}
                </div>
            </section>
            <section>
                <h1>Favorites</h1>
                <div className="cinema">
                    {favorites.length===0 ?"": favorites.map((fav,ind)=>(<FavImag key={ind} post={fav} setFavorites={setFavorites} favorites={favorites}/>))}
                </div>
            </section>
        </div>
    );
}