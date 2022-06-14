import './App.scss';
import { useState, useEffect, useRef } from 'react';
import Search from './components/Search';
import Filtered from './components/Filtered';
import Result from './components/Result';
import { Wrapper, Main, Header, Footer } from './components/Layout';
import { isMobile } from 'react-device-detect';

function App() {

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState({});
  const [selected, setSelected] = useState({});

  const handleKeydown = (event) => {
    if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
      const indexOfSelected = filtered.indexOf(selected);
      const ulFiltered = document.getElementById('filtered');
      const liSelected = document.getElementsByClassName('selected')[0];
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (indexOfSelected > -1) {
            const nextWord = filtered[indexOfSelected + 1];
            if (nextWord) {
              setSelected(nextWord);
              setResult(nextWord);
              if (liSelected.nextSibling.getBoundingClientRect().bottom 
                - ulFiltered.getBoundingClientRect().height - 80 >= 0) {
                  ulFiltered.scrollTop = liSelected.nextSibling.offsetTop 
                  - ulFiltered.getBoundingClientRect().height;
                }
            }
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (indexOfSelected > -1) {
            const prevWord = filtered[indexOfSelected - 1];
            if (prevWord) {
              setSelected(prevWord);
              setResult(prevWord);
              if (liSelected.previousSibling.offsetTop - 75 <= ulFiltered.scrollTop) ulFiltered.scrollTop = liSelected.previousSibling.offsetTop - 75;
            }
          }
          break;
        case 'Escape':
          event.preventDefault();
          setSearch('');
          break;
        default: return;
      }
    }
  };

  // Add & remove eventListener upon mount & unmount
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const filteredRef = useRef(null);
  const searchFieldRef = useRef(null);

  return (
    <Wrapper className={ 
      (isMobile ? 'touch' : 'notouch') + 
      (search ? ' on' : '') 
    }>
      <Header />
      <Search 
        search={search} 
        setSearch={setSearch}
        setFiltered={setFiltered}
        setSelected={setSelected}
        setResult={setResult}
        searchFieldRef={searchFieldRef}
        filteredRef={filteredRef}
      />
      <Main className={ filtered.length ? '' : 'noresult' }>
        <Filtered 
          filtered={filtered} 
          setFiltered={setFiltered}
          setResult={setResult}
          setSelected={setSelected}
          selected={selected}
          filteredRef={filteredRef}
        />
        <Result 
          result={ result } 
          setSearch={setSearch}
        />
      </Main>
      <Footer />
    </Wrapper>
  );

}

export default App;