import React from 'react';

import Navbar from 'components/Navbar';

export default {
  title: 'Elements/Navbar',
  component: Navbar,
  argTypes: {
    // theme: { control: 'color' },
  },
};

const Template = (args) => <Navbar {...args} />;

export const Base = Template.bind({});
Base.args = {
  theme: {
      primary:"#1AC"
    },
};