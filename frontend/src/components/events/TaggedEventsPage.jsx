import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getEventsByTag } from "../../services/apiLives";

const TaggedEventsPage = () => {
  const { tagName } = useParams(); // URLパラメータからタグ名を取得
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsByTag(tagName);
        setEvents(data);
      } catch (err) {
        setError("イベントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tagName]); // tagNameが変わるたびに再取得

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{tagName} のイベント</h1>
      <br />
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <Link to={`/events/${event.id}`} className="hover:underline">
              {event.image && <img src={event.image} alt={event.title} width="100" />}
              <h2>{event.title}</h2>
              <p>場所: {event.location}</p>
              <p>紹介: {event.introduction}</p>
              <p>開催日: {event.date}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>このタグに該当するイベントはありません</p>
      )}
    </div>
  );
};

export default TaggedEventsPage;
