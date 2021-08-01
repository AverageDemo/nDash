import { createContext, ReactNode, useContext } from 'react';

let sharedData: AppContextInterface = {
  name: '',
  ow_api: '',
  pos: '',
};

export const AppContext = createContext<AppContextInterface>(sharedData);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: Props) {
  if (typeof window !== 'undefined') {
    sharedData.name = localStorage.getItem('name') ?? '';
    sharedData.ow_api = localStorage.getItem('apiKey') ?? '';
    sharedData.pos = localStorage.getItem('pos') ?? '';
  }

  return <AppContext.Provider value={sharedData}>{children}</AppContext.Provider>;
}

export interface AppContextInterface {
  name: string;
  ow_api: string;
  pos: string;
}

type Props = {
  children: ReactNode;
};
