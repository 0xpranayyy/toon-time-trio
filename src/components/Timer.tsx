import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface TimerProps {
  onSessionComplete?: (type: 'study' | 'break', duration: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onSessionComplete }) => {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'pomodoro' | 'extended'>('pomodoro');
  const [initialTime, setInitialTime] = useState(25 * 60);

  const sessions = {
    pomodoro: { study: 25 * 60, break: 5 * 60 },
    extended: { study: 50 * 60, break: 10 * 60 }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      setIsRunning(false);
      onSessionComplete?.(mode, initialTime);
      
      // Auto switch between study and break
      const nextMode = mode === 'study' ? 'break' : 'study';
      const nextTime = sessions[sessionType][nextMode];
      setMode(nextMode);
      setTimeLeft(nextTime);
      setInitialTime(nextTime);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessionType, initialTime, onSessionComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    const time = sessions[sessionType][mode];
    setTimeLeft(time);
    setInitialTime(time);
  };

  const switchSession = (type: 'pomodoro' | 'extended') => {
    setSessionType(type);
    setIsRunning(false);
    const time = sessions[type].study;
    setTimeLeft(time);
    setInitialTime(time);
    setMode('study');
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-foreground">
          {mode === 'study' ? 'Focus Time' : 'Break Time'}
        </CardTitle>
        <div className="flex gap-2 justify-center mt-4">
          <Button 
            variant={sessionType === 'pomodoro' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchSession('pomodoro')}
          >
            25/5 min
          </Button>
          <Button 
            variant={sessionType === 'extended' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchSession('extended')}
          >
            50/10 min
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        <div className="relative">
          <div className="text-5xl font-mono font-bold text-foreground mb-4">
            {formatTime(timeLeft)}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button 
              onClick={handleStart}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button 
              onClick={handlePause}
              size="lg"
              variant="outline"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={handleReset}
            size="lg"
            variant="outline"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground capitalize">
          {mode} session
        </div>
      </CardContent>
    </Card>
  );
};

export default Timer;