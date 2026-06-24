import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const auroraShift = keyframes`
  0% {
    background-position: 12% 18%, 88% 82%;
  }
  50% {
    background-position: 26% 32%, 74% 68%;
  }
  100% {
    background-position: 12% 18%, 88% 82%;
  }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  min-height: 100vh;
  padding-top: var(--nav-height);
  padding-bottom: 50px;
  position: relative;
  overflow: hidden;

  /* Full-bleed ambient wash — radial glows fade to transparent, so it always
     fills the section and never looks cropped. Sizes are viewport-relative. */
  background-image: radial-gradient(circle, var(--card-green) 0%, transparent 70%),
    radial-gradient(circle, var(--card-rose) 0%, transparent 70%);
  background-repeat: no-repeat;
  background-size: 75% 75%, 70% 70%;
  background-position: 12% 18%, 88% 82%;
  animation: ${auroraShift} 24s ease-in-out infinite;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding-top: calc(var(--nav-height) + 50px);
    background-size: 110% 60%, 100% 55%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;

  @media (max-width: 1080px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const StyledTextContent = styled.div`
  .intro {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: var(--slate);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    font-weight: 400;
    letter-spacing: 0.02em;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .dot {
      width: 8px;
      height: 8px;
      background-color: var(--green);
      border-radius: 50%;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }

  .name {
    font-family: var(--font-serif);
    font-size: clamp(50px, 10vw, 100px);
    font-weight: 400;
    line-height: 1;
    color: var(--lightest-slate);
    margin: 0;
  }

  .last-name {
    font-family: var(--font-serif);
    font-size: clamp(50px, 10vw, 100px);
    font-weight: 400;
    font-style: italic;
    line-height: 1;
    color: var(--rose);
    margin: 0 0 30px 0;
  }

  .tagline {
    font-family: var(--font-serif);
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 400;
    color: var(--slate);
    margin-bottom: 25px;

    .highlight {
      font-style: italic;
      color: var(--rose);
    }

    .rotating {
      display: inline-block;
      color: var(--green);
    }

    .type-cursor {
      display: inline-block;
      margin-left: 2px;
      font-style: normal;
      font-weight: 300;
      color: var(--green);
      animation: ${blink} 1s step-end infinite;
    }
  }

  .description {
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    color: var(--slate);
    line-height: 1.6;
    max-width: 500px;
    margin-bottom: 40px;

    .highlight {
      color: var(--green);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }

    a {
      color: var(--green);
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        color: var(--green-light);
      }
    }
  }

  .social-links {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--slate);
      font-family: var(--font-sans);
      font-size: var(--fz-sm);
      font-weight: 500;
      text-decoration: none;
      transition: var(--transition);

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        color: var(--green);
        transform: translateY(-2px);
      }
    }
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: clamp(280px, 35vw, 400px);
  height: clamp(280px, 35vw, 400px);

  .profile-ring {
    position: absolute;
    inset: -15px;
    border: 2px solid var(--lightest-navy);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, var(--card-rose) 0%, var(--card-green) 100%);
    box-shadow: 0 20px 60px -10px rgba(45, 90, 74, 0.15);

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }

    img {
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .floating-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: var(--green);
    border-radius: 50%;
    animation: ${float} 4s ease-in-out infinite;

    &.dot-1 {
      top: 5%;
      left: 10%;
      animation-delay: 0s;
    }

    &.dot-2 {
      bottom: 10%;
      right: 5%;
      animation-delay: 1s;
      background-color: var(--rose);
    }

    &.dot-3 {
      top: 50%;
      right: -5%;
      width: 8px;
      height: 8px;
      animation-delay: 2s;
    }
  }
`;

const arrowBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
`;

const StyledScrollIndicator = styled.a`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: var(--light-slate);
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    color: var(--green);
  }

  .text {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .arrow {
    animation: ${arrowBounce} 2s ease-in-out infinite;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ROTATING_WORDS = ['fintech.', 'DeFi rails.', 'trading systems.', 'things people use.'];

const RotatingWord = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const word = ROTATING_WORDS[index];

    // Finished typing — hold, then start deleting.
    if (!deleting && subIndex === word.length) {
      const hold = setTimeout(() => setDeleting(true), 1700);
      return () => clearTimeout(hold);
    }

    // Finished deleting — advance to the next word.
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex(prev => (prev + 1) % ROTATING_WORDS.length);
      return undefined;
    }

    const tick = setTimeout(
      () => setSubIndex(prev => prev + (deleting ? -1 : 1)),
      deleting ? 45 : 85,
    );
    return () => clearTimeout(tick);
  }, [subIndex, deleting, index, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className="highlight">fintech.</span>;
  }

  return (
    <span className="rotating">
      {ROTATING_WORDS[index].substring(0, subIndex)}
      <span className="type-cursor">|</span>
    </span>
  );
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const content = (
    <StyledContent>
      <StyledTextContent>
        <div className="intro">
          Hi, my name is <span className="dot"></span>
        </div>
        <h1 className="name">Mugdha</h1>
        <h1 className="last-name">Patil</h1>
        <p className="tagline">
          and I love building <RotatingWord />
        </p>
        <p className="description">
          I'm a CS student at Purdue University building at the intersection of{' '}
          <span className="highlight">fintech</span>, blockchain, and AI/ML — from on-chain trading
          systems to full-stack products.
        </p>
        <div className="social-links">
          <a href="https://github.com/mugdha2626" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mugdhadpatil/" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a href="mailto:mugdhapatil225@gmail.com">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            Email
          </a>
          <a href="https://x.com/MugdhaPatil17" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </a>
        </div>
      </StyledTextContent>

      <StyledImageWrapper>
        <StyledImageContainer>
          <div className="profile-ring"></div>
          <div className="profile-image">
            <StaticImage
              src="../../images/me.jpg"
              width={400}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Mugdha Patil"
              placeholder="blurred"
            />
          </div>
          <div className="floating-dot dot-1"></div>
          <div className="floating-dot dot-2"></div>
          <div className="floating-dot dot-3"></div>
        </StyledImageContainer>
      </StyledImageWrapper>
    </StyledContent>
  );

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        content
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: '100ms' }}>{content}</div>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}

      <StyledScrollIndicator href="#about">
        <span className="text">Scroll</span>
        <div className="arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </StyledScrollIndicator>
    </StyledHeroSection>
  );
};

export default Hero;
