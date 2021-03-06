import Head from 'next/head';
import { ReactNode, useState } from 'react';
import Settings from '@/components/Settings';

export default function Layout({ name, children }: Props) {
  const [open, setOpen] = useState(false);

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

      <Settings />
    </div>
  );
}

type Props = {
  name?: string;
  children: ReactNode;
};
