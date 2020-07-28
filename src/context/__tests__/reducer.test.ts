import { createStory, publisher } from '../reducer';
import { storiesMock, publishedMock } from '../../__mocks__/mock-data';
import { Story } from '..';

describe('Reducer', () => {
  describe('publisher()', () => {
    it('should return an empty array when a story has already been published', () => {
      const published = [...publishedMock];
      published.pop();
      published.push(storiesMock[publishedMock.length]);

      expect(publisher(storiesMock, published, 6)).toEqual([]);
    });

    it('should increment the amount of published stories on each call according to counter', () => {
      const counter = 6;
      const initialBulk = publisher(storiesMock, publishedMock, counter);
      expect(initialBulk.length).toBe(counter * 2);
      const secondBulk = publisher(storiesMock, initialBulk, counter);
      expect(secondBulk.length).toBe(counter * 3);
    });

    it('should NOT publish more stories than cached stories', () => {
      const totalStories = storiesMock.length;
      const counter = 4;
      publishedMock.reduce((acc: Story[], _: Story, idx: number): Story[] => {
        if (idx < 2) {
          return [...acc];
        }
        const bulk = publisher(storiesMock, acc, counter);

        expect(bulk.length <= totalStories).toBeTruthy();
        return [...bulk];
      }, publishedMock);
    });

    it('should return an array containing the next bulk of stories to be published', () => {
      expect(publisher(storiesMock, publishedMock, 6)).toMatchSnapshot();
    });
  });

  describe('createStory()', () => {
    let initialTime: number;
    let date: string;
    let currentDate: string;
    beforeEach(() => {
      initialTime = 1595859421;
      date = new Date(initialTime * 1000).toLocaleString();
      currentDate = new Date(Date.now() * 1000).toLocaleString();
    });

    afterEach(() => {
      initialTime = (undefined as unknown) as number;
      date = (undefined as unknown) as string;
      currentDate = (undefined as unknown) as string;
    });
    it('should return null on missing story', () => {
      expect(createStory(null)).toBeNull();
    });

    it('should return a string containing unknown on missing by property', () => {
      expect(
        createStory({
          descendants: 0,
          id: 23965288,
          score: 1,
          time: initialTime,
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          type: 'story',
          url: 'https://name/',
        }),
      ).toEqual(
        expect.objectContaining({
          by: 'unknown',
          id: 23965288,
          time: date,
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          url: 'https://name/',
        }),
      );
    });

    it('should return a string containing unknown on missing title property', () => {
      expect(
        createStory({
          by: 'robertwiblin',
          descendants: 0,
          id: 23965288,
          score: 1,
          time: initialTime,
          type: 'story',
          url: 'https://name/',
        }),
      ).toEqual(
        expect.objectContaining({
          by: 'robertwiblin',
          id: 23965288,
          time: date,
          title: 'unknown',
          url: 'https://name/',
        }),
      );
    });

    it('should return a string containing unknown on missing url property', () => {
      expect(
        createStory({
          by: 'robertwiblin',
          descendants: 0,
          id: 23965288,
          score: 1,
          time: initialTime,
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          type: 'story',
        }),
      ).toEqual(
        expect.objectContaining({
          by: 'robertwiblin',
          id: 23965288,
          time: date,
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          url: 'unknown',
        }),
      );
    });

    it('should return the current Date on missing time property', () => {
      expect(
        createStory({
          by: 'robertwiblin',
          descendants: 0,
          id: 23965288,
          score: 1,
          url: 'https://name/',
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          type: 'story',
        }),
      ).toEqual(
        expect.objectContaining({
          by: 'robertwiblin',
          id: 23965288,
          time: currentDate,
          title: 'Ben Garfinkel on scrutinising classic AI risk arguments',
          url: 'https://name/',
        }),
      );
    });
  });
});
