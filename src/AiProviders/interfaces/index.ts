import { News } from '../News'

export interface INewSource {
    getNewsByTopic(topic: string): Promise<News>
  }