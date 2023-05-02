import { Octokit } from "octokit";
import prompt from 'prompt-sync';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({
  path: '../config/.env'
});

async function initialize(name, desc, bool) {
  const input = prompt();
  const dir = '../../';

  const octokit = new Octokit({
    auth: process.env.TOKEN  
  });

  name = input('Name of Repo: ');
  desc = input('Description of Repo: ');
  bool = input('Private? (true/false): ');

  bool.toLowerCase === 'true' ? bool = true : bool = false;

  await octokit.request('POST /user/repos', {
    name: name,
    description: desc,
    homepage: 'https://github.com',
    'private': bool,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  
  fs.access(`${dir}${name}`, (error) => {
    if (error) {
      console.log(`Run this command: git clone https://github.com/brplcc/${name.replaceAll(' ', '-')}.git`);
    } else {
      console.log("Project already exists or there is a folder sharing the same name.");
    }
  });
}

initialize();
