import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1100px;
  padding: 120px 0;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StyledLabel = styled.span`
  font-family: var(--font-sans);
  font-size: var(--fz-xs);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--green);
  padding-top: 15px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const StyledMainContent = styled.div`
  .headline {
    font-family: var(--font-serif);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 400;
    line-height: 1.2;
    color: var(--lightest-slate);
    margin-bottom: 30px;

    .highlight {
      font-style: italic;
      color: var(--rose);
    }

    .highlight-green {
      font-style: italic;
      color: var(--green);
    }
  }

  .description {
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.7;
    color: var(--slate);
    max-width: 700px;
    margin-bottom: 50px;

    a {
      color: var(--green);
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        color: var(--green-light);
      }
    }
  }
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, var(--lightest-navy), transparent);
  margin-bottom: 50px;
`;

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
`;

const StyledStat = styled.div`
  .number {
    font-family: var(--font-serif);
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 400;
    font-style: italic;
    color: var(--green);
    line-height: 1;
    margin-bottom: 8px;
  }

  .label {
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 400;
    color: var(--slate);
    line-height: 1.4;
  }
`;

const useCountUp = (end, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) {
      return;
    }

    let startTime;
    const animate = currentTime => {
      if (!startTime) {
        startTime = currentTime;
      }
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);

  return count;
};

const AnimatedStat = ({ number, suffix, label, startCounting }) => {
  const count = useCountUp(number, 2000, startCounting);

  return (
    <StyledStat>
      <div className="number">
        {suffix === '$'
          ? `$${count.toLocaleString()}${number >= 1000 ? 'k' : ''}`
          : `${count}${suffix}`}
      </div>
      <div className="label">{label}</div>
    </StyledStat>
  );
};

AnimatedStat.propTypes = {
  number: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  label: PropTypes.string.isRequired,
  startCounting: PropTypes.bool,
};

AnimatedStat.defaultProps = {
  suffix: '+',
  startCounting: false,
};

const About = () => {
  const revealContainer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (revealContainer.current) {
      observer.observe(revealContainer.current);
    }

    sr.reveal(revealContainer.current, srConfig());

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 8, suffix: '+', label: 'Hackathon Wins' },
    { number: 15, suffix: 'k+', label: 'Grants & Bounties', prefix: '$' },
    { number: 40, suffix: '+', label: 'Developers Led' },
    { number: 14, suffix: '+', label: 'Paying Customers' },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <StyledContent>
        <StyledLabel>About</StyledLabel>

        <StyledMainContent>
          <h2 className="headline">
            Crafting the intersection of <span className="highlight">technology</span> and{' '}
            <span className="highlight-green">innovation</span>
          </h2>

          <p className="description">
            Currently, I'm conducting AI research while leading development teams at{' '}
            <a href="https://boilerblockchain.org" target="_blank" rel="noreferrer">
              Boiler Blockchain
            </a>{' '}
            and co-founding{' '}
            <a href="https://www.stax.so/" target="_blank" rel="noreferrer">
              Stax Trading
            </a>
            . I've built crypto trading simulators used by 14+ university clubs and
            hackathon-winning DeFi applications that earned over $15,000 in grants and bounties.
          </p>

          <StyledDivider />

          <StyledStats>
            {stats.map((stat, i) => (
              <AnimatedStat
                key={i}
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                startCounting={isVisible}
              />
            ))}
          </StyledStats>
        </StyledMainContent>
      </StyledContent>
    </StyledAboutSection>
  );
};

export default About;
