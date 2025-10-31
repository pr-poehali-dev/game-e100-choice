import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { GameHistory } from '@/pages/Index';

interface StatsSectionProps {
  history: GameHistory[];
}

const StatsSection = ({ history }: StatsSectionProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Нет статистики. Сыграйте несколько игр!</p>
      </div>
    );
  }

  const cardStats = history.reduce((acc, game) => {
    const cardId = game.chosenCard.id;
    if (!acc[cardId]) {
      acc[cardId] = {
        card: game.chosenCard,
        count: 0,
      };
    }
    acc[cardId].count++;
    return acc;
  }, {} as Record<string, { card: any; count: number }>);

  const topCards = Object.values(cardStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const playerStats = history.reduce((acc, game) => {
    const p2Id = game.player2.id;
    if (!acc[p2Id]) {
      acc[p2Id] = {
        player: game.player2,
        count: 0,
      };
    }
    acc[p2Id].count++;
    return acc;
  }, {} as Record<string, { player: any; count: number }>);

  const activePlayer = Object.values(playerStats)
    .sort((a, b) => b.count - a.count)[0];

  const pairingStats = history.reduce((acc, game) => {
    const key = `${game.player1.id}-${game.player2.id}`;
    if (!acc[key]) {
      acc[key] = {
        player1: game.player1,
        player2: game.player2,
        count: 0,
      };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { player1: any; player2: any; count: number }>);

  const topPairings = Object.values(pairingStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Статистика</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Trophy" size={20} className="text-accent" />
            Популярные карточки
          </h3>
          <div className="space-y-3">
            {topCards.map((stat, index) => (
              <div key={stat.card.id} className="flex items-center gap-3">
                <div className="text-2xl font-bold text-muted-foreground w-8">
                  #{index + 1}
                </div>
                <div className="w-12 h-16 bg-secondary rounded overflow-hidden">
                  {stat.card.photo ? (
                    <img src={stat.card.photo} alt={stat.card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="ImageIcon" size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{stat.card.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.count} {stat.count === 1 ? 'выбор' : 'выборов'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Flame" size={20} className="text-accent" />
            Самый активный игрок
          </h3>
          {activePlayer && (
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-secondary rounded-full overflow-hidden">
                {activePlayer.player.photo ? (
                  <img src={activePlayer.player.photo} alt={activePlayer.player.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={40} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-xl font-bold">{activePlayer.player.name}</div>
                <div className="text-lg text-muted-foreground">
                  {activePlayer.count} {activePlayer.count === 1 ? 'игра' : 'игр'}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} className="text-accent" />
          Популярные пары
        </h3>
        <div className="space-y-3">
          {topPairings.map((pairing, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="text-xl font-bold text-muted-foreground w-8">
                #{index + 1}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="font-medium">{pairing.player1.name}</span>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                <span className="font-medium">{pairing.player2.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {pairing.count} {pairing.count === 1 ? 'раз' : 'раза'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatsSection;
