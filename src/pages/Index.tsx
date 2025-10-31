import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PlayersSection from '@/components/game/PlayersSection';
import CardsSection from '@/components/game/CardsSection';
import HistorySection from '@/components/game/HistorySection';
import StatsSection from '@/components/game/StatsSection';
import NewGameFlow from '@/components/game/NewGameFlow';

export interface Player {
  id: string;
  name: string;
  photo?: string;
  description?: string;
}

export interface ChoiceCard {
  id: string;
  name: string;
  age?: string;
  city?: string;
  photo?: string;
}

export interface GameHistory {
  id: string;
  player1: Player;
  player2: Player;
  card1: ChoiceCard;
  card2: ChoiceCard;
  chosenCard: ChoiceCard;
  timestamp: Date;
}

type Section = 'players' | 'cards' | 'history' | 'stats' | 'newgame';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('players');
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Анна',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/22f8b926-9c4f-4745-ac0a-775d4cef4059.jpg',
      description: 'Люблю путешествия и фотографию'
    },
    {
      id: '2',
      name: 'Максим',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/10857d1e-f850-411c-bad3-54994bc44b8b.jpg',
      description: 'Увлекаюсь спортом и музыкой'
    },
    {
      id: '3',
      name: 'Елена',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/d3a0b849-3fea-4bb0-a856-4875c35796b9.jpg',
      description: 'Художник и дизайнер'
    },
    {
      id: '4',
      name: 'Дмитрий',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/87ddff3c-9191-4459-8302-a10bae07056c.jpg',
      description: 'Активный и позитивный'
    },
    {
      id: '5',
      name: 'Мария',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/805375da-f913-49f1-89c3-1adf59683383.jpg',
      description: 'Обожаю танцы и веселье'
    }
  ]);
  const [choiceCards, setChoiceCards] = useState<ChoiceCard[]>([
    {
      id: '1',
      name: 'Ferrari',
      age: '2024',
      city: 'Италия',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/f4dc651a-ec6d-4b4c-a804-ff82e3ec4910.jpg'
    },
    {
      id: '2',
      name: 'Тропический рай',
      city: 'Мальдивы',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/3709831b-e9cb-4fc7-9b1e-34ac422f4716.jpg'
    },
    {
      id: '3',
      name: 'Пентхаус',
      city: 'Нью-Йорк',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/64567219-313e-4bd2-860b-4dcde6f4c584.jpg'
    },
    {
      id: '4',
      name: 'Ужин в ресторане',
      city: 'Париж',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/3f3318b9-5eba-4f51-a5cb-24d602d80913.jpg'
    },
    {
      id: '5',
      name: 'Горное приключение',
      city: 'Альпы',
      photo: 'https://cdn.poehali.dev/projects/bb9c79e0-8c50-4c82-9d77-7a5ed81aea28/files/6379a980-a5da-4357-8691-c9c8c0e41bca.jpg'
    }
  ]);
  const [history, setHistory] = useState<GameHistory[]>([]);

  const addGameToHistory = (game: GameHistory) => {
    setHistory([game, ...history]);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Е100%</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Два варианта — один выбор!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <Button
            variant={activeSection === 'players' ? 'default' : 'outline'}
            onClick={() => setActiveSection('players')}
            className="w-full"
          >
            <Icon name="Users" size={18} className="mr-2" />
            Игроки
          </Button>
          <Button
            variant={activeSection === 'cards' ? 'default' : 'outline'}
            onClick={() => setActiveSection('cards')}
            className="w-full"
          >
            <Icon name="ImageIcon" size={18} className="mr-2" />
            Карточки
          </Button>
          <Button
            variant={activeSection === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveSection('history')}
            className="w-full"
          >
            <Icon name="History" size={18} className="mr-2" />
            История
          </Button>
          <Button
            variant={activeSection === 'stats' ? 'default' : 'outline'}
            onClick={() => setActiveSection('stats')}
            className="w-full"
          >
            <Icon name="BarChart3" size={18} className="mr-2" />
            Статистика
          </Button>
        </div>

        <Button
          onClick={() => setActiveSection('newgame')}
          className="w-full mb-6 h-14 text-lg font-semibold"
          style={{ backgroundColor: '#FFD700', color: '#000' }}
        >
          <Icon name="Play" size={24} className="mr-2" />
          Новая игра
        </Button>

        <Card className="p-6 animate-scale-in">
          {activeSection === 'players' && (
            <PlayersSection players={players} setPlayers={setPlayers} />
          )}
          {activeSection === 'cards' && (
            <CardsSection choiceCards={choiceCards} setChoiceCards={setChoiceCards} />
          )}
          {activeSection === 'history' && (
            <HistorySection history={history} />
          )}
          {activeSection === 'stats' && (
            <StatsSection history={history} />
          )}
          {activeSection === 'newgame' && (
            <NewGameFlow
              players={players}
              choiceCards={choiceCards}
              onGameComplete={addGameToHistory}
              onClose={() => setActiveSection('history')}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;