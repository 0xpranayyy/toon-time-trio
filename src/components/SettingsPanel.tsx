import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Volume2, Moon, Vibrate, Shield } from "lucide-react";

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    vibration: true,
    darkMode: false,
    autoBreak: true,
    focusMode: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">Session reminders</div>
              </div>
            </div>
            <Switch 
              checked={settings.notifications}
              onCheckedChange={() => toggleSetting('notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Sound Effects</div>
                <div className="text-sm text-muted-foreground">Timer sounds</div>
              </div>
            </div>
            <Switch 
              checked={settings.sounds}
              onCheckedChange={() => toggleSetting('sounds')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Vibration</div>
                <div className="text-sm text-muted-foreground">Haptic feedback</div>
              </div>
            </div>
            <Switch 
              checked={settings.vibration}
              onCheckedChange={() => toggleSetting('vibration')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">Switch to dark theme</div>
              </div>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={() => toggleSetting('darkMode')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Focus Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Focus Mode</div>
                <div className="text-sm text-muted-foreground">Block distractions</div>
              </div>
            </div>
            <Switch 
              checked={settings.focusMode}
              onCheckedChange={() => toggleSetting('focusMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto Break</div>
              <div className="text-sm text-muted-foreground">Start breaks automatically</div>
            </div>
            <Switch 
              checked={settings.autoBreak}
              onCheckedChange={() => toggleSetting('autoBreak')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Export Data
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Reset Statistics
          </Button>
          <Separator />
          <Button variant="destructive" className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;