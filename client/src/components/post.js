import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { base64ToBlob } from '../snippets/helpers';

import 'style/post';

class Post extends Component {
  constructor(props) {
    super();
    const { user, audio, date, upvotes, downvotes, blobbase64, description } = props;
    this.state = {
      user,
      audio,
      date,
      upvotes,
      downvotes,
      blobbase64,
      description
    }
  }

  renderAudio() {
    const contentType = 'audio/ogg';
    const blob = base64ToBlob(this.state.blobbase64, contentType);
    const audioURL = window.URL.createObjectURL(blob);

    return (
      <audio controls src={audioURL}></audio>
    );
  }

  render() {
    const { user, audio, date, upvotes, downvotes, description } = this.state;
    return (
      <Card className="post">
        <CardHeader
          title={user}
          subtitle={date}
          //avatar="images/jsa-128.jpg"
        />
        <div className="audio-player">
          {this.renderAudio()}
        </div>
        { description &&
          <CardText>
            {description}
          </CardText>
        }
      </Card>
    );
  }
}

export default Post;
