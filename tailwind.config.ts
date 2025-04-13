import catppuccin from '@catppuccin/daisyui'

module.exports = {
    content: ['./src/**/*.{js,ts}', 'index.html'],
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            catppuccin('mocha'),
        ],
    },
};