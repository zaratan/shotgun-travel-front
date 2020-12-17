/* eslint-disable camelcase */
import Picture from './Picture';

type Trip = {
  description?: string;
  created_at: string;
  title: string;
  pictures: Array<Picture>;
  id: number;
};
export default Trip;
