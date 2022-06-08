import React, {useEffect, useState} from 'react';
import {getHeaders} from "./utils";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([])

    useEffect(()=>{
        fetch('/api/suggestions', {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                setSuggestions(data)
            })
    }, [])

    return (
        <div className="suggestions">
            <div className="suggestions_text">Suggestions for you</div>
            {Object.values(suggestions).map(value => <Suggestion suggest={value} key={value.id} />)}
        </div>
    )
}

const Suggestion = ({suggest}) => {
    const [follow, setFollow] = useState(false);
    const [followID, setFollowID] = useState();
    const [followLabel, setFollowLabel] = useState('Follow');
    const [followChecked, setFollowChecked] = useState( 'false');

    const HandleFollow = (e, setFollowLabel, setFollowChecked) => {
        if (follow) {
            fetch(`/api/following/`+followID.toString(), {
                method: "DELETE",
                headers: getHeaders(),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setFollowLabel("Follow")
                    setFollowChecked("false")
                    setFollow(false);
                })
        } else {
            const postData = {
                "user_id": suggest.id
            }

            fetch( '/api/following', {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setFollowLabel("Unfollow")
                    setFollowChecked("true")
                    setFollowID(data.id);
                    setFollow(true);
                })
        }
    }

    return (
        <div className="suggestions_unit">
            <img className="suggestions_unit_pic" src={ suggest.image_url } alt={"pic_" + suggest.username}  />
                <div className="suggestions_unit_body">
                    <div className="suggestions_unit_body_name">{suggest.username}</div>
                    <div className="suggestions_unit_body_text">suggested for you</div>
                </div>
                <button className={follow? "suggestions_unit_unfollow" : "suggestions_unit_follow"}
                        aria-label={followLabel} aria-checked={followChecked}
                        onClick={e => {HandleFollow(e, setFollowLabel, setFollowChecked)}}
                >{follow? "unfollow" : "follow"}
                </button>
        </div>
    )
}

export default Suggestions;