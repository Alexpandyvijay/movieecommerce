import React from "react";

export default function Imag(props){
    const onClickFavorite =()=>{
        console.log(props.post);
        let exist = false;
        for(let i=0;i<props.favorites.length;i++){
            if(props.favorites[i]._id===props.post._id){
                exist = true;
                break;
            }
        }
        if(!exist){
            props.setFavorites([...props.favorites,props.post]);
        }
    }
    return (
        <div id='imag'>
            <img src={props.post.image} alt='img..'></img>
            <p onClick={onClickFavorite}>+ Add to favorite</p>
        </div>
    );
}