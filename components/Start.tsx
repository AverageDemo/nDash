import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState, useEffect } from 'react';

import BCard from './blocks/BCard';

export default function Start() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    apiKey: '',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos: string = `${position.coords.latitude},${position.coords.longitude}`;
      localStorage.setItem('pos', pos);
    });
  }, []);

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!values.name) {
      setError(true);
      return;
    }

    localStorage.setItem('name', values.name);
    localStorage.setItem('apiKey', values.apiKey);
    router.reload();
  };

  return (
    <div className="flex h-screen bg-i0">
      <div className="m-auto w-1/3">
        <BCard>
          <form onSubmit={handleSubmit}>
            <div className="inline-flex w-full text-gray-900">
              <div className="mr-4 w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Your name"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    This field is required
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
                  Open Weather{' '}
                  <Link href="https://home.openweathermap.org/api_keys">
                    <a>API Keys</a>
                  </Link>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Open Weather API Key"
                  />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </BCard>
      </div>
    </div>
  );
}
