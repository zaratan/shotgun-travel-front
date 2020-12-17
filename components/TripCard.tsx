import Link from 'next/link';
import React from 'react';
import Trip from '../types/Trip';

const TripCard = ({ trip }: { trip: Trip }) => {
  const pictureUrl =
    trip.pictures[0]?.url ||
    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80';
  return (
    <Link href={`/trips/${trip.id}`}>
      <a>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={pictureUrl} alt="" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {trip.title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {trip.description || 'No description for that trip :('}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TripCard;
