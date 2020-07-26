import React from 'react';
import { fetchIds ,fetchStories, reducer, ActionType, ReducerState } from '.';

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

// TODO: Display counter should be dynamically calculated
// currently used as the most viable static value.
const DISPLAY_COUNTER = 20;
const CACHED_KEY = 'cached_stories';
const cachedStories = window.localStorage.getItem(CACHED_KEY);

const initialState: ReducerState = {
  counter: DISPLAY_COUNTER,
  ids: [],
  published: cachedStories ? JSON.parse(cachedStories).slice(0, DISPLAY_COUNTER) : [],
  stories: cachedStories ? JSON.parse(cachedStories) : [],
};

export const StoryContext = React.createContext<StoryContextProps>(initialState as StoryContextProps);
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

  //TODO: Remove counter from action and reducer
  // const setCounter = (counter: number): void =>
  //   dispatch({ type: ActionType.setCounter, counter });

  React.useEffect(() => {
    if (stories.length < counter) {
      (async ()=> {
        const ids = await fetchIds();
        getStoryIds(ids);
        const stories = await fetchStories({ids, counter, publish, push});
        stories.length && localStorage.setItem(CACHED_KEY, JSON.stringify(stories));
      })();
    } else {
      publishBulk(stories.slice(0, counter));
    }
  }, []);

  const state = {
    counter,
    ids,
    published,
    publishStory: publish,
    stories,
  };

  return (
    <StoryContext.Provider value={state}>
      {props.children}
    </StoryContext.Provider>
  );
};
