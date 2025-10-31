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
  const [players, setPlayers] = useState<Player[]>([]);
  const [choiceCards, setChoiceCards] = useState<ChoiceCard[]>([]);
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
