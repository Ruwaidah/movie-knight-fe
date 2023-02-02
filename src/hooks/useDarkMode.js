import useLocalStorage from './useLocalStorage' 

import { useEffect } from 'react'

const useDarkMode = () => {

    const [ darkMode, setDarkMode ] = useLocalStorage('Dark-Mode')

    useEffect(() => {

        return   darkMode === true ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode')

    },[darkMode])

    return [darkMode, setDarkMode]

}

export default useDarkMode;