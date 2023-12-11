export type Task = () => void | Promise<void>

export class SimpleQueue {
    private executing: Task[] = []
    private backlog: Task[] = []

    enqueue(task: Task) {
        this.backlog.push(task)
    }

    async executeAll(options?: {
        onStart?: () => void | Promise<void>
        onEnd?: () => void | Promise<void>
    }) {
        while (this.backlog.length > 0) {
            this.executing = this.backlog
            this.backlog = []
            if (options?.onStart) await options.onStart()
            while (this.executing.length > 0) {
                const task = this.executing.shift()
                if (task) await task()
            }
            if (options?.onEnd) await options.onEnd()
        }
    }
}
