import React from 'react';

const Lyrics = (props) => {

  const artistChange = e => {
    props.setArtist(e.target.value);
  };

  const songChange = e => {
    props.setSong(e.target.value);
  };

  return (
    <form className='form-group' style={{marginTop: '20px'}}>
      <input
        type="text"
        onChange={artistChange}
        value={props.artistQuery}
        className='form-control'
        placeholder="Enter artist name"
      />
      <input
        type="text"
        onChange={songChange}
        value={props.songQuery}
        className='form-control'
        placeholder="Enter song title"
      />
      <pre>{props.lyrics.text}</pre>
      <button
        type="submit"
        className="btn btn-success"
        onClick={props.handleSubmit}>
        Find Lyrics
      </button>
    </form>


  );
}

export default Lyrics;
