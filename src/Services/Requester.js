import axios              from 'axios';
import { makeTransition } from '../utils';

export default class Requester {
  constructor (key, url) {
    this.createRedmineClient = this.createRedmineClient.bind(this);

    this.createRedmineClient(key, url);
  }

  createRedmineClient (key, url) {
    this.client = axios.create({
      baseURL: url,
      maxRedirects: 0,
      headers: {
        'X-Redmine-API-Key': key
      }
    });
  }

  async getUser () {
    try {
      const request = await this.client.get('/users/current.json');
      if (request.status === 401) {
        return false;
      }
      return request.data;
    } catch (e) {
      return false;
    }
  }

  async getAssignedTasks () {
    try {
      const request = await this.client.get('/issues.json?assigned_to_id=me');
      if (request.status === 401) {
        return false;
      }
      setTimeout(makeTransition, 200);
      return request.data;
    } catch (e) {
      return false;
    }
  }
}
