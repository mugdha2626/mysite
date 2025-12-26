import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto 100px;
  text-align: center;
  padding: 100px 0;
  position: relative;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
    padding: 60px 0;
  }

  .label {
    font-family: var(--font-sans);
    font-size: var(--fz-xs);
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 20px;
  }

  .title {
    font-family: var(--font-serif);
    font-size: clamp(40px, 6vw, 60px);
    font-weight: 400;
    color: var(--lightest-slate);
    margin-bottom: 30px;

    .highlight {
      font-style: italic;
      color: var(--rose);
    }
  }

  .description {
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.7;
    color: var(--slate);
    max-width: 500px;
    margin: 0 auto 50px;
  }

  .email-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 40px;
    background: var(--green);
    color: var(--cream-light);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    font-weight: 500;
    text-decoration: none;
    border-radius: var(--border-radius-xl);
    transition: var(--transition);

    svg {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: var(--green-light);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -10px rgba(45, 90, 74, 0.3);

      svg {
        transform: translateX(5px);
      }
    }
  }

  .decorative-dots {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;

    .dot {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: var(--green);
      border-radius: 50%;
      animation: ${float} 4s ease-in-out infinite;
      opacity: 0.4;

      &.dot-1 {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }

      &.dot-2 {
        top: 30%;
        right: 15%;
        background-color: var(--rose);
        animation-delay: 1s;
      }

      &.dot-3 {
        bottom: 25%;
        left: 20%;
        width: 8px;
        height: 8px;
        animation-delay: 2s;
      }

      &.dot-4 {
        bottom: 35%;
        right: 10%;
        width: 6px;
        height: 6px;
        background-color: var(--rose);
        animation-delay: 1.5s;
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <div className="decorative-dots">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
        <div className="dot dot-4"></div>
      </div>

      <div className="label">What's Next?</div>

      <h2 className="title">
        Let's <span className="highlight">connect</span>
      </h2>

      <p className="description">
        Always eager to connect! Whether you have a question, a project idea, or just want to say
        hello, feel free to reach out. Let's create something amazing together.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </StyledContactSection>
  );
};

export default Contact;
