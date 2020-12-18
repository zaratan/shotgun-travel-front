import Head from 'next/head';
import React, { ReactNode } from 'react';
import Nav from './Nav';

const Layout = ({
  children,
  title,
  buttonText,
  buttonAction,
}: {
  children: ReactNode;
  title: string;
  buttonText: string;
  buttonAction: () => void;
}) => (
  <>
    <Head>
      <title>Shotgun Travel - {title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav buttonText={buttonText} buttonAction={buttonAction} />
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
      </div>
    </header>
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  </>
);

export default Layout;
