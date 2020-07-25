import { Story } from '.';

export interface ProviderState {
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

export enum ActionType {
  bulkPublish = 'bulkPublish',
  fetchIds = 'fetchIds',
  fetchStory = 'fetchStory',
  publish = 'publish',
  setCounter = 'setCounter',
}

export function reducer(state: ProviderState, action: Action): ProviderState {
  switch (action.type) {
    case ActionType.fetchIds: {
      return {
        ...state,
        ...(Array.isArray(action.ids) && { ids: [...action.ids] }),
      };
    }
    case ActionType.bulkPublish: {
      return {
        ...state,
        ...(action.stories && { published: [...action.stories] }),
      };
    }
    case ActionType.publish: {
      return {
        ...state,
        ...(action.story && { published: [...state.published, action.story] }),
      };
    }
    case ActionType.fetchStory: {
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
