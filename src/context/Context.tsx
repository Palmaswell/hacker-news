import React from 'react';
import { ProviderState, reducer, ActionType } from '.';

export interface Story {
  readonly by: string;
  readonly id: string;
  readonly time: number;
  readonly title: string;
  readonly url: string;
}

export interface StoryContextProps {
  readonly published: Story[];
  readonly stories: Story[];
  readonly ids: number[];
  readonly counter: number;
  publishStory(story: Story): void;
}

export const StoryContext = React.createContext<StoryContextProps>(
  {} as StoryContextProps,
);
StoryContext.displayName = 'StoryContext';

const cacheKey = 'cached_stories';
const cachedStories = window.localStorage.getItem(cacheKey);

//TODO: use the localstorage value or
const initialState: ProviderState = {
  counter: 20,
  stories: cachedStories ? JSON.parse(cachedStories) : [],
  ids: [],
  published: [],
};

export const StoryProvider: React.FC = props => {
  const [{ counter, ids, published, stories }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const getStoryIds = (ids: number[]): void =>
    dispatch({ type: ActionType.fetchIds, ids });
  const publishStory = (story: Story): void =>
    dispatch({ type: ActionType.publish, story });
  const bulkPublishStories = (stories: Story[]): void =>
    dispatch({ type: ActionType.bulkPublish, stories });

  const fetchStory = (story: Story): void =>
    dispatch({ type: ActionType.fetchStory, story });
  const setCounter = (counter: number): void =>
    dispatch({ type: ActionType.setCounter, counter });

  React.useEffect(() => {
    const fetchIds = async (): Promise<void> => {
      try {
        const res = await fetch(
          'https://hacker-news.firebaseio.com/v0/newstories.json',
        );
        const ids = await res.json();
        getStoryIds(ids);
      } catch (error) {
        console.warn(`Fetching story ids failed with: ${error}`);
      }
    };

    setCounter(20);
    if (stories.length < 1) {
      fetchIds();
    }
    //TODO: calculate according the amount of possible fitting items
  }, []);

  React.useEffect(() => {
    const fetchStories = async (): Promise<Story[] | void> => {
      try {
        //TODO: move to own function
        const stories = await Promise.all(
          ids.map(async (id, idx) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            );
            const hackerStory = await res.json();
            const story = {
              by: hackerStory.by,
              id: hackerStory.id,
              time: hackerStory.time,
              title: hackerStory.title,
              url: hackerStory.url,
            };
            if (idx <= counter) {
              publishStory(story);
            }
            fetchStory(story);
            return story;
          }),
        );
        localStorage.setItem(cacheKey, JSON.stringify(stories));
      } catch (error) {
        console.warn(`Fetching story failed with: ${error}`);
      }
    };
    if (stories.length < 1) {
      fetchStories();
    } else {
      bulkPublishStories(stories.slice(0, counter));
    }
  }, [ids]);

  const state = {
    counter,
    ids,
    published,
    publishStory,
    stories,
  };
  return (
    <StoryContext.Provider value={state}>
      {props.children}
    </StoryContext.Provider>
  );
};
