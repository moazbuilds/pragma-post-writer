#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'prompts', 'templates', 'pragma');
const OUT = path.join(ROOT, 'skills', 'pragma-post-writer');
const ROUTES_OUT = path.join(OUT, 'routes');
const STEPS_OUT = path.join(ROUTES_OUT, 'expert-steps');

// ---------------------------------------------------------------------------
// Step 1: Read all source files
// ---------------------------------------------------------------------------

const systemRules = fs.readFileSync(path.join(SRC, 'shared', 'system-rules.md'), 'utf8');
const quickPersona = fs.readFileSync(path.join(SRC, 'flash', 'persona.md'), 'utf8');
const quickPrompt = fs.readFileSync(path.join(SRC, 'flash', 'prompt.md'), 'utf8');
const expertPersona = fs.readFileSync(path.join(SRC, 'ink', 'persona.md'), 'utf8');
const expertWorkflow = fs.readFileSync(path.join(SRC, 'ink', 'workflow.md'), 'utf8');

const stepFiles = fs.readdirSync(path.join(SRC, 'ink', 'chained'))
  .filter(f => /^step-\d+-.*\.md$/.test(f))
  .sort();

const steps = stepFiles.map(f => ({
  name: f,
  content: fs.readFileSync(path.join(SRC, 'ink', 'chained', f), 'utf8'),
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

if (fs.existsSync(OUT)) {
  fs.rmSync(OUT, { recursive: true, force: true });
}
fs.mkdirSync(STEPS_OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Step 4: Build route-aware SKILL.md
// ---------------------------------------------------------------------------

const frontmatter = `---
name: pragma-post-writer
description: "LinkedIn post writer with route selection. Ask quick (Flash 💥) or expert (Ink 🖋️), then load only that workflow."
---
`;

const systemRulesBody = applyReplacements(stripFrontmatter(systemRules));

const routerBody = `# Pragma Post Writer Router

## START HERE

Your first question MUST be:

"What do you want: **quick (Flash 💥)** or **expert (Ink 🖋️)**?"

Then explain the options clearly:

- **Quick (Flash 💥):** One-step writing pass for when the user already has a draft and wants a fast final version.
- **Expert (Ink 🖋️):** Full 5-step structured workflow:
  1. **Pre-Writing** - Find and validate the core idea
  2. **Hook** - Craft the opening lines
  3. **Body** - Build the main content
  4. **Ending** - Land the kicker and CTA
  5. **Edit & Polish** - Humanize and finalize

Wait for the answer before loading any workflow content.

## ROUTING RULES

- If user chooses **quick** or **flash**:
  - Read only: \`./routes/quick.md\`
  - Execute that workflow
  - Do not load expert files

- If user chooses **expert** or **ink**:
  - Read: \`./routes/expert.md\`
  - Then follow step loading using the expert step paths in that file
  - Do not load quick files

- If unclear:
  - Ask again with the same two options
`;

const skillMd = [frontmatter, routerBody].join('\n');

fs.writeFileSync(path.join(OUT, 'SKILL.md'), skillMd);

// ---------------------------------------------------------------------------
// Step 5: Build route files
// ---------------------------------------------------------------------------

let quickBody = stripFrontmatter(quickPrompt);
quickBody = quickBody.replace(/\{post_writer_system_rules\}\n*/g, `${systemRulesBody}\n\n`);
quickBody = applyReplacements(quickBody);
const quickRoute = [
  '# Quick Route: Flash 💥',
  '',
  applyReplacements(stripFrontmatter(quickPersona)),
  '',
  quickBody,
].join('\n');
fs.writeFileSync(path.join(ROUTES_OUT, 'quick.md'), quickRoute);

let expertWorkflowBody = stripFrontmatter(expertWorkflow);
expertWorkflowBody = expertWorkflowBody.replace(/\{post_writer_system_rules\}\n*/g, '');
expertWorkflowBody = applyReplacements(expertWorkflowBody);

const expertStepPathMap = `## STEP FILE PATHS

When the user types \`next\`, read the next step file using the Read tool. The step files are located relative to this file:

| Step | File |
|------|------|
| 1. Pre-Writing | \`./expert-steps/step-01-pre-writing.md\` |
| 2. Hook | \`./expert-steps/step-02-hook.md\` |
| 3. Body | \`./expert-steps/step-03-body.md\` |
| 4. Ending | \`./expert-steps/step-04-ending.md\` |
| 5. Edit & Polish | \`./expert-steps/step-05-edit-polish.md\` |
`;

const expertRoute = [
  '# Expert Route: Ink 🖋️',
  '',
  applyReplacements(stripFrontmatter(expertPersona)),
  '',
  systemRulesBody,
  '',
  expertWorkflowBody,
  '',
  expertStepPathMap,
].join('\n');
fs.writeFileSync(path.join(ROUTES_OUT, 'expert.md'), expertRoute);

// ---------------------------------------------------------------------------
// Step 6: Copy and transform expert step files
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
console.log(`  quick.md -> ${path.relative(ROOT, path.join(ROUTES_OUT, 'quick.md'))}`);
console.log(`  expert.md -> ${path.relative(ROOT, path.join(ROUTES_OUT, 'expert.md'))}`);
for (const step of steps) {
  console.log(`  ${step.name} -> ${path.relative(ROOT, path.join(STEPS_OUT, step.name))}`);
}
