import Head from 'next/head';
import { ReactNode } from 'react';
import { CogIcon } from '@heroicons/react/outline';

export default function Layout({ name, children }: Props) {
  return (
    <div className="bg-i0 h-screen">
      <Head>
        <title>{name && `${name}'s`} Dashboard</title>
      </Head>

      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">{children}</div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <button className="float-right">
          <CogIcon className="h-6 w-6 m-2 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

type Props = {
  name?: string;
  children: ReactNode;
};
