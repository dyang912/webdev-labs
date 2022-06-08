import React, {useRef, useState} from 'react';
import Modal from "./Modal";
import LikeButton from "./LikeButton";
import {getHeaders} from "./utils";
import BookmarkButton from "./BookmarkButton";

const Post = ({p}) => {
    const [post, setPost] = useState(p);
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState("");
    const [likeLabel, setLikeLabel] = useState(post.current_user_like_id ? 'Unlike' : 'Like');
    const [likeChecked, setLikeChecked] = useState(post.current_user_like_id ? 'true' : 'false');
    const [bookmarkLabel, setBookmarkLabel] = useState(post.current_user_bookmark_id ? 'Unbookmark' : 'Bookmark');
    const [bookmarkChecked, setBookmarkChecked] = useState(post.current_user_bookmark_id ? 'true' : 'false');
    const textInput = useRef(null);

    const requeryPost = () => {
        fetch(`/api/posts/${post.id}`, {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                setPost(data);
            });
    }

    const focusTextInput = () => {
        textInput.current.focus();
    }

    return (
        <div className="card" id={"post_"+post.id}>
            <div className="card_header">
                <div className="card_header_name">{ post.user.username }</div>
                <i className="fas fa-ellipsis-h card_header_icon" />
            </div>

            <img className="card_img" src={ post.image_url } alt={"card_img_"+ post.user.username } />

            <div className="card_content">
                <div className="card_content_icons">
                    <LikeButton
                        likeLabel={likeLabel}  setLikeLabel={setLikeLabel}
                        likeChecked={likeChecked}  setLikeChecked={setLikeChecked}
                        postId={post.id}  likeId={post.current_user_like_id}
                        requeryPost={requeryPost}/>
                    <i className="far fa-comment card_content_icons_icon" />
                    <i className="far fa-paper-plane card_content_icons_icon" />
                    <BookmarkButton
                        bookmarkLabel={bookmarkLabel}  setBookmarkLabel={setBookmarkLabel}
                        bookmarkChecked={bookmarkChecked}  setBookmarkChecked={setBookmarkChecked}
                        postId={post.id}  bookmarkId={post.current_user_bookmark_id}
                        requeryPost={requeryPost}/>
                </div>

                <span className="card_content_like_num" id={"like_num_"+ post.id }>{ post.likes.length } </span>
                <span className="card_content_like">likes</span>

                <div className="card_content_post">
                    <span className="card_content_post_name">{ post.user.username } </span>
                    { post.caption }..
                    <span className="card_content_post_more" >more</span>
                </div>

                <div className="card_content_comments">
                    <button className="card_content_comments_viewall"
                            data-post-id={post.id}
                            onClick={() => {setShowModal(true)}}>
                        View all {post.comments.length} comments
                    </button>
                    { post.comments.length >= 1 ?
                        <div className="card_content_comments_unit">
                            <span className="card_content_comments_unit_name">{post.comments[0]?.user.username} </span>
                            {post.comments[0]?.text}
                        </div>
                        : null
                    }
                </div>

                <div className="card_content_time">
                    { post.display_time.toUpperCase() }
                </div>
            </div>

            <div className="card_add_comment">
                <label className="card_add_comment_input">
                    <i className="far fa-smile card_add_comment_input_icon" />label
                    <input className="card_add_comment_input_textbox" id={"comment_input_"+post.id}
                           type="text" placeholder="Add a comment..." value={input}
                           onChange={(e) => setInput(e.target.value)}
                            ref={textInput}/>
                </label>

                <button className="card_add_comment_submit"
                        onClick={e => HandleComment(e, post.id, input, setInput, requeryPost, focusTextInput)}
                        data-post-id={ post.id }>
                    Post
                </button>
            </div>

            {showModal? <Modal post={post} setShowModal={setShowModal} /> : null }
        </div>
    );
}

const HandleComment = (e, pid, input, setInput, requeryPost, focusTextInput) => {
    const postData = {
        "post_id": pid,
        "text": input,
    }

    fetch('/api/comments', {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    setInput("");
                    requeryPost();
                    focusTextInput();
                })
            } else {
                response.json().then(data => console.log("Error:", data))
            }
        })
}

export default Post;