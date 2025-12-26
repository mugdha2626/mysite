import { css } from 'styled-components';

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius-xl);
  font-size: var(--fz-sm);
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  padding: 1.25rem 1.75rem;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: var(--green-tint);
    transform: translateY(-3px);
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    font-weight: 500;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green-light);
      outline: 0;
    }
  `,

  button,

  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius-xl);
    padding: 0.75rem 1.25rem;
    font-size: var(--fz-xs);
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--green-tint);
      transform: translateY(-2px);
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--cream-light);
    background-color: var(--green);
    border: none;
    border-radius: var(--border-radius-xl);
    padding: 1.25rem 2rem;
    font-size: var(--fz-md);
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--green-light);
      transform: translateY(-4px);
      box-shadow: 0 15px 30px -10px rgba(45, 90, 74, 0.3);
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 15px 40px -15px rgba(45, 90, 74, 0.1);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 25px 50px -15px rgba(45, 90, 74, 0.15);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '\\2022';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
