import axios              from 'axios';
import { makeTransition } from '../utils';

export default class Requester {
  constructor (key, url, store) {
    this.globalStore = store;
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
      return await this.makeRequest('/users/current.json');
    } catch (e) {
      return false;
    }
  }

  async getAssignedTasks () {
    try {
      return await this.makeRequest('/issues.json?assigned_to_id=me');
    } catch (e) {
      return false;
    }
  }

  async makeRequest (url) {
    try {
      const request = await this.client.get(url);
      return request.data;
    } catch (e) {
      console.error(e.message);
    }
    setTimeout(makeTransition, 100);
  }
}
