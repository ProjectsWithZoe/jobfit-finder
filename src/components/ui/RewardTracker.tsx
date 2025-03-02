
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Coffee, Gift, Trophy } from 'lucide-react';

interface RewardTrackerProps {
  className?: string;
}

export function RewardTracker({ className }: RewardTrackerProps) {
  const [matchesCount, setMatchesCount] = useState(0);
  const [rewardLevel, setRewardLevel] = useState(0);
  
  // In a real app, this would be stored in a database and retrieved on load
  useEffect(() => {
    // Simulate loading saved data
    const savedCount = localStorage.getItem('matchesCount');
    if (savedCount) {
      setMatchesCount(parseInt(savedCount));
    }
  }, []);

  useEffect(() => {
    // Calculate reward level (every 5 matches)
    const newLevel = Math.floor(matchesCount / 5);
    if (newLevel !== rewardLevel) {
      setRewardLevel(newLevel);
      if (newLevel > 0) {
        showRewardNotification(newLevel);
      }
    }
    
    // Save to localStorage
    localStorage.setItem('matchesCount', matchesCount.toString());
  }, [matchesCount, rewardLevel]);

  // This would be triggered by actual CV analysis in the real app
  const handleSimulateMatch = () => {
    setMatchesCount(prev => prev + 1);
    toast.success("New CV analyzed with >50% match!");
  };

  const showRewardNotification = (level: number) => {
    if (level === 1) {
      toast("You've earned your first reward!", {
        description: "Analyze 5 more CVs to unlock the next level!",
        icon: <Trophy className="w-5 h-5 text-yellow-500" />
      });
    } else if (level === 5) {
      toast("Coffee Break Reward Unlocked!", {
        description: "You've analyzed 25 CVs - time to treat yourself to a coffee!",
        icon: <Coffee className="w-5 h-5 text-brown-500" />
      });
    } else {
      toast(`Reward Level ${level} Unlocked!`, {
        description: `You've analyzed ${level * 5} CVs with good matches!`,
        icon: <Gift className="w-5 h-5 text-purple-500" />
      });
    }
  };

  const getRewardText = () => {
    if (rewardLevel === 0) {
      return "Analyze 5 CVs with >50% match to earn your first reward!";
    } else if (rewardLevel === 5) {
      return "Coffee Break Reward Unlocked! Time to treat yourself!";
    } else {
      return `You've unlocked reward level ${rewardLevel}!`;
    }
  };

  const getProgressToNextReward = () => {
    const progress = matchesCount % 5;
    return progress;
  };

  return (
    <div className={`p-4 rounded-lg border border-purple-200 bg-purple-50/50 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-purple-800">Reward Tracker</h3>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">{rewardLevel}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-purple-700">
          <span>CVs Analyzed: {matchesCount}</span>
          <span>Next Reward: {5 - getProgressToNextReward()} more</span>
        </div>
        
        <div className="w-full bg-purple-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(getProgressToNextReward() / 5) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-purple-600">{getRewardText()}</p>
        
        {rewardLevel === 5 && (
          <div className="mt-2 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-brown-500 mr-2" />
            <span className="text-sm font-medium text-purple-800">Coffee Break Unlocked!</span>
          </div>
        )}
        
        {/* This button is for demo purposes only */}
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleSimulateMatch}
          className="w-full mt-2 border-purple-300 text-purple-700 hover:bg-purple-100"
        >
          Simulate CV Match (Demo)
        </Button>
      </div>
    </div>
  );
}
