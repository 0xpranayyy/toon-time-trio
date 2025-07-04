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
    <Card className="w-full bg-gradient-secondary shadow-soft border-0">
      <CardHeader className="text-center pb-4">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <img 
            src={avatarImage} 
            alt="User Avatar" 
            className="w-full h-full rounded-full border-4 border-secondary-foreground/20 animate-float"
          />
          <Badge 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
          >
            Level {currentLevel}
          </Badge>
        </div>
        <CardTitle className="text-xl text-secondary-foreground">Study Master</CardTitle>
        <p className="text-sm text-secondary-foreground/70">Keep up the great work! 🌟</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-secondary-foreground">Level Progress</span>
            <span className="text-sm text-secondary-foreground/70">
              {totalStudyTime % 120} / 120 min
            </span>
          </div>
          <Progress value={levelProgress} className="h-3" />
          <p className="text-xs text-secondary-foreground/60 text-center">
            {120 - (totalStudyTime % 120)} minutes until level {currentLevel + 1}
          </p>
        </div>

        {/* Weekly Goal */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-secondary-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Weekly Goal
            </span>
            <span className="text-sm text-secondary-foreground/70">
              {weeklyHours.toFixed(1)} / {weeklyGoal}h
            </span>
          </div>
          <Progress value={Math.min(weeklyProgress, 100)} className="h-3" />
          <p className="text-xs text-secondary-foreground/60 text-center">
            {weeklyProgress >= 100 
              ? "🎉 Weekly goal achieved!" 
              : `${(weeklyGoal - weeklyHours).toFixed(1)} hours to go`
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Time</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
            </p>
          </div>
          
          <div className="bg-background/50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Book className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{sessionsCompleted}</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-secondary-foreground">Achievements</h3>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-success/10 border-success/30 shadow-success animate-bounce-in'
                    : 'bg-muted/20 border-muted/40 opacity-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className={`text-xs font-medium ${
                    achievement.unlocked ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;