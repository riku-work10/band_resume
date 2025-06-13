import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventsByTag } from '../../services/apiLives';
import { useAuth } from '../../hooks/AuthContext';
import EventLikeButton from '../likes/EventLikeButton';

function TaggedEventsPage() {
  const { tagName } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsByTag(tagName);
        setEvents(data);
      } catch (err) {
        setError('イベントの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tagName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pt-4 px-6 mb-6">
      <h1 className="text-2xl font-bold mb-4 ">{tagName}</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative flex bg-orange-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {event.image && (
                <Link
                  to={`/events/${event.id}`}
                  className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40"
                >
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </Link>
              )}

              <div className="flex flex-col justify-between p-2 flex-grow">
                <div>
                  <Link to={`/events/${event.id}`} className="hover:underline">
                    <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                  </Link>
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    {event.date} @ {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{event.introduction}</p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.tags?.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/events/tag/${tag.name}`}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {user && user.id !== event.user_id && (
                  <div className="absolute bottom-3 right-3">
                    <EventLikeButton
                      eventId={event.id}
                      className="py-1 px-3 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>このタグに該当するイベントはありません。</p>
      )}
    </div>
  );
}

export default TaggedEventsPage;
