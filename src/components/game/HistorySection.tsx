import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { GameHistory } from '@/pages/Index';

interface HistorySectionProps {
  history: GameHistory[];
}

const HistorySection = ({ history }: HistorySectionProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="History" size={48} className="mx-auto mb-4 opacity-50" />
        <p>История пуста. Сыграйте первую игру!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">История игр</h2>
      <div className="space-y-4">
        {history.map(game => (
          <Card key={game.id} className="p-4 hover-scale">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="font-semibold">{game.player1.name}</span>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                  <span className="font-semibold">{game.player2.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(game.timestamp).toLocaleString('ru-RU')}
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <div className="text-center">
                  <div className="w-20 h-24 bg-secondary rounded-lg overflow-hidden mb-1">
                    {game.card1.photo ? (
                      <img src={game.card1.photo} alt={game.card1.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="ImageIcon" size={24} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-medium truncate w-20">{game.card1.name}</div>
                </div>

                <div className="font-bold text-muted-foreground">ИЛИ</div>

                <div className="text-center">
                  <div className="w-20 h-24 bg-secondary rounded-lg overflow-hidden mb-1">
                    {game.card2.photo ? (
                      <img src={game.card2.photo} alt={game.card2.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="ImageIcon" size={24} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-medium truncate w-20">{game.card2.name}</div>
                </div>

                <Icon name="ArrowRight" size={20} className="text-primary" />

                <div className="text-center">
                  <div className="w-20 h-24 bg-accent/20 rounded-lg overflow-hidden mb-1 border-2 border-accent">
                    {game.chosenCard.photo ? (
                      <img src={game.chosenCard.photo} alt={game.chosenCard.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="ImageIcon" size={24} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-semibold truncate w-20">{game.chosenCard.name}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
