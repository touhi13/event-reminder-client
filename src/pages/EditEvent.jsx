import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEventQuery, useUpdateEventMutation } from '../features/event/eventApi';
import EventForm from '../components/form/EventForm';

const EditEvent = () => {
    const { id } = useParams();
    const cacheKey = useSelector((state) => state.cacheKey.event);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: event, isLoading, isError, error } = useGetEventQuery(id);
    const [updateEvent, { isLoading: isUpdating, isError: updateError }] = useUpdateEventMutation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const defaultValues = {
        title: event.data.title,
        description: event.data.description,
        eventDate: event.data.event_date,
        reminderRecipients: event.data.reminder_recipients.join(', '), // Convert array to comma-separated string
    };

    const onSubmit = (data) => {
        const updatedEvent = {
            title: data.title,
            description: data.description,
            event_date: data.eventDate,
            reminder_recipients: data.reminderRecipients.split(',').map(email => email.trim()),
        };
        updateEvent({ id, updatedEvent, cacheKey });
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
            <EventForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </div>
    );
};

export default EditEvent;
