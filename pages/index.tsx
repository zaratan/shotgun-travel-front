import { GetStaticProps } from 'next';
import useSWR from 'swr';
import Layout from '../components/Layout';
import TripCard from '../components/TripCard';
import Trip from '../types/Trip';
import { fetchTrips } from './api/trips';

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await fetchTrips();

  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

export default function Home({
  initialData,
}: {
  initialData: { trips: Array<Trip> };
}) {
  const { data, mutate } = useSWR(`/api/trips`, {
    initialData,
    refreshInterval: 10,
    revalidateOnMount: true,
  });
  return (
    <Layout title="Trips">
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Trips from the SG team
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              This is a simple app to help Shotguners to share their travels and
              the associated pictures.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {data.trips.map((trip) => (
              <TripCard trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
