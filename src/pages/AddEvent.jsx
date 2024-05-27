import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddEventMutation } from '../features/event/eventApi';
import EventForm from '../components/form/EventForm';
// import EventForm from './EventForm';

const AddEvent = () => {
    const [isLoader, setIsLoader] = useState(false);

    const cacheKey = useSelector((state) => state.cacheKey.event);
    const navigate = useNavigate();
    const [addEvent, { isLoading, isError, error, isSuccess }] = useAddEventMutation();

    const syncData = async () => {
        const events = JSON.parse(localStorage.getItem('offlineEvents')) || [];
        events.forEach(async (event) => {
            await addEvent(event);
        });
        localStorage.removeItem('offlineEvents');
    };

    const onSubmit = async (data) => {
        setIsLoader(true)
        const newEvent = {
            title: data.title,
            description: data.description,
            event_date: data.eventDate,
            reminder_recipients: data.reminderRecipients.split(',').map(email => email.trim()),
        };
        if (!navigator.onLine) {
            const offlineEvents = JSON.parse(localStorage.getItem('offlineEvents')) || [];
            offlineEvents.push({ newEvent: { ...newEvent, offline: true }, cacheKey });
            localStorage.setItem('offlineEvents', JSON.stringify(offlineEvents));

            navigate('/')
        } else {
            await addEvent({ newEvent, cacheKey });
        }
        setIsLoader(false)

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


    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])

    // console.log(isError, error);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Event</h1>
            <EventForm onSubmit={onSubmit} serverErrors={isError ? error.data.errors : null} loader={isLoader} />
        </div>
    );
};

export default AddEvent;
