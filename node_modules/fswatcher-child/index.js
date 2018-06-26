const fork = require('child_process').fork;
const { EventEmitter } = require('events');
const path = require('path');

class Watcher extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = options;
    this.watchedPaths = new Set();
    this.child = null;
    this.ready = false;
    this.readyQueue = [];

    this.on('ready', () => {
      this.ready = true;
      for (let f of this.readyQueue) {
        f();
      }
      this.readyQueue = [];
    });

    this.startchild();
  }

  startchild() {
    if (this.child) return;

    this.child = fork(path.join(__dirname, 'child'));

    if (this.watchedPaths.size > 0) {
      this.sendCommand('add', [Array.from(this.watchedPaths)]);
    }

    this.child.send({
      type: 'init',
      options: this.options
    });

    this.child.on('message', msg => this.emit(msg.event, msg.path));

    this.child.on('error', e => {
      // Do nothing
    });

    this.child.on('exit', (exit, signal) => {
      if (!this.closed) {
        // Restart the child
        this.child = null;
        this.ready = false;
        this.startchild();
        this.emit('childDead');
      }
    });
  }

  sendCommand(f, args) {
    if (!this.ready) {
      return this.readyQueue.push(() => this.sendCommand(f, args));
    }
    this.child.send({
      type: 'function',
      name: f,
      args: args
    });
  }

  _addPath(p) {
    if (!this.watchedPaths.has(p)) {
      this.watchedPaths.add(p);
      return true;
    }
  }

  add(paths) {
    let added = false;
    if (Array.isArray(paths)) {
      for (let p of paths) {
        added = !added ? this._addPath(p) : true;
      }
    } else {
      added = this._addPath(paths);
    }
    if (added) this.sendCommand('add', [paths]);
  }

  unwatch(paths) {
    let removed = false;
    if (Array.isArray(paths)) {
      for (let p of paths) {
        removed = !removed ? this.watchedPaths.delete(p) : true;
      }
    } else {
      removed = this.watchedPaths.delete(paths);
    }
    if (removed) this.sendCommand('unwatch', [paths]);
  }

  getWatched() {
    let watchList = {};
    for (let p of this.watchedPaths) {
      let key = this.options.cwd ? path.relative(this.options.cwd, p) : p;
      // TODO: Implement _items so it's the same as chokidar's output
      watchList[key || '.'] = [];
    }
    return watchList;
  }

  _closePath(p) {
    if (this.watchedPaths.has(p)) {
      this.watchedPaths.delete(p);
    }
    this.sendCommand('_closePath', [p]);
  }

  close() {
    this.closed = true;
    if (this.child) {
      this.child.kill();
    }
  }

  _emulateChildDead() {
    if (!this.child) {
      return;
    }
    this.child.send({
      type: 'die'
    });
  }
}

module.exports = Watcher;