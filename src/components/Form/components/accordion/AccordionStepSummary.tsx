// External imports
import { FC } from 'react';
import { AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Internal imports
import { AccordionHeader, accordionSummeryStyle } from '../../styles';
import Typography from '../../../UI/Typography/Typography';

interface AccordionStepSummaryProps {
  stepIndex: number;
  title: string;
  summary?: string;
  handleExpended?: (step: number) => void;
}

export const AccordionStepSummary: FC<AccordionStepSummaryProps> = ({
  title,
  summary,
  handleExpended,
  stepIndex
}) => {
  const onClickExpend = () => {
    if (handleExpended) {
      handleExpended(stepIndex);
    }
  };

  return (
    <AccordionSummary
      sx={accordionSummeryStyle}
      expandIcon={<ExpandMoreIcon onClick={onClickExpend} />}>
      <AccordionHeader>
        <Typography type="heading-md" weight="semibold">
          {`Step ${Number(stepIndex) + 1} - ${title}`}
        </Typography>
        <Typography
          type="subheading"
          weight="semibold"
          color="#5A5A5A"
          style={{ marginTop: '9px' }}>
          {summary}
        </Typography>
      </AccordionHeader>
    </AccordionSummary>
  );
};
