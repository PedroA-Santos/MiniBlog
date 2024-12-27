import styles from "./Post.module.css";

//hooks

import { useParams } from 'react-router-dom'
import { useFetchDocument } from "../../hooks/useFetchDocument";

function Post() {

    const { id } = useParams();

    const { document: post, loading } = useFetchDocument("posts", id);
    return (
        <div>
            {loading && (
                <h1>Carregando Post...</h1>
            )}
            {post && (
                <>
                    <h1>{post.title}</h1>
                </>
            )}
        </div>
    )
}

export default Post
