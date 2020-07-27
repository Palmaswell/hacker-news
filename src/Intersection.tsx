import React from 'react';
import { StoryContext, Story as StoryInt } from './context';
import { IntersectionOptions, useIntersection } from './hooks';
import {
  Headline,
  Link,
  IntersectionTarget,
  Story,
  HeadlineSize,
  TopLine,
  SubLine,
} from './components';

const intersectionOptions: IntersectionOptions = {
  threshold: 1.0,
};

const MAIN_HEADLINE_TITLE = 'Latest Hacker Digest';

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
      console.log(publisher(stories, published, counter));
      publishBulk(publisher(stories, published, counter));
    }
  }, [entry.isIntersecting, ref]);

  return (
    <Story.Layout
      header={
        <Headline size={HeadlineSize.l} tag="h1">
          {MAIN_HEADLINE_TITLE}
        </Headline>
      }>
      <Story.List>
        {published.map((story: StoryInt) => (
          <Story.Item key={story.id}>
            <TopLine>{story.time}</TopLine>
            <Headline size={HeadlineSize.m} tag="h2">
              <Link href={story.url} target={'_blank'}>
                {story.title}
              </Link>
            </Headline>
            <SubLine>by: {story.by}</SubLine>
          </Story.Item>
        ))}
      </Story.List>
      <IntersectionTarget ref={ref} />
    </Story.Layout>
  );
};
