import faker from "faker";

import { UserType } from "../../types";

export const userFactory = (user?: Partial<UserType>) => ({
  id: faker.datatype.uuid(),
  photo: faker.image.people(),
  name: faker.name.firstName(),
  company: faker.name.jobTitle(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetName(),
  ...user,
});

export const usersFactory = (length = 10) =>
  Array.from({ length }).map(userFactory as any);

export const usersResponseFactory = (length = 10) => {
  return usersFactory(length) as Partial<UserType[]>;
};
