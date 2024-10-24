import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { index, Show, Create, createComment } from "../../services/hootService";
import CommentForm from '../CommentForm/CommentForm';
import { AuthedUserContext } from "../../App";
import { Link } from 'react-router-dom';

const HootDetails = (props) => {
    const { hootId } = useParams();
    const [hoot, setHoot] = useState(null);
    const user = useContext(AuthedUserContext)
    console.log(user)
    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await Show(hootId);
            console.log('hootData', hootData);
            setHoot(hootData);
        }
        fetchHoot()
    }, [hootId])
    console.log(hoot)
    //loader
    if (!hoot) return <main>Loading...</main>


    const handleAddComment = async (commentFormData) => {
        const newComment = await createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    }

    return (
        <main>
            <header>
                <p>{hoot.category.toUpperCase()}</p>
                <h1>{hoot.title}</h1>
                <p>
                    {hoot.author.username} posted on {new Date(hoot.createdAt).toLocaleDateString()}
                </p>

                {/**If i wrote the hoot then i get to delete it */}
                {   //check to see if i wrote the hoot
                    hoot.author._id === user._id && 
                    //if check passes, then the update and delete button appears
                    <>
                    <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
                    <button onClick={() => props.handleDeleteHoot(hootId)}> Delete</button>
                    </>
                }
            </header>
            <p>{hoot.text}</p>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {/* render text says no comments if there are no comments */}
                {/* {hoot.comment.length === 0 && <p>There are no comments</p>} */}
                {!hoot.comments.length && <p>There are no comments</p>}

                {/* comments coming in the form of an array. Therefore we can use the .map to render jxs */}
                {hoot.comments.map((el) => {
                    return (
                        <article key={el._id}>
                            <header>
                                <p>
                                    {el.author.username} posted on
                                    {new Date(el.createdAt).toLocaleDateString()}
                                </p>
                            </header>
                            <p>{el.text}</p>
                        </article>
                    )
                })}
            </section>
        </main>
    )
}

export default HootDetails;