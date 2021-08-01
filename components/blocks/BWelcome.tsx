import moment from 'moment';

import BCard from '@/blocks/BCard';

export default function BWelcome({ user }: Props) {
  return (
    <div className="my-1 px-1 w-1/4 overflow-hidden">
      <BCard>
        <div className="p-2">
          <div className="text-6xl pb-6 font-thin">
            Hello<p>{user}</p>
          </div>
          <div className="my-auto py-2 text-blue-700 dark:text-blue-200">
            Today is <span className="text-gray-900 dark:text-gray-50">{moment().format('dddd, MMMM Do YYYY')}</span>
          </div>
        </div>
      </BCard>
    </div>
  );
}

type Props = {
  user: string;
};
