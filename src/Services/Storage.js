export default class Storage {
  constructor (type = 'sync') {
    if (window.storage) {
      throw new Error('Use getInstance getter');
    }

    switch (type) {
      case 'local':
      case 'managed':
      case 'sync':
        break;
      default:
        throw new Error('Unknown storage type');
    }

    this.storageType = type;
    this.storage = chrome.storage[this.storageType];

    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this.remove = this.remove.bind(this);
    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clear = this.clear.bind(this);
  }

  get getInstance () {
    return this;
  }

  getItem (key) {
    return this.get(key);
  }

  setItem (key = {}, data) {
    return this.set(key, data);
  }

  removeItem (key) {
    return this.remove(key);
  }

  set (key, data) {
    return new Promise((resolve) => {
      if (!key) {
        key = Object.keys(data)[0];
      }
      this.storage.set({[key]: data}, () => {
        resolve();
      });
    });
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.storage.get(key, (data) => {
        if (!data) {
          reject(new Error('Can\'t get data'));
        }
        resolve(data);
      });
    });
  }

  remove (key) {
    return new Promise((resolve) => {
      this.storage.remove(key, () => {
        resolve();
      });
    });
  }

  clear () {
    return new Promise((resolve) => {
      this.storage.clear(() => {
        resolve();
      });
    });
  }
}
