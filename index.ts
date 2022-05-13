import App from "@/App";
import { textSync } from 'figlet';
import { magentaBright, yellow, cyanBright, red, blueBright, grey } from 'chalk';

console.log(magentaBright(textSync('Jarvis  Bot', { horizontalLayout: 'fitted' })))
console.log(`${yellow.bold('#=======================')} ${magentaBright.bold('Jarvis')} ${yellow.bold('=========================#')}`);
console.log(`${yellow.bold('#')}          ${blueBright.bold('Created by: Liam L <TheFallenSpirit>')}          ${yellow.bold('#')}`);
console.log(`${yellow.bold('#')}            ${red.bold(`Copyright © 2021-${new Date().getFullYear()}`)} ${cyanBright.bold('FyreNodes')}             ${yellow.bold('#')}`);
console.log(`${yellow.bold('#')}                 ${grey.bold('Starting Jarvis Bot...')}                 ${yellow.bold('#')}`);
console.log(yellow.bold('#========================================================#'));
App();