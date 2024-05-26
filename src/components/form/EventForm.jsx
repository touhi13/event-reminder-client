import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TitleField from '../ui/TitleField';
import DescriptionField from '../ui/DescriptionField';
import EventDateField from '../ui/EventDateField';
import ReminderRecipientsField from '../ui/ReminderRecipientsField';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    eventDate: yup.string().required('Event Date is required'),
    reminderRecipients: yup.string(),
});

const EventForm = ({ onSubmit, defaultValues }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TitleField control={control} errors={errors} />
            <DescriptionField control={control} errors={errors} />
            <EventDateField control={control} errors={errors} />
            <ReminderRecipientsField control={control} errors={errors} />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Save Event
            </button>
        </form>
    );
};

export default EventForm;
