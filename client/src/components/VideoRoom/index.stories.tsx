import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { RoomState } from '../../types';
import VideoRoom from '.';

export default {
  title: 'VideoRoom',
  component: VideoRoom,
} as Meta;

const Template: Story<React.ComponentProps<typeof VideoRoom>> = (args) => {
  const [, setRoomState] = useState<RoomState>(args.roomState);
  const videoRoomArgs = { ...args, setRoomState };

  return <VideoRoom {...videoRoomArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  roomId: 'test room',
  roomState: {
    isStarted: true,
    isVoiceOn: true,
    isScreenOn: true,
    nickname: 'Guest'
  }
};
