import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import PictureCard from '../../components/PictureCard';
import Trip from '../../types/Trip';
import { fetchTrips } from '../api/trips';
import { fetchTrip } from '../api/trips/[trip_id]';

export async function getStaticPaths() {
  const { trips } = await fetchTrips();

  return {
    paths: trips.map((trip) => ({
      params: { trip_id: trip.id.toString() },
    })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const initialData = await fetchTrip(Number(params.trip_id));

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const TripPage = ({ initialData }: { initialData: { trip: Trip } }) => {
  const router = useRouter();
  const { trip_id: tripId } = router.query;

  const {
    data: { trip },
    mutate,
  } = useSWR(`/api/trips/${tripId}`, {
    initialData,
    refreshInterval: 10,
    revalidateOnMount: true,
  });

  return (
    <Layout title={trip.title}>
      <div className="bg-white">
        <div className="mx-auto py-2 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-4">
          <div className="space-y-12">
            {trip.description ? (
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <p className="text-xl text-black">{trip.description}</p>
              </div>
            ) : null}
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
              {trip.pictures.map((picture) => (
                <li key={`picture-${picture.id}`}>
                  <PictureCard picture={picture} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TripPage;
