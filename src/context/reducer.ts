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
  publishBulk = 'publishBulk',
  fetchIds = 'fetchIds',
  push = 'push',
  publish = 'publish',
  setCounter = 'setCounter',
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

    return Promise.resolve([])
  }
}

export async function fetchStories({ids, counter, publish, push }: InitFetchStories): Promise<Story[]> {
  try {
    return await Promise.all(
      ids.slice(0, 200).map(async (id: number, idx: number) => {
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
          publish(story);
        }
        push(story);

        return story;
      }),
    );

  } catch (error) {
    console.warn(`Fetch stories failed with: ${error}`);
    return Promise.resolve([])
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
        ...(action.stories && { published: [...action.stories] }),
      };
    }

    case ActionType.push: {
      return {
        ...state,
        ...(action.story && { stories: [...state.stories, action.story] }),
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

