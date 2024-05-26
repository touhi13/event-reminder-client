import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddEventMutation } from '../features/event/eventApi';
import EventForm from '../components/form/EventForm';
// import EventForm from './EventForm';

const AddEvent = () => {
    const cacheKey = useSelector((state) => state.cacheKey.event);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addEvent, { isLoading, isError, error }] = useAddEventMutation();

    const syncData = async () => {
        const events = JSON.parse(localStorage.getItem('offlineEvents')) || [];
        events.forEach(async (event) => {
            await addEvent(event);
        });
        localStorage.removeItem('offlineEvents');
    };

    const onSubmit = (data) => {
        const newEvent = {
            title: data.title,
            description: data.description,
            event_date: data.eventDate,
            reminder_recipients: data.reminderRecipients.split(',').map(email => email.trim()),
        };
        if (!navigator.onLine) {
            const offlineEvents = JSON.parse(localStorage.getItem('offlineEvents')) || [];
            offlineEvents.push({ newEvent, cacheKey });
            localStorage.setItem('offlineEvents', JSON.stringify(offlineEvents));
        } else {
            addEvent({ newEvent, cacheKey });
        }
        navigate('/');
    };

    useEffect(() => {
        if (navigator.onLine) {
            syncData();
        } else {
            window.addEventListener('online', syncData);
        }

        return () => {
            window.removeEventListener('online', syncData);
        };
    }, [navigator.onLine]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Event</h1>
            <EventForm onSubmit={onSubmit} />
        </div>
    );
};

export default AddEvent;
