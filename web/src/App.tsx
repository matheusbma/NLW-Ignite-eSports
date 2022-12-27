import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';

import './styles/main.css';

import logoImage from './assets/logo-nlw-esports.svg';
import { Input } from './components/Form/Input';

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
    fetch('http://localhost:3333/games')
      .then(Response => Response.json())
      .then(data => {
        setGames(data);
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

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
              <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

              <form className='flex flex-col gap-4 mt-8'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  < Input id='game' placeholder='Selecione o game que deseja jogar' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input id='name' placeholder='Como te chama dentro do game?'/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga já quantos anos?</label>
                    <Input id='yearsPlaying' type="number" placeholder='tudo bem ser ZERO'/>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input id='discord' type="text" placeholder='Usuário #0000'/>
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>

                    <div className='grid grid-cols-4 gap-2'>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Domingo">D</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Segunda">S</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Terça">T</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Quarta">Q</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Quinta">Q</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Sexta">S</button>
                      <button className='w-8 h-8 rounded bg-zinc-900' title="Sábado">S</button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horário do dia?</label>

                    <div className='grid grid-cols-2 gap-2'>
                      <Input id='hourStart' type="time" placeholder='De' />
                      <Input id='hourEnd' type="time" placeholder='De' />
                    </div>
                  </div>
                </div>

                <div className='mt-2 flex gap-2 text-sm'>
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close 
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors'>
                    Cancelar
                  </Dialog.Close>
                  <button 
                  className='flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 transition-colors' 
                  type='submit'>
                    <GameController className='w-6 h-6'/>
                    Encontrar duo
                  </button>
                </footer>

              </form>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
