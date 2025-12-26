import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  max-width: 1200px;
  padding: 80px 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 400;
  color: var(--lightest-slate);
  margin: 0;

  .highlight {
    font-style: italic;
    color: var(--rose);
  }
`;

const StyledArchiveLink = styled(Link)`
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  color: var(--green);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);

  &:hover {
    color: var(--green-light);
    gap: 12px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledProjectsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledProject = styled.li`
  position: relative;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      .project-inner {
        transform: translateY(-7px);
        box-shadow: 0 25px 50px -12px rgba(45, 90, 74, 0.12);
      }
    }
  }
`;

const StyledProjectInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;
  border-radius: var(--border-radius-lg);
  background: ${({ $colorIndex }) => {
    const colors = [
      'var(--card-cream)',
      'var(--card-sage)',
      'var(--card-rose)',
      'var(--card-green)',
    ];
    return colors[$colorIndex % colors.length];
  }};
  transition: var(--transition);
`;

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
`;

const StyledFolder = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;

  svg {
    width: 24px;
    height: 24px;
    color: var(--green);
  }
`;

const StyledProjectLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a {
    color: var(--slate);
    padding: 5px;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StyledProjectTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: var(--fz-xl);
  font-weight: 500;
  color: var(--lightest-slate);
  margin: 0 0 15px 0;

  a {
    position: static;
    color: inherit;
    text-decoration: none;
    transition: var(--transition);

    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    &:hover {
      color: var(--green);
    }
  }
`;

const StyledProjectDescription = styled.div`
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  line-height: 1.6;
  color: var(--slate);
  flex-grow: 1;
  margin-bottom: 20px;

  p {
    margin: 0;
  }
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-family: var(--font-sans);
    font-size: var(--fz-xxs);
    color: var(--slate);
    background: rgba(255, 255, 255, 0.6);
    padding: 5px 12px;
    border-radius: var(--border-radius-xl);
    transition: var(--transition);
  }
`;

const StyledShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 60px auto 0;
  padding: 16px 32px;
  background: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius-xl);
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  font-weight: 500;
  color: var(--green);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--green-tint);
    transform: translateY(-3px);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    transform: ${({ $showMore }) => ($showMore ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = (node, i) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech } = frontmatter;

    return (
      <StyledProjectInner className="project-inner" $colorIndex={i}>
        <StyledProjectHeader>
          <StyledFolder>
            <Icon name="Folder" />
          </StyledFolder>
          <StyledProjectLinks>
            {github && (
              <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                <Icon name="GitHub" />
              </a>
            )}
            {external && (
              <a href={external} aria-label="External Link" target="_blank" rel="noreferrer">
                <Icon name="External" />
              </a>
            )}
          </StyledProjectLinks>
        </StyledProjectHeader>

        <StyledProjectTitle>
          <a href={external || github || '#'} target="_blank" rel="noreferrer">
            {title}
          </a>
        </StyledProjectTitle>

        <StyledProjectDescription dangerouslySetInnerHTML={{ __html: html }} />

        {tech && tech.length > 0 && (
          <StyledTechList>
            {tech.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </StyledTechList>
        )}
      </StyledProjectInner>
    );
  };

  return (
    <StyledProjectsSection>
      <StyledHeader>
        <StyledTitle ref={revealTitle}>
          Other <span className="highlight">noteworthy</span> projects
        </StyledTitle>
        <StyledArchiveLink to="/archive" ref={revealArchiveLink}>
          View the archive
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </StyledArchiveLink>
      </StyledHeader>

      <StyledProjectsGrid>
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node, i)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node, i)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </StyledProjectsGrid>

      {projects.length > GRID_LIMIT && (
        <StyledShowMoreButton $showMore={showMore} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </StyledShowMoreButton>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
