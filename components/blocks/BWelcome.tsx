import moment from 'moment';
import BCard from './BCard';

export default function BWelcome({ user }: Props) {
  return (
    <div className="">
      <BCard>
        <div className="text-6xl font-thin">
          Hello<p>{user}</p>
        </div>
        <div className="py-8 text-blue-200">
          Today is <span className="text-gray-50">{moment(Date.now()).format('dddd, MMMM Do YYYY')}</span>
        </div>
      </BCard>
    </div>
  );
}

type Props = {
  user: string;
};
