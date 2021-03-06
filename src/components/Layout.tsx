import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  height: 100vh;

  @media (min-width: 768px) {
    padding-bottom: 8rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <StyledMain className="flex flex-1 md:p-16 bg-gray-100 2xl:max-h-2/3">
      {children}
    </StyledMain>
  );
}
