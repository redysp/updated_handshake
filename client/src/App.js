import React, { useEffect, useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'

function App() {
  const [data, setData] = useState('');
  const [formData, setFormData] = useState({
    text: '', 
  })
  useEffect(() => {
    const fetchData = async () => {
          await axios.get("http://localhost:4000/api/actionChirps")
          .then(res => setData(res.data))
          .catch(err => console.log(err))
    }
    fetchData();
  }, [data]);

  // Get data and send to database

  const sendChirp = () => {
    axios.post("http://localhost:4000/api/actionChirps/addChirp", {
      text: formData.toUpperCase(), 
    })
    .then(res => console.log('Data sent'))
    .catch(err => console.log(err))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    sendChirp()
  }

  const handleChange = (event) => {
    setFormData(event.target.value)
  }

  // Get votes and send to database

  const upVote = async (id) => {
    console.log("the id: ", id); 
    await axios.post("http://localhost:4000/api/actionChirps/upVote", {
      id: id, 
    })
    .then(res => console.log('ID sent'))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <Jumbotron>
        <h1>Hello Handshake!</h1>
        <p>
          This is the assessment using the MERN stack!
        </p>
      </Jumbotron>
      <h3>Chirps 🦉</h3>
      <br/>
      <div>
      <form onSubmit={handleSubmit}>
        <h3> Enter chirp here! </h3>
        <input type="text" value={formData.text} onChange={handleChange}></input>
        <input type="submit" value="Send" ></input>
      </form>
      </div> 
      <br/>
      <ul class="chirps">
      {data ? data.map(chirp => 
          <Card>
            <Card.Body>
              <Card.Title>Tweet ID: {chirp.id} </Card.Title>
              <Card.Text>
                Text: {chirp.text}
              </Card.Text>
              <Button variant="success" onClick={() => upVote(chirp.id)}>Upvote: {chirp.upvote}</Button>
            </Card.Body>
          </Card>
      ):<li>Loading...</li>}
      </ul>

    </div>
  );
}

export default App;
