import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Book, Calendar, Clock } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'tired';
  date: Date;
  studyTime: number; // minutes studied that day
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      content: "Had a great study session today! Focused on calculus for 2 hours and finally understood derivatives. The Pomodoro technique really helps me stay concentrated.",
      mood: 'great',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      studyTime: 120
    },
    {
      id: '2', 
      content: "Struggled a bit with chemistry today. Need to review the molecular structures again tomorrow. Maybe I should try shorter study sessions.",
      mood: 'okay',
      date: new Date(),
      studyTime: 45
    }
  ]);
  
  const [newEntry, setNewEntry] = useState('');
  const [newMood, setNewMood] = useState<'great' | 'good' | 'okay' | 'tired'>('good');
  const [showAddForm, setShowAddForm] = useState(false);

  const addEntry = () => {
    if (newEntry.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        content: newEntry.trim(),
        mood: newMood,
        date: new Date(),
        studyTime: 0 // Would be populated from actual study data
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
      setShowAddForm(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'tired': return '😴';
      default: return '😊';
    }  
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'bg-success/20 text-success border-success/30';
      case 'good': return 'bg-primary/20 text-primary border-primary/30';
      case 'okay': return 'bg-warning/20 text-warning border-warning/30';
      case 'tired': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <Card className="w-full bg-card shadow-soft border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Book className="w-5 h-5 text-primary" />
          Study Journal
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Reflect on your study sessions and track your progress
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showAddForm ? (
          <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  How was your study session today?
                </label>
                <Textarea 
                  placeholder="Write about your study session, what you learned, challenges you faced, or how you felt..."
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="border-primary/20 focus:border-primary min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  How are you feeling?
                </label>
                <div className="flex gap-2">
                  {['great', 'good', 'okay', 'tired'].map((mood) => (
                    <Button
                      key={mood}
                      variant={newMood === mood ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewMood(mood as any)}
                      className="capitalize"
                    >
                      {getMoodEmoji(mood)} {mood}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={addEntry} className="bg-success hover:bg-success/90">
                  Save Entry
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setShowAddForm(true)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Book className="w-4 h-4 mr-2" />
            Write Today's Entry
          </Button>
        )}

        {/* Journal Entries */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className="p-4 rounded-lg bg-muted/20 border border-border/20 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {entry.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {entry.studyTime > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {Math.floor(entry.studyTime / 60)}h {entry.studyTime % 60}m
                    </div>
                  )}
                  <Badge className={`${getMoodColor(entry.mood)} text-xs`}>
                    {getMoodEmoji(entry.mood)} {entry.mood}
                  </Badge>
                </div>
              </div>
              
              <p className="text-card-foreground leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))}
          
          {entries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No journal entries yet.</p>
              <p className="text-sm">Start writing to track your study journey!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Journal;