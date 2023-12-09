// Internal imports

// Form options: choose which ever one you would like to run
import { FormWithFsmHook as Form } from '../../components/Form/FormWithFsmHook';
import Typography from '../../components/UI/Typography/Typography';
// import { FormWithFsmClass as Form} from '../../components/Form/FormWithFsmClass';

import { Container, Header } from './styles';

export const MainPage = () => {
  return (
    <Container>
      <Header>
        <Typography type="heading-xl">Hi there</Typography>
        <Typography type="heading-lg">Please fill the following form</Typography>
      </Header>
      <Form />
    </Container>
  );
};
