import styles from './Dashboard.module.css';

import { Link } from "react-router-dom";


//hooks

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Dashboard = () => {

    const { user } = useAuthValue()
    const uid = user.uid

    //posts do usuário
    const posts = [];

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>não foram encontrados posts</p>
                    <Link to="/posts/create" className='btn'>
                        Criar Primeiro Post
                    </Link>
                </div>
            ) : (
                <div>Tem Posts</div>
            )}
        </div>
    )
}

export default Dashboard
