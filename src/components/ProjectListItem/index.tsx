import { useState } from 'react';

import { divisorByChunk } from '../../helpers/divisorByChunk';
import ControlButtons from './ControlButtons';
import ProjectCard from './ProjectCard';
import { Grid, Wrapper } from './styles';
import { fakeData } from './data';

const ProjectListItem = () => {
  const [data, setData] = useState(divisorByChunk(fakeData, 10));
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const nextSlide = () => {
    if (slideIndex !== data?.length) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const quantity = divisorByChunk(fakeData, 10)?.length || 0;

  return (
    <Wrapper>
      <Grid>
        {data
          ? data[slideIndex].map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          : null}
      </Grid>
      <ControlButtons
        current={slideIndex + 1}
        quantity={quantity}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
    </Wrapper>
  );
};

export default ProjectListItem;
