#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'prompts', 'templates', 'pragma-post-writer');
const OUT = path.join(ROOT, 'skills', 'pragma-post-writer');
const STEPS_OUT = path.join(OUT, 'steps');

// ---------------------------------------------------------------------------
// Step 1: Read all source files
// ---------------------------------------------------------------------------

const persona = fs.readFileSync(path.join(SRC, 'expert-writer', 'persona.md'), 'utf8');
const systemRules = fs.readFileSync(path.join(SRC, 'shared', 'system-rules.md'), 'utf8');
const workflow = fs.readFileSync(path.join(SRC, 'expert-writer', 'workflow.md'), 'utf8');

const stepFiles = fs.readdirSync(path.join(SRC, 'expert-writer', 'chained'))
  .filter(f => /^step-\d+-.*\.md$/.test(f))
  .sort();

const steps = stepFiles.map(f => ({
  name: f,
  content: fs.readFileSync(path.join(SRC, 'expert-writer', 'chained', f), 'utf8'),
}));

// ---------------------------------------------------------------------------
// Step 2: Text replacements
// ---------------------------------------------------------------------------

function applyReplacements(text) {
  const replacements = [
    ['You are an agent inside the **CodeMachine Workflow System**.', 'You are an agent inside the **Pragma Post Writer Skill System**.'],
    ['The system will inject your Step 1 prompt when the user presses Enter.', 'When the user types `next`, read the Step 1 file and execute it.'],
    ['The system injects the next step', 'Read the next step file'],
    ['the **system** (not you) loads the next step prompt', 'you read the next step file from the paths below'],
    ['Wait for the system to inject the next step.', 'Wait for the user to type `next`, then read the next step file.'],
    ['Wait for the system to inject the next step', 'Wait for the user to type `next`, then read the next step file'],
    ['## WHAT "PRESS ENTER TO CONTINUE" MEANS', '## WHAT "TYPE NEXT" MEANS'],
    ['The **system** (not you) loads the next step prompt', 'you read the next step file from the paths below'],
    ['CodeMachine Workflow System', 'Pragma Post Writer Skill System'],
    ['user presses Enter', 'user types `next`'],
    ['user to press Enter', 'user to type `next`'],
    ['Press `ENTER`', 'Type `next`'],
    ['Press ENTER', 'Type `next`'],
    ['press `ENTER`', 'type `next`'],
    ['presses Enter', 'types `next`'],
    ['pressed Enter', 'typed `next`'],
    ['press Enter', 'type `next`'],
  ];

  let result = text;
  for (const [find, replace] of replacements) {
    result = result.split(find).join(replace);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stripFrontmatter(text) {
  const match = text.match(/^---\n[\s\S]*?\n---\n/);
  if (match) {
    return text.slice(match[0].length).replace(/^\n+/, '');
  }
  return text;
}

// ---------------------------------------------------------------------------
// Step 3: Clean output directory
// ---------------------------------------------------------------------------

const skillsDir = path.join(ROOT, 'skills');
if (fs.existsSync(skillsDir)) {
  fs.rmSync(skillsDir, { recursive: true, force: true });
}
fs.mkdirSync(STEPS_OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Step 4: Build SKILL.md
// ---------------------------------------------------------------------------

const frontmatter = `---
name: pragma-post-writer
description: "Step-by-step LinkedIn post writing coach with chained phases. Type /pragma-post-writer to start."
---
`;

const personaBody = applyReplacements(stripFrontmatter(persona));
const systemRulesBody = applyReplacements(stripFrontmatter(systemRules));

let workflowBody = stripFrontmatter(workflow);
workflowBody = workflowBody.replace(/\{post_writer_system_rules\}\n*/g, '');
workflowBody = applyReplacements(workflowBody);

const stepPathMap = `## STEP FILE PATHS

When the user types \`next\`, read the next step file using the Read tool. The step files are located relative to this SKILL.md file:

| Step | File |
|------|------|
| 1. Pre-Writing | \`./steps/step-01-pre-writing.md\` |
| 2. Hook | \`./steps/step-02-hook.md\` |
| 3. Body | \`./steps/step-03-body.md\` |
| 4. Ending | \`./steps/step-04-ending.md\` |
| 5. Edit & Polish | \`./steps/step-05-edit-polish.md\` |

**How to load steps:** Use the Read tool to read the file path. The path is relative to this skill's directory. Resolve it from the directory where this SKILL.md is located.
`;

const skillMd = [
  frontmatter,
  personaBody,
  '\n',
  systemRulesBody,
  '\n',
  workflowBody,
  '\n',
  stepPathMap,
].join('\n');

fs.writeFileSync(path.join(OUT, 'SKILL.md'), skillMd);

// ---------------------------------------------------------------------------
// Step 5: Copy and transform step files
// ---------------------------------------------------------------------------

for (const step of steps) {
  const transformed = applyReplacements(stripFrontmatter(step.content));
  fs.writeFileSync(path.join(STEPS_OUT, step.name), transformed);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log('Build complete!');
console.log(`  SKILL.md  -> ${path.relative(ROOT, path.join(OUT, 'SKILL.md'))}`);
for (const step of steps) {
  console.log(`  ${step.name} -> ${path.relative(ROOT, path.join(STEPS_OUT, step.name))}`);
}
