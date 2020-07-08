import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseWidget from '../base';
import './styles.scss';

export default class HealthCheck extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      networkError: undefined,
      updatedAt: undefined,
      build: {
        repository: '',
        branch: '',
        buildNumber: '',
        commit: '',
        buildUrl: '',
        nodeVersion: '',
        buildDate: '',
      },
      healthCheck: [],
    };
  }

  render() {
    const { healthCheck, build, networkError = false } = this.state;
    const isIll = healthCheck.filter(({ status }) => status !== 'OK').length > 0;
    const className = `widget__ping--${isIll ? 'ill' : 'healthy'}`;
    const networkErrorClass = networkError ? 'widget__network--error' : '';
    const classList = classNames(...this.classList, className, networkErrorClass);

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>

        {networkError && <h3>NETWORK ERROR</h3>}
        <div className="widget__ping--list">
          <h4>Branch: <strong>{build.branch}</strong></h4><hr />
          <h4>Build #: <strong>{build.buildNumber}</strong></h4><hr />
          <h4>Commit: <strong>{build.commit}</strong></h4><hr />
          <h4>Build Date: <strong>{build.buildDate}</strong></h4><hr />
        </div>

        <h5>CheckList:</h5>
        <ul className="widget__ping--list">
          {healthCheck
            .map(({ Name, status }) => {
              const listItem = status !== 'OK' ? 'flashing' : '';
              return <li className={listItem}>{Name} : {status}</li>;
            })}
        </ul>
        <hr />

        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

HealthCheck.propTypes = {
  title: PropTypes.string.isRequired,
};
