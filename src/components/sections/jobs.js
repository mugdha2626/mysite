import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { highlightMetrics } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 900px;
  padding: 100px 0;
`;

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const StyledLabel = styled.span`
  display: inline-block;
  font-family: var(--font-sans);
  font-size: var(--fz-xs);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 15px;
`;

const StyledTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.3;
  color: var(--lightest-slate);
  margin: 0;

  .highlight {
    font-style: italic;
    color: var(--rose);
  }
`;

const StyledJobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StyledJobItem = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 40px;
  padding: 35px 0;
  border-bottom: 1px solid var(--lightest-navy);
  transition: var(--transition);

  &:first-child {
    border-top: 1px solid var(--lightest-navy);
  }

  &:hover {
    .job-content {
      transform: translateX(5px);
    }

    .job-date {
      color: var(--green);
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 25px 0;
  }
`;

const StyledDate = styled.div`
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  color: var(--slate);
  padding-top: 5px;
  transition: var(--transition);

  @media (max-width: 600px) {
    padding-top: 0;
  }
`;

const StyledContent = styled.div`
  transition: transform 0.3s ease;
`;

const StyledCompanyRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const StyledCompany = styled.h3`
  font-family: var(--font-serif);
  font-size: var(--fz-xl);
  font-weight: 500;
  color: var(--lightest-slate);
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }
`;

const StyledRole = styled.span`
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  color: var(--slate);

  &::before {
    content: '—';
    margin-right: 8px;
    color: var(--light-slate);

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const StyledLocation = styled.span`
  font-family: var(--font-sans);
  font-size: var(--fz-xs);
  color: var(--light-slate);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const StyledDescription = styled.div`
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  line-height: 1.7;
  color: var(--slate);

  .metric {
    color: var(--green);
    font-weight: 600;
  }

  a {
    color: var(--green);
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: var(--transition);

    &:hover {
      border-bottom-color: var(--green);
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 5px;
        height: 5px;
        background-color: var(--green);
        border-radius: 50%;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  p {
    margin: 0;
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <StyledHeader>
        <StyledLabel>Experience</StyledLabel>
        <StyledTitle>
          Where I've <span className="highlight">worked</span>
        </StyledTitle>
      </StyledHeader>

      <StyledJobsList>
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range, location } = frontmatter;

            return (
              <StyledJobItem key={i}>
                <StyledDate className="job-date">{range}</StyledDate>

                <StyledContent className="job-content">
                  <StyledCompanyRow>
                    <StyledCompany>
                      <a href={url} target="_blank" rel="noreferrer">
                        {company}
                      </a>
                    </StyledCompany>
                    <StyledRole>{title}</StyledRole>
                  </StyledCompanyRow>

                  {location && (
                    <StyledLocation>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {location}
                    </StyledLocation>
                  )}

                  <StyledDescription dangerouslySetInnerHTML={{ __html: highlightMetrics(html) }} />
                </StyledContent>
              </StyledJobItem>
            );
          })}
      </StyledJobsList>
    </StyledJobsSection>
  );
};

export default Jobs;
