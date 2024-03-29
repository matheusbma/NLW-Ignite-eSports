import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { Check, GameController } from "phosphor-react";

import { Input } from "./Form/Input";

interface Game {
  id: number;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [game, setGame] = useState("");
  const [gameId, setGameId] = useState("");
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(Response => {
        setGames(Response.data);
      });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    // Validação a fazer ainda.
    if (!data.name) {
      return
    }

    try {
       await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert("Anúncio criado com sucesso!")
    } catch (err) {
      console.log(err)
      alert("Erro ao criar o anúncio")
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            
            <Select.Root onValueChange={(game) => {
              setGame(game)
              let i = 0
              for (; i < games.length;) {
                if (games[i].title == game) {
                  setGameId(games[i].id.toString())
                }
              i++
              }
            }}>
              <Select.Trigger className={"inline-flex items-center justify-between rounded px-4 py-3 bg-zinc-900 text-sm " + (game === "" ? 'text-zinc-500' : 'text-white')}>
                <Select.Value aria-label={game} >
                  {game === "" ? "Selecione o game que deseja jogar" : game}
                </Select.Value>
                <Select.Icon>
                  <ChevronDownIcon className="h-5 w-5" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content position="popper" className="w-[400px] text-white bg-zinc-900 rounded-md">
                  <Select.Viewport>
                    <Select.Group>
                      {games.map((game) => {
                        return (
                          <Select.Item value={game.title} className="text-md px-6 py-2 hover:bg-violet-600 transition-colors cursor-pointer">
                            <Select.ItemText>{game.title}</Select.ItemText>
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input 
              name="name"
              id="name" 
              placeholder="Como te chama dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga já quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" type="text" placeholder="Usuário #0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-5 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item  
                  value="1"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Segunda"
                >
                    S
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="2"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Terça">
                  
                    T
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="3"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quarta"
                >
                    Q
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="4"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quinta"
                >
                    Q
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="5"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sexta"
                >  
                    S
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="6"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sábado"
                >
                    S
                </ToggleGroup.Item>
                <ToggleGroup.Item  
                  value="0"  
                  className={`w-9 h-9 rounded transition ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Domingo"
                >
                    D
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className="grid grid-cols-2 gap-2">
                <Input name="hourStart" id="hourStart" type="time" />
                <Input name="hourEnd" id="hourEnd" type="time" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root 
              checked={useVoiceChannel}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => {
                if (checked == true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors">
              Cancelar
            </Dialog.Close>
            <button
              className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 transition-colors"
              type="submit"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
