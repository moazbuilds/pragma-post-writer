const path = require('node:path');
const promptsDir = path.join(__dirname, '..', 'prompts', 'templates');

module.exports = [
  // ========================================
  // Post Writer Workflow
  // ========================================

  // Flash 💥 — Single-step, gathers context and delivers complete post
  {
    id: 'quick-writer',
    name: 'Flash 💥 | Post Writer',
    description: 'Speed-run LinkedIn post writer that gathers context and delivers a complete, publish-ready post in one step',
    promptPath: [
      path.join(promptsDir, 'pragma-post-writer', 'flash', 'persona.md'),
      path.join(promptsDir, 'pragma-post-writer', 'flash', 'prompt.md'),
    ],
    engine: 'claude',
  },

  // Ink 🖋️ — Multi-step, guides user through every writing phase
  {
    id: 'expert-writer',
    name: 'Ink 🖋️ | Post Writer',
    description: 'LinkedIn post writing coach that guides users step-by-step through crafting a masterpiece post',
    promptPath: [
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'persona.md'),
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'workflow.md'),
    ],
    chainedPromptsPath: [
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'chained', 'step-01-pre-writing.md'),
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'chained', 'step-02-hook.md'),
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'chained', 'step-03-body.md'),
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'chained', 'step-04-ending.md'),
      path.join(promptsDir, 'pragma-post-writer', 'ink', 'chained', 'step-05-edit-polish.md'),
    ],
    engine: 'claude',
  },
];
