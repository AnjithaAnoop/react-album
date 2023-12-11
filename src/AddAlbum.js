import {useState} from 'react';
import "./album.css";

export default function AddAlbums(props) {

    const [title, setTitle] = useState('');
    // use state to handle title

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addAlbums(title);
        setTitle('');
    };
    //handlesubmit will be called on submitting the below form which is to fetch new user input: new title.

    return (
        <form className='add-album' onSubmit={handleSubmit}>
            <button className='btn enter-btn'>Enter Album Details
            <i className="arrow right"></i>
            <i className="arrow right"></i>
            </button>
            <div className="input-container">
                <label htmlFor="title" className='text'>Title : </label>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button type="submit" className="btn enter-btn">Add Album</button>
        </form>
    )
}