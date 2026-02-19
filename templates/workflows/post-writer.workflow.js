export default {
  name: 'Pragma Post Writer',
  autonomousMode: 'never',

  tracks: {
    question: 'How do you want to write your post?',
    options: {
      'quick': {
        label: 'Flash 💥',
        description: 'Speed-run. Provide your topic and context, get a complete publish-ready post in one step',
      },
      'expert': {
        label: 'Ink 🖋️',
        description: 'The full craft. Step-by-step guidance through every writing phase (pre-writing, hook, body, ending, humanize)',
      },
    },
  },

  steps: [
    resolveStep('quick-writer', {
      tracks: ['quick'],
    }),

    resolveStep('expert-writer', {
      tracks: ['expert'],
    }),
  ],
};
