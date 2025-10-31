import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { ChoiceCard } from '@/pages/Index';

interface CardsSectionProps {
  choiceCards: ChoiceCard[];
  setChoiceCards: (cards: ChoiceCard[]) => void;
}

const CardsSection = ({ choiceCards, setChoiceCards }: CardsSectionProps) => {
  const [editingCard, setEditingCard] = useState<ChoiceCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveCard = (card: ChoiceCard) => {
    if (editingCard) {
      setChoiceCards(choiceCards.map(c => c.id === card.id ? card : c));
    } else {
      setChoiceCards([...choiceCards, { ...card, id: Date.now().toString() }]);
    }
    setEditingCard(null);
    setIsDialogOpen(false);
  };

  const handleDeleteCard = (id: string) => {
    setChoiceCards(choiceCards.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Карточки выбора</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCard(null)}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить карточку
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCard ? 'Редактировать карточку' : 'Новая карточка'}</DialogTitle>
            </DialogHeader>
            <CardForm
              card={editingCard}
              onSave={handleSaveCard}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {choiceCards.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="ImageIcon" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Нет карточек выбора. Добавьте первую карточку!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {choiceCards.map(card => (
            <Card key={card.id} className="overflow-hidden hover-scale">
              <div className="aspect-[3/4] bg-secondary relative">
                {card.photo ? (
                  <img src={card.photo} alt={card.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="ImageIcon" size={64} className="text-muted-foreground" />
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setEditingCard(card);
                    setIsDialogOpen(true);
                  }}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
              </div>
              <div className="p-3 bg-card">
                <h3 className="font-semibold truncate">{card.name}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  {card.age && <span>{card.age}</span>}
                  {card.age && card.city && <span> • </span>}
                  {card.city && <span>{card.city}</span>}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-2 text-destructive"
                  onClick={() => handleDeleteCard(card.id)}
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

interface CardFormProps {
  card: ChoiceCard | null;
  onSave: (card: ChoiceCard) => void;
  onCancel: () => void;
}

const CardForm = ({ card, onSave, onCancel }: CardFormProps) => {
  const [name, setName] = useState(card?.name || '');
  const [age, setAge] = useState(card?.age || '');
  const [city, setCity] = useState(card?.city || '');
  const [photo, setPhoto] = useState(card?.photo || '');

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
      id: card?.id || '',
      name: name.trim(),
      age: age.trim() || undefined,
      city: city.trim() || undefined,
      photo: photo.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Название</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Возраст</label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Город</label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Москва"
          />
        </div>
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
            <div className="relative w-32 h-40 mx-auto">
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
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Сохранить</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Отмена</Button>
      </div>
    </form>
  );
};

export default CardsSection;