import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteEventMutation, useGetEventsQuery, useImportEventsMutation, useUpdateStatusMutation } from '../features/event/eventApi';
import { updateCacheKey } from '../features/cacheKey/cacheKeySlice';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Home = () => {
    const fileInputRef = useRef(null);

    const cacheKey = useSelector((state) => state.cacheKey.event);
    const dispatch = useDispatch();


    const { data, isLoading, isError, error } = useGetEventsQuery(cacheKey);

    const [importEvent] = useImportEventsMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const [updateStatus] = useUpdateStatusMutation();

    const offlineEvents = JSON.parse(localStorage.getItem('offlineEvents')) || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    let events = data?.data || [];

    // Combine offline events with fetched events
   const combineEvents = [...offlineEvents.map(event => event.newEvent), ...events.data];



    const handleStatusChange = async (id) => {
        const confirmed = window.confirm('Are you sure you want to update the status of this event?');
        if (confirmed) {
            await updateStatus({ id, cacheKey });// Update event status if confirmed
        } else {
            console.log('Status update canceled.');
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        // console.log(file)
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            await importEvent({ formData, cacheKey }) // Import events from the selected CSV file
        }
    };

    const handleSearch = (e) => {
        dispatch(updateCacheKey({
            key: 'event', payload: { "search_text": e.target.value }
        }))
    }

    const handleFilter = (e) => {
        dispatch(updateCacheKey({
            key: 'event', payload: { "status": e.target.value }
        }))
    }
    
    const handlePagination = (pageNumber) => {
        dispatch(updateCacheKey({
            key: 'event',
            payload: { "page": pageNumber }
        }));
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
        if (isConfirmed) {
            await deleteEvent({ id, cacheKey });
        }
    }



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Event List</h1>
            <div className="flex items-center mb-4">
                <Link to="/add-event" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Add Event</Link>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                    onClick={() => fileInputRef.current.click()}
                >
                    Import CSV
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".csv"
                    onChange={handleImport}
                />
            </div>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={cacheKey.search_text}
                    onChange={handleSearch}
                    className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mr-4"
                />
                <select
                    value={cacheKey.status}
                    onChange={handleFilter}
                    className="bg-gray-100 border border-gray-300 rounded px-4 py-2"
                >
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th> Serial</th>
                            <th>Event ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Event Date</th>
                            <th>Reminder Recipients</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combineEvents.map((event, index) => (
                            <tr key={event.id} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {event.offline ? "Offline: ID TBD on sync" : event.event_id}
                                </td>
                                <td className="px-6 py-4 break-words">{event.title}</td>
                                <td className="px-6 py-4 break-words">{event.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(event.event_date).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 break-words">{event.reminder_recipients.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {event.completed ? 'Complete' : 'Upcoming'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                                    {!event.offline && (
                                        <>
                                            <button onClick={() => handleStatusChange(event.id, 'complete')} className="text-blue-600 hover:text-blue-900">
                                                <CheckIcon className="h-5 w-5" />
                                            </button>
                                            <Link to={`/edit-event/${event.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(event.id)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{events.from}</span> to <span className="font-medium">{events.to}</span> of{' '}
                            <span className="font-medium">{events.total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            {events.prev_page_url && (
                                <button
                                    onClick={() => handlePagination(events.current_page - 1)}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    &laquo; Previous
                                </button>
                            )}
                            {events.links.slice(1, -1).map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePagination(link.label)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link.active ? "bg-indigo-600 text-white" : "text-gray-900"
                                        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            {events.next_page_url && (
                                <button
                                    onClick={() => handlePagination(events.current_page + 1)}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    Next &raquo;
                                </button>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
