import React from 'react';

import { getAllTags, getRingFilters, getQuadrants, getQuadrantEntriesGroupedByTags } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar-actions';
import { IQuadrant } from '../types/IQuadrant';
import { Header } from './Header';
import { IRadarEntry } from '../types/IRadarEntry';
import { RingFilter } from '../types/RingFilter';
import { RingType } from '../types/RingType';

interface IAppProps {
  radarId: string;
}

interface IAppState {
  tags: string[],
  selectedTags: string[],
  rings: RingFilter,
  selectedRings: RingType[],
  quadrants: IQuadrant[],
  entries: IRadarEntry[],
};

export class AppContainer extends React.Component<IAppProps, IAppState>{
  constructor(props: IAppProps) {
    super(props);
    const quadrants = getQuadrants();

    this.state = {
      tags: getAllTags(),
      selectedTags: [],
      rings: getRingFilters(),
      selectedRings: [],
      quadrants,
      entries: getQuadrantEntriesGroupedByTags(quadrants, [], []),
    };
  }

  selectTags = (selectedTags: string[]) => {
    this.setState({ selectedTags }, this.renderExternalRadar);
  }

  selectRings = (selectedRings: RingType[]) => {
    this.setState({ selectedRings }, this.renderExternalRadar);
  }

  componentDidMount() {
    this.renderExternalRadar();
  }

  renderExternalRadar = () => {
    setTimeout(() => {
      const selectedRingsValues = this.state.rings[this.state.selectedRings[0]] || [];
      const entries = getQuadrantEntriesGroupedByTags(this.state.quadrants, this.state.selectedTags, selectedRingsValues);
      redrawRadar({
        radarId: this.props.radarId,
        quadrants: this.state.quadrants,
        entries,
      });
    }, 0);
  }

  render = () => (
    <>
      <Header>
        <FilterContainer
          caption="Filter by tag"
          tags={this.state.tags.sort()}
          selectedTags={this.state.selectedTags}
          selectTags={this.selectTags}
        />
        <FilterContainer
          caption="Filter by ring"
          tags={Object.keys(this.state.rings)}
          selectedTags={this.state.selectedRings}
          selectTags={this.selectRings}
        />
      </Header>
    </>
  )
}