/* eslint-disable react/prop-types */
import React, {Component} from 'react';

export const ScrollRevealContainer = (Original) =>
  class extends Component {
    constructor(props) {
      super(props);
      this.target = [];
    }
    componentDidMount() {
      window
        .ScrollReveal()
        .reveal(
          this.props.target,
          JSON.parse(this.props.options),
          this.props.interval
        );
    }
    componentWillUnmount() {
      window.ScrollReveal().clean(this.childNodes);
    }
    render() {
      const children = React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, {
          ref: (c) => {
            (c) => (this.target = c);
          },
        })
      );
      return <Original {...this.props}>{children}</Original>;
    }
  };

export default ScrollRevealContainer;
