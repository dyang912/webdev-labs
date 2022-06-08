import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        if (this.props.likeId) {
            console.log('unlike');
            this.unlike();
        } else {
            console.log('like');
            this.like();
        }
    }

    like() {
        console.log('code to like the post');

        const postData = {
            "post_id": this.props.postId
        }

        fetch( '/api/posts/likes', {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    this.props.setLikeLabel('Unlike')
                    this.props.setLikeChecked('true')
                    this.props.requeryPost()
                })
            } else {
                response.json().then(data => console.log("Error:", data))
            }
        })
    }

    unlike() {
        console.log('code to unlike the post');

        fetch("/api/posts/likes/" + this.props.likeId, {
            method: "DELETE",
            headers: getHeaders(),
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    this.props.setLikeLabel('Like')
                    this.props.setLikeChecked('false')
                    this.props.requeryPost()
                })
            } else {
                response.json().then(data => console.log("Error:", data))
            }
        })
    }

    render () {
        const likeId = this.props.likeId;
        return (
            <i className={"card_content_icons_icon " + (likeId ? 'fas fa-heart' : 'far fa-heart')}
               aria-label={this.props.likeLabel}
               aria-checked={this.props.likeChecked}
               onClick={this.toggleLike}/>
        ) 
    }
}

export default LikeButton;