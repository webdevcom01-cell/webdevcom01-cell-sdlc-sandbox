const https = require('https');
const task = 'dashboard-card';
const run = 'f8c1a4e2';
const branch = 'sdlc/' + task + '-' + run;
const token = process.env.GITHUB_TOKEN || '';
const repo = 'webdevcom01-cell/webdevcom01-cell-sdlc-sandbox';

if (!token) {
  const manualUrl = 'https://github.com/' + repo + '/compare/' + branch + '?expand=1';
  console.log(JSON.stringify({success: false, error: 'GITHUB_TOKEN not set', branch: branch, manualUrl: manualUrl}));
  process.exit(0);
}

const bodyData = JSON.stringify({
  title: 'feat(' + task + '): autonomous SDLC [' + run + ']',
  body: 'Automated PR from SDLC Pipeline\n\nTask: ' + task + '\nRun: ' + run + '\nBranch: ' + branch,
  head: branch,
  base: 'main'
});

const opts = {
  hostname: 'api.github.com',
  path: '/repos/' + repo + '/pulls',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(bodyData),
    'User-Agent': 'SDLC-Pipeline/1.0'
  }
};

const req = https.request(opts, function(res) {
  let data = '';
  res.on('data', function(chunk) { data += chunk; });
  res.on('end', function() { console.log(data); process.exit(0); });
});

req.on('error', function(e) {
  console.log(JSON.stringify({success: false, error: e.message, branch: branch}));
  process.exit(0);
});

req.write(bodyData);
req.end();
