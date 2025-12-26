import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { Side } from '@components';

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background: linear-gradient(to bottom, var(--green), transparent);
  }

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-sans);
    font-size: var(--fz-xs);
    font-weight: 500;
    line-height: var(--fz-lg);
    letter-spacing: 0.05em;
    writing-mode: vertical-rl;
    color: var(--slate);
    transition: var(--transition);

    &:hover,
    &:focus {
      transform: translateY(-3px);
      color: var(--green);
    }
  }
`;

const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Side>
);

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;
