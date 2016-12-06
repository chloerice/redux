import React from 'react';
import Lyrics from '../components/Lyrics';
import store from '../store';
import axios from 'axios';
import {setLyrics} from '../action-creators/lyrics';
import {fetchLyrics} from '../action-creators/async';

class LyricsContainer extends React.Component {

  constructor(){
    super();
    this.state =  Object.assign({
      artistQuery: '',
      songQuery: '',
    }, store.getState());

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState(store.getState());
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({artistQuery:artist});
  }

  handleSongInput(song){
    this.setState({songQuery:song});
  }

  handleSubmit(){
    event.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {

      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));

    }

  }
  render () {

    return (
            <Lyrics lyrics={this.state.lyrics.lyric}
                    setArtist={this.handleArtistInput}
                    artistQuery={this.state.artistQuery}
                    setSong={this.handleSongInput}
                    songQuery={this.state.songQuery}
                    handleSubmit={this.handleSubmit}
            />
    );
  }
}

export default LyricsContainer;
