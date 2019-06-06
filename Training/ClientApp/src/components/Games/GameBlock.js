import React from 'react';
import Game1 from "./Game1";
import Game2 from "./Game2";

export default function GameBlock(settings){
    switch (settings.val) {
       case 'Game1': return <Game1 countLevels={settings.countLevels} eventId={settings.eventId} settings={settings.settings}/>;
       case 'Game2': return <Game2 countLevels={settings.countLevels} eventId={settings.eventId} settings={settings.settings}/>;
       default: return;
    } 
}