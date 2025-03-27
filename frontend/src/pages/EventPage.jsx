import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/apiLives';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('履歴書の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {events.map((event) => (
      <div key={event.id}>
        <Link to={`/events/${event.id}`} className="hover:underline">
        {event.image && <img src={event.profile_image} alt={event.title} width="100" />}
        <h2>{event.title}</h2>
        <p>場所: {event.location}</p>
        <p>紹介: {event.introduction}</p>
        <p>紹介: {event.date}</p>
        </Link>
      </div>
      ))}
    </div>
  );
};

export default EventPage;

