import React from 'react';
import { Controller } from 'react-hook-form';

const DescriptionField = ({ control, errors }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <textarea
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            )}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
    </div>
);

export default DescriptionField;
