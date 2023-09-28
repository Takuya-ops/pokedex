import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  // ローディング中は別の画面を表示させる
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  // 次の20匹のURL
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  // {/* ブラウザをリロードした時にデータを取得（UseEffect） */}
  useEffect(() => {
    const fetchPokemonData = async () => {
      // ポケモンデータの取得
      let res = await getAllPokemon(initialURL)
      // 各ポケモンの詳細データを取得（URL内）
      loadPokemon(res.results)
      // console.log(res)
      setNextURL(res.next)
      setPrevURL(res.previous)
      setLoading(false)
    }
    fetchPokemonData()
  }, [])
  // dataはres.resultsと同義
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url)
        // pokemonRecordが_pokemonDataに入る
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  };
  // console.log(pokemonData)
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL)
    // console.log(data)
    await loadPokemon(data.results)
    // ３ページ以降も同じように表示させる
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  const handlePrevPage = async () => {
    // nullの時（1ページ目）は作動させない
    if (!prevURL) return;
    setLoading(true)
    let data = await getAllPokemon(prevURL)
    await loadPokemon(data.results)
    setPrevURL(data.previous)
    setLoading(false)
  }


  return (
    <>
    <Navbar/>
    <div className="App">
      {/* 条件分岐（三項演算子） */}
      {loading ? (
        // trueの場合
        <h1>ロード中・・・</h1>
        ) : (
        <>
        <div className='pokemonCardContainer'>
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />
          })}
        </div>
        <div className='btn'>
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
