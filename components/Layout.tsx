import Head from 'next/head';
import { ReactNode, useEffect } from 'react';

import Start from '@/components/Start';
import { useAppContext } from '@/context/AppContext';

export default function Layout({ name, children }: Props) {
  const appContext = useAppContext();

  if (!appContext.name) {
    return (
      <div>
        <Start />
      </div>
    );
  }
  return (
    <div className="bg-i0 h-screen">
      <Head>
        <title>{name && `${name}'s`} Dashboard</title>
      </Head>

      <div className=" m-auto">
        <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">{children}</div>
      </div>
    </div>
  );
}

type Props = {
  name?: string;
  children: ReactNode;
};
