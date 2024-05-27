import { useForm } from 'react-hook-form';
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
    reminderRecipients: yup.string()
        .required('Reminder Recipients are required')
        .test('emails', 'All reminder recipients must be valid email addresses', (value) => {
            const emails = value.split(',').map(email => email.trim());
            return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
        }),
});

const EventForm = ({ onSubmit, defaultValues, serverErrors, loader }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    const combinedErrors = {
        ...errors,
        ...(serverErrors && {
            title: serverErrors.title && { message: serverErrors.title[0] },
            description: serverErrors.description && { message: serverErrors.description[0] },
            eventDate: serverErrors.event_date && { message: serverErrors.event_date[0] },
            reminderRecipients: serverErrors.reminder_recipients && { message: serverErrors.reminder_recipients[0] },
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TitleField control={control} errors={combinedErrors} />
            <DescriptionField control={control} errors={combinedErrors} />
            <EventDateField control={control} errors={combinedErrors} />
            <ReminderRecipientsField control={control} errors={combinedErrors} />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {defaultValues ? (loader ? "Updating..." : "Update Event") : (loader ? "Saving..." : "Save Event")}
            </button>

        </form>
    );
};

export default EventForm;


