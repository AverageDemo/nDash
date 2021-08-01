import BTask from '@/blocks/BTask';
import Start from '@/components/Start';
import BWelcome from '@/blocks/BWelcome';
import Layout from '@/components/Layout';
import Weather from '@/components/Weather';
import { useAppContext } from '@/context/AppContext';
import BSearch from '@/blocks/BSearch';

export default function Home() {
  const appContext = useAppContext();

  // Disable SSR
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('initialized')) {
      return (
        <Layout name={appContext.name}>
          <BWelcome user={appContext.name} />
          <Weather appContext={appContext} />
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
