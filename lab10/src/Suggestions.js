import React, {useState} from 'react';
import {getHeaders} from "./utils";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([])

    fetch('/api/suggestions', {
        headers: getHeaders()
    })
        .then(response => response.json())
        .then(data => {
            setSuggestions(data)
        })

    return (
        <div className="suggestions">
            <div className="suggestions_text">Suggestions for you</div>
            {Object.values(suggestions).map(value => <Suggestion suggest={value} />)}
        </div>
    )
}

const Suggestion = ({suggest}) => {
    return (
        <div className="suggestions_unit">
            <img className="suggestions_unit_pic" src={ suggest.image_url } alt={"pic_" + suggest.username}  />
                <div className="suggestions_unit_body">
                    <div className="suggestions_unit_body_name">{suggest.username}</div>
                    <div className="suggestions_unit_body_text">suggested for you</div>
                </div>
                <button className="suggestions_unit_follow"
                        data-user-id={ suggest.id }
                        onClick="HandleFollow(event)"
                        aria-label="Follow"
                >follow
                </button>
        </div>
    )
}

export default Suggestions;