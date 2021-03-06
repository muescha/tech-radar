import React from 'react';
import { Typography } from '@material-ui/core';

export class Header extends React.Component {
  render = () => (
    <>
      <Typography variant="h4">
        Technology radar - Grzegorz Marchwiński
      </Typography>

      <Typography variant="subtitle1">
        <a className="social-icon" title="Fork me at github"
          href="https://github.com/yaneek/tech-radar" target="_BLANK" rel="noopener noreferrer">
          <img alt="github" src="./img/GitHub-Mark-32px.png"></img>
        </a>
        <a className="social-icon" title="Linkedin"
          href="https://www.linkedin.com/in/grzegorz-marchwinski/" target="_BLANK" rel="noopener noreferrer" >
          <img alt="github" src="./img/In-Black-34px-R.png"></img>
        </a>
      </Typography>
      {this.props.children}
    </>
  );
}

