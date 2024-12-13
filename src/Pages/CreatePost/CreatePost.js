import styles from './CreatePost.module.css'


import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(undefined)


    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <input type="image" name='image' required placeholder='Insira sua imagem ' onChange={(e) => setImage(e.target.value)} value={image} />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea name='body' required placeholder='Insira o corpo do post' onChange={(e) => setBody(e.target.value)} value={body} />
                </label>
                <label>
                    <span>Tags:</span>
                    <input type="text" name='tags' placeholder='Insira suas Tags separadas por vírgulas' required onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>
                {!loading && <button className='btn'>Enviar Post</button>}
                {loading && (
                    <button className='btn' disabled>
                        aguarde...
                    </button>
                )}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost
