import React from 'react';
import * as database from '../db';

export interface Story {
  readonly by: string;
  readonly id: string;
  readonly time: number;
  readonly title: string;
  readonly url: string;
}

export const StoryContext = React.createContext<Story[]>([]);
StoryContext.displayName = 'StoryContext';

export const StoryProvider: React.FC = props => {
  // const [storiesIds, setStoriesIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    async function persist(): Promise<void> {
      const stores = database.create('hacker_news');
      const db = await stores([
        { name: 'ids' },
        { name: 'stories', hasIdx: true },
      ]);

      console.log('persist--09999000----------');
      console.log(db);
    }
    persist().then(() => console.log('it has been called'));
    // const fetchIds = async (): Promise<void> => {
    //   const response = await fetch(
    //     'https://hacker-news.firebaseio.com/v0/newstories.json',
    //   );
    //   await response.json();
    //   console.log('waht about here------22222');
    //   // setStoriesIds(data);
    // };
    // fetchIds();
  }, []);

  const provider = [
    {
      by: 'Mauricio',
      id: 'one',
      time: 100,
      title: 'foo',
      url: 'www',
    },
  ];
  return (
    <StoryContext.Provider value={provider}>
      {props.children}
    </StoryContext.Provider>
  );
};
