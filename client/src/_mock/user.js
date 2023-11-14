import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(7)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.random.numeric(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'diabetic']),
  role: sample(['London, UK', 'Manchester, UK', 'Lagos, Nigeria', 'Lisbon, Portugal', 'DC, USA', 'NY, USA']),
}));

export default users;
