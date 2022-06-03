import lexin from '../assets/lexin';

const Search = (props) => {

  const handleChange = (e) => {
    const input = e.target.value;
    props.setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase().replace(/[0-9,~, ]/g, '');
      if (wordForm.startsWith(input.toLowerCase().replace(/[0-9,~, ]/g, ''))) matches.push(lexin.words[i]);
    }
    props.setFiltered(matches);
    const firstWord = matches[0];
    if (firstWord) {
      props.setSelected(firstWord);
      props.setResult(firstWord);
      document.getElementById('filtered').scrollTop = 0;
    }
  }

  const clearSearch = () => {
    props.setSearch('');
    document.getElementById('word').focus();
    document.getElementById('word').select();
  }

  return (
    <div id='search'>
      <input 
        id='word' type='text' 
        placeholder='Type a word to look up' 
        onChange={ handleChange } 
        value={ props.search } 
        autoFocus='autofocus'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
      />
      <span id='clear' title='Clear search (esc)' onClick={ clearSearch }></span>
    </div>
  );

}

export default Search;