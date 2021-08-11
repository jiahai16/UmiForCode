/**
 * Pubsub
 * 使用场景: Pubsub.sub('messageTopic', (...args) => { console.log('监听处理') })
 *         Pubsub.pub('messageTopic', 'text1', 'text2', ....'text3')
 */
export const Pubsub = {
  topicMap: {},
  sub(topic: string, fn: () => void): () => void {
    const entry = this.topicMap[topic] || (this.topicMap[topic] = [])

    entry.push(fn)

    return function unsub() {
      const idx = entry.indexOf(fn)
      entry.splice(idx, 1)
    }
  },
  pub(topic: string, ...args: any[]): void {
    const entry = this.topicMap[topic]
    if (!entry) return

    entry.forEach((handler) => handler(...args))
  }
}
