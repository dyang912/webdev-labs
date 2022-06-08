

const Modal = ({post, setShowModal}) => {
    return (
        <div className="modal_bg" aria-hidden="false" role="dialog">
            <button className="modal_close" aria-label="close" onClick={() => {setShowModal(false)}}>
                <i className="fas fa-times"/>
            </button>
            <div className="modal">
                <img className="modal_img" src={post.image_url} alt="post_img"/>
                <div className="modal_comments">
                    <div className="modal_comments_profile">
                        <img className="modal_comments_profile_img" src={ post.user.image_url }
                             alt={"profile pic for" + post.user.username } />
                        <h2 className="modal_comments_profile_name">{post.user.username}</h2>
                    </div>
                    {Object.values(post.comments).map(value => {
                        return (
                            <div className="modal_comments_content_unit" key={value.id}>
                                <img className="modal_comments_content_img" src={ value.user.image_url }
                                     alt="post_img"/>
                                <div className="modal_comments_content_text">
                                    <div>
                                        <span className="card_content_comments_unit_name">{value.user.username} </span>
                                        {value.text}
                                    </div>
                                    <div
                                        className="modal_comments_content_text_time">{value.display_time.toUpperCase()}</div>
                                </div>
                                <button className="modal_comments_unit_icon">
                                    <i className="far fa-lg fa-heart modal_comments_unit_icon_i"/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Modal;