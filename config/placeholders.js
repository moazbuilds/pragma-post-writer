const path = require('node:path');

module.exports = {
  // User directory placeholders (resolved from user's project root)
  userDir: {},

  // Package directory placeholders (resolved from CodeMachine installation)
  packageDir: {
    post_writer_system_rules: path.join('prompts', 'templates', 'pragma', 'shared', 'system-rules.md'),
  },
};
