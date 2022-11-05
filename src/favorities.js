import React from "react";

export default function FavImag(props){
    const removeFavorite =()=>{
        let arr = [];
        for(let j=0;j<props.favorites.length;j++){
            if(props.favorites[j]._id!==props.post._id){
                arr.push(props.favorites[j]);
            }
        }
        props.setFavorites(arr);
    }
    return (
        <div id='imag'>
            <img src={props.post.image} alt='img..'></img>
            <p onClick={removeFavorite}>remove</p>
        </div>
    );
}