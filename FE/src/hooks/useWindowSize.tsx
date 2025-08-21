import { useEffect, useState } from 'react'

export function useWindowSize() {
    const [size, setSize] = useState({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setSize({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return size
}
