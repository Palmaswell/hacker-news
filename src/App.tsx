import React from 'react';
import { StoryContext, Story } from './context';

export default function App(): JSX.Element {
  const { published } = React.useContext(StoryContext);
  return (
    <ul>
      {published.map((story: Story) => (
        <li key={story.id}>{story.title}</li>
      ))}
    </ul>
  );
}
