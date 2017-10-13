import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Loader from 'react-loader';

@observer
export default class Infobox extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    icon: PropTypes.string,
    type: PropTypes.string,
    ctaOnClick: PropTypes.func,
    ctaLabel: PropTypes.string,
    ctaLoading: PropTypes.bool,
    dismissable: PropTypes.bool,
  };

  static defaultProps = {
    icon: '',
    type: 'primary',
    dismissable: false,
    ctaOnClick: () => null,
    ctaLabel: '',
    ctaLoading: false,
  };

  state = {
    dismissed: false,
  };

  render() {
    const {
      children,
      icon,
      type,
      ctaLabel,
      ctaLoading,
      ctaOnClick,
      dismissable,
    } = this.props;

    if (this.state.dismissed) {
      return null;
    }

    return (
      <div
        className={classnames({
          infobox: true,
          [`infobox--${type}`]: type,
          'infobox--default': !type,
        })}
      >
        {icon && (
          <i className={`mdi mdi-${icon}`} />
        )}
        <div className="infobox__content">
          {children}
        </div>
        {ctaLabel && (
          <button
            className="infobox__cta"
            onClick={ctaOnClick}
          >
            <Loader
              loaded={!ctaLoading}
              lines={10}
              scale={0.3}
              color="#FFF"
              component="span"
            />
            {ctaLabel}
          </button>
        )}
        {dismissable && (
          <button
            onClick={() => this.setState({
              dismissed: true,
            })}
            className="infobox__delete mdi mdi-close"
          />
        )}
      </div>
    );
  }
}