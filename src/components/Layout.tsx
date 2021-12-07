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
  className?: string;
}

export default function Layout({
  children,
  className = "",
}: Props): JSX.Element {
  return (
    <StyledMain className="flex flex-1 md:p-16 bg-gray-200 min-h-screen">
      {children}
    </StyledMain>
  );
}
