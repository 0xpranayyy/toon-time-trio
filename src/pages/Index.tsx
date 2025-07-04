import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Timer as TimerIcon, Target, CheckSquare, BarChart3, BookOpen } from "lucide-react";
import Timer from '../components/Timer';
import DailyGoals from '../components/DailyGoals';
import TodoList from '../components/TodoList';
import UserStats from '../components/UserStats';
import Journal from '../components/Journal';
import SettingsPanel from '../components/SettingsPanel';

const Index = () => {
  const [totalStudyTime, setTotalStudyTime] = useState(245);
  const [sessionsCompleted, setSessionsCompleted] = useState(8);
  const [dailyStudyTime, setDailyStudyTime] = useState(120);

  const handleSessionComplete = (type: 'study' | 'break', duration: number) => {
    if (type === 'study') {
      setTotalStudyTime(prev => prev + Math.floor(duration / 60));
      setDailyStudyTime(prev => prev + Math.floor(duration / 60));
      setSessionsCompleted(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-lg font-semibold text-foreground">Study Focus</h1>
          <div className="text-sm text-muted-foreground">
            Level {Math.floor(totalStudyTime / 120) + 1}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto pb-20">
        <Tabs defaultValue="timer" className="w-full">
          <div className="p-4">
            <TabsContent value="timer" className="mt-0">
              <Timer onSessionComplete={handleSessionComplete} />
            </TabsContent>

            <TabsContent value="goals" className="mt-0">
              <DailyGoals studyTime={dailyStudyTime} />
            </TabsContent>

            <TabsContent value="todos" className="mt-0">
              <TodoList />
            </TabsContent>

            <TabsContent value="stats" className="mt-0">
              <UserStats 
                totalStudyTime={totalStudyTime}
                sessionsCompleted={sessionsCompleted}
                weeklyGoal={70}
              />
            </TabsContent>

            <TabsContent value="journal" className="mt-0">
              <Journal />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsPanel />
            </TabsContent>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
            <TabsList className="w-full h-16 bg-transparent p-0 grid grid-cols-6">
              <TabsTrigger 
                value="timer" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <TimerIcon className="w-5 h-5" />
                <span className="text-xs">Timer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Target className="w-5 h-5" />
                <span className="text-xs">Goals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="todos" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <CheckSquare className="w-5 h-5" />
                <span className="text-xs">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs">Stats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="journal" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-xs">Journal</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex flex-col gap-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
