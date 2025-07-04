import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, List, Clock } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Complete math homework',
      completed: false,
      priority: 'high',
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'Review chemistry notes',
      completed: true,
      priority: 'medium',
      createdAt: new Date()
    }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: newPriority,
        createdAt: new Date()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted';
    }
  };

  return (
    <Card className="w-full bg-card shadow-soft border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-card-foreground">
            <List className="w-5 h-5 text-primary" />
            To-Do List
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount}/{totalCount} completed
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input 
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <select 
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button onClick={addTodo} size="icon" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Todo items */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {todos.map((todo) => (
            <div 
              key={todo.id}
              className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:shadow-soft ${
                getPriorityColor(todo.priority)
              } ${todo.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <div className="flex-1">
                  <p className={`${
                    todo.completed 
                      ? 'line-through text-muted-foreground' 
                      : 'text-card-foreground'
                  }`}>
                    {todo.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      todo.priority === 'high' 
                        ? 'bg-destructive/20 text-destructive'
                        : todo.priority === 'medium'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-success/20 text-success'
                    }`}>
                      {todo.priority} priority
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  ✕
                </Button>
              </div>
              
              {todo.completed && (
                <div className="text-xs text-success mt-2 animate-bounce-in">
                  🎉 Task completed! +10 XP
                </div>
              )}
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <List className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;