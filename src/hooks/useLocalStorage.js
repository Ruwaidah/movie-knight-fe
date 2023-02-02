import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    
    
    const [storeValue, setStoreValue] = useState(() => {

        const value = window.localStorage.getItem(key)

        return value ? JSON.parse(value) : initialValue
    })

    const setValue = value => {
        setStoreValue(value)

        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [ storeValue, setValue ]

}

export default useLocalStorage;