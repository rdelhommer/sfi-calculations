import './app.scss';
import { ITabConfig } from '../resources/elements/tabs/tab/tab';

export class App { 
  testTab: ITabConfig = {
    name: 'test',
    title: 'Hello Tab!'
  }

  anotherTab: ITabConfig = {
    name: 'another',
    title: 'Another Tab!'
  }
}