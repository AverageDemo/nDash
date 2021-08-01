import BTask from '@/blocks/BTask';
import Start from '@/components/Start';
import BWelcome from '@/blocks/BWelcome';
import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import BSearch from '@/blocks/BSearch';
import BWeather from '@/blocks/BWeather';

export default function Home() {
  const appContext = useAppContext();

  // Disable SSR
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('initialized')) {
      return (
        <Layout name={appContext.name}>
          {/* Add or remove blocks here */}
          <BWelcome user={appContext.name} />
          <BWeather appContext={appContext} />
          <BSearch />
          <BTask />
        </Layout>
      );
    } else {
      return <Start />;
    }
  }

  return null;
}
