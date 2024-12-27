import styles from './EditPost.module.css'


import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';





const EditPost = () => {

    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ");

            setTags(textTags)
        }
    }, [post])

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")



        //validate image url

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")
        }

        //criar array de tags

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


        //checar todos os valores

        if (!title || !image || !body || !tags) {
            setFormError("Por favor, preencha todos os campos! ")
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        //redirect to home page

        navigate("/")
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando Post: {post.title}</h2>
                    <p>Altere como desejar</p>

                    <form onSubmit={handleSubmit}>
                        <label >
                            <span>Título:</span>
                            <input type="text" name='title' required placeholder='Insira seu título' onChange={(e) => setTitle(e.target.value)}
                                value={title} />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="text" name='image' required placeholder='Insira sua imagem ' onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>
                        <label >
                            <p className={styles.preview_title}>Preview da Imagem Atual</p>
                            <img className={styles.image_preview} src={post.image} alt={post.title} />
                        </label>
                        <label>
                            <span>Conteúdo:</span>
                            <textarea name='body' required placeholder='Insira o corpo do post' onChange={(e) => setBody(e.target.value)} value={body} />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type="text" name='tags' placeholder='Insira suas Tags separadas por vírgulas' required onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde.. .
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className="error">{response.error || formError}</p>
                        )}
                    </form>

                </>
            )}
        </div>
    )
}

export default EditPost
