import BTask from '@/blocks/BTask';
import BWelcome from '@/blocks/BWelcome';
import Layout from '@/components/Layout';
import Weather from '@/components/Weather';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const appContext = useAppContext();

  return (
    <Layout name={appContext.name}>
      <BWelcome user={appContext.name} />
      <Weather appContext={appContext} />
      <BTask />
    </Layout>
  );
}
