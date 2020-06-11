import React from 'react';
import { useState } from 'react';

const Form = ({ setLyricsSearch }) => {
  const [dataSearch, setDataSearch] = useState({
    artist: '',
    song: '',
  });

  const [error, setError] = useState(false);

  const { artist, song } = dataSearch;

  // Función para leer el contenido de cada input
  const updateState = (event) => {
    setDataSearch({
      ...dataSearch,
      [event.target.name]: event.target.value,
    });
  };

  // Consultar las APIS
  const searchInfo = (event) => {
    event.preventDefault();
    if (artist.trim() === '' || song.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    //Pasar al componente principal
    setLyricsSearch(dataSearch);
  };

  return (
    <div className="bg-info">
      {error ? <p className="alert alert-danger text-center p-2">All fields are required.</p> : null}
      <div className="container">
        <div className="row">
          <form className="col card text-white bg-transparent mb-5 pt-5 pb-2" onSubmit={searchInfo}>
            <fieldset>
              <legend className="text-center">Search Lyrics Songs</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      id="artist"
                      placeholder="Artist Name"
                      onChange={updateState}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="song">Song</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      id="song"
                      placeholder="Song Name"
                      onChange={updateState}
                      value={song}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Search
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
