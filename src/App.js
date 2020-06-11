import React, { Fragment } from 'react';
import Form from './components/Form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [lyricsSearch, setLyricsSearch] = useState({});
  const [lyrics, setLyrics] = useState('');
  useEffect(() => {
    if (Object.keys(lyricsSearch).length === 0) return;

    const fetchApiLyrics = async () => {
      const { artist, song } = lyricsSearch;
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const result = await axios.get(url);
      setLyrics(result.data.lyrics);
    };
    fetchApiLyrics();
  }, [lyricsSearch]);
  return (
    <Fragment>
      <Form setLyricsSearch={setLyricsSearch} />
    </Fragment>
  );
}

export default App;
