import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Book } from "lucide-react";
import avatarImage from "@/assets/avatar-1.jpg";

interface UserStatsProps {
  totalStudyTime?: number; // in minutes
  sessionsCompleted?: number;
  weeklyGoal?: number; // in hours
}

const UserStats: React.FC<UserStatsProps> = ({ 
  totalStudyTime = 245, 
  sessionsCompleted = 8,
  weeklyGoal = 70 
}) => {
  const currentLevel = Math.floor(totalStudyTime / 120) + 1; // Level up every 2 hours (120 min)
  const nextLevelMinutes = currentLevel * 120;
  const levelProgress = ((totalStudyTime % 120) / 120) * 100;
  
  const weeklyMinutes = totalStudyTime; // Assuming this is weekly total
  const weeklyHours = weeklyMinutes / 60;
  const weeklyProgress = (weeklyHours / weeklyGoal) * 100;
  
  const achievements = [
    { id: 1, name: "First Timer", icon: "🎯", unlocked: sessionsCompleted >= 1 },
    { id: 2, name: "Focus Master", icon: "⚡", unlocked: sessionsCompleted >= 5 },
    { id: 3, name: "Study Streak", icon: "🔥", unlocked: totalStudyTime >= 300 },
    { id: 4, name: "Level 5", icon: "⭐", unlocked: currentLevel >= 5 },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <img 
            src={avatarImage} 
            alt="User Avatar" 
            className="w-full h-full rounded-full border-2 border-border"
          />
          <Badge 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs"
          >
            Lv. {currentLevel}
          </Badge>
        </div>
        <CardTitle className="text-lg text-foreground">Study Progress</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level Progress</span>
            <span className="text-sm text-muted-foreground">
              {totalStudyTime % 120} / 120 min
            </span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {120 - (totalStudyTime % 120)} min to level {currentLevel + 1}
          </p>
        </div>

        {/* Weekly Goal */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Weekly Goal
            </span>
            <span className="text-sm text-muted-foreground">
              {weeklyHours.toFixed(1)} / {weeklyGoal}h
            </span>
          </div>
          <Progress value={Math.min(weeklyProgress, 100)} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {weeklyProgress >= 100 
              ? "Goal achieved!" 
              : `${(weeklyGoal - weeklyHours).toFixed(1)}h remaining`
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
            </p>
          </div>
          
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Book className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Sessions</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{sessionsCompleted}</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Achievements</h3>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-2 rounded-lg border text-center ${
                  achievement.unlocked
                    ? 'bg-success/10 border-success text-success'
                    : 'bg-muted border-muted-foreground/20 opacity-50'
                }`}
              >
                <div className="text-lg mb-1">{achievement.icon}</div>
                <p className="text-xs font-medium">
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;