import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [membersFilter, setMembersFilter] = useState(""); // state to handle the filter
  const [timeFilter, setTimeFilter] = useState(""); // state to handle the filter
  const [genreFilter, setGenreFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort
  // users: name of the state
  // setUsers: name of the function to set the state

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // get data from local storage

      let usersData = [];

      if (data) {
        // if data exists in local storage
        usersData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);
      setUsers(usersData); // set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch("https://raw.githubusercontent.com/dianaboikoo/board_games/main/boardgames.json"); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("users", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter and sort the users array
  let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  

  if (membersFilter) {
    filteredUsers = filteredUsers.filter(user => user.people === membersFilter); // filter the users array by the selected title
  }

  if (timeFilter) {
    filteredUsers = filteredUsers.filter(user => user.time === timeFilter); // filter the users array by the selected title
  }

   if (genreFilter) {
    filteredUsers = filteredUsers.filter(user => user.genre === genreFilter); // filter the users array by the selected title
  }

  filteredUsers.sort((user1, user2) => user1[sortBy].localeCompare(user2[sortBy])); // sort the users array by the selected sort

const membersoptions = [...new Set(users.map(user => user.members))]; // get all the unique titles from the users array
const timeOptions = [...new Set(users.map(user => user.time))]; // get all the unique titles from the users array
const genreOptions = [...new Set(users.map(user => user.genre))]; // get all the unique titles from the users array










  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search <input placeholder="Search by name" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>


        <label>
          Members
          <select onChange={e => setMembersFilter(e.target.value)}>
            <option value="">Select a number</option>
            {membersoptions.map(members => (
              <option key={members} value={members}>
                {members}
              </option>
            ))}
          </select>
        </label>


<label>
          Genre
          <select onChange={e => setGenreFilter(e.target.value)}>
            <option value="">Select a genre</option>
            {genreOptions.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>



        <label>
          Time
          <select onChange={e => setTimeFilter(e.target.value)}>
            <option value="">select amount of time</option>
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>





        <label>
          Sort by
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="genre">Genre</option>
            <option value="members">Members</option>
            <option value="time">Time</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map(user => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
