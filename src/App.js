import React, { Fragment } from 'react';
import Form from './components/Form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Song from './components/Song';

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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Song lyrics={lyrics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
