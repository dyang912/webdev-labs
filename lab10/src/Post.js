import React from 'react';
// import LikeButton from './LikeButton';
// import {getHeaders} from './utils';
// import BookmarkButton from "./BookmarkButton";

// class Post extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: this.props.model
//         }
//
//         this.requeryPost = this.requeryPost.bind(this);
//     }
//
//     requeryPost() {
//         fetch(`/api/posts/${this.state.post.id}`, {
//                 headers: getHeaders()
//             })
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({
//                     post: data
//                 });
//             });
//     }
//
//     render () {
//         const post = this.state.post;
//         if (!post) {
//             return (
//                 <div />
//             );
//         }
//         return (
//             <section className="card">
//                 <div className="header">
//                     <h3>{ post.user.username }</h3>
//                     <i className="fa fa-dots" />
//                 </div>
//
//                 <img
//                     src={ post.image_url }
//                     alt={'Image posted by ' +  post.user.username }
//                     width="300"
//                     height="300" />
//
//                 <div className="info">
//                     <div>
//                         <LikeButton
//                             postId={post.id}
//                             likeId={post.current_user_like_id}
//                             requeryPost={this.requeryPost} />
//                         <BookmarkButton
//                             postId={post.id}
//                             bookmarkId={post.current_user_bookmark_id}
//                             requeryPost={this.requeryPost} />
//                     </div>
//                     <p>{ post.caption }</p>
//                 </div>
//             </section>
//         );
//     }
// }

const Post = ({post}) => {

    return (
        <div className="card" id={"post_"+post.id}>
            <div className="card_header">
                <div className="card_header_name">{ post.user.username }</div>
                <i className="fas fa-ellipsis-h card_header_icon" />
            </div>

            <img className="card_img" src={ post.image_url } alt={"card_img_"+ post.user.username } />

            <div className="card_content">
                <div className="card_content_icons">
                    <i className={ (post.current_user_like_id ? 'fas' : 'far') + " fa-heart card_content_icons_icon"}
                       data-post-id={ post.id }
                       data-like-id={ post.current_user_like_id }
                       onClick="HandleLike(event)"
                       aria-label={ post.current_user_like_id ? 'Unlike' : 'Like' }
                       aria-checked={ post.current_user_like_id ? 'true' : 'false' } />
                    <i className="far fa-comment card_content_icons_icon" />
                    <i className="far fa-paper-plane card_content_icons_icon" />
                    <i className={ (post.current_user_bookmark_id ? 'fas' : 'far') + " fa-bookmark card_content_icons_bookmark"}
                       data-post-id={ post.id }
                       data-bookmark-id={ post.current_user_bookmark_id }
                       onClick="HandleBookmark(event)"
                       aria-label={ post.current_user_bookmark_id ? 'Unbookmark' : 'Bookmark' }
                       aria-checked={ post.current_user_bookmark_id ? 'true' : 'false' } />
                </div>

                <span className="card_content_like_num" id={"like_num_"+ post.id }>{ post.likes.length } </span>
                <span className="card_content_like">likes</span>

                <div className="card_content_post">
                    <span className="card_content_post_name">{ post.user.username } </span>
                    { post.caption }..
                    <span className="card_content_post_more" >more</span>
                </div>

                <div className="card_content_comments">
                    <button className="card_content_comments_viewall" data-post-id={post.id} onClick="showModal(event)">
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
                           type="text" placeholder="Add a comment..." />
                </label>

                <button className="card_add_comment_submit"
                        onClick="HandleComment(event)"
                        data-post-id={ post.id }>
                    Post
                </button>
            </div>
        </div>
    );
}

export default Post;