import styles from './CreatePost.module.css'


import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from '../../hooks/useInsertDocument';



const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts")


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")



        //validate image url

        //criar array de tags


        //checar todos os valores

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createdBy: user.displayName
        })

        //redirect to home page
    }

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que quiser compartilhar e compartilhe seu conhecimento</p>

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
                <label>
                    <span>Conteúdo:</span>
                    <textarea name='body' required placeholder='Insira o corpo do post' onChange={(e) => setBody(e.target.value)} value={body} />
                </label>
                <label>
                    <span>Tags:</span>
                    <input type="text" name='tags' placeholder='Insira suas Tags separadas por vírgulas' required onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>
                {!response.loading && <button className="btn">Criar post!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde.. .
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}
            </form>
        </div>
    )
}

export default CreatePost
