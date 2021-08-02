import moment from 'moment';

import BCard from '@/blocks/BCard';

export default function BWelcome({ user }: Props) {
  return (
    <div className="my-1 px-1 w-1/4 overflow-hidden">
      <BCard>
        <div className="p-2 text-center">
          <div className="text-6xl pb-6 font-thin">Hello {user}</div>
          <div className="mt-4">
            <div className="text-4xl font-thin text-blue-700 dark:text-blue-200">{moment().format('hh:mm A')}</div>
            <div className="my-auto mt-2 pb-3">
              <span className="text-gray-900 dark:text-gray-50">{moment().format('dddd, MMMM Do YYYY')} </span>
            </div>
          </div>
        </div>
      </BCard>
    </div>
  );
}

type Props = {
  user: string;
};
