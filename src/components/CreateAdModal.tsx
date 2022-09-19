import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from './Form/input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { Check, GameController } from 'phosphor-react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal  () {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<String[]>([]);
  const [game, setGame] = useState<String>('');
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      const { data }: { data: Game[] } = await axios('http://localhost:3333/games');

      setGames(data);
    }

    getGames();
  }, [])

  async function handleCreateAd (event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name || !game) return;
    
    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hoursStart: data.hourStart,
        hoursEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert('Anúncio criado com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao criar o anúncio!');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game">Qual o game?</label>
            <Select.Root
              onValueChange={setGame}
            >
              <Select.Trigger
                className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 flex flex-row justify-between items-center"
              >
                <Select.Value
                  placeholder="Selecione o game que deseja jogar"
                />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="overflow-hidden bg-zinc-900 rounded-md shadow-2xl">
                  <Select.ScrollUpButton>
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>

                  <Select.Viewport className="p-2">
                    <Select.Group>

                      {
                        games.map((game) => (
                          <Select.Item
                            key={ game.id }
                            value={ game.id }
                            className="unset text-xs rounded flex items-center h-6 pr-9 pl-6 relative select-none text-violet-400 hover:bg-violet-500 hover:text-white"
                          >
                            <Select.ItemText>{ game.title }</Select.ItemText>
                            <Select.ItemIndicator
                              className="absolute left-0 w-6 inline-flex items-center justify-center"
                            >
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))
                      }

                    </Select.Group>

                    <Select.ScrollDownButton>
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input autoComplete="off" name="name" id="name" placeholder="Como te chamam dentro do game?" type="text" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input name="yearsPlaying" id='yearsPlaying' placeholder="Tudo bem ser ZERO" type="text" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id='discord' placeholder="Usuario#0000" type="text" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'} `}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input name="hourStart" id="hourStart" placeholder="De" type="time" />
                <Input name="hourEnd" id="hourEnd" placeholder="Até" type="time" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) setUseVoiceChannel(true);
                else setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
