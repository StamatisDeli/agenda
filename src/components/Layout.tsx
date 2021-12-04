import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  height: 100vh;
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
    <StyledMain className="flex flex-1 p-16 bg-gray-200 min-h-screen">
      {children}
    </StyledMain>
  );
}

//max-w-md
