import { useDispatch } from 'react-redux'
import { Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { router } from 'router'

import { setSettings } from 'store/actions/settingsAction'
import { setAgents } from 'store/actions/agentsAction'

import Loader from 'components/Loader'
import Header from 'components/Header'
import Aside from 'components/Aside'
import Nav from 'components/Nav'

import style from './index.module.scss'
import { setAuth } from 'store/actions/authAction'

const Home = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(setSettings())
    dispatch(setAgents()).then(json => {
      if(json.code) {
        sessionStorage.clear()
        dispatch(setAuth(null))
      }
      else {
        setLoading(false)
        setLoaded(true)
      }
    })
  }, [])

  useEffect(() => {
    if (!loaded)
      return

    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Nav />
      <Aside />
      <main className={style.main}>
        {
          <Suspense fallback={<Loader />}>
            <Routes>
              {router.map(item => (
                <Route
                  key={new Date().getTime()}
                  path={item.path}
                  element={item.element}
                />
              ))}
            </Routes>
          </Suspense>
        }
      </main>
    </>
  )
}

export default Home
