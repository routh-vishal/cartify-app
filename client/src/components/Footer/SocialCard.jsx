import React from 'react';
function SocialCard(props){
    return(
        <a target="_blank" rel="noopener noreferrer" href={props.link}><img src={props.img} alt={props.name} /></a>
    )

}
export default SocialCard;