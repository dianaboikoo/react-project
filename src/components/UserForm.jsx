import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, onCancel, user }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [genre, setGenre] = useState("");
  const [members, setMembers] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      user.name && setName(user.name); // if user.name is true, set the name state with the user.name value
      user.location && setLocation(user.title); // if user.title is true, set the title state with the user.title value
      user.genre && setGenre(user.mail); // if user.mail is true, set the mail state with the user.mail value
      user.members && setMembers(user.members);
      user.time && setTime(user.time);
      user.image && setImage(user.image); // if user.image is true, set the image state with the user.image value
    }
  }, [user]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (!name || !location || !genre || !members || !time) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const user = {
      // key/name: value from state,
      name: name,
      location: location,
      genre: genre,
      members: members,
      time: time,
      image: image
    };
    onSubmit(user);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Name</label>
      <input id="name" type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
     
      <label htmlFor="">Location</label>
      <input id="location" type="text" value={location} placeholder="Type a location" onChange={e => setLocation(e.target.value)} />

      <label htmlFor="">Genre</label>
      <input id="genre" type="text" value={genre} placeholder="Type a genre" onChange={e => setGenre(e.target.value)} />

      <label htmlFor="">Members</label>
      <input id="members" type="text" value={members} placeholder="Type an amount of members" onChange={e => setMembers(e.target.value)} />

      <label htmlFor="">Time</label>
      <input id="time" type="text" value={time} placeholder="Type an amount of time" onChange={e => setTime(e.target.value)} />

      <label htmlFor="">Image URL</label>
      <input id="image" type="text" value={image} placeholder="Type an image URL" onChange={e => setImage(e.target.value)} />

      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
        alt="Choose"
        onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{user ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
