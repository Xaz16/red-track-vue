export default class Timer {
  constructor (config) {
    if (config) {
      const {id = 0, startTime, currentTime, pauses} = config;
      this.id = id;
      this.startTime = startTime;
      this.currentTime = currentTime;
      this.pauses = pauses;
      this.stopped = false;
    } else {
      this.id = +((Math.random() * 10000).toFixed(0));
      this.startTime = new Date().getTime();
      this.currentTime = this.startTime;
      this.pauses = [];
      this.stopped = false;
    }
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
    this.getClock = this.getClock.bind(this);
  }

  pause () {
    let pause = {
      startTime: new Date().getTime(),
      id: +((Math.random() * 10000).toFixed(0))
    };
    this.stopped = true;
    this.pauses.push(pause);
  }

  start () {
    this.pauses.filter(item => !item.endTime).map(item => {
      item.endTime = new Date().getTime();
      return item;
    });
    this.stopped = false;
  }

  updateTime () {
    const timePauses = this.pauses.reduce((acc, val) => {
      return acc + (val.endTime - val.startTime);
    }, 0);

    this.currentTime = new Date().getTime() - (this.startTime + timePauses);
  }

  getClock () {
    this.updateTime();
    const hours = new Date(this.currentTime).getHours();
    const minutes = new Date(this.currentTime).getMinutes();
    const seconds = new Date(this.currentTime).getSeconds();

    let time = {
      hours: hours < 10 ? '0' + hours : hours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      seconds: seconds < 10 ? '0' + seconds : seconds
    };

    return `${time.hours - 3}:${time.minutes}:${time.seconds}`;
  }
}
