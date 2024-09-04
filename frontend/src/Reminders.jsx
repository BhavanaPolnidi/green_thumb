import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChiflidoSound from './assets/Chiflido.mp3';

function Reminders() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [repeatDays, setRepeatDays] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reminders on component mount
    axios.get('http://localhost:5000/auth/reminders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setReminders(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the reminders!', error);
    });
  }, []);

  const handleRepeatDayChange = (day) => {
    setRepeatDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const scheduleReminder = () => {
    const dateTimeString = `${date} ${time}`;
    const scheduledTime = new Date(dateTimeString);
    const currentTime = new Date();
    const timeDifference = scheduledTime - currentTime;

    if (timeDifference > 0 || repeatDays.length > 0) {
      addReminder(title, description, dateTimeString, repeatDays);
      const timeoutId = setTimeout(() => {
        new Notification(title, {
          body: description,
          requireInteraction: true
        });
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, timeDifference);
      setTimeoutIds([...timeoutIds, timeoutId]);
    } else {
      alert("The scheduled time is in the past!");
    }
  };

  const addReminder = (title, description, dateTimeString, repeatDays) => {
    const newReminder = { title, description, dateTimeString, repeatDays };
    axios.post('http://localhost:5000/auth/reminders', newReminder, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setReminders([...reminders, response.data]);
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setRepeatDays([]);
      })
      .catch(error => {
        console.error('There was an error adding the reminder!', error);
      });
  };

  const deleteReminder = (id) => {
    axios.delete(`http://localhost:5000/auth/reminders/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setReminders(reminders.filter(reminder => reminder._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the reminder!', error);
      });
  };

  return (
    <div className="Reminders">
      <h1>Reminders</h1>
      <form onSubmit={e => { e.preventDefault(); scheduleReminder(); }}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Time:
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Repeat:</label>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <label key={day}>
              <input
                type="checkbox"
                checked={repeatDays.includes(day)}
                onChange={() => handleRepeatDayChange(day)}
              />
              {day}
            </label>
          ))}
        </div>
        <button type="submit" className="add-reminder-button">Add Reminder</button>
      </form>
      <ul>
        {reminders.map(reminder => (
          <li key={reminder._id}>
            <h3>{reminder.title}</h3>
            <p>{reminder.description}</p>
            <p>{reminder.dateTimeString}</p>
            <p>{reminder.repeatDays.join(', ')}</p>
            <button onClick={() => deleteReminder(reminder._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <audio ref={audioRef} src={ChiflidoSound} />
      <style>
        {`
          .Reminders {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          
          h1 {
            text-align: center;
            color: #333;
          }
          
          form {
            display: flex;
            flex-direction: column;
            max-width: 500px;
            margin: 0 auto;
          }
          
          div {
            margin-bottom: 15px;
          }
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          input[type="text"],
          input[type="date"],
          input[type="time"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          
          input[type="checkbox"] {
            margin-right: 5px;
          }
          
          button {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          
          .add-reminder-button {
            background-color: #28a745;
            color: white;
          }
          
          .add-reminder-button:hover {
            background-color: #218838;
          }
          
          ul {
            list-style: none;
            padding: 0;
            width : 300px;
            overflow: scroll;
          }
          
          li {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 10px;
          }
          
          h3 {
            margin: 0;
            color: #333;
          }
          
          p {
            margin: 5px 0;
          }
          
          button {
            background-color: #28a745;
            margin-top: 10px;
          }
          
          button:hover {
            background-color: #218838;
          }
        `}
      </style>
    </div>
  );
}

export default Reminders;
