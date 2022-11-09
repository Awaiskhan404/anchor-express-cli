#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import shell from 'shelljs';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'ANCHOR EXPRESS CLI TOOL PRESENTS \n'
  );

  await sleep();
  rainbowTitle.stop();
}

async function execute(isCorrect) {
  const spinner = createSpinner('initializing...').start();
  await sleep();
  spinner.stop();
  const downloading = createSpinner('Downloading libs...').start();
  await sleep();
  shell.exec(`rm -rf .git`,{ silent: true });
  shell.exec(`git init`,{ silent: true });
  shell.exec(`git remote add origin https://github.com/Awaiskhan404/init-anchor-express.git`,{ silent: true });
  shell.exec(`git pull origin master`,{ silent: true });
  downloading.stop();
  const settingup = createSpinner('Cleaning almost done...').start();
  shell.exec(`npm install`,{ silent: true });
  shell.exec(`mkdir modules`,{ silent: true });
  shell.exec(`mkdir middlewares`,{ silent: true });
  await sleep();
  settingup.stop();
}

function done() {
  console.clear();
  figlet(`Happy Hacking !`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log('Congrats ,Anchor Express Project created.')
    process.exit(0);
  });
}

async function init() {
  const answers = await inquirer.prompt({
    name: 'initialization',
    type: 'list',
    message: 'Start fresh project\n',
    choices: [
      'start new project',
    ],
  });

  return execute(answers.init === 'start new project');
}

// Run it with top-level await
console.clear();
await welcome();
await init();
done();