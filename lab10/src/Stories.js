import React, {useState} from 'react';
import {getHeaders} from "./utils";

const Stories = () => {
    const [stories, setStories] = useState([])

    fetch('/api/stories', {
        headers: getHeaders()
    })
        .then(response => response.json())
        .then(data => {
            setStories(data)
        })

    return (
        <div className="story_panel">
            {Object.values(stories).map(value => <Story story={value} />)}
        </div>
    )
}

const Story = ({story}) => {
    return (
        <div className="story_panel_unit">
            <img className="story_panel_unit_pic" src={ story.user.image_url }
                 alt={"profile pic for" + story.user.username } />
            <div className="story_panel_unit_name">{story.user.username}</div>
        </div>
    )
}

export default Stories;