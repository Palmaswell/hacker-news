import React from 'react';
import {
  fetchIds,
  fetchStories,
  reducer,
  ActionType,
  ReducerState,
  publisher,
} from '.';

export interface Story {
  readonly by: string;
  readonly id: number;
  readonly time: string;
  readonly title: string;
  readonly url: string;
}

export interface StoryContextProps {
  readonly published: Story[];
  readonly stories: Story[];
  readonly ids: number[];
  readonly counter: number;
  publishBulk(stories: Story[]): void;
  publisher(stories: Story[], published: Story[], counter: number): Story[];
}

// TODO: Calculate the initial display value dynamically.
const DISPLAY_COUNTER = 20;

const CACHED_KEY = 'cached_stories';
const cachedStories = window.localStorage.getItem(CACHED_KEY);

const initialState: ReducerState = {
  counter: DISPLAY_COUNTER,
  ids: [],
  published: cachedStories
    ? JSON.parse(cachedStories).slice(0, DISPLAY_COUNTER)
    : [],
  stories: cachedStories ? JSON.parse(cachedStories) : [],
};

export const StoryContext = React.createContext<StoryContextProps>(
  initialState as StoryContextProps,
);
StoryContext.displayName = 'StoryContext';

export const StoryProvider: React.FC = props => {
  const [{ counter, ids, published, stories }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const getStoryIds = (ids: number[]): void =>
    dispatch({ type: ActionType.fetchIds, ids });

  const publish = (story: Story): void =>
    dispatch({ type: ActionType.publish, story });
  const publishBulk = (stories: Story[]): void =>
    dispatch({ type: ActionType.publishBulk, stories });
  const push = (story: Story): void =>
    dispatch({ type: ActionType.push, story });
  const pushBulk = (stories: Story[]): void =>
    dispatch({ type: ActionType.pushBulk, stories });

  React.useEffect(() => {
    if (stories.length < counter) {
      (async () => {
        const ids = await fetchIds();
        getStoryIds(ids);
        const stories = await fetchStories({ ids, counter, publish, push });
        if (stories.length) {
          const filteredStories = stories.filter(story => !!story) as Story[];
          localStorage.setItem(CACHED_KEY, JSON.stringify(filteredStories));
          pushBulk(filteredStories);
        }
      })();
    } else {
      publishBulk(published);
    }
  }, []);

  const state = {
    counter,
    ids,
    publisher,
    published,
    publishBulk,
    stories,
  };

  return (
    <StoryContext.Provider value={state}>
      {props.children}
    </StoryContext.Provider>
  );
};
