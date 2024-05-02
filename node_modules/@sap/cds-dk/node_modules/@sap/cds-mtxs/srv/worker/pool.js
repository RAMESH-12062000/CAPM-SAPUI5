const { Worker } = require('worker_threads')

class WorkerPool {
  constructor(maxSize) {
    this.maxSize = maxSize
    this.workers = []
    this.tasksQueue = []
  }

  acquire(workerPath) {
    return new Promise((resolve, reject) => {
      const idleWorker = this.workers.find(worker => worker.isIdle)
      if (idleWorker) {
        idleWorker.isIdle = false
        resolve(idleWorker)
      } else if (this.workers.length < this.maxSize) {
        const newWorker = new Worker(workerPath)
        newWorker.isIdle = false
        this.workers.push(newWorker)
        resolve(newWorker)
      } else {
        this.tasksQueue.push({ resolve, reject })
      }
    })
  }

  release(worker) {
    worker.terminate()
    this.workers = this.workers.filter(w => w !== worker)

    if (this.tasksQueue.length > 0) {
      const { resolve } = this.tasksQueue.shift()
      this.acquire().then(resolve)
    }
  }
}

const pool = new WorkerPool(4)

module.exports.worker4 = async function(workerPath, message) {
  const worker = await pool.acquire(workerPath)
  return new Promise((resolve, reject) => {
    worker.postMessage(message)
    worker.once('message', ({ csn, error }) => {
      pool.release(worker)
      if (error) reject(error)
      else resolve(csn)
    })
    worker.once('error', error => {
      pool.release(worker)
      reject(error)
    })
  })
}
