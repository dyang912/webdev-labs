import React from 'react';
import {getHeaders} from './utils';

class BookmarkButton extends React.Component {

    constructor(props) {
        super(props);
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.bookmark = this.bookmark.bind(this);
        this.unBookmark = this.unBookmark.bind(this);
    }

    toggleBookmark(ev) {
        if (this.props.bookmarkId) {
            console.log('unbookmark');
            this.unBookmark();
        } else {
            console.log('bookmark');
            this.bookmark();
        }
    }

    bookmark() {
        console.log('code to bookmark the post');

        const postData = {
            "post_id": this.props.postId
        }

        fetch( '/api/bookmarks', {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    this.props.setBookmarkLabel('Unbookmark')
                    this.props.setBookmarkChecked('true')
                    this.props.requeryPost()
                })
            } else {
                response.json().then(data => console.log("Error:", data))
            }
        })
    }

    unBookmark() {
        console.log('code to unbookmark the post');

        fetch("/api/bookmarks/" + this.props.bookmarkId, {
            method: "DELETE",
            headers: getHeaders(),
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    this.props.setBookmarkLabel('Bookmark')
                    this.props.setBookmarkChecked('false')
                    this.props.requeryPost()
                })
            } else {
                response.json().then(data => console.log("Error:", data))
            }
        })
    }

    render () {
        const bookmarkId = this.props.bookmarkId;
        return (
            <i className={"card_content_icons_bookmark " + (bookmarkId ? 'fas fa-bookmark' : 'far fa-bookmark')}
               aria-label={this.props.bookmarkLabel}
               aria-checked={this.props.bookmarkChecked}
               onClick={this.toggleBookmark}/>
        ) 
    }
}

export default BookmarkButton;