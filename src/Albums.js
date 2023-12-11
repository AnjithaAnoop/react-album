import React, { useState, useEffect } from "react";
import "./album.css";
import AddAlbums from "./AddAlbum";
import axios from "axios";

function Albums() {
  const [data, setData] = useState([]);
  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/albums",
  });
  //creating an instance of axios client..

  const fetchAlbums = async () => {
    const response = await client.get("?_limit=6");
    console.log(response);
    setData(response.data);
  };
  //fetching data from the albums api..

  useEffect(() => {
    fetchAlbums();
  }, []);

  const addAlbums = async (title) => {
    const response = await client.post("", {
      title,
    });
    console.log(response);
    setData((prevPosts) => [...prevPosts, response.data]);
    alert("album added successfully..");
  };
  //axios POST request to add a new album.

  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAlbums(editId);
    setTitle("");
  };
  //on submiting the update album form this function is called.

  const [isFormVisible, setFormVisibility] = useState(false);
  // State to track the visibility of the form
  const [editId, setEditId] = useState(null);
  //to edit and update the existing title

  // Function to toggle the form visibility
  const toggleFormVisibility = (id, title) => {
    setFormVisibility(!isFormVisible);
    setEditId(id);
    setTitle(title);
  };


  const updateAlbums = async (id) => {
    const response = await client.put(`/${id}`, {
      title,
      id,
    });
    console.log(response);
    setFormVisibility(!isFormVisible);
    alert("album updated successfully..");
    let updatedData = data.map((obj) =>
      obj.id === response.data.id ? response.data : obj
    );
    setData(updatedData);
  };
  // PUT request to update the existing album.


  const deleteAlbum = async (id) => {
    const response = await client.delete(`${id}`);
    setData(data.filter((post) => post.id !== id));
    console.log("deleted", response);
    alert("album dleted successfully..");
  };
  //DELETE request to delete an album by comparing the id of album
  return (
    <div className="Albums">
      <h1 className="album-title">ALBUMS REACT</h1>
      <AddAlbums addAlbums={addAlbums} />
      <div className="album-container">
        {data.map((album, index) => {
          return (
            <div className="album-box">
              <p style={styles.content}>
                {album.id}. {album.title}
              </p>
              <div className="button">
                <div
                  className="btn update-btn"
                  onClick={() => toggleFormVisibility(album.id, album.title)}
                >
                  Update
                </div>
                <div
                  className="btn delete-btn"
                  onClick={() => deleteAlbum(album.id)}
                >
                  Delete
                </div>
              </div>
            </div>
          );
        })}

        {isFormVisible && (
          <form className="update-form" onSubmit={handleSubmit}>
            <h3 className="m-40 update-title">UPDATE ALBUM</h3>
            <input
              type="text"
              id="updateInput"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="btn enter-btn submit m-40">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
const styles = {
  content: { fontSize: "16px", color: "#8f7070", padding: "10px" },
};

export default Albums;