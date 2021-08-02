/* This example requires Tailwind CSS v2.0+ */
import { FormEvent, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function Settings() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    unit: localStorage.getItem('unit') ?? 2,
  });

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    localStorage.setItem('unit', String(values.unit));
    router.reload();
  };

  return (
    <>
      <div className="fixed bottom-0 w-full">
        <button onClick={() => setOpen(true)} className="float-right">
          <CogIcon className="h-6 w-6 m-2 text-gray-600" />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-center">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 pb-4">
                        Settings
                      </Dialog.Title>
                      <div className="mt-2">
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 text-left">
                          Unit
                        </label>
                        <select
                          id="unit"
                          name="unit"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue={values.unit}
                          onChange={handleInputChange}
                        >
                          <option value="0">Celsius</option>
                          <option value="1">Fahrenheit</option>
                          <option value="2">Kelvin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
