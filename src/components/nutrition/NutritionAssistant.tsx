import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChatMessage } from '../../types';
import { MessageCircle, Send, Leaf, Utensils } from 'lucide-react';

const NutritionAssistant: React.FC = () => {
  const { chatMessages, addChatMessage, user } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const nutritionMessages = chatMessages.filter(msg => msg.type === 'nutrition');

  const sampleResponses = [
    {
      query: 'meal plan',
      response: `Based on your ${user?.culturalBackground || 'cultural'} preferences and ${user?.ayurvedicType || 'Kapha'} constitution, I recommend starting your day with warm water with lemon and ginger. For breakfast, try quinoa upma with vegetables - it's light yet nourishing for your dosha type.`
    },
    {
      query: 'healthy snacks',
      response: `For a ${user?.ayurvedicType || 'Kapha'} type, try roasted chickpeas with turmeric and cumin, or fresh fruits like pomegranate and apple. These will boost your energy without aggravating your dosha.`
    },
    {
      query: 'hydration',
      response: `Sip warm water throughout the day rather than cold water, which can dampen your digestive fire (Agni). Add a pinch of rock salt and lime for better absorption - this follows traditional Ayurvedic principles.`
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      type: 'nutrition'
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const matchedResponse = sampleResponses.find(response => 
        inputMessage.toLowerCase().includes(response.query)
      );

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: matchedResponse?.response || `I understand you're asking about "${inputMessage}". Based on your ${user?.culturalBackground || 'background'} and ${user?.ayurvedicType || 'Kapha'} constitution, I'd recommend focusing on warm, cooked foods that aid digestion. Would you like specific meal suggestions?`,
        role: 'assistant',
        timestamp: new Date(),
        type: 'nutrition'
      };

      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    'What should I eat for breakfast?',
    'Suggest healthy snacks',
    'How much water should I drink?',
    'Best foods for my dosha type?'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Leaf className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ayurvedic Nutrition Assistant</h2>
          <p className="text-sm text-gray-600">Personalized dietary guidance based on your constitution and culture</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
        {nutritionMessages.length === 0 ? (
          <div className="text-center py-8">
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Start a conversation about your nutrition goals</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-left p-2 bg-white rounded-lg border border-gray-200 hover:border-green-300 text-sm text-gray-700 hover:text-green-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {nutritionMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
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
          placeholder="Ask about nutrition, meal plans, or dietary advice..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NutritionAssistant;