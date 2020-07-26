import { publisher } from '../reducer';
import { storiesMock, publishedMock } from './mock-data';
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
});
