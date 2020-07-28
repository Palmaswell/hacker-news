import { Story } from '.';

export interface ReducerState {
  readonly ids: number[];
  readonly published: Story[];
  readonly stories: Story[];
  readonly counter: number;
}

export interface Action {
  readonly type: ActionType;
  readonly ids?: number[];
  readonly story?: Story;
  readonly stories?: Story[];
  readonly counter?: number;
}

export interface InitFetchStories {
  readonly ids: number[];
  readonly counter: number;
  publish(story: Story): void;
  push(story: Story): void;
}

export enum ActionType {
  fetchIds = 'fetchIds',
  push = 'push',
  pushBulk = 'pushBulk',
  publish = 'publish',
  publishBulk = 'publishBulk',
  setCounter = 'setCounter',
}

export interface HackerStory {
  readonly by: string;
  readonly id: number;
  readonly title: string;
  readonly time: number;
  readonly descendants: number;
  readonly score: number;
  readonly type: string;
  readonly url: string;
}

export function publisher(
  stories: Story[],
  published: Story[],
  counter: number,
): Story[] | [] {
  const lastPublished = published[published.length - 1];
  const isPublished = stories
    .slice(published.length)
    .find(story => story.id === lastPublished.id);

  if (isPublished) {
    return [];
  }

  return published.concat(
    stories.slice(published.length, published.length + counter),
  );
}

export function createStory(story: Partial<HackerStory> | null): Story | null {
  if (story === null) {
    return null;
  }
  const placeholder = 'unknown';
  const timestamp = story.time ? story.time : Date.now();
  const date = new Date(timestamp * 1000).toLocaleString();

  return {
    by: story.by ?? placeholder,
    id: story.id ?? 0,
    title: story.title ?? placeholder,
    time: date,
    url: story.url ?? placeholder,
  };
}

export async function fetchIds(): Promise<number[]> {
  try {
    const res = await fetch(
      'https://hacker-news.firebaseio.com/v0/newstories.json',
    );
    const ids = await res.json();

    return ids;
  } catch (error) {
    console.warn(`Fetching story ids failed with: ${error}`);

    return Promise.resolve([]);
  }
}

export async function fetchStories({
  ids,
  counter,
  publish,
  push,
}: InitFetchStories): Promise<(Story | null)[]> {
  try {
    //TODO: Handle the case when the promise has not settled for caching.
    //Currently, Promise all wait until it fetches all 500 stories.
    //If the user loads the page before the promise settles, this function will run again.
    return await Promise.all(
      ids.map(async (id: number, idx: number) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        const hackerStory = await res.json();
        const story = createStory(hackerStory);

        if (!!story) {
          if (idx <= counter) {
            publish(story);
          }
          if (idx <= counter * 5) {
            push(story);
          }
        }

        return story;
      }),
    );
  } catch (error) {
    console.warn(`Fetch stories failed with: ${error}`);
    return Promise.resolve([]);
  }
}

export function reducer(state: ReducerState, action: Action): ReducerState {
  switch (action.type) {
    case ActionType.fetchIds: {
      return {
        ...state,
        ...(Array.isArray(action.ids) && { ids: [...action.ids] }),
      };
    }

    case ActionType.publish: {
      return {
        ...state,
        ...(action.story && { published: [...state.published, action.story] }),
      };
    }

    case ActionType.publishBulk: {
      return {
        ...state,
        ...(action.stories && {
          published: [...action.stories],
        }),
      };
    }

    case ActionType.push: {
      return {
        ...state,
        ...(action.story && { stories: [...state.stories, action.story] }),
      };
    }

    case ActionType.pushBulk: {
      return {
        ...state,
        ...(action.stories && {
          stories: [...action.stories],
        }),
      };
    }

    case ActionType.setCounter: {
      return {
        ...state,
        ...(action.counter && { counter: action.counter }),
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
