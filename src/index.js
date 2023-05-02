import { Octokit } from "octokit";
import dotenv from 'dotenv';
import prompt from 'prompt-sync';
dotenv.config({
  path: '../config/.env'
});

async function initialize(name, desc, bool) {
  const input = prompt();

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
}

initialize();
