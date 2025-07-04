import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Clock } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  targetMinutes: number;
  completedMinutes: number;
  completed: boolean;
}

interface DailyGoalsProps {
  studyTime?: number; // Minutes studied today
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ studyTime = 0 }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Study Math',
      targetMinutes: 120,
      completedMinutes: studyTime,
      completed: false
    },
    {
      id: '2', 
      title: 'Read Chapter 5',
      targetMinutes: 60,
      completedMinutes: 0,
      completed: false
    }
  ]);
  
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalMinutes, setNewGoalMinutes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addGoal = () => {
    if (newGoalTitle && newGoalMinutes) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        targetMinutes: parseInt(newGoalMinutes),
        completedMinutes: 0,
        completed: false
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalMinutes('');
      setShowAddForm(false);
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, completedMinutes: goal.completed ? 0 : goal.targetMinutes }
        : goal
    ));
  };

  const totalTargetMinutes = goals.reduce((sum, goal) => sum + goal.targetMinutes, 0);
  const totalCompletedMinutes = goals.reduce((sum, goal) => sum + goal.completedMinutes, 0);
  const overallProgress = totalTargetMinutes > 0 ? (totalCompletedMinutes / totalTargetMinutes) * 100 : 0;

  return (
    <Card className="w-full bg-card shadow-soft border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Calendar className="w-5 h-5 text-primary" />
          Daily Goals
        </CardTitle>
        <div className="bg-gradient-secondary p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-foreground">Overall Progress</span>
            <span className="text-sm text-secondary-foreground">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="flex items-center gap-1 mt-2 text-xs text-secondary-foreground/70">
            <Clock className="w-3 h-3" />
            {totalCompletedMinutes} / {totalTargetMinutes} minutes
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {goals.map((goal) => {
          const progress = goal.targetMinutes > 0 ? (goal.completedMinutes / goal.targetMinutes) * 100 : 0;
          
          return (
            <div 
              key={goal.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-soft ${
                goal.completed 
                  ? 'bg-success/10 border-success/30 shadow-success' 
                  : 'bg-muted/30 border-border/20 hover:border-primary/30'
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${
                  goal.completed ? 'text-success line-through' : 'text-card-foreground'
                }`}>
                  {goal.title}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {goal.completedMinutes} / {goal.targetMinutes} min
                </div>
              </div>
              
              <Progress 
                value={progress} 
                className={`h-2 ${goal.completed ? 'opacity-60' : ''}`}
              />
              
              {goal.completed && (
                <div className="text-xs text-success mt-1 animate-bounce-in">
                  ✨ Goal completed!
                </div>
              )}
            </div>
          );
        })}
        
        {showAddForm ? (
          <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
            <div className="space-y-3">
              <Input 
                placeholder="Goal title (e.g., Study Physics)"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <Input 
                type="number"
                placeholder="Target minutes"
                value={newGoalMinutes}
                onChange={(e) => setNewGoalMinutes(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <div className="flex gap-2">
                <Button onClick={addGoal} size="sm" className="bg-success hover:bg-success/90">
                  Add Goal
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline" 
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setShowAddForm(true)}
            variant="outline"
            className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyGoals;