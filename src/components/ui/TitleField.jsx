import React from 'react';
import { Controller } from 'react-hook-form';

const TitleField = ({ control, errors }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Controller
            name="title"
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
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </div>
);

export default TitleField;
