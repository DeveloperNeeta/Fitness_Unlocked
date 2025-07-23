import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChatMessage } from '../../types';
import { Brain, MessageSquare, Send, Heart, Zap } from 'lucide-react';

const WellnessCoach: React.FC = () => {
  const { user, chatMessages, addChatMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const wellnessMessages = chatMessages.filter(msg => msg.type === 'wellness');

  const wellnessTopics = [
    { icon: Brain, title: 'Stress Management', color: 'purple', query: 'help with stress' },
    { icon: Heart, title: 'Mindfulness', color: 'pink', query: 'mindfulness techniques' },
    { icon: Zap, title: 'Energy & Focus', color: 'yellow', query: 'boost energy naturally' },
    { icon: MessageSquare, title: 'Habit Building', color: 'blue', query: 'build healthy habits' }
  ];

  const sampleWellnessResponses = [
    {
      query: 'stress',
      response: `Stress management is crucial for overall wellness. Try the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system. Also, consider incorporating 10 minutes of meditation into your daily routine - even a short walking meditation can be powerful.`
    },
    {
      query: 'mindfulness',
      response: `Mindfulness can be practiced anywhere. Start with mindful breathing: Notice your breath without changing it. When your mind wanders, gently return to your breath. You can also practice mindful eating - truly taste and appreciate each bite of your food. This connects you to the present moment.`
    },
    {
      query: 'energy',
      response: `Natural energy boosters include: staying hydrated, taking short breaks every hour, getting sunlight (especially morning light), and eating balanced meals with protein and complex carbs. A 5-minute stretch or brief walk can also rejuvenate your energy levels.`
    },
    {
      query: 'habit',
      response: `Building habits successfully requires starting small and being consistent. Pick one tiny habit (like drinking a glass of water upon waking), do it at the same time daily, and celebrate small wins. Stack new habits onto existing ones - this is called habit stacking and it's very effective.`
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      type: 'wellness'
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const matchedResponse = sampleWellnessResponses.find(response => 
        inputMessage.toLowerCase().includes(response.query)
      );

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: matchedResponse?.response || `I understand you're interested in "${inputMessage}". Wellness is a journey that's unique to each person. Consider starting with small, sustainable changes and building from there. Would you like specific techniques or practices I can recommend?`,
        role: 'assistant',
        timestamp: new Date(),
        type: 'wellness'
      };

      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1800);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      pink: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
      yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Brain className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Wellness Coach</h2>
          <p className="text-sm text-gray-600">Mindfulness, stress relief, and habit building guidance</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
        {wellnessMessages.length === 0 ? (
          <div className="text-center py-6">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">How can I support your wellness journey today?</p>
            <div className="grid grid-cols-2 gap-3">
              {wellnessTopics.map((topic, index) => {
                const IconComponent = topic.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setInputMessage(topic.query)}
                    className={`p-3 rounded-lg border transition-all ${getColorClasses(topic.color)}`}
                  >
                    <IconComponent className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{topic.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {wellnessMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about stress, mindfulness, habits, or wellness goals..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default WellnessCoach;