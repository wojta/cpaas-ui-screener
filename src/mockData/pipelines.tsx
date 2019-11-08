import { IProductPipeline, EStatus } from 'src/types/IProductPipeline';
import moment, { duration } from 'moment';
const uuidv4 = require('uuid/v4');

function* pipelinesGenerator(product: string, start = 0, end = 37, step = 1): Iterable<IProductPipeline> {
  for (let i = start; i < end; i += step) {
    yield {
      name: `${product} ${i}`,
      duration: moment.duration(Math.floor(Math.random() * 3600.0), 'minutes').milliseconds(),
      lastRun: uuidv4(),
      status: EStatus.FAILED,
      taskStatus: -1
    };
  }
}

export const getPipelines = (product?: string):Array<IProductPipeline> => {
  const fixed = [
    {
      name: `${product} 16`,
      lastRun: uuidv4(),
      status: EStatus.SUCCEDED,
      taskStatus: 100,
      duration: moment.duration(30, 'minutes')
    },
    {
      name: `${product} 15`,
      lastRun: uuidv4(),
      status: EStatus.SUCCEDED,
      taskStatus: 100,
      duration: moment.duration(28, 'minutes')
    },
    {
      name: `${product} 14`,
      lastRun: uuidv4(),
      status: EStatus.SUCCEDED,
      taskStatus: 100,
      duration:  moment.duration(20, 'minutes')
    },
    {
      name: `${product} 13`,
      lastRun: uuidv4(),
      status: EStatus.RUNNING,
      taskStatus: 50,
      duration: moment.duration(1, 'hour')
    }
  ];
  return [...fixed,...Array.from(pipelinesGenerator(product, 13, 33))];
};
