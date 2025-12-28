import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 100px;
  padding: 30px 50px;
  text-align: center;
  background: linear-gradient(to bottom, var(--cream), var(--cream-dark));
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 300px;
    margin: 0 auto 20px;
    color: var(--slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 12px;
      border-radius: 50%;
      transition: var(--transition);

      &:hover {
        background-color: var(--green-tint);
        color: var(--green);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
      </ul>
    </StyledSocialLinks>
  </StyledFooter>
);

export default Footer;
