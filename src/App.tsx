import React from 'react';
import { StoryContext, Story, StoryProvider } from './context';

export const List: React.FC = () => {
  const { published } = React.useContext(StoryContext);
  return (
    <ul>
      {published.map((story: Story) => (
        <li key={story.id}>{story.title}</li>
      ))}
    </ul>
  );
};

export default function App(): JSX.Element {
  return (
    <StoryProvider>
      <List />
    </StoryProvider>
  );
}
