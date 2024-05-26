import React from 'react';
import { Controller } from 'react-hook-form';

const ReminderRecipientsField = ({ control, errors }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Reminder Recipients (comma-separated emails)</label>
        <Controller
            name="reminderRecipients"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            )}
        />
        {errors.reminderRecipients && <p className="text-red-500">{errors.reminderRecipients.message}</p>}
    </div>
);

export default ReminderRecipientsField;
