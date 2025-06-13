import { createConsumer } from '@rails/actioncable';

const getCable = (token, uid, client) => {
  const url = `${process.env.REACT_APP_API_URL}/cable?token=${token}&uid=${uid}&client=${client}`;
  return createConsumer(url);
};

export default getCable;
