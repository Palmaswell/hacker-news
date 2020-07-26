import React from 'react';
import { StoryContext, Story as StoryInt } from './context';
import { IntersectionOptions, useIntersection } from './hooks';
import { IntersectionTarget, Story } from './components';

const intersectionOptions: IntersectionOptions = {
  threshold: 1.0,
};

export const Intersection: React.FC = () => {
  const {
    counter,
    published,
    publisher,
    publishBulk,
    stories,
  } = React.useContext(StoryContext);
  const { ref, entry } = useIntersection<HTMLDivElement>(intersectionOptions);

  React.useEffect(() => {
    if (entry.isIntersecting) {
      console.log(entry.isIntersecting);
      console.log(publisher(stories, published, counter));
      publishBulk(publisher(stories, published, counter));
    }
  }, [entry.isIntersecting, ref]);

  return (
    <>
      <Story.List>
        {published.map((story: StoryInt) => (
          <Story.Item key={story.id}>{story.title}</Story.Item>
        ))}
      </Story.List>
      <IntersectionTarget ref={ref} />
    </>
  );
};
