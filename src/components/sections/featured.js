import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { highlightMetrics } from '@utils';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  max-width: 1200px;
  padding: 100px 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 60px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
`;

const StyledHeaderLeft = styled.div`
  .label {
    font-family: var(--font-sans);
    font-size: var(--fz-xs);
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 15px;
  }

  .title {
    font-family: var(--font-serif);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 400;
    line-height: 1.2;
    color: var(--lightest-slate);
    margin: 0;

    .highlight {
      font-style: italic;
      color: var(--rose);
    }

    .highlight-green {
      font-style: italic;
      color: var(--green);
    }
  }
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledProjectCard = styled.article`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: var(--transition);

  &:nth-child(odd) {
    margin-top: 0;
  }

  &:nth-child(even) {
    margin-top: 40px;

    @media (max-width: 900px) {
      margin-top: 0;
    }
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px -15px rgba(45, 90, 74, 0.15);

    .project-image-wrapper {
      .overlay-icon {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  height: 280px;
  background: ${({ $colorIndex }) => {
    const colors = [
      'var(--card-green)',
      'var(--card-rose)',
      'var(--card-sage)',
      'var(--card-cream)',
    ];
    return colors[$colorIndex % colors.length];
  }};
  overflow: hidden;

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transition: var(--transition);
  }

  .overlay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    svg {
      width: 24px;
      height: 24px;
      color: var(--green);
    }
  }

  .decorative-circles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    pointer-events: none;

    .circle {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;

      &.circle-1 {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &.circle-2 {
        width: 70%;
        height: 70%;
        top: 15%;
        left: 15%;
      }
    }
  }

  .prize-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    padding: 8px 16px;
    border-radius: var(--border-radius-xl);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 600;
    color: var(--green);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .add-image-hint {
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.95);
    padding: 8px 16px;
    border-radius: var(--border-radius-xl);
    font-family: var(--font-sans);
    font-size: var(--fz-xs);
    color: var(--slate);

    .dot {
      width: 6px;
      height: 6px;
      background-color: var(--green);
      border-radius: 50%;
    }
  }
`;

const StyledCardContent = styled.div`
  padding: 30px;
  background: var(--cream-light);
`;

const StyledProjectTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: var(--fz-xxl);
  font-weight: 500;
  color: var(--lightest-slate);
  margin: 0 0 10px 0;

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }
`;

const StyledDescription = styled.div`
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  line-height: 1.6;
  color: var(--slate);
  margin-bottom: 20px;

  .metric {
    color: var(--green);
    font-weight: 600;
  }

  p {
    margin: 0;
  }
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    background: var(--light-navy);
    padding: 6px 14px;
    border-radius: var(--border-radius-xl);
    font-family: var(--font-sans);
    font-size: var(--fz-xs);
    color: var(--slate);
    transition: var(--transition);

    &:hover {
      background: var(--green-tint);
      color: var(--green);
    }
  }
`;

const StyledProjectLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    color: var(--slate);
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

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
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

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledProjectsSection id="projects">
      <StyledHeader ref={revealTitle}>
        <StyledHeaderLeft>
          <div className="label">Projects</div>
          <h2 className="title">
            Hackathon <span className="highlight">wins</span> &{' '}
            <span className="highlight-green">builds</span>
          </h2>
        </StyledHeaderLeft>
      </StyledHeader>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProjectCard key={i} ref={el => (revealProjects.current[i] = el)}>
                <a href={external || github || '#'} target="_blank" rel="noreferrer">
                  <StyledImageWrapper className="project-image-wrapper" $colorIndex={i}>
                    {image ? (
                      <GatsbyImage image={image} alt={title} className="project-image" />
                    ) : (
                      <>
                        <div className="decorative-circles">
                          <div className="circle circle-1"></div>
                          <div className="circle circle-2"></div>
                        </div>
                        <div className="add-image-hint">
                          <span className="dot"></span>
                          Add project image
                        </div>
                      </>
                    )}
                    <div className="overlay-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </StyledImageWrapper>
                </a>

                <StyledCardContent>
                  <StyledProjectTitle>
                    <a href={external || github || '#'} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  </StyledProjectTitle>

                  <StyledDescription dangerouslySetInnerHTML={{ __html: highlightMetrics(html) }} />

                  {tech && tech.length > 0 && (
                    <StyledTechList>
                      {tech.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </StyledTechList>
                  )}

                  <StyledProjectLinks>
                    {github && (
                      <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && (
                      <a
                        href={external}
                        aria-label="External Link"
                        target="_blank"
                        rel="noreferrer">
                        <Icon name="External" />
                      </a>
                    )}
                  </StyledProjectLinks>
                </StyledCardContent>
              </StyledProjectCard>
            );
          })}
      </StyledProjectsGrid>
    </StyledProjectsSection>
  );
};

export default Featured;
