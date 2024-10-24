import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Show } from '../../services/hootService';

const HootForm = (props) => {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category: "News",
    });
    const { hootId } = useParams();

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddHoot(formData)

    }

    useEffect(() => {
        //fetches the hoot details for id and sets that data
        const fetchHoot = async () => {
            const hootData = await Show(hootId)
            setFormData(hootData);
        }

        if(hootId) fetchHoot();
    },[hootId])

    return(
        <main>
            <form onSubmit={handleSubmit}>
            <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
                {/*Title input */}
                <label htmlFor="title-input">Title</label>
                <input 
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title} // some state key-value from the formdata object
                    onChange={handleChange}                    
                />
                {/*Text input */}
                <label htmlFor="text-input">Text</label>
                <input 
                    required
                    type="text"
                    name="text"
                    id="text-input"
                    value={formData.text} // some state key-value from the formdata object
                    onChange={handleChange}                    
                />

                {/*Category selection*/}
                <label htmlFor="category-input">Category</label>
                <select
                    required
                    id="category-input"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}     
                >
                    <option value="News">News</option>
                    <option value="Games">Games</option>
                    <option value="Movies">Movies</option>
                    <option value="Sports">Sports</option>
                    <option value="Television">Television</option>

                </select>

                {/*submit button*/}
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )


}


export default HootForm