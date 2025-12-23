import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', content: userInput };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        role: 'assistant',
        content: 'Это демо-ответ от GPT. Подключите свой API ключ для полноценной работы! 🚀',
      };
      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold glow-text">GPTunnel</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-colors">Функционал</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            <Button className="gradient-primary">Начать</Button>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <Badge className="mb-6 gradient-primary animate-fade-in">
            <Icon name="Zap" size={16} className="mr-1" />
            Powered by GPT-4
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text animate-fade-in">
            Мощь искусственного
            <br />
            интеллекта в ваших руках
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
            Создавайте контент, автоматизируйте процессы и общайтесь с продвинутым ИИ через удобный интерфейс
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button size="lg" className="gradient-primary text-lg px-8">
              <Icon name="Rocket" size={20} className="mr-2" />
              Попробовать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'Zap', title: '10x быстрее', desc: 'Генерация контента' },
              { icon: 'Shield', title: '100% безопасно', desc: 'Шифрование данных' },
              { icon: 'Users', title: '50k+ пользователей', desc: 'Доверяют нам' },
            ].map((stat, i) => (
              <Card key={i} className="gradient-card border-primary/20 animate-fade-in hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                    <Icon name={stat.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{stat.title}</CardTitle>
                  <CardDescription>{stat.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-primary">
              <Icon name="Sparkles" size={16} className="mr-1" />
              Возможности
            </Badge>
            <h2 className="text-5xl font-bold mb-4 glow-text">Функционал платформы</h2>
            <p className="text-xl text-muted-foreground">Всё необходимое для работы с ИИ в одном месте</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'MessageSquare', title: 'Умный чат', desc: 'Общайтесь с GPT-4 в реальном времени' },
              { icon: 'FileText', title: 'Генерация текста', desc: 'Создавайте статьи, посты, описания' },
              { icon: 'Code', title: 'Помощь в коде', desc: 'Пишите и отлаживайте код быстрее' },
              { icon: 'ImagePlus', title: 'Работа с изображениями', desc: 'Генерация и анализ картинок' },
              { icon: 'Languages', title: 'Переводы', desc: 'Точные переводы на 50+ языков' },
              { icon: 'BrainCircuit', title: 'Анализ данных', desc: 'Извлекайте инсайты из информации' },
            ].map((feature, i) => (
              <Card key={i} className="gradient-card border-primary/20 hover:border-primary/50 transition-all hover:scale-105 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
                    <Icon name={feature.icon as any} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-primary">
              <Icon name="Bot" size={16} className="mr-1" />
              Попробуйте прямо сейчас
            </Badge>
            <h2 className="text-5xl font-bold mb-4 glow-text">Демо GPT-чат</h2>
            <p className="text-xl text-muted-foreground">Испытайте возможности ИИ в действии</p>
          </div>

          <Card className="gradient-card border-primary/20 max-w-4xl mx-auto glow-border">
            <CardContent className="p-6">
              <div className="h-96 overflow-y-auto mb-4 space-y-4 bg-background/50 rounded-lg p-4">
                {chatMessages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Начните диалог с ИИ...</p>
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        msg.role === 'user'
                          ? 'gradient-primary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-muted rounded-2xl p-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Напишите ваш вопрос..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-background/50"
                />
                <Button onClick={handleSendMessage} className="gradient-primary">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-primary">
              <Icon name="DollarSign" size={16} className="mr-1" />
              Тарифы
            </Badge>
            <h2 className="text-5xl font-bold mb-4 glow-text">Выберите свой план</h2>
            <p className="text-xl text-muted-foreground">Гибкие тарифы для любых задач</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Старт',
                price: '990₽',
                period: 'месяц',
                features: ['100 запросов/день', 'GPT-3.5', 'Email поддержка', 'Базовая аналитика'],
                icon: 'Rocket',
                highlighted: false,
              },
              {
                name: 'Про',
                price: '2990₽',
                period: 'месяц',
                features: ['1000 запросов/день', 'GPT-4', 'Приоритетная поддержка', 'Расширенная аналитика', 'API доступ'],
                icon: 'Zap',
                highlighted: true,
              },
              {
                name: 'Бизнес',
                price: '9990₽',
                period: 'месяц',
                features: ['Безлимит запросов', 'GPT-4 Turbo', 'Персональный менеджер', 'Кастомная интеграция', 'SLA 99.9%'],
                icon: 'Crown',
                highlighted: false,
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`${
                  plan.highlighted
                    ? 'gradient-card border-primary glow-border scale-105'
                    : 'gradient-card border-primary/20'
                } hover:scale-105 transition-all relative`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary">
                      <Icon name="Star" size={14} className="mr-1" />
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon name={plan.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold glow-text">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.highlighted ? 'gradient-primary' : ''}`} variant={plan.highlighted ? 'default' : 'outline'}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-primary">
              <Icon name="Mail" size={16} className="mr-1" />
              Свяжитесь с нами
            </Badge>
            <h2 className="text-5xl font-bold mb-4 glow-text">Остались вопросы?</h2>
            <p className="text-xl text-muted-foreground">Мы поможем найти лучшее решение для вас</p>
          </div>

          <Card className="gradient-card border-primary/20 glow-border">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <Input type="email" placeholder="ivan@example.com" className="bg-background/50" />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Тема</label>
                  <Input placeholder="Вопрос по тарифам" className="bg-background/50" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Сообщение</label>
                  <Textarea placeholder="Расскажите, чем мы можем помочь..." className="bg-background/50 min-h-32" />
                </div>
                <Button className="w-full gradient-primary text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: 'Mail', title: 'Email', value: 'hello@gptunnel.ru' },
              { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
              { icon: 'MapPin', title: 'Офис', value: 'Москва, ул. Примерная, 1' },
            ].map((contact, i) => (
              <Card key={i} className="gradient-card border-primary/20 text-center hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                    <Icon name={contact.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg mb-1">{contact.title}</CardTitle>
                  <CardDescription>{contact.value}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold glow-text">GPTunnel</span>
          </div>
          <p className="text-muted-foreground mb-6">Искусственный интеллект для вашего бизнеса</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <a href="#" className="hover:text-primary transition-colors">Блог</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
            <a href="#" className="hover:text-primary transition-colors">Документация</a>
          </div>
          <div className="flex justify-center gap-4">
            {['Github', 'Twitter', 'Linkedin', 'Youtube'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Icon name={social as any} size={20} />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8">© 2024 GPTunnel. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
