import { ReactNode } from 'react';

export default function BCard({ children }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-50 overflow-hidden shadow-lg rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}

type Props = {
  children: ReactNode;
};
