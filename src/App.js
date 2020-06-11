import React, { Fragment } from 'react';
import Form from './components/Form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Song from './components/Song';
import Artist from './components/Artist';

function App() {
  const [lyricsSearch, setLyricsSearch] = useState({});
  const [lyrics, setLyrics] = useState('');
  const [artistInfo, setArtistInfo] = useState({});
  useEffect(() => {
    if (Object.keys(lyricsSearch).length === 0) return;

    const fetchApiLyrics = async () => {
      const { artist, song } = lyricsSearch;
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const urlInfoArtist = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

      const [lyrics, information] = await Promise.all([axios.get(url), axios.get(urlInfoArtist)]);

      setLyrics(lyrics.data.lyrics);
      setArtistInfo(information.data.artists[0]);

      setLyricsSearch({});
    };

    fetchApiLyrics();
  }, [lyricsSearch, artistInfo]);
  return (
    <Fragment>
      <Form setLyricsSearch={setLyricsSearch} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Artist artistInfo={artistInfo} />
          </div>
          <div className="col-md-6">
            <Song lyrics={lyrics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
