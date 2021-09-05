import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
import './App.css'


export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {

    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
      console.log(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);


  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>♥</span> por Carlos André<br />
        Desenvolvido com base no <a href='https://www.youtube.com/watch?v=tBweoUiMsDg&t=7258s' target='_blank'>tutorial de Bonieky Lacerda</a><br />
        Direitos de imagem para Netflix <br />
        Dados pegos do <a href='https://www.themoviedb.org/' target='_blank'>Themoviedb.org</a> <br />
      </footer>


      {movieList <= 0 &&
        <div className='loading'>
          <img src='https://c.tenor.com/NerN41mjgV0AAAAC/netflix-intro.gif' alt='Carregando' />
        </div>
      }
    </div>
  )
}