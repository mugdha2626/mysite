import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const StyledCredit = styled.div`
  color: var(--slate);
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  line-height: 1.5;

  a {
    color: var(--green);
    padding: 0 5px;
    transition: var(--transition);

    &:hover {
      color: var(--green-light);
    }
  }

  .credit-text {
    margin-bottom: 10px;
  }

  .github-stats {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
    font-size: var(--fz-xs);

    span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--slate);
      background: var(--light-navy);
      padding: 6px 12px;
      border-radius: var(--border-radius-xl);
      transition: var(--transition);

      &:hover {
        background: var(--green-tint);
        color: var(--green);
      }
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/mugdha2626/mysite')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
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

      <StyledCredit tabIndex="-1">
        <div className="credit-text">
          Built by <a href="https://github.com/mugdha2626/mysite">Mugdha Patil</a>
        </div>

        {githubInfo.stars !== null && githubInfo.forks !== null && (
          <div className="github-stats">
            <span>
              <Icon name="Star" />
              {githubInfo.stars.toLocaleString()}
            </span>
            <span>
              <Icon name="Fork" />
              {githubInfo.forks.toLocaleString()}
            </span>
          </div>
        )}
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
