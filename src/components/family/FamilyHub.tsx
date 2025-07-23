import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Users, Crown, Zap, Calendar } from 'lucide-react';

const FamilyHub: React.FC = () => {
  const { familyProgress, user } = useApp();

  const sampleFamilyData = {
    familyId: 'family-1',
    members: [
      { userId: '1', name: 'Priya', points: 240, achievements: [] },
      { userId: '2', name: 'Amit', points: 180, achievements: [] },
      { userId: '3', name: 'Zoya', points: 320, achievements: [] },
      { userId: '4', name: 'Grandma Devi', points: 150, achievements: [] }
    ],
    challenges: [
      { id: '1', name: '10,000 Steps Challenge', description: 'Family steps goal for this week', duration: 7, participants: ['1', '2', '3', '4'], culturalTheme: 'Walking Meditation' },
      { id: '2', name: 'Hydration Heroes', description: 'Everyone drinks 8 glasses daily', duration: 7, participants: ['1', '2', '3'], culturalTheme: 'Ayurvedic Wellness' },
      { id: '3', name: 'Yoga Together', description: 'Family yoga sessions', duration: 14, participants: ['1', '4'], culturalTheme: 'Traditional Hatha Yoga' }
    ],
    totalPoints: 890
  };

  const currentFamilyData = familyProgress || sampleFamilyData;
  const sortedMembers = [...currentFamilyData.members].sort((a, b) => b.points - a.points);

  const getPositionIcon = (index: number) => {
    if (index === 0) return '👑';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    if (index === 1) return 'bg-gray-100 border-gray-300 text-gray-800';
    if (index === 2) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  return (
    <div className="space-y-6">
      {/* Family Overview */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Family Wellness Hub</h2>
            <p className="text-sm text-gray-600">Strengthen bonds through shared wellness goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{currentFamilyData.members.length}</div>
            <div className="text-sm text-gray-600">Family Members</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{currentFamilyData.challenges.length}</div>
            <div className="text-sm text-gray-600">Active Challenges</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{currentFamilyData.totalPoints}</div>
            <div className="text-sm text-gray-600">Total Family Points</div>
          </div>
        </div>
      </div>

      {/* Family Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Crown className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Family Leaderboard</h2>
            <p className="text-sm text-gray-600">This week's wellness champions</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedMembers.map((member, index) => (
            <div
              key={member.userId}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${getRankColor(index)}`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold">
                  {getPositionIcon(index)}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm opacity-75">{member.points} points this week</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {index === 0 && <Crown className="h-5 w-5 text-yellow-600" />}
                <div className="text-right">
                  <div className="w-20 bg-white/50 rounded-full h-2">
                    <div
                      className="h-2 bg-current rounded-full opacity-60"
                      style={{ width: `${Math.min((member.points / sortedMembers[0].points) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Active Family Challenges</h2>
            <p className="text-sm text-gray-600">Wellness activities to do together</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentFamilyData.challenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900">{challenge.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {challenge.duration}d
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded">
                  {challenge.culturalTheme}
                </div>
                <div className="text-sm text-gray-500">
                  {challenge.participants.length} members
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {challenge.participants.slice(0, 4).map((participantId, index) => {
                    const participant = currentFamilyData.members.find(m => m.userId === participantId);
                    return (
                      <div
                        key={participantId}
                        className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                        title={participant?.name}
                      >
                        {participant?.name?.charAt(0)}
                      </div>
                    );
                  })}
                  {challenge.participants.length > 4 && (
                    <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">
                      +{challenge.participants.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyHub;