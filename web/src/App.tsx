import { useState, useEffect } from 'react';
import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';

import logoImage from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: number;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(Response => {
        setGames(Response.data);
      })
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImage} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlwGradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              gameName={game.title} 
              adsCount={game._count.ads} 
            />
          )
        })}
      </div>

      <Dialog.Root>
        < CreateAdBanner />
        < CreateAdModal />
        
      </Dialog.Root>
    </div>
  )
}

export default App
