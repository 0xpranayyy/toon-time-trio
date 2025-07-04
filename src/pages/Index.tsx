import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timer from '../components/Timer';
import DailyGoals from '../components/DailyGoals';
import TodoList from '../components/TodoList';
import UserStats from '../components/UserStats';
import Journal from '../components/Journal';
import heroImage from "@/assets/hero-study.jpg";

const Index = () => {
  const [totalStudyTime, setTotalStudyTime] = useState(245); // minutes
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
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Study Focus
                <span className="block text-2xl md:text-3xl font-normal opacity-90">
                  Cartoon Edition ✨
                </span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Level up your studies with cute timers, goals, and achievements. 
                Make learning fun and rewarding!
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-primary-foreground/20 px-4 py-2 rounded-full">
                  🍅 Pomodoro Timer
                </div>
                <div className="bg-primary-foreground/20 px-4 py-2 rounded-full">
                  🎯 Daily Goals
                </div>
                <div className="bg-primary-foreground/20 px-4 py-2 rounded-full">
                  📚 Study Journal
                </div>
                <div className="bg-primary-foreground/20 px-4 py-2 rounded-full">
                  🏆 Level System
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={heroImage} 
                alt="Cute cartoon study scene" 
                className="max-w-full h-auto rounded-2xl shadow-soft animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main App Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="timer" className="text-sm">🍅 Timer</TabsTrigger>
            <TabsTrigger value="goals" className="text-sm">🎯 Goals</TabsTrigger>
            <TabsTrigger value="todos" className="text-sm">📝 Tasks</TabsTrigger>
            <TabsTrigger value="stats" className="text-sm">📊 Stats</TabsTrigger>
            <TabsTrigger value="journal" className="text-sm">📚 Journal</TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="timer" className="mt-0">
                <div className="flex justify-center">
                  <Timer onSessionComplete={handleSessionComplete} />
                </div>
              </TabsContent>

              <TabsContent value="goals" className="mt-0">
                <DailyGoals studyTime={dailyStudyTime} />
              </TabsContent>

              <TabsContent value="todos" className="mt-0">
                <TodoList />
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <UserStats 
                      totalStudyTime={totalStudyTime}
                      sessionsCompleted={sessionsCompleted}
                      weeklyGoal={70}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="journal" className="mt-0">
                <Journal />
              </TabsContent>
            </div>

            {/* Sidebar with Stats */}
            <div className="space-y-6">
              <UserStats 
                totalStudyTime={totalStudyTime}
                sessionsCompleted={sessionsCompleted}
                weeklyGoal={70}
              />
              
              {/* Quick Timer Section */}
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-soft border border-border/20">
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Quick Start</h3>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Ready to focus? Start a study session and watch your level grow!
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                      <div className="font-medium text-success">Today's Progress</div>
                      <div className="text-lg font-bold text-card-foreground">
                        {Math.floor(dailyStudyTime / 60)}h {dailyStudyTime % 60}m
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                      <div className="font-medium text-primary">Sessions</div>
                      <div className="text-lg font-bold text-card-foreground">
                        {sessionsCompleted}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coming Soon Features */}
              <div className="bg-gradient-accent p-6 rounded-xl shadow-soft">
                <h3 className="text-lg font-semibold mb-4 text-accent-foreground">Coming Soon! 🚀</h3>
                <div className="space-y-2 text-sm text-accent-foreground/80">
                  <div className="flex items-center gap-2">
                    <span>🎵</span>
                    <span>White noise & background sounds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Live study rooms with friends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏅</span>
                    <span>More achievements & rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>Mobile app companion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
