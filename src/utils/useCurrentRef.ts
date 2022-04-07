import { useRef } from 'react'

export default function useCurrentRef<T>(v: T) {
  const vRef = useRef(v)
  vRef.current = v
  return vRef
}
