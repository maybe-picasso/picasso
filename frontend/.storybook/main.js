module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  refs: {
    '@chakra-ui/react': {
      disable: true, // 기본적으로 표시되는 chakra-ui 스토리북 제거
    },
  },
  framework: '@storybook/react',
};
