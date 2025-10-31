import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { Player } from '@/pages/Index';

interface PlayersSectionProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const PlayersSection = ({ players, setPlayers }: PlayersSectionProps) => {
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSavePlayer = (player: Player) => {
    if (editingPlayer) {
      setPlayers(players.map(p => p.id === player.id ? player : p));
    } else {
      setPlayers([...players, { ...player, id: Date.now().toString() }]);
    }
    setEditingPlayer(null);
    setIsDialogOpen(false);
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Игроки</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPlayer(null)}>
              <Icon name="UserPlus" size={18} className="mr-2" />
              Добавить игрока
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPlayer ? 'Редактировать игрока' : 'Новый игрок'}</DialogTitle>
            </DialogHeader>
            <PlayerForm
              player={editingPlayer}
              onSave={handleSavePlayer}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {players.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Нет игроков. Добавьте первого игрока!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map(player => (
            <Card key={player.id} className="overflow-hidden hover-scale">
              <div className="aspect-square bg-secondary relative">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={64} className="text-muted-foreground" />
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setEditingPlayer(player);
                    setIsDialogOpen(true);
                  }}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold truncate">{player.name}</h3>
                {player.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {player.description}
                  </p>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-2 text-destructive"
                  onClick={() => handleDeletePlayer(player.id)}
                >
                  <Icon name="Trash2" size={14} className="mr-1" />
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

interface PlayerFormProps {
  player: Player | null;
  onSave: (player: Player) => void;
  onCancel: () => void;
}

const PlayerForm = ({ player, onSave, onCancel }: PlayerFormProps) => {
  const [name, setName] = useState(player?.name || '');
  const [photo, setPhoto] = useState(player?.photo || '');
  const [description, setDescription] = useState(player?.description || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: player?.id || '',
      name: name.trim(),
      photo: photo.trim() || undefined,
      description: description.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Имя</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Фото</label>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />
          {photo && (
            <div className="relative w-32 h-32 mx-auto">
              <img src={photo} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2"
                onClick={() => setPhoto('')}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Описание</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание игрока"
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Сохранить</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Отмена</Button>
      </div>
    </form>
  );
};

export default PlayersSection;