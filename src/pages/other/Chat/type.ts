type messageBody = {
  user: {
    userId?: number
    name?: string
    email?: string
    img?: string
    tag?: string[]
    sign?: string
  }
  onlineUser?: any
  message: string
  time?: string
  type: number
}

type user = {
  userId?: number
  name?: string
  email?: string
  img?: string
  tag?: string[]
  sign?: string
}
