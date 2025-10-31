import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Player, ChoiceCard, GameHistory } from '@/pages/Index';

interface NewGameFlowProps {
  players: Player[];
  choiceCards: ChoiceCard[];
  onGameComplete: (game: GameHistory) => void;
  onClose: () => void;
}

type Step = 'select-player1' | 'select-player2' | 'select-cards' | 'player2-choice';

const NewGameFlow = ({ players, choiceCards, onGameComplete, onClose }: NewGameFlowProps) => {
  const [step, setStep] = useState<Step>('select-player1');
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [card1, setCard1] = useState<ChoiceCard | null>(null);
  const [card2, setCard2] = useState<ChoiceCard | null>(null);

  if (players.length < 2) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-semibold mb-2">Недостаточно игроков</p>
        <p className="text-muted-foreground mb-4">Для игры нужно минимум 2 игрока</p>
        <Button onClick={onClose}>Вернуться</Button>
      </div>
    );
  }

  if (choiceCards.length < 2) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-semibold mb-2">Недостаточно карточек</p>
        <p className="text-muted-foreground mb-4">Для игры нужно минимум 2 карточки выбора</p>
        <Button onClick={onClose}>Вернуться</Button>
      </div>
    );
  }

  const handlePlayer1Select = (p: Player) => {
    setPlayer1(p);
    setStep('select-player2');
  };

  const handlePlayer2Select = (p: Player) => {
    setPlayer2(p);
    setStep('select-cards');
  };

  const handleCardSelect = (card: ChoiceCard, slot: 1 | 2) => {
    if (slot === 1) {
      setCard1(card);
    } else {
      setCard2(card);
    }
  };

  const handleContinueToChoice = () => {
    if (card1 && card2) {
      setStep('player2-choice');
    }
  };

  const handleFinalChoice = (chosenCard: ChoiceCard) => {
    if (!player1 || !player2 || !card1 || !card2) return;
    
    const game: GameHistory = {
      id: Date.now().toString(),
      player1,
      player2,
      card1,
      card2,
      chosenCard,
      timestamp: new Date(),
    };
    
    onGameComplete(game);
    onClose();
  };

  if (step === 'select-player1') {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Кто задаёт выбор?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map(player => (
            <Card
              key={player.id}
              className="overflow-hidden cursor-pointer hover-scale transition-transform"
              onClick={() => handlePlayer1Select(player)}
            >
              <div className="aspect-square bg-secondary">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold">{player.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'select-player2') {
    return (
      <div>
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Игрок 1</p>
          <h3 className="text-xl font-bold">{player1?.name}</h3>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Кому задаёт выбор?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.filter(p => p.id !== player1?.id).map(player => (
            <Card
              key={player.id}
              className="overflow-hidden cursor-pointer hover-scale transition-transform"
              onClick={() => handlePlayer2Select(player)}
            >
              <div className="aspect-square bg-secondary">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold">{player.name}</h3>
              </div>
            </Card>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6" onClick={() => setStep('select-player1')}>
          Назад
        </Button>
      </div>
    );
  }

  if (step === 'select-cards') {
    return (
      <div>
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            {player1?.name} → {player2?.name}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Выберите две карточки</h2>
        
        <div className="flex gap-4 mb-6 items-start justify-center">
          <div className="flex-1 max-w-[200px]">
            {card1 ? (
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-secondary relative">
                  {card1.photo ? (
                    <img src={card1.photo} alt={card1.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="ImageIcon" size={48} className="text-muted-foreground" />
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => setCard1(null)}
                  >
                    Изменить
                  </Button>
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold">{card1.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {card1.age && card1.city ? `${card1.age} • ${card1.city}` : card1.age || card1.city}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-4 aspect-[3/4] flex items-center justify-center">
                <p className="text-muted-foreground text-center text-sm">Выберите карточку</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center pt-20">
            <h3 className="text-2xl font-bold text-muted-foreground">ИЛИ</h3>
          </div>

          <div className="flex-1 max-w-[200px]">
            {card2 ? (
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-secondary relative">
                  {card2.photo ? (
                    <img src={card2.photo} alt={card2.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="ImageIcon" size={48} className="text-muted-foreground" />
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => setCard2(null)}
                  >
                    Изменить
                  </Button>
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold">{card2.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {card2.age && card2.city ? `${card2.age} • ${card2.city}` : card2.age || card2.city}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-4 aspect-[3/4] flex items-center justify-center">
                <p className="text-muted-foreground text-center text-sm">Выберите карточку</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Доступные карточки</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {choiceCards.map(card => (
              <Card
                key={card.id}
                className={`overflow-hidden cursor-pointer hover-scale ${
                  card.id === card1?.id || card.id === card2?.id ? 'opacity-50' : ''
                }`}
                onClick={() => {
                  if (!card1) {
                    handleCardSelect(card, 1);
                  } else if (!card2 && card.id !== card1.id) {
                    handleCardSelect(card, 2);
                  }
                }}
              >
                <div className="aspect-[3/4] bg-secondary">
                  {card.photo ? (
                    <img src={card.photo} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="ImageIcon" size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{card.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep('select-player2')}>
            Назад
          </Button>
          <Button
            className="flex-1"
            onClick={handleContinueToChoice}
            disabled={!card1 || !card2}
          >
            Продолжить
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'player2-choice') {
    return (
      <div>
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Сейчас выбирает</p>
          <h3 className="text-2xl font-bold">{player2?.name}</h3>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center">Сделайте выбор!</h2>
        
        <div className="flex gap-4 items-center justify-center max-w-full overflow-x-auto px-4">
          <Card
            className="overflow-hidden cursor-pointer hover-scale transition-transform flex-shrink-0 w-[45%] max-w-[200px]"
            onClick={() => card1 && handleFinalChoice(card1)}
          >
            <div className="aspect-[3/4] bg-secondary">
              {card1?.photo ? (
                <img src={card1.photo} alt={card1.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="ImageIcon" size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="p-3 text-center">
              <h4 className="text-lg font-bold truncate">{card1?.name}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {card1?.age && card1?.city ? `${card1.age} • ${card1.city}` : card1?.age || card1?.city}
              </p>
            </div>
          </Card>

          <div className="text-2xl font-bold text-muted-foreground flex-shrink-0">ИЛИ</div>

          <Card
            className="overflow-hidden cursor-pointer hover-scale transition-transform flex-shrink-0 w-[45%] max-w-[200px]"
            onClick={() => card2 && handleFinalChoice(card2)}
          >
            <div className="aspect-[3/4] bg-secondary">
              {card2?.photo ? (
                <img src={card2.photo} alt={card2.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="ImageIcon" size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="p-3 text-center">
              <h4 className="text-lg font-bold truncate">{card2?.name}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {card2?.age && card2?.city ? `${card2.age} • ${card2.city}` : card2?.age || card2?.city}
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" onClick={() => setStep('select-cards')}>
            Назад
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default NewGameFlow;